import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, BarChart3, Mic } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
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
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left nav items */}
        <div className="flex items-center gap-4">
          {navItems.slice(0, 2).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-lg transition-colors min-w-[60px]",
                isActive(item.path) 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Center listening button */}
        <div className="flex-1 flex justify-center px-4">
          <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/25 border border-white/20 transition-all duration-300 active:scale-95">
            <Mic className="w-6 h-6" />
          </button>
        </div>

        {/* Right nav items */}
        <div className="flex items-center gap-4">
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