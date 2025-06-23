
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Square, Loader2, Music } from 'lucide-react';

const MusicRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartListening = () => {
    setIsListening(true);
    // Simulate listening and processing
    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        // Would show results here
      }, 2000);
    }, 3000);
  };

  const handleStopListening = () => {
    setIsListening(false);
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900/90 to-purple-900/50 backdrop-blur-xl border border-gray-700/50">
      <CardContent className="p-8 text-center">
        <div className="mb-8">
          <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
            isListening 
              ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse' 
              : isProcessing
              ? 'bg-gradient-to-r from-blue-500 to-purple-500'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
          }`}>
            {isProcessing ? (
              <Loader2 className="w-16 h-16 text-white animate-spin" />
            ) : isListening ? (
              <Mic className="w-16 h-16 text-white" />
            ) : (
              <Music className="w-16 h-16 text-white" />
            )}
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            {isProcessing ? 'Identifying Track...' : isListening ? 'Listening...' : 'Ready to Discover'}
          </h2>
          
          <p className="text-gray-300 text-lg mb-8">
            {isProcessing 
              ? 'Processing audio fingerprint...' 
              : isListening 
              ? 'Hold your device near the music source'
              : 'Tap to start identifying music and earn $DISCO tokens'
            }
          </p>
        </div>
        
        <div className="space-y-4">
          {!isListening && !isProcessing ? (
            <Button 
              onClick={handleStartListening}
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Mic className="w-6 h-6 mr-3" />
              Start Listening
            </Button>
          ) : isListening ? (
            <Button 
              onClick={handleStopListening}
              size="lg" 
              variant="destructive"
              className="px-12 py-6 text-xl font-bold rounded-full"
            >
              <Square className="w-6 h-6 mr-3" />
              Stop Listening
            </Button>
          ) : null}
          
          <div className="text-sm text-gray-400">
            Earn 0.5-2.0 $DISCO per successful identification
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicRecognition;
