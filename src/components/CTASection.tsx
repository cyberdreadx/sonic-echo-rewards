
import React from 'react';
import { Button } from '@/components/ui/button';
import { Music, Coins, ArrowUp } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Music className="w-12 h-12 text-yellow-400" />
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Join the <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">$DISCO</span> Revolution
            </h2>
            <Coins className="w-12 h-12 text-yellow-400" />
          </div>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed">
            Be part of the future where music discovery creates value for everyone. 
            <br className="hidden md:block" />
            Artists, listeners, and the entire music ecosystem benefits.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">For Artists</h3>
              <ul className="text-gray-200 space-y-2 text-left">
                <li>• Mint exclusive tracks as NFTs</li>
                <li>• Earn $DISCO from every recognition</li>
                <li>• Track real-world engagement</li>
                <li>• Build verified music catalog</li>
              </ul>
              <Button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                Start Creating
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">For Music Lovers</h3>
              <ul className="text-gray-200 space-y-2 text-left">
                <li>• Discover new exclusive tracks</li>
                <li>• Earn rewards for recognition</li>
                <li>• Support your favorite artists</li>
                <li>• Build music discovery reputation</li>
              </ul>
              <Button variant="outline" className="w-full mt-6 border-2 border-white/30 text-white hover:bg-white/10 py-3 rounded-xl transition-all duration-300">
                Start Exploring
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-8 border border-yellow-500/30 mb-10">
            <h3 className="text-2xl font-bold text-white mb-4">Early Access Benefits</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-yellow-400">
                <ArrowUp className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">Higher Rewards</div>
                <div className="text-gray-300">Early adopters earn more $DISCO</div>
              </div>
              <div className="text-yellow-400">
                <Music className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">Exclusive Content</div>
                <div className="text-gray-300">Access to limited NFT drops</div>
              </div>
              <div className="text-yellow-400">
                <Coins className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">Founder Status</div>
                <div className="text-gray-300">Special recognition & benefits</div>
              </div>
            </div>
          </div>

          <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-12 py-4 text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl">
            Launch App (Coming Soon)
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
