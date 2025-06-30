
import { useWallet } from '@solana/wallet-adapter-react';
import { useToast } from '@/hooks/use-toast';
import { useConnection } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export const useWalletConnection = () => {
  const { connected, connecting, disconnect, publicKey, wallet } = useWallet();
  const { connection } = useConnection();
  const { toast } = useToast();
  const [balance, setBalance] = useState<number | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(false);

  const fetchBalance = async () => {
    if (!publicKey || !connected) {
      setBalance(null);
      return;
    }

    setLoadingBalance(true);
    try {
      const lamports = await connection.getBalance(publicKey);
      const solBalance = lamports / LAMPORTS_PER_SOL;
      setBalance(solBalance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      setBalance(null);
    } finally {
      setLoadingBalance(false);
    }
  };

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance();
    } else {
      setBalance(null);
    }
  }, [connected, publicKey, connection]);

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setBalance(null);
      toast({
        title: "Wallet Disconnected",
        description: "Your Phantom wallet has been disconnected successfully.",
      });
    } catch (error) {
      toast({
        title: "Disconnection Failed",
        description: "Failed to disconnect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getShortAddress = () => {
    if (!publicKey) return '';
    const address = publicKey.toString();
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return {
    connected,
    connecting,
    disconnect: handleDisconnect,
    publicKey,
    wallet,
    shortAddress: getShortAddress(),
    balance,
    loadingBalance,
    refreshBalance: fetchBalance,
  };
};
