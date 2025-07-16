import React from 'react';
import { Coins } from 'lucide-react';
import { useTokens } from '@/hooks/useTokens';
import { useAuth } from '@/contexts/AuthContext';

interface TokenBalanceProps {
  className?: string;
  showLabel?: boolean;
  compact?: boolean;
}

const TokenBalance = ({ className = '', showLabel = true, compact = false }: TokenBalanceProps) => {
  const { user } = useAuth();
  const { balance, loading, formatTokens } = useTokens();

  if (!user) {
    return null;
  }

  return (
    <div className={`flex items-center gap-1 bg-muted px-1.5 py-1 md:px-3 md:py-2 rounded border border-border ${className}`}>
      <Coins className="w-3 h-3 md:w-4 md:h-4 text-amber-600 flex-shrink-0" />
      <span className="text-foreground font-medium text-xs md:text-base whitespace-nowrap">
        {loading ? (
          <span className="animate-pulse">...</span>
        ) : (
          <>
            <span className={compact ? "inline" : "hidden sm:inline"}>
              {formatTokens(balance, false)}
            </span>
            {compact && (
              <span className="sm:hidden">
                {formatTokens(balance, true)}
              </span>
            )}
            {showLabel && (
              <span className="hidden md:inline ml-1">$DISCO</span>
            )}
          </>
        )}
      </span>
    </div>
  );
};

export default TokenBalance;