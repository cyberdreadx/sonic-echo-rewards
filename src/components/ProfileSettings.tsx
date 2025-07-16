
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Wallet, Bell, Share2, LogOut, Shield, RefreshCw, Link, Unlink, UserPlus } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWalletConnection } from '@/hooks/useWalletConnection';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ProfileSettings = () => {
  const { connected } = useWallet();
  const { shortAddress, disconnect, balance, loadingBalance, refreshBalance, publicKey } = useWalletConnection();
  const { toast } = useToast();
  const [linkedWallet, setLinkedWallet] = useState<string | null>(null);
  const [isLinking, setIsLinking] = useState(false);
  const [walletAccountStatus, setWalletAccountStatus] = useState<'checking' | 'current-user' | 'other-user' | 'unlinked' | null>(null);

  // Fetch user's linked wallet on component mount
  useEffect(() => {
    const fetchLinkedWallet = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('wallet_address')
        .eq('user_id', user.id)
        .single();

      if (profile?.wallet_address) {
        setLinkedWallet(profile.wallet_address);
      }
    };

    fetchLinkedWallet();
  }, []);

  // Check wallet account status when wallet changes
  useEffect(() => {
    const checkWalletStatus = async () => {
      if (!publicKey || !connected) {
        setWalletAccountStatus(null);
        return;
      }

      setWalletAccountStatus('checking');
      const walletAddress = publicKey.toString();

      try {
        // Check if this wallet belongs to any account
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_id')
          .eq('wallet_address', walletAddress)
          .maybeSingle();

        if (!profile) {
          setWalletAccountStatus('unlinked');
          return;
        }

        // Check if it's the current user's wallet
        const { data: { user } } = await supabase.auth.getUser();
        if (user && profile.user_id === user.id) {
          setWalletAccountStatus('current-user');
        } else {
          setWalletAccountStatus('other-user');
        }
      } catch (error) {
        console.error('Error checking wallet status:', error);
        setWalletAccountStatus('unlinked');
      }
    };

    checkWalletStatus();
  }, [publicKey, connected]);

  const switchToWalletAccount = async () => {
    if (!publicKey) return;

    setIsLinking(true);
    try {
      // Sign out current user
      await supabase.auth.signOut();
      
      toast({
        title: "Account Switch Required",
        description: "Please sign in to the account that owns this wallet.",
      });
      
      // In a real app, you might redirect to login page here
      // For now, we'll just refresh the page
      window.location.reload();
    } catch (error) {
      console.error('Error switching accounts:', error);
      toast({
        title: "Switch Failed",
        description: "Failed to switch accounts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLinking(false);
    }
  };

  const createNewAccount = async () => {
    toast({
      title: "Create New Account",
      description: "Please sign out and create a new account to use this wallet.",
    });
    
    try {
      await supabase.auth.signOut();
      // In a real app, redirect to signup page
      window.location.href = '/auth';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const linkWallet = async () => {
    if (!publicKey || !connected) {
      toast({
        title: "No Wallet Connected",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }

    setIsLinking(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to link your wallet.",
          variant: "destructive",
        });
        return;
      }

      const walletAddress = publicKey.toString();

      const { error } = await supabase
        .from('profiles')
        .update({ wallet_address: walletAddress })
        .eq('user_id', user.id);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Wallet Already Linked",
            description: "This wallet is already linked to another account.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        setLinkedWallet(walletAddress);
        toast({
          title: "Wallet Linked",
          description: "Your wallet has been successfully linked to your account.",
        });
      }
    } catch (error) {
      console.error('Error linking wallet:', error);
      toast({
        title: "Link Failed",
        description: "Failed to link wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLinking(false);
    }
  };

  const unlinkWallet = async () => {
    setIsLinking(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({ wallet_address: null })
        .eq('user_id', user.id);

      if (error) throw error;

      setLinkedWallet(null);
      toast({
        title: "Wallet Unlinked",
        description: "Your wallet has been unlinked from your account.",
      });
    } catch (error) {
      console.error('Error unlinking wallet:', error);
      toast({
        title: "Unlink Failed",
        description: "Failed to unlink wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLinking(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Wallet Info */}
      <Card className="bg-card border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-foreground flex items-center gap-2 text-lg">
            <Wallet className="w-5 h-5" />
            Phantom Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {connected ? (
            <>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Connected Address</p>
                <p className="font-mono text-sm text-black">{shortAddress}</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-gray-600">SOL Balance</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1"
                    onClick={refreshBalance}
                    disabled={loadingBalance}
                  >
                    <RefreshCw className={`w-3 h-3 ${loadingBalance ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
                <p className="font-mono text-sm text-black">
                  {loadingBalance ? (
                    'Loading...'
                  ) : balance !== null ? (
                    `${balance.toFixed(4)} SOL`
                  ) : (
                    'Failed to load'
                  )}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Connected
                </Badge>
              </div>
              
              <div className="space-y-2">
                {linkedWallet ? (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-green-700 font-medium">Linked to Account</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Linked
                      </Badge>
                    </div>
                    <p className="font-mono text-xs text-green-800">
                      {`${linkedWallet.slice(0, 8)}...${linkedWallet.slice(-8)}`}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Wallet not linked to account</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    size="sm"
                    onClick={disconnect}
                  >
                    Disconnect
                  </Button>
                  
                  {walletAccountStatus === 'checking' ? (
                    <Button variant="outline" size="sm" disabled className="flex-1">
                      Checking...
                    </Button>
                  ) : walletAccountStatus === 'other-user' ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={switchToWalletAccount}
                      disabled={isLinking}
                      className="flex-1 text-blue-600 hover:text-blue-700"
                    >
                      <UserPlus className="w-3 h-3 mr-1" />
                      Switch Account
                    </Button>
                  ) : walletAccountStatus === 'unlinked' ? (
                    <div className="flex gap-1 flex-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={linkWallet}
                        disabled={isLinking}
                        className="flex-1"
                      >
                        <Link className="w-3 h-3 mr-1" />
                        {isLinking ? 'Linking...' : 'Link'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={createNewAccount}
                        className="flex-1 text-green-600 hover:text-green-700"
                      >
                        <UserPlus className="w-3 h-3 mr-1" />
                        New Account
                      </Button>
                    </div>
                  ) : walletAccountStatus === 'current-user' ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={unlinkWallet}
                      disabled={isLinking}
                      className="flex-1"
                    >
                      <Unlink className="w-3 h-3 mr-1" />
                      {isLinking ? 'Unlinking...' : 'Unlink'}
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={linkWallet}
                      disabled={isLinking}
                      className="flex-1"
                    >
                      <Link className="w-3 h-3 mr-1" />
                      {isLinking ? 'Linking...' : 'Link Wallet'}
                    </Button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">No wallet connected</p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                  Disconnected
                </Badge>
              </div>
              
              <WalletMultiButton className="!w-full !bg-black !text-white hover:!bg-gray-800 !rounded-md !h-9 !text-sm" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="bg-card border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-black flex items-center gap-2 text-lg">
            <Settings className="w-5 h-5" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Shield className="w-4 h-4 mr-2" />
            Privacy
          </Button>
          
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Referral Link
          </Button>
          
          <hr className="my-3" />
          
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
