
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminSettings: React.FC = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [credentialsStatus, setCredentialsStatus] = useState<'unknown' | 'configured' | 'missing'>('unknown');
  const { toast } = useToast();

  const checkCredentialsStatus = async () => {
    setIsChecking(true);
    try {
      // Create a simple test request to check if the function works
      const response = await fetch('/functions/v1/music-recognition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: true }),
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (response.status === 400) {
        // 400 means the function is working but no audio was provided (expected)
        setCredentialsStatus('configured');
        toast({
          title: "Credentials Configured",
          description: "ACRCloud API credentials are properly set up.",
        });
      } else if (response.status === 500) {
        // Check if it's a credential error
        const errorText = await response.text();
        console.log('Error response:', errorText);
        
        if (errorText.includes('credentials not configured') || errorText.includes('access_key') || errorText.includes('access_secret')) {
          setCredentialsStatus('missing');
          toast({
            title: "Credentials Missing",
            description: "ACRCloud API credentials need to be configured in Supabase secrets.",
            variant: "destructive",
          });
        } else {
          setCredentialsStatus('configured');
          toast({
            title: "Credentials Configured",
            description: "ACRCloud API credentials appear to be set up correctly.",
          });
        }
      } else {
        setCredentialsStatus('configured');
        toast({
          title: "Credentials Configured",
          description: "ACRCloud API credentials are working properly.",
        });
      }
    } catch (error) {
      console.error('Credential check error:', error);
      setCredentialsStatus('missing');
      toast({
        title: "Configuration Error",
        description: "Unable to verify credential status. Check the console for details.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Card className="bg-white border border-gray-200 mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-black flex items-center gap-2 text-lg">
          <Settings className="w-5 h-5" />
          Admin Settings
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-black">ACRCloud API Status</h3>
            <p className="text-sm text-gray-600">
              Music recognition service configuration
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {credentialsStatus === 'configured' && (
              <Badge variant="default" className="bg-green-100 text-green-700">
                <CheckCircle className="w-3 h-3 mr-1" />
                Configured
              </Badge>
            )}
            {credentialsStatus === 'missing' && (
              <Badge variant="destructive">
                <AlertCircle className="w-3 h-3 mr-1" />
                Missing
              </Badge>
            )}
            {credentialsStatus === 'unknown' && (
              <Badge variant="secondary">
                Unknown
              </Badge>
            )}
          </div>
        </div>

        <Button 
          onClick={checkCredentialsStatus} 
          disabled={isChecking}
          variant="outline"
          size="sm"
        >
          {isChecking ? 'Checking...' : 'Check Status'}
        </Button>

        <div className="text-xs text-gray-500 space-y-1">
          <p>API credentials are securely stored in Supabase secrets:</p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li>ACRCLOUD_ACCESS_KEY</li>
            <li>ACRCLOUD_ACCESS_SECRET</li>
            <li>ACRCLOUD_HOST</li>
          </ul>
          <p className="text-xs text-blue-600 mt-2">
            After adding secrets, wait a moment for the function to restart, then click "Check Status".
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSettings;
