
import React from 'react';
import { Button } from '@/components/ui/button';
import { Coins, User, Menu, Bell } from 'lucide-react';

const AppHeader = () => {
  return (
    <header className="bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5 text-white" />
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              DISCONIUM
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-500/30">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">1,247 $DISCO</span>
            </div>
            
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5 text-white" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
