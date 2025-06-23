
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
    <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Music className="w-5 h-5 text-purple-400" />
          Recent Discoveries
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {discoveries.map((discovery, index) => (
          <div key={index} className={`p-4 rounded-xl border transition-all hover:bg-gray-800/50 ${
            discovery.isNew 
              ? 'bg-gradient-to-r from-green-500/10 to-green-500/5 border-green-500/30' 
              : 'bg-gray-800/30 border-gray-700/50'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-white flex items-center gap-2">
                  {discovery.track}
                  {discovery.isNew && (
                    <span className="px-2 py-1 bg-green-500 text-black text-xs font-bold rounded-full">
                      NEW
                    </span>
                  )}
                </h4>
                <p className="text-gray-400 text-sm">by {discovery.artist}</p>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold flex items-center gap-1">
                  <Coins className="w-4 h-4" />
                  {discovery.earnings}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {discovery.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
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
