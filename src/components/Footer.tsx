
import React from 'react';
import { Music, Coins } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-6 md:mb-0">
            <Music className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">Disconium</span>
            <Coins className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">$DISCO</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 text-gray-400">
            <span>© 2024 Disconium. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>Built on Solana • Powered by Audio Fingerprinting • Secured by Blockchain</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
