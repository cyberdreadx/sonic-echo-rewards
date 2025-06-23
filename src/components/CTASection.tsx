
import React from 'react';
import { Button } from '@/components/ui/button';
import { Music, Coins, ArrowRight, Clock, Users, DollarSign } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-purple-950 via-black to-pink-950 relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-80 h-80 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
              Don't Miss The 
              <br />
              <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">Music Revolution</span>
            </h2>
            <p className="text-2xl text-gray-200 leading-relaxed">
              Early adopters are already earning hundreds in $DISCO tokens.
              <br />
              The question isn't if you'll join, but when.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30">
              <DollarSign className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <div className="text-4xl font-black text-white mb-2">$50,000+</div>
              <div className="text-gray-300">Already paid to early users</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30">
              <Users className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <div className="text-4xl font-black text-white mb-2">2,500+</div>
              <div className="text-gray-300">Active music discoverers</div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30">
              <Music className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <div className="text-4xl font-black text-white mb-2">500+</div>
              <div className="text-gray-300">Exclusive NFT tracks minted</div>
            </div>
          </div>

          {/* Two-sided value prop */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-purple-900/70 to-purple-800/70 backdrop-blur-sm rounded-3xl p-10 border border-purple-500/40 text-left">
              <Music className="w-16 h-16 text-purple-400 mb-6" />
              <h3 className="text-3xl font-bold text-white mb-6">For Artists</h3>
              <ul className="text-gray-200 space-y-4 text-lg mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Mint unreleased tracks as exclusive NFTs
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Earn $DISCO every time someone discovers your music
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Track real-world engagement with GPS data
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Build a verified catalog of original music
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-105">
                Start Minting Tracks
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="bg-gradient-to-br from-blue-900/70 to-blue-800/70 backdrop-blur-sm rounded-3xl p-10 border border-blue-500/40 text-left">
              <Coins className="w-16 h-16 text-yellow-400 mb-6" />
              <h3 className="text-3xl font-bold text-white mb-6">For Music Lovers</h3>
              <ul className="text-gray-200 space-y-4 text-lg mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Discover exclusive tracks before anyone else
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Earn $DISCO tokens for every track you identify
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Support artists directly with every recognition
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Build your reputation as a music discoverer
                </li>
              </ul>
              <Button variant="outline" className="w-full border-2 border-yellow-400/60 text-yellow-400 hover:bg-yellow-400/10 py-4 text-lg font-bold rounded-2xl transition-all duration-300 backdrop-blur-sm">
                Start Discovering
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Urgency */}
          <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-3xl p-10 border border-red-500/40 mb-12">
            <Clock className="w-16 h-16 text-red-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">Limited Time: Early Adopter Rewards</h3>
            <p className="text-xl text-gray-200 mb-6">
              First 10,000 users get 5x reward multiplier for their first month
            </p>
            <div className="text-red-400 text-lg font-semibold">
              Only 2,847 spots remaining
            </div>
          </div>

          <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-black px-16 py-6 text-2xl rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-2xl">
            Join The Revolution Now
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
          
          <p className="text-gray-400 mt-6 text-lg">
            No credit card required • Start earning in 60 seconds
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
