
import React from 'react';
import { Button } from '@/components/ui/button';
import { Music, Coins, Shield } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-500 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Disconium
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Music className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-lg">$DISCO</span>
              <Music className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          
          {/* Main headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Where Music Meets <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">Blockchain</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Artists mint exclusive tracks as NFTs. Listeners earn rewards for recognition. 
            <br className="hidden md:block" />
            Creating a new economy where music discovery pays everyone.
          </p>
          
          {/* Key features */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Verified Exclusivity</h3>
              <p className="text-gray-300 text-sm">Audio fingerprinting ensures only unreleased tracks can be minted</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Music className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">NFT Music</h3>
              <p className="text-gray-300 text-sm">Transform your tracks into valuable digital assets on Solana</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Coins className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Dual Rewards</h3>
              <p className="text-gray-300 text-sm">Both artists and listeners earn $DISCO tokens through recognition</p>
            </div>
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105">
              Start Minting Tracks
            </Button>
            <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl transition-all duration-300">
              Explore Music
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
