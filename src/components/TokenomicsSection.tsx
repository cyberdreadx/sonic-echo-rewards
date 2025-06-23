
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, Upload, TrendingUp, Shield } from 'lucide-react';

const TokenomicsSection = () => {
  const allocations = [
    { category: "Rewards Pool", percentage: 60, color: "bg-gradient-to-r from-green-500 to-emerald-500", description: "Directly to users & artists" },
    { category: "Liquidity & Exchanges", percentage: 10, color: "bg-gradient-to-r from-blue-500 to-cyan-500", description: "Trading & accessibility" },
    { category: "Treasury", percentage: 10, color: "bg-gradient-to-r from-purple-500 to-violet-500", description: "Platform development" },
    { category: "Team & Founders", percentage: 7.5, color: "bg-gradient-to-r from-orange-500 to-red-500", description: "Locked for 2 years" },
    { category: "Ecosystem Growth", percentage: 7.5, color: "bg-gradient-to-r from-pink-500 to-rose-500", description: "Partnerships & marketing" },
    { category: "Advisors & Partners", percentage: 5, color: "bg-gradient-to-r from-yellow-500 to-amber-500", description: "Strategic guidance" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-950 via-purple-950 to-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Coins className="w-16 h-16 text-yellow-400" />
            <h2 className="text-5xl md:text-6xl font-black text-white">
              <span className="text-yellow-400">$DISCO</span> Economics
            </h2>
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
            Designed for sustainability and fair rewards. 60% of all tokens go directly to users and artists.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Token Allocation Chart */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-700/50">
            <h3 className="text-3xl font-bold text-white mb-10 text-center">Token Distribution</h3>
            <div className="space-y-6">
              {allocations.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full ${item.color}`}></div>
                    <div>
                      <div className="text-white font-semibold text-lg">{item.category}</div>
                      <div className="text-gray-400 text-sm">{item.description}</div>
                    </div>
                  </div>
                  <span className="text-yellow-400 font-black text-xl">{item.percentage}%</span>
                </div>
              ))}
            </div>
            
            {/* Visual representation */}
            <div className="mt-10 h-6 bg-gray-800 rounded-full overflow-hidden flex">
              {allocations.map((item, index) => (
                <div
                  key={index}
                  className={`${item.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${item.percentage}%` }}
                  title={`${item.category}: ${item.percentage}%`}
                ></div>
              ))}
            </div>
          </div>

          {/* Economic Model */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-red-900/50 to-red-800/50 backdrop-blur-xl border border-red-500/30">
              <CardHeader>
                <CardTitle className="text-3xl text-white flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  Deflationary Minting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-red-500/20 rounded-2xl p-6 border border-red-500/30">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white text-lg font-semibold">50% Burned Forever</span>
                    <span className="text-red-400 font-black text-xl">🔥 DEFLATIONARY</span>
                  </div>
                  <p className="text-gray-300">Every minting fee permanently removes tokens from circulation, increasing scarcity.</p>
                </div>
                <div className="bg-green-500/20 rounded-2xl p-6 border border-green-500/30">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white text-lg font-semibold">50% to Rewards Pool</span>
                    <span className="text-green-400 font-black text-xl">♻️ SUSTAINABLE</span>
                  </div>
                  <p className="text-gray-300">Feeds back into the ecosystem to reward future discoverers.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 backdrop-blur-xl border border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-3xl text-white flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  Early Bird Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-8 border border-yellow-500/30">
                  <h4 className="text-2xl font-bold text-white mb-4">Linear Decay System</h4>
                  <p className="text-gray-300 mb-6 text-lg">Each track recognition distributes a fixed percentage of the remaining rewards pool.</p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-black text-yellow-400 mb-2">1st</div>
                      <div className="text-gray-300">Highest Rewards</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-orange-400 mb-2">100th</div>
                      <div className="text-gray-300">Still Profitable</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 backdrop-blur-xl border border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-3xl text-white flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  Anti-Gaming Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-purple-500/20 rounded-2xl p-6 border border-purple-500/30">
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      One reward per user per track maximum
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      GPS verification prevents location spoofing
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      Audio fingerprinting ensures authentic recognition
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;
