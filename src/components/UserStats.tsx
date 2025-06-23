
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Music, Award, Clock } from 'lucide-react';

const UserStats = () => {
  const stats = [
    {
      title: "Today's Earnings",
      value: "47.3 $DISCO",
      icon: TrendingUp,
    },
    {
      title: "Tracks Identified",
      value: "1,829",
      icon: Music,
    },
    {
      title: "Discovery Rank",
      value: "#47",
      icon: Award,
    },
    {
      title: "Streak",
      value: "12 days",
      icon: Clock,
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white border border-gray-200">
          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className="text-xs md:text-sm text-gray-600 font-medium flex flex-col items-center gap-2 md:flex-row">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded bg-gray-100 flex items-center justify-center">
                <stat.icon className="w-3 h-3 md:w-4 md:h-4 text-black" />
              </div>
              <span className="text-center md:text-left">{stat.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg md:text-2xl font-bold text-black text-center md:text-left">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStats;
