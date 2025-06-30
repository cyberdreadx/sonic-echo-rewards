
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Settings, Key, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ACRCloudCredentials {
  accessKey: string;
  accessSecret: string;
  host: string;
}

interface ACRCloudSettingsProps {
  onCredentialsChange: (credentials: ACRCloudCredentials | null) => void;
}

const ACRCloudSettings: React.FC<ACRCloudSettingsProps> = ({ onCredentialsChange }) => {
  const [credentials, setCredentials] = useState<ACRCloudCredentials>({
    accessKey: '',
    accessSecret: '',
    host: 'identify-eu-west-1.acrcloud.com'
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved credentials from localStorage
    const saved = localStorage.getItem('acrcloud-credentials');
    if (saved) {
      try {
        const parsedCredentials = JSON.parse(saved);
        setCredentials(parsedCredentials);
        onCredentialsChange(parsedCredentials);
      } catch (error) {
        console.error('Failed to parse saved credentials:', error);
      }
    }
  }, [onCredentialsChange]);

  const handleSave = () => {
    if (!credentials.accessKey || !credentials.accessSecret) {
      toast({
        title: "Missing Credentials",
        description: "Please provide both access key and secret.",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('acrcloud-credentials', JSON.stringify(credentials));
    onCredentialsChange(credentials);
    setIsExpanded(false);
    
    toast({
      title: "Credentials Saved",
      description: "ACRCloud API credentials have been saved successfully.",
    });
  };

  const hasCredentials = credentials.accessKey && credentials.accessSecret;

  return (
    <Card className="bg-white border border-gray-200 mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-black flex items-center gap-2 text-lg">
            <Key className="w-5 h-5" />
            ACRCloud API Settings
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
        {!isExpanded && (
          <p className="text-sm text-gray-600">
            Status: {hasCredentials ? '✅ Configured' : '❌ Not configured'}
          </p>
        )}
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accessKey">Access Key</Label>
            <Input
              id="accessKey"
              type="password"
              value={credentials.accessKey}
              onChange={(e) => setCredentials(prev => ({ ...prev, accessKey: e.target.value }))}
              placeholder="Enter your ACRCloud access key"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accessSecret">Access Secret</Label>
            <Input
              id="accessSecret"
              type="password"
              value={credentials.accessSecret}
              onChange={(e) => setCredentials(prev => ({ ...prev, accessSecret: e.target.value }))}
              placeholder="Enter your ACRCloud access secret"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="host">API Host</Label>
            <Input
              id="host"
              value={credentials.host}
              onChange={(e) => setCredentials(prev => ({ ...prev, host: e.target.value }))}
              placeholder="identify-eu-west-1.acrcloud.com"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Credentials
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsExpanded(false)}
            >
              Cancel
            </Button>
          </div>

          <div className="text-xs text-gray-500 space-y-1">
            <p>Get your ACRCloud API credentials from:</p>
            <a 
              href="https://console.acrcloud.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://console.acrcloud.com/
            </a>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ACRCloudSettings;
