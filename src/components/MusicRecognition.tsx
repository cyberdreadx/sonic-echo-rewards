
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Square, Loader2, Music } from 'lucide-react';

const MusicRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartListening = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
    }, 3000);
  };

  const handleStopListening = () => {
    setIsListening(false);
  };

  return (
    <Card className="bg-white border border-gray-200">
      <CardContent className="p-6 md:p-8 text-center">
        <div className="mb-6 md:mb-8">
          <div className={`w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full flex items-center justify-center mb-4 md:mb-6 transition-all duration-300 border-2 active:scale-95 ${
            isListening 
              ? 'bg-black border-black' 
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
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 md:px-12 md:py-6 text-lg md:text-xl font-medium rounded-xl w-full md:w-auto active:scale-95 transition-transform"
            >
              <Mic className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
              Start Listening
            </Button>
          ) : isListening ? (
            <Button 
              onClick={handleStopListening}
              size="lg" 
              variant="outline"
              className="border-black text-black hover:bg-gray-100 px-8 py-4 md:px-12 md:py-6 text-lg md:text-xl font-medium rounded-xl w-full md:w-auto active:scale-95 transition-transform"
            >
              <Square className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
              Stop Listening
            </Button>
          ) : null}
          
          <div className="text-sm text-gray-500">
            Earn 0.5-2.0 $DISCO per successful identification
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicRecognition;
