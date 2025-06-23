
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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600 font-medium flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-black" />
              </div>
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-black">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStats;
