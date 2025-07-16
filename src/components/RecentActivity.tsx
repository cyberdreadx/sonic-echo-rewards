
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, MapPin, Coins, Clock, Trophy, Users } from 'lucide-react';

const RecentActivity = () => {
  const activities: any[] = [];

  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2 text-lg md:text-xl">
          <Clock className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Clock className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-400 mb-2">No Activity Yet</h3>
        <p className="text-gray-400 text-sm max-w-md">
          Start discovering music to see your activity here. Your discoveries, achievements, and referrals will appear in this feed.
        </p>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
