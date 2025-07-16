import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type TokenTransactionType = 
  | 'earned_discovery' 
  | 'earned_referral' 
  | 'spent_premium' 
  | 'admin_grant' 
  | 'admin_deduct';

interface TokenTransaction {
  id: string;
  user_id: string;
  transaction_type: TokenTransactionType;
  amount: number;
  balance_after: number;
  description?: string;
  metadata?: any;
  admin_user_id?: string;
  created_at: string;
}

interface ProcessTokenResult {
  transaction_id: string;
  previous_balance: number;
  new_balance: number;
  amount: number;
}

export const useTokens = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [recentTransactions, setRecentTransactions] = useState<TokenTransaction[]>([]);

  // Fetch user's token balance
  const fetchBalance = async () => {
    if (!user) {
      setBalance(0);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_tokens')
        .select('balance')
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setBalance(0);
        } else {
          console.error('Error fetching token balance:', error);
          setBalance(0);
        }
      } else {
        setBalance(typeof data.balance === 'string' ? parseFloat(data.balance) : data.balance);
      }
    } catch (err) {
      console.error('Error:', err);
      setBalance(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch recent transactions
  const fetchRecentTransactions = async (limit: number = 10) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('token_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching transactions:', error);
      } else {
        setRecentTransactions(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Process a token transaction
  const processTransaction = async (
    transactionType: TokenTransactionType,
    amount: number,
    description?: string,
    metadata?: any
  ): Promise<ProcessTokenResult | null> => {
    if (!user) {
      throw new Error('User must be authenticated');
    }

    try {
      const { data, error } = await supabase.rpc('process_token_transaction', {
        _user_id: user.id,
        _transaction_type: transactionType,
        _amount: amount,
        _description: description || null,
        _metadata: metadata || null,
        _admin_user_id: null
      });

      if (error) {
        console.error('Error processing transaction:', error);
        throw new Error(error.message);
      }

      // Update local balance
      if (data && typeof data === 'object' && 'new_balance' in data) {
        const result = data as unknown as ProcessTokenResult;
        setBalance(result.new_balance);
        return result;
      }

      return null;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  };

  // Admin function to grant or deduct tokens
  const adminProcessTransaction = async (
    targetUserId: string,
    transactionType: 'admin_grant' | 'admin_deduct',
    amount: number,
    description?: string,
    metadata?: any
  ): Promise<ProcessTokenResult | null> => {
    if (!user) {
      throw new Error('User must be authenticated');
    }

    try {
      const { data, error } = await supabase.rpc('process_token_transaction', {
        _user_id: targetUserId,
        _transaction_type: transactionType,
        _amount: amount,
        _description: description || null,
        _metadata: metadata || null,
        _admin_user_id: user.id
      });

      if (error) {
        console.error('Error processing admin transaction:', error);
        throw new Error(error.message);
      }

      return data && typeof data === 'object' && 'new_balance' in data ? data as unknown as ProcessTokenResult : null;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  };

  // Format token amount for display
  const formatTokens = (amount: number, compact: boolean = false): string => {
    if (compact && amount >= 1000) {
      if (amount >= 1000000) {
        return `${(amount / 1000000).toFixed(1)}M`;
      }
      return `${(amount / 1000).toFixed(1)}k`;
    }
    return amount.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  useEffect(() => {
    fetchBalance();
    fetchRecentTransactions();

    if (user) {
      // Set up real-time listener for balance changes
      const channel = supabase
        .channel('user-token-updates')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'user_tokens',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            if (payload.new && 'balance' in payload.new) {
              setBalance(parseFloat(payload.new.balance as string));
            }
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'token_transactions',
            filter: `user_id=eq.${user.id}`
          },
          () => {
            // Refresh transactions when new ones are added
            fetchRecentTransactions();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  return {
    balance,
    loading,
    recentTransactions,
    fetchBalance,
    fetchRecentTransactions,
    processTransaction,
    adminProcessTransaction,
    formatTokens
  };
};