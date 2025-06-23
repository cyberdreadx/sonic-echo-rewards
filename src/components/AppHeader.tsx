
import React from 'react';
import { Button } from '@/components/ui/button';
import { Coins, User, Menu, Bell } from 'lucide-react';

const AppHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
      <div className="w-full px-4 py-3 max-w-md mx-auto md:max-w-7xl md:px-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 min-w-0">
            <Button variant="ghost" size="icon" className="md:hidden flex-shrink-0">
              <Menu className="w-5 h-5 text-black" />
            </Button>
            <h1 className="text-lg md:text-2xl font-bold text-black truncate">
              DISCONIUM
            </h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1.5 md:px-3 md:py-2 rounded border border-gray-200">
              <Coins className="w-4 h-4 text-black flex-shrink-0" />
              <span className="text-black font-medium text-xs md:text-base whitespace-nowrap">1,247 $DISCO</span>
            </div>
            
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Bell className="w-5 h-5 text-black" />
            </Button>
            
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <User className="w-5 h-5 text-black" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
