
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Coins, User, Menu, Bell, X, Home, Search, Trophy, Settings, BarChart3, LogOut, LogIn, Eye, EyeOff } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { useAdminView } from '@/contexts/AdminViewContext';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
  const { user, signOut } = useAuth();
  const { isAdmin } = useUserRole();
  const { isAdminViewMode, toggleAdminView, showAdminFeatures } = useAdminView();
  const { toast } = useToast();

  const navigationItems = [
    { name: 'Discover', path: '/', icon: Home },
    { name: 'Stats', path: '/stats', icon: BarChart3 },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You've been signed out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing you out.",
        variant: "destructive",
      });
    }
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
          
          {/* Admin View Toggle */}
          <div className="flex items-center gap-1 md:gap-4 flex-shrink-0">
            {/* Admin View Toggle Button */}
            {isAdmin() && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAdminView}
                className={`hidden md:flex items-center gap-1 px-2 py-1 text-xs ${
                  isAdminViewMode 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {isAdminViewMode ? (
                  <>
                    <Eye className="w-3 h-3" />
                    Admin Mode
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3 h-3" />
                    User Mode
                  </>
                )}
              </Button>
            )}

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
            
            {/* User Menu Dropdown or Login Button */}
            {user ? (
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
                  {showAdminFeatures && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                        <Settings className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {isAdmin() && (
                    <DropdownMenuItem onClick={toggleAdminView} className="flex items-center gap-2 cursor-pointer">
                      {isAdminViewMode ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          Switch to User Mode
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          Switch to Admin Mode
                        </>
                      )}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Settings className="w-4 h-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Trophy className="w-4 h-4" />
                    Leaderboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-700">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm" className="flex-shrink-0">
                <Link to="/auth" className="flex items-center gap-1">
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
