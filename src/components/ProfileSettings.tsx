
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Wallet, Bell, Share2, LogOut, Shield } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWalletConnection } from '@/hooks/useWalletConnection';

const ProfileSettings = () => {
  const { connected } = useWallet();
  const { shortAddress, disconnect } = useWalletConnection();

  return (
    <div className="space-y-6">
      {/* Wallet Info */}
      <Card className="bg-white border border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-black flex items-center gap-2 text-lg">
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
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Connected
                </Badge>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full" 
                size="sm"
                onClick={disconnect}
              >
                Disconnect Wallet
              </Button>
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
      <Card className="bg-white border border-gray-200">
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
