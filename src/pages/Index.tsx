
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminView } from '@/contexts/AdminViewContext';
import AppHeader from '@/components/AppHeader';
import MusicRecognition from '@/components/MusicRecognition';
import AdSpace from '@/components/AdSpace';
import ACRCloudDebugger from '@/components/ACRCloudDebugger';

const Index = () => {
  const { user } = useAuth();
  const { showAdminFeatures } = useAdminView();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AppHeader />
      
      <main className="w-full px-4 py-6 space-y-6 max-w-md mx-auto md:max-w-4xl md:px-6">
        {!user && (
          <div className="text-center py-8 space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Welcome to Disconium</h2>
            <p className="text-muted-foreground">Discover music and earn rewards</p>
            <Button asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        )}
        {showAdminFeatures && <ACRCloudDebugger />}
        <MusicRecognition />
        <AdSpace />
      </main>
    </div>
  );
};

export default Index;
