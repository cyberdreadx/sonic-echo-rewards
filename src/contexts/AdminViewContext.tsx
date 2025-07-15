import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useUserRole } from '@/hooks/useUserRole';

interface AdminViewContextType {
  isAdminViewMode: boolean;
  toggleAdminView: () => void;
  showAdminFeatures: boolean;
}

const AdminViewContext = createContext<AdminViewContextType | undefined>(undefined);

export const AdminViewProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminViewMode, setIsAdminViewMode] = useState(true);
  const { isAdmin } = useUserRole();

  const toggleAdminView = () => {
    setIsAdminViewMode(prev => !prev);
  };

  // Show admin features only if user is admin AND admin view mode is enabled
  const showAdminFeatures = isAdmin() && isAdminViewMode;

  return (
    <AdminViewContext.Provider value={{
      isAdminViewMode,
      toggleAdminView,
      showAdminFeatures,
    }}>
      {children}
    </AdminViewContext.Provider>
  );
};

export const useAdminView = () => {
  const context = useContext(AdminViewContext);
  if (context === undefined) {
    throw new Error('useAdminView must be used within an AdminViewProvider');
  }
  return context;
};