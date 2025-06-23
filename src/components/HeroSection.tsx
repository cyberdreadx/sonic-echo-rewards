
import React from 'react';
import { Button } from '@/components/ui/button';
import { Music, Coins, Zap, Headphones } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-950 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-32 w-48 h-48 bg-blue-600 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-96 h-96 bg-indigo-600 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-pink-600 rounded-full blur-2xl animate-pulse delay-3000"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-12">
            <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
              DISCONIUM
            </h1>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full">
                <Coins className="w-5 h-5 text-black" />
                <span className="text-black font-bold text-lg">$DISCO</span>
              </div>
            </div>
          </div>
          
          {/* Main headline */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Turn Music Discovery Into 
            <br />
            <span className="text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text">Cold Hard Cash</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
            The first platform where artists mint exclusive tracks as NFTs and both creators and listeners 
            <br className="hidden md:block" />
            earn real rewards for every track recognition. No more streaming pennies.
          </p>
          
          {/* Key value props */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30">
              <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Instant Recognition</h3>
              <p className="text-gray-300">Shazam meets blockchain. Identify tracks and get paid instantly in $DISCO tokens.</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30">
              <Music className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Exclusive NFT Drops</h3>
              <p className="text-gray-300">Artists mint unreleased tracks as NFTs. Own a piece of music history before anyone else.</p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-900/50 to-pink-800/50 backdrop-blur-sm rounded-3xl p-8 border border-pink-500/30">
              <Headphones className="w-16 h-16 text-pink-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Dual Rewards System</h3>
              <p className="text-gray-300">Every recognition splits rewards between the artist and the listener. Everyone wins.</p>
            </div>
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Start Earning Now
            </Button>
            <Button variant="outline" className="border-2 border-white/40 text-white hover:bg-white/10 px-12 py-6 text-xl font-bold rounded-2xl transition-all duration-300 backdrop-blur-sm">
              How It Works
            </Button>
          </div>
          
          <div className="mt-12 text-gray-400">
            <p className="text-lg">Join thousands already earning. No streaming required.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
