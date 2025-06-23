
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, MapPin, Coins, Clock, Trophy, Users } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      type: "discovery",
      title: "Discovered 'Midnight Echoes' by Luna Wave",
      location: "Coffee Shop, Downtown",
      earnings: "1.2 $DISCO",
      time: "2 minutes ago",
      icon: Music
    },
    {
      type: "achievement",
      title: "Reached 12-day discovery streak!",
      description: "Keep it up for bonus rewards",
      time: "1 hour ago",
      icon: Trophy
    },
    {
      type: "referral",
      title: "Friend joined via your referral link",
      description: "Alex_beats is now discovering music",
      earnings: "5.0 $DISCO",
      time: "3 hours ago",
      icon: Users
    },
    {
      type: "discovery",
      title: "Discovered 'Digital Dreams' by Cyber Nights",
      location: "Mall, West Side",
      earnings: "0.8 $DISCO",
      time: "5 hours ago",
      icon: Music
    },
    {
      type: "discovery",
      title: "Discovered 'Neon Lights' by Retro Future",
      location: "Gym, Central",
      earnings: "1.5 $DISCO",
      time: "1 day ago",
      icon: Music
    }
  ];

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-black flex items-center gap-2 text-lg md:text-xl">
          <Clock className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div key={index} className="p-3 md:p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <activity.icon className="w-4 h-4 text-black" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-black text-sm mb-1">{activity.title}</h4>
                
                {activity.description && (
                  <p className="text-gray-600 text-xs mb-2">{activity.description}</p>
                )}
                
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    {activity.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{activity.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </div>
                  </div>
                  
                  {activity.earnings && (
                    <div className="text-black font-medium flex items-center gap-1 text-xs">
                      <Coins className="w-3 h-3" />
                      {activity.earnings}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
