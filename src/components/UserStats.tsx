
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Music, Award, Clock } from 'lucide-react';

const UserStats = () => {
  const stats = [
    {
      title: "Today's Earnings",
      value: "47.3 $DISCO",
      icon: TrendingUp,
      color: "text-green-400",
      bg: "bg-green-500/20",
      border: "border-green-500/30"
    },
    {
      title: "Tracks Identified",
      value: "1,829",
      icon: Music,
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      border: "border-blue-500/30"
    },
    {
      title: "Discovery Rank",
      value: "#47",
      icon: Award,
      color: "text-purple-400",
      bg: "bg-purple-500/20",
      border: "border-purple-500/30"
    },
    {
      title: "Streak",
      value: "12 days",
      icon: Clock,
      color: "text-orange-400",
      bg: "bg-orange-500/20",
      border: "border-orange-500/30"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className={`bg-gray-900/80 backdrop-blur-xl border ${stat.border}`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-400 font-medium flex items-center gap-2">
              <div className={`w-8 h-8 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStats;
