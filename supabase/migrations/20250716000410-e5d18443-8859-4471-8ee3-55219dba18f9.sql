-- Create enum for token transaction types
CREATE TYPE public.token_transaction_type AS ENUM (
  'earned_discovery',
  'earned_referral', 
  'spent_premium',
  'admin_grant',
  'admin_deduct'
);

-- Create user_tokens table for token balances
CREATE TABLE public.user_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  balance DECIMAL(20,8) NOT NULL DEFAULT 0,
  total_earned DECIMAL(20,8) NOT NULL DEFAULT 0,
  total_spent DECIMAL(20,8) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint on user_id (one token balance per user)
ALTER TABLE public.user_tokens ADD CONSTRAINT unique_user_tokens UNIQUE (user_id);

-- Create token_transactions table for transaction history
CREATE TABLE public.token_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  transaction_type token_transaction_type NOT NULL,
  amount DECIMAL(20,8) NOT NULL,
  balance_after DECIMAL(20,8) NOT NULL,
  description TEXT,
  metadata JSONB,
  admin_user_id UUID, -- For admin-initiated transactions
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_user_tokens_user_id ON public.user_tokens(user_id);
CREATE INDEX idx_token_transactions_user_id ON public.token_transactions(user_id);
CREATE INDEX idx_token_transactions_type ON public.token_transactions(transaction_type);
CREATE INDEX idx_token_transactions_created_at ON public.token_transactions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.user_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_tokens
CREATE POLICY "Users can view their own token balance" 
ON public.user_tokens 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own token balance" 
ON public.user_tokens 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can update token balances" 
ON public.user_tokens 
FOR UPDATE 
USING (true); -- Controlled by application logic

CREATE POLICY "Admins can view all token balances" 
ON public.user_tokens 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for token_transactions
CREATE POLICY "Users can view their own transactions" 
ON public.token_transactions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert transactions" 
ON public.token_transactions 
FOR INSERT 
WITH CHECK (true); -- Controlled by application logic

CREATE POLICY "Admins can view all transactions" 
ON public.token_transactions 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create function to handle token transactions atomically
CREATE OR REPLACE FUNCTION public.process_token_transaction(
  _user_id UUID,
  _transaction_type token_transaction_type,
  _amount DECIMAL(20,8),
  _description TEXT DEFAULT NULL,
  _metadata JSONB DEFAULT NULL,
  _admin_user_id UUID DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  _current_balance DECIMAL(20,8);
  _new_balance DECIMAL(20,8);
  _transaction_id UUID;
BEGIN
  -- Get current balance or create token record if it doesn't exist
  INSERT INTO public.user_tokens (user_id, balance, total_earned, total_spent)
  VALUES (_user_id, 0, 0, 0)
  ON CONFLICT (user_id) DO NOTHING;
  
  SELECT balance INTO _current_balance
  FROM public.user_tokens
  WHERE user_id = _user_id;
  
  -- Calculate new balance
  _new_balance := _current_balance + _amount;
  
  -- Prevent negative balances (except for admin deductions)
  IF _new_balance < 0 AND _transaction_type != 'admin_deduct' THEN
    RAISE EXCEPTION 'Insufficient token balance. Current: %, Requested: %', _current_balance, _amount;
  END IF;
  
  -- Update user token balance and totals
  UPDATE public.user_tokens
  SET 
    balance = _new_balance,
    total_earned = CASE 
      WHEN _amount > 0 THEN total_earned + _amount 
      ELSE total_earned 
    END,
    total_spent = CASE 
      WHEN _amount < 0 THEN total_spent + ABS(_amount) 
      ELSE total_spent 
    END,
    updated_at = now()
  WHERE user_id = _user_id;
  
  -- Insert transaction record
  INSERT INTO public.token_transactions (
    user_id, 
    transaction_type, 
    amount, 
    balance_after, 
    description, 
    metadata, 
    admin_user_id
  )
  VALUES (
    _user_id, 
    _transaction_type, 
    _amount, 
    _new_balance, 
    _description, 
    _metadata, 
    _admin_user_id
  )
  RETURNING id INTO _transaction_id;
  
  -- Return transaction details
  RETURN json_build_object(
    'transaction_id', _transaction_id,
    'previous_balance', _current_balance,
    'new_balance', _new_balance,
    'amount', _amount
  );
END;
$$;

-- Create trigger for updated_at column
CREATE TRIGGER update_user_tokens_updated_at
BEFORE UPDATE ON public.user_tokens
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to get user token balance
CREATE OR REPLACE FUNCTION public.get_user_token_balance(_user_id UUID)
RETURNS DECIMAL(20,8)
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT COALESCE(balance, 0)
  FROM public.user_tokens
  WHERE user_id = _user_id;
$$;