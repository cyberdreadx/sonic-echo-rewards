
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
            <AvatarFallback className="text-xl font-bold bg-gray-100 text-gray-400">?</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-400">No Profile Yet</h1>
              <p className="text-gray-400">Connect your wallet to get started</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-gray-400 border-gray-300">
                <Trophy className="w-3 h-3 mr-1" />
                No Rank Yet
              </Badge>
              <Badge variant="outline" className="text-gray-400 border-gray-300">New User</Badge>
              <Badge variant="outline" className="text-gray-400 border-gray-300">0 Day Streak</Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Not joined yet
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Location unknown
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileHeader;
