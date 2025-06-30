
import { useWallet } from '@solana/wallet-adapter-react';
import { useToast } from '@/hooks/use-toast';

export const useWalletConnection = () => {
  const { connected, connecting, disconnect, publicKey, wallet } = useWallet();
  const { toast } = useToast();

  const handleDisconnect = async () => {
    try {
      await disconnect();
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
  };
};
