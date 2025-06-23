
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TechStackSection = () => {
  const techCategories = [
    {
      category: "Blockchain & NFTs",
      technologies: ["Solana", "Metaplex", "Phantom Wallet", "WalletConnect"],
      color: "from-purple-500 to-violet-500"
    },
    {
      category: "Audio Technology",
      technologies: ["Panako CLI", "AcoustID API", "MusicBrainz", "Audio Fingerprinting"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      category: "Backend & APIs",
      technologies: ["Node.js", "Express", "MongoDB", "Google Places API"],
      color: "from-green-500 to-emerald-500"
    },
    {
      category: "Storage & Distribution",
      technologies: ["IPFS", "Helia", "Web3.Storage", "Decentralized Storage"],
      color: "from-orange-500 to-red-500"
    },
    {
      category: "Frontend",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Built with <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Cutting-Edge</span> Technology
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Disconium leverages the latest in blockchain, audio processing, and web technologies to deliver a seamless music discovery experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-8 h-8 bg-white rounded-lg opacity-90"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="secondary" 
                      className="bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors duration-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Flow Overview */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">System Flow</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Upload & Verify", desc: "Artist uploads track, system checks AcoustID for prior distribution" },
              { step: "2", title: "Fingerprint & Mint", desc: "Panako creates fingerprint, stored on IPFS, NFT minted on Solana" },
              { step: "3", title: "Recognition", desc: "Users identify tracks using mobile app or web interface" },
              { step: "4", title: "Reward", desc: "$DISCO tokens distributed to both artist and user, geolocation logged" }
            ].map((flow, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                  {flow.step}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{flow.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{flow.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
