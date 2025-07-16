
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, Square, Loader2, Music, ExternalLink, Youtube } from 'lucide-react';
import { useAudioRecording } from '@/hooks/useAudioRecording';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAdminView } from '@/contexts/AdminViewContext';
import AdminSettings from './AdminSettings';

interface RecognitionResult {
  title: string;
  artists: string;
  album?: string;
  score: number;
  availableOn: {
    spotify: boolean;
    appleMusic: boolean;
    youtube: boolean;
  };
  links: {
    spotify: string | null;
    appleMusic: string | null;
    youtube: string | null;
  };
}

const MusicRecognition = () => {
  const { showAdminFeatures } = useAdminView();
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const { isRecording, audioBlob, startRecording, stopRecording, clearRecording } = useAudioRecording();
  const { toast } = useToast();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleStartListening = async () => {
    try {
      clearRecording();
      setResult(null);
      await startRecording();
      
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      console.log('Starting auto-stop timer for 10 seconds');
      
      // Auto-stop after 10 seconds
      timerRef.current = setTimeout(() => {
        console.log('Auto-stopping recording after 10 seconds - timer triggered');
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
  };

  const handleStopListening = () => {
    console.log('Manual stop recording triggered');
    // Clear the auto-stop timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      console.log('Auto-stop timer cleared');
    }
    stopRecording();
  };

  // Clean up timer when recording stops
  useEffect(() => {
    if (!isRecording && timerRef.current) {
      console.log('Recording stopped, clearing timer');
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [isRecording]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const processAudio = async () => {
    if (!audioBlob) return;

    setIsProcessing(true);
    try {
      console.log('Processing audio with secure backend...', {
        audioSize: audioBlob.size,
        audioType: audioBlob.type
      });
      
      // Create FormData properly
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      
      console.log('FormData created, invoking function...');
      
      const { data, error } = await supabase.functions.invoke('music-recognition', {
        body: formData,
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Backend response:', data);
      
      if (data.success && data.data) {
        setResult(data.data);
        toast({
          title: "Song Identified!",
          description: `Found: ${data.data.title} by ${data.data.artists}`,
        });
      } else {
        toast({
          title: "No Match Found",
          description: data.error || "Could not identify this music. Try recording a clearer sample.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Recognition error:', error);
      toast({
        title: "Recognition Error",
        description: "Failed to identify music. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Process audio when recording stops and audio is available
  useEffect(() => {
    if (audioBlob && !isRecording && !isProcessing) {
      console.log('Audio blob available, processing...');
      processAudio();
    }
  }, [audioBlob, isRecording]);

  const openLink = (url: string | null) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-6">
      {showAdminFeatures && <AdminSettings />}
      
      <Card className="bg-card border border-border">
        <CardContent className="p-6 md:p-8 text-center">
          <div className="mb-6 md:mb-8">
            <div className={`w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full flex items-center justify-center mb-4 md:mb-6 transition-all duration-300 border-2 active:scale-95 ${
              isRecording 
                ? 'bg-red-500 border-red-500 animate-pulse' 
                : isProcessing
                ? 'bg-gray-800 border-gray-800'
                : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
            }`}>
              {isProcessing ? (
                <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-white animate-spin" />
              ) : isRecording ? (
                <Mic className="w-12 h-12 md:w-16 md:h-16 text-white" />
              ) : (
                <Music className="w-12 h-12 md:w-16 md:h-16 text-foreground" />
              )}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
              {isProcessing ? 'Identifying Track...' : isRecording ? 'Listening...' : 'Ready to Discover'}
            </h2>
            
            <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8 px-4 md:px-0">
              {isProcessing 
                ? 'Processing audio securely...' 
                : isRecording 
                ? 'Recording audio... (max 10 seconds)'
                : 'Tap to start identifying music and earn $DISCO tokens'
              }
            </p>
          </div>
          
          <div className="space-y-4">
            {!isRecording && !isProcessing ? (
              <Button 
                onClick={handleStartListening}
                size="lg" 
                className="bg-black hover:bg-gray-800 text-white px-8 py-4 md:px-12 md:py-6 text-lg md:text-xl font-medium rounded-xl w-full md:w-auto active:scale-95 transition-transform"
              >
                <Mic className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                Start Listening
              </Button>
            ) : isRecording ? (
              <Button 
                onClick={handleStopListening}
                size="lg" 
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50 px-8 py-4 md:px-12 md:py-6 text-lg md:text-xl font-medium rounded-xl w-full md:w-auto active:scale-95 transition-transform"
              >
                <Square className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                Stop Recording
              </Button>
            ) : null}
            
            <div className="text-sm text-muted-foreground">
              Earn 0.5-2.0 $DISCO per successful identification
            </div>
          </div>

          {result && (
            <div className="mt-8 p-6 bg-gray-50 rounded-xl text-left">
              <h3 className="text-xl font-bold text-foreground mb-2">{result.title}</h3>
              <p className="text-muted-foreground mb-2">by {result.artists}</p>
              {result.album && (
                <p className="text-muted-foreground text-sm mb-4">Album: {result.album}</p>
              )}
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground">Confidence:</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {result.score}% match
                </Badge>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Available on:</h4>
                <div className="flex flex-wrap gap-2">
                  {result.availableOn.spotify && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openLink(result.links.spotify)}
                      className="flex items-center gap-2"
                    >
                      <Music className="w-4 h-4" />
                      Spotify
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                  
                  {result.availableOn.appleMusic && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openLink(result.links.appleMusic)}
                      className="flex items-center gap-2"
                    >
                      <Music className="w-4 h-4" />
                      Apple Music
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                  
                  {result.availableOn.youtube && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openLink(result.links.youtube)}
                      className="flex items-center gap-2"
                    >
                      <Youtube className="w-4 h-4" />
                      YouTube
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                
                {!result.availableOn.spotify && !result.availableOn.appleMusic && !result.availableOn.youtube && (
                  <p className="text-muted-foreground text-sm">No streaming links available</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MusicRecognition;
