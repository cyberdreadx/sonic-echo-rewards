
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, MapPin, Coins, Clock } from 'lucide-react';

const RecentDiscoveries = () => {
  const discoveries = [
    {
      track: "Midnight Echoes",
      artist: "Luna Wave",
      location: "Coffee Shop, Downtown",
      earnings: "1.2 $DISCO",
      time: "2 minutes ago",
      isNew: true
    },
    {
      track: "Digital Dreams",
      artist: "Cyber Nights",
      location: "Mall, West Side",
      earnings: "0.8 $DISCO",
      time: "15 minutes ago",
      isNew: false
    },
    {
      track: "Neon Lights",
      artist: "Retro Future",
      location: "Gym, Central",
      earnings: "1.5 $DISCO",
      time: "1 hour ago",
      isNew: false
    },
    {
      track: "Space Odyssey",
      artist: "Cosmic Beats",
      location: "Restaurant, East End",
      earnings: "2.1 $DISCO",
      time: "3 hours ago",
      isNew: false
    }
  ];

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-black flex items-center gap-2 text-lg md:text-xl">
          <Music className="w-5 h-5 text-black" />
          Recent Discoveries
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 md:max-h-none overflow-y-auto">
        {discoveries.map((discovery, index) => (
          <div key={index} className={`p-3 md:p-4 rounded-lg border transition-all hover:bg-gray-50 active:scale-[0.98] ${
            discovery.isNew 
              ? 'bg-gray-50 border-black' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-start justify-between mb-2 md:mb-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-black flex items-center gap-2 text-sm md:text-base">
                  <span className="truncate">{discovery.track}</span>
                  {discovery.isNew && (
                    <span className="px-2 py-0.5 bg-black text-white text-xs font-medium rounded flex-shrink-0">
                      NEW
                    </span>
                  )}
                </h4>
                <p className="text-gray-600 text-xs md:text-sm truncate">by {discovery.artist}</p>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <div className="text-black font-medium flex items-center gap-1 text-sm md:text-base">
                  <Coins className="w-3 h-3 md:w-4 md:h-4" />
                  {discovery.earnings}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs md:text-sm text-gray-500 gap-2">
              <div className="flex items-center gap-1 min-w-0 flex-1">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span className="truncate">{discovery.location}</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Clock className="w-3 h-3 md:w-4 md:h-4" />
                {discovery.time}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentDiscoveries;
