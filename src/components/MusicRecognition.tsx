
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, Square, Loader2, Music, ExternalLink, Youtube } from 'lucide-react';
import { useAudioRecording } from '@/hooks/useAudioRecording';
import { ACRCloudService } from '@/services/acrcloudService';
import { useToast } from '@/hooks/use-toast';
import ACRCloudSettings from './ACRCloudSettings';

interface ACRCloudCredentials {
  accessKey: string;
  accessSecret: string;
  host: string;
}

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [credentials, setCredentials] = useState<ACRCloudCredentials | null>(null);
  const { isRecording, audioBlob, startRecording, stopRecording, clearRecording } = useAudioRecording();
  const { toast } = useToast();

  // Define isListening based on isRecording state
  const isListening = isRecording;

  const handleStartListening = async () => {
    if (!credentials) {
      toast({
        title: "API Not Configured",
        description: "Please configure your ACRCloud API credentials first.",
        variant: "destructive",
      });
      return;
    }

    try {
      clearRecording();
      setResult(null);
      await startRecording();
      
      // Auto-stop after 10 seconds
      setTimeout(() => {
        if (isRecording) {
          stopRecording();
        }
      }, 10000);
    } catch (error) {
      toast({
        title: "Recording Failed",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const handleStopListening = () => {
    stopRecording();
  };

  const processAudio = async () => {
    if (!audioBlob || !credentials) return;

    setIsProcessing(true);
    try {
      const acrService = new ACRCloudService(credentials);
      const response = await acrService.recognizeAudio(audioBlob);
      
      console.log('ACRCloud response:', response);
      
      if (response.status.code === 0) {
        const musicInfo = acrService.formatMusicInfo(response);
        if (musicInfo) {
          setResult(musicInfo);
          toast({
            title: "Song Identified!",
            description: `Found: ${musicInfo.title} by ${musicInfo.artists}`,
          });
        } else {
          toast({
            title: "No Match Found",
            description: "Could not identify this music. Try recording a clearer sample.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Recognition Failed",
          description: response.status.msg || "Could not identify the music.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Recognition error:', error);
      toast({
        title: "Recognition Error",
        description: "Failed to identify music. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Process audio when recording stops
  React.useEffect(() => {
    if (audioBlob && !isRecording && !isProcessing) {
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
      <ACRCloudSettings onCredentialsChange={setCredentials} />
      
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-6 md:p-8 text-center">
          <div className="mb-6 md:mb-8">
            <div className={`w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full flex items-center justify-center mb-4 md:mb-6 transition-all duration-300 border-2 active:scale-95 ${
              isListening 
                ? 'bg-red-500 border-red-500 animate-pulse' 
                : isProcessing
                ? 'bg-gray-800 border-gray-800'
                : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
            }`}>
              {isProcessing ? (
                <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-white animate-spin" />
              ) : isListening ? (
                <Mic className="w-12 h-12 md:w-16 md:h-16 text-white" />
              ) : (
                <Music className="w-12 h-12 md:w-16 md:h-16 text-black" />
              )}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-3 md:mb-4">
              {isProcessing ? 'Identifying Track...' : isListening ? 'Listening...' : 'Ready to Discover'}
            </h2>
            
            <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 px-4 md:px-0">
              {isProcessing 
                ? 'Processing audio with ACRCloud...' 
                : isListening 
                ? 'Recording audio... (max 10 seconds)'
                : credentials 
                ? 'Tap to start identifying music and earn $DISCO tokens'
                : 'Configure ACRCloud API credentials to get started'
              }
            </p>
          </div>
          
          <div className="space-y-4">
            {!isListening && !isProcessing ? (
              <Button 
                onClick={handleStartListening}
                size="lg" 
                className="bg-black hover:bg-gray-800 text-white px-8 py-4 md:px-12 md:py-6 text-lg md:text-xl font-medium rounded-xl w-full md:w-auto active:scale-95 transition-transform"
                disabled={!credentials}
              >
                <Mic className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                Start Listening
              </Button>
            ) : isListening ? (
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
            
            <div className="text-sm text-gray-500">
              Earn 0.5-2.0 $DISCO per successful identification
            </div>
          </div>

          {result && (
            <div className="mt-8 p-6 bg-gray-50 rounded-xl text-left">
              <h3 className="text-xl font-bold text-black mb-2">{result.title}</h3>
              <p className="text-gray-700 mb-2">by {result.artists}</p>
              {result.album && (
                <p className="text-gray-600 text-sm mb-4">Album: {result.album}</p>
              )}
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-600">Confidence:</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {result.score}% match
                </Badge>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-black">Available on:</h4>
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
                  <p className="text-gray-500 text-sm">No streaming links available</p>
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
