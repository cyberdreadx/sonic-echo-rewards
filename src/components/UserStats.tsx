
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Music, Award, Clock } from 'lucide-react';

const UserStats = () => {
  const stats = [
    {
      title: "Today's Earnings",
      value: "0 $DISCO",
      icon: TrendingUp,
    },
    {
      title: "Tracks Identified",
      value: "0",
      icon: Music,
    },
    {
      title: "Discovery Rank",
      value: "Unranked",
      icon: Award,
    },
    {
      title: "Streak",
      value: "0 days",
      icon: Clock,
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 w-full">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white border border-gray-200 min-w-0">
          <CardHeader className="pb-2 md:pb-3 px-3 md:px-6">
            <CardTitle className="text-xs md:text-sm text-gray-600 font-medium flex flex-col items-center gap-2 md:flex-row min-w-0">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-3 h-3 md:w-4 md:h-4 text-black" />
              </div>
              <span className="text-center md:text-left text-xs leading-tight">{stat.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-3 md:px-6">
            <div className="text-sm md:text-2xl font-bold text-black text-center md:text-left truncate">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStats;
