import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, Upload } from 'lucide-react';

const TokenomicsSection = () => {
  const allocations = [
    { category: "Rewards Pool", percentage: 60, color: "bg-gradient-to-r from-yellow-500 to-amber-500" },
    { category: "Liquidity & Exchanges", percentage: 10, color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
    { category: "Treasury", percentage: 10, color: "bg-gradient-to-r from-purple-500 to-violet-500" },
    { category: "Team & Founders", percentage: 7.5, color: "bg-gradient-to-r from-green-500 to-emerald-500" },
    { category: "Ecosystem & Growth", percentage: 7.5, color: "bg-gradient-to-r from-orange-500 to-red-500" },
    { category: "Advisors & Partners", percentage: 5, color: "bg-gradient-to-r from-pink-500 to-rose-500" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Coins className="w-12 h-12 text-yellow-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <span className="text-yellow-400">$DISCO</span> Tokenomics
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A sustainable token model that rewards both artists and listeners while maintaining platform growth and liquidity.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Token Allocation Chart */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Token Allocation</h3>
            <div className="space-y-4">
              {allocations.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <span className="text-white font-medium">{item.category}</span>
                  </div>
                  <span className="text-yellow-400 font-bold">{item.percentage}%</span>
                </div>
              ))}
            </div>
            
            {/* Visual representation */}
            <div className="mt-8 h-4 bg-gray-800 rounded-full overflow-hidden flex">
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

          {/* Minting & Rewards Model */}
          <div className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  Minting Fee Model
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-red-500/20 rounded-xl border border-red-500/30">
                  <span className="text-white">50% Burned</span>
                  <span className="text-red-400 font-bold">Deflation</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                  <span className="text-white">50% to Rewards Pool</span>
                  <span className="text-green-400 font-bold">Sustainability</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center">
                    <Coins className="w-5 h-5 text-white" />
                  </div>
                  Reward Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-xl p-6 border border-yellow-500/30">
                  <h4 className="text-lg font-bold text-white mb-3">Linear Decay Model</h4>
                  <p className="text-gray-300 mb-4">Each recognition distributes a fixed percentage of the remaining rewards pool</p>
                  <div className="text-yellow-400 font-semibold">Earlier matches = Higher rewards</div>
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
