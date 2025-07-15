-- Add wallet_address field to profiles table
ALTER TABLE public.profiles 
ADD COLUMN wallet_address TEXT UNIQUE;

-- Create index for wallet address lookups
CREATE INDEX idx_profiles_wallet_address ON public.profiles(wallet_address);

-- Add policy to allow users to update their wallet address
CREATE POLICY "Users can update their wallet address" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);