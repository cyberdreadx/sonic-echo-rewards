
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, MapPin, Coins, Clock } from 'lucide-react';

const RecentDiscoveries = () => {
  const discoveries: any[] = [];

  return (
    <Card className="bg-card border border-border w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground flex items-center gap-2 text-lg md:text-xl">
          <Music className="w-5 h-5 text-black" />
          Recent Discoveries
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Music className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-400 mb-2">No Discoveries Yet</h3>
        <p className="text-gray-400 text-sm max-w-md">
          Use the music recognition feature to discover tracks and start earning $DISCO tokens. Your discoveries will appear here.
        </p>
      </CardContent>
    </Card>
  );
};

export default RecentDiscoveries;
