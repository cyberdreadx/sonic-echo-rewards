
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Music, Coins, Clock, Users, Target } from 'lucide-react';

const ProfileStats = () => {
  const stats = [
    {
      title: "Total Earnings",
      value: "1,247 $DISCO",
      change: "+47.3 today",
      icon: Coins,
      trend: "up"
    },
    {
      title: "Tracks Discovered",
      value: "1,829",
      change: "+12 this week",
      icon: Music,
      trend: "up"
    },
    {
      title: "Discovery Rate",
      value: "94.2%",
      change: "+2.1% vs last month",
      icon: Target,
      trend: "up"
    },
    {
      title: "Active Streak",
      value: "12 days",
      change: "Best: 28 days",
      icon: Clock,
      trend: "neutral"
    },
    {
      title: "Referrals",
      value: "23",
      change: "+3 this month",
      icon: Users,
      trend: "up"
    },
    {
      title: "Monthly Rank",
      value: "#47",
      change: "↑ 12 positions",
      icon: TrendingUp,
      trend: "up"
    }
  ];

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-black text-lg md:text-xl">Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-black" />
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  stat.trend === 'up' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
                <p className="text-xl font-bold text-black">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileStats;
