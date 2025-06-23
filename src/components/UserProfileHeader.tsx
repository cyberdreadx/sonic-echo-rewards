
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Trophy } from 'lucide-react';

const UserProfileHeader = () => {
  return (
    <Card className="bg-white border border-gray-200">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <Avatar className="w-20 h-20 md:w-24 md:h-24">
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback className="text-xl font-bold bg-gray-100">DJ</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-black">DJ MusicLover</h1>
              <p className="text-gray-600">@musiclover_47</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-black text-white">
                <Trophy className="w-3 h-3 mr-1" />
                Rank #47
              </Badge>
              <Badge variant="outline">Top Discoverer</Badge>
              <Badge variant="outline">12 Day Streak</Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined December 2023
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                San Francisco, CA
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileHeader;
