
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Music, Search, Coins, Upload, Clock } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Upload,
      title: "Upload & Verify",
      description: "Artists upload tracks, which are checked against AcoustID and MusicBrainz to ensure no prior public distribution.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Audio Fingerprinting",
      description: "Panako creates unique fingerprints for each track, stored on IPFS with hash metadata in the NFT.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Music,
      title: "NFT Minting",
      description: "Verified tracks become Solana NFTs with embedded fingerprint data and genre classification.",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Search,
      title: "Track Recognition",
      description: "Users identify songs in real-time using our app, powered by advanced audio matching technology.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Coins,
      title: "Reward Distribution",
      description: "$DISCO tokens are shared between NFT holders and users who successfully identify tracks.",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: Clock,
      title: "Linear Decay Model",
      description: "Earlier track discoveries earn higher rewards, creating incentives for active music exploration.",
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How <span className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">Disconium</span> Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our platform combines cutting-edge audio fingerprinting with blockchain technology to create a fair, transparent music economy.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
