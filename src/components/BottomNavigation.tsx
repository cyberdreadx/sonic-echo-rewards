import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, BarChart3, Mic } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  onMicClick?: () => void;
  isRecording?: boolean;
}

const BottomNavigation = ({ onMicClick, isRecording = false }: BottomNavigationProps) => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/stats', icon: BarChart3, label: 'Stats' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-center px-4 py-2">
        {/* Left nav item */}
        <div className="flex-1 flex justify-center">
          <Link
            to="/"
            className={cn(
              "flex flex-col items-center gap-1 p-3 rounded-lg transition-colors min-w-[60px]",
              isActive('/') 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </Link>
        </div>

        {/* Center listening button */}
        <div className="flex-1 flex justify-center">
          <button 
            onClick={onMicClick}
            className={cn(
              "p-4 rounded-full transition-all duration-300 active:scale-95 shadow-lg",
              isRecording 
                ? "bg-red-500 text-white animate-pulse" 
                : "bg-foreground text-background hover:bg-foreground/90"
            )}
          >
            <Mic className="w-6 h-6" />
          </button>
        </div>

        {/* Right nav item */}
        <div className="flex-1 flex justify-center">
          {user ? (
            <Link
              to="/profile"
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-lg transition-colors min-w-[60px]",
                isActive('/profile') 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <User className="w-5 h-5" />
              <span className="text-xs font-medium">Profile</span>
            </Link>
          ) : (
            <Link
              to="/auth"
              className="flex flex-col items-center gap-1 p-3 rounded-lg transition-colors min-w-[60px] text-muted-foreground hover:text-foreground"
            >
              <User className="w-5 h-5" />
              <span className="text-xs font-medium">Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;