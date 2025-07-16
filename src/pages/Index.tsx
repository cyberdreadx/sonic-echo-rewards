
import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminView } from '@/contexts/AdminViewContext';
import MusicRecognition from '@/components/MusicRecognition';
import AdSpace from '@/components/AdSpace';
import ACRCloudDebugger from '@/components/ACRCloudDebugger';

const Index = () => {
  const { user } = useAuth();
  const { showAdminFeatures } = useAdminView();
  const { onHandlersReady } = useOutletContext<{ onHandlersReady: (handlers: any) => void }>();

  return (
    <>
      {!user && (
        <div className="text-center py-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Welcome to Disconium</h2>
          <p className="text-muted-foreground">Discover music and earn rewards</p>
          <Button asChild className="md:inline-flex hidden">
            <Link to="/auth">Get Started</Link>
          </Button>
        </div>
      )}
      {showAdminFeatures && <ACRCloudDebugger />}
      <MusicRecognition onHandlersReady={onHandlersReady} />
      <AdSpace />
    </>
  );
};

export default Index;
