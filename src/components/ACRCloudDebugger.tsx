import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ACRCloudDebugger = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const { toast } = useToast();

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    console.log(message);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const testCredentials = async () => {
    addLog('Testing ACRCloud credentials...');
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('music-recognition', {
        body: { test: true }
      });

      if (error) {
        addLog(`❌ Error: ${error.message}`);
        toast({
          title: "Credentials Test Failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (data?.success) {
        addLog('✅ Credentials are properly configured!');
        toast({
          title: "Credentials OK",
          description: "ACRCloud API credentials are working",
        });
      } else {
        addLog(`❌ Test failed: ${JSON.stringify(data)}`);
        toast({
          title: "Test Failed",
          description: data?.error || "Unknown error",
          variant: "destructive",
        });
      }
    } catch (error) {
      addLog(`❌ Exception: ${error}`);
      toast({
        title: "Test Error",
        description: "Failed to test credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testRealAudio = async () => {
    addLog('Starting real audio recording test...');
    setIsLoading(true);

    try {
      // Request microphone access
      addLog('Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 44100,
          channelCount: 1,
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });

      addLog('✅ Microphone access granted');

      // Determine best MIME type
      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      }

      addLog(`Using audio format: ${mimeType}`);

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: mimeType,
        audioBitsPerSecond: 128000
      });

      let chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: mimeType });
        addLog(`✅ Audio recorded: ${audioBlob.size} bytes, type: ${audioBlob.type}`);

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());

        // Test with ACRCloud
        await testWithACRCloud(audioBlob);
        setIsLoading(false);
      };

      addLog('🔴 Recording for 10 seconds... Play some music!');
      toast({
        title: "Recording Started",
        description: "Recording for 10 seconds - play some music!",
      });

      mediaRecorder.start();

      // Stop after 10 seconds
      setTimeout(() => {
        addLog('⏹️ Stopping recording...');
        mediaRecorder.stop();
      }, 10000);

    } catch (error) {
      addLog(`❌ Recording error: ${error}`);
      toast({
        title: "Recording Failed",
        description: `${error}`,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const testWithACRCloud = async (audioBlob: Blob) => {
    try {
      addLog('Sending audio to ACRCloud...');
      
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      const { data, error } = await supabase.functions.invoke('music-recognition', {
        body: formData,
      });

      if (error) {
        addLog(`❌ Supabase function error: ${error.message}`);
        toast({
          title: "Function Error",
          description: error.message,
          variant: "destructive",
        });
      } else if (data?.success && data?.data) {
        addLog('🎵 Music identified!');
        addLog(`Title: ${data.data.title}`);
        addLog(`Artist: ${data.data.artists}`);
        addLog(`Confidence: ${data.data.score}%`);
        toast({
          title: "Music Identified!",
          description: `${data.data.title} by ${data.data.artists}`,
        });
      } else {
        const errorMsg = data?.error || 'No match found';
        addLog(`ℹ️ No music match: ${errorMsg}`);
        
        if (errorMsg.includes('2004')) {
          addLog('📝 Error 2004: Cannot generate fingerprint - try louder/clearer music');
        } else if (errorMsg.includes('1001')) {
          addLog('📝 Error 1001: No result - music not in ACRCloud database');
        }

        toast({
          title: "No Match Found",
          description: errorMsg,
          variant: "destructive",
        });
      }
    } catch (error) {
      addLog(`❌ ACRCloud test error: ${error}`);
      toast({
        title: "Recognition Error",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>ACRCloud Debug Tool</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Button 
            onClick={testCredentials} 
            disabled={isLoading}
            variant="outline"
          >
            {isLoading ? 'Testing...' : '1. Test Credentials'}
          </Button>
          
          <Button 
            onClick={testRealAudio} 
            disabled={isLoading}
            variant="default"
          >
            {isLoading ? 'Recording...' : '2. Record & Test Audio'}
          </Button>

          <Button 
            onClick={clearLogs} 
            variant="ghost"
          >
            Clear Logs
          </Button>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg max-h-96 overflow-y-auto">
          <h3 className="font-semibold mb-2">Debug Logs:</h3>
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Click a test button above.</p>
          ) : (
            <div className="space-y-1">
              {logs.map((log, index) => (
                <div key={index} className="text-sm font-mono">
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ACRCloudDebugger;
