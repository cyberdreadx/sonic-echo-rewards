
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Coins, User, Menu, Bell, X, Home, Search, Trophy, Settings, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const AppHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Discover', path: '/', icon: Home },
    { name: 'Stats', path: '/stats', icon: BarChart3 },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
      <div className="w-full px-3 py-2 max-w-md mx-auto md:max-w-7xl md:px-6 md:py-3">
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden flex-shrink-0 h-8 w-8">
                  <Menu className="w-4 h-4 text-black" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <SheetHeader>
                  <SheetTitle className="text-left">Navigation</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActivePath(item.path)
                          ? 'bg-gray-100 text-black'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <Link to="/" className="flex items-center min-w-0">
              <h1 className="text-base md:text-2xl font-bold text-black truncate">
                DISCONIUM
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActivePath(item.path)
                    ? 'bg-gray-100 text-black'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-1 md:gap-4 flex-shrink-0">
            {/* Mobile: Compact token display */}
            <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-1 md:px-3 md:py-2 rounded border border-gray-200">
              <Coins className="w-3 h-3 md:w-4 md:h-4 text-black flex-shrink-0" />
              <span className="text-black font-medium text-xs md:text-base whitespace-nowrap">
                <span className="hidden sm:inline">1,247 </span>
                <span className="sm:hidden">1.2k</span>
                <span className="hidden md:inline"> $DISCO</span>
              </span>
            </div>
            
            <Button variant="ghost" size="icon" className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10">
              <Bell className="w-4 h-4 md:w-5 md:h-5 text-black" />
            </Button>
            
            {/* User Menu Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-black" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <Settings className="w-4 h-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <Trophy className="w-4 h-4" />
                  Leaderboard
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
