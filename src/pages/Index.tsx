
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminView } from '@/contexts/AdminViewContext';
import { useIsMobile } from '@/hooks/use-mobile';
import AppHeader from '@/components/AppHeader';
import BottomNavigation from '@/components/BottomNavigation';
import MusicRecognition from '@/components/MusicRecognition';
import AdSpace from '@/components/AdSpace';
import ACRCloudDebugger from '@/components/ACRCloudDebugger';
import { useAudioRecording } from '@/hooks/useAudioRecording';
import { useToast } from '@/hooks/use-toast';
import { useRef } from 'react';

const Index = () => {
  const { user } = useAuth();
  const { showAdminFeatures } = useAdminView();
  const isMobile = useIsMobile();
  const { isRecording, startRecording, stopRecording, clearRecording } = useAudioRecording();
  const { toast } = useToast();
  const musicRecognitionRef = useRef<{ handleStartListening: () => void; handleStopListening: () => void } | null>(null);

  const handleMicClick = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      try {
        clearRecording();
        await startRecording();
        
        // Auto-stop after 10 seconds
        setTimeout(() => {
          stopRecording();
        }, 10000);
      } catch (error) {
        console.error('Start recording error:', error);
        toast({
          title: "Recording Failed",
          description: "Could not access microphone. Please check permissions.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AppHeader />
      
      <main className={`w-full px-4 py-6 space-y-6 max-w-md mx-auto md:max-w-4xl md:px-6 ${isMobile ? 'pb-24' : ''}`}>
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
        <MusicRecognition />
        <AdSpace />
      </main>
      
      {isMobile && <BottomNavigation onMicClick={handleMicClick} isRecording={isRecording} />}
    </div>
  );
};

export default Index;
