
import React from 'react';
import { Button } from '@/components/ui/button';
import { Coins, User, Menu, Bell } from 'lucide-react';

const AppHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5 text-black" />
            </Button>
            <h1 className="text-2xl font-bold text-black">
              DISCONIUM
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded border border-gray-200">
              <Coins className="w-5 h-5 text-black" />
              <span className="text-black font-medium">1,247 $DISCO</span>
            </div>
            
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5 text-black" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5 text-black" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
