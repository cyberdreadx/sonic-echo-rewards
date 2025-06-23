
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Music, Search, Coins, Shield, TrendingUp } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Listen & Earn",
      description: "Identify any track playing around you and instantly earn $DISCO tokens. Turn your music knowledge into cash.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Music,
      title: "Mint Exclusive Tracks",
      description: "Artists upload unreleased music as NFTs. Verified exclusivity means real scarcity and value.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Coins,
      title: "Dual Rewards System",
      description: "Every recognition splits $DISCO rewards 50/50 between the artist and the listener. Fair compensation for everyone.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Anti-Cheat Protection",
      description: "Advanced audio fingerprinting prevents gaming the system. One reward per user per track, period.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Early Bird Advantage",
      description: "Linear decay rewards mean early discoverers earn more. Be first to find tracks and maximize earnings.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Zap,
      title: "Real-Time Tracking",
      description: "See exactly where and when your tracks are discovered. GPS tracking shows your music's real-world impact.",
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-950 via-black to-gray-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Stop Streaming For <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">Pennies</span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
            The music industry is broken. Artists get paid nothing, listeners get nothing. 
            <br className="hidden md:block" />
            We're fixing it with blockchain technology that rewards everyone fairly.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:transform hover:scale-105 group">
              <CardContent className="p-10">
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed text-lg">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-3xl p-12 border border-purple-500/30 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">The Math Is Simple</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-black text-yellow-400 mb-2">$0.003</div>
                <div className="text-gray-300">Average per Spotify stream</div>
              </div>
              <div>
                <div className="text-4xl font-black text-green-400 mb-2">$0.50+</div>
                <div className="text-gray-300">Per DISCO recognition</div>
              </div>
              <div>
                <div className="text-4xl font-black text-purple-400 mb-2">166x</div>
                <div className="text-gray-300">More earnings potential</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
