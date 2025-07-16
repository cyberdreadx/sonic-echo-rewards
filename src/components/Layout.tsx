import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import BottomNavigation from '@/components/BottomNavigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAudioRecording } from '@/hooks/useAudioRecording';

const Layout = () => {
  const isMobile = useIsMobile();
  const { isRecording } = useAudioRecording();
  const [musicHandlers, setMusicHandlers] = useState<{ handleStartListening: () => void; handleStopListening: () => void } | null>(null);

  const onHandlersReady = useCallback((handlers: { handleStartListening: () => void; handleStopListening: () => void }) => {
    setMusicHandlers(handlers);
  }, []);

  const handleMicClick = () => {
    if (!musicHandlers) return;
    
    if (isRecording) {
      musicHandlers.handleStopListening();
    } else {
      musicHandlers.handleStartListening();
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AppHeader />
      
      <main className={`w-full px-4 py-6 space-y-6 max-w-md mx-auto md:max-w-4xl md:px-6 ${isMobile ? 'pb-24' : ''}`}>
        <Outlet context={{ onHandlersReady }} />
      </main>
      
      {isMobile && <BottomNavigation onMicClick={handleMicClick} isRecording={isRecording} />}
    </div>
  );
};

export default Layout;