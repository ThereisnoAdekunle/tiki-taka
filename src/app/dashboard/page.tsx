'use client';

import Link from "next/link";
import { useState } from "react";
import PredictionModal from "../../components/PredictionModal";

export default function Dashboard() {
  const [selectedMarket, setSelectedMarket] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const markets = [
    {
      title: "Pep's Touchline Meltdown",
      description: "Will Pep Guardiola have a touchline meltdown this season?",
      options: [
        { label: "Yes - Epic meltdown", percentage: 65 },
        { label: "No - He's chilled", percentage: 35 }
      ],
      pool: "$125K",
      endsIn: "30 days"
    },
    {
      title: "VAR Controversy of the Week",
      description: "Which team will be robbed by VAR this weekend?",
      options: [
        { label: "Arsenal (always)", percentage: 45 },
        { label: "Liverpool (standard)", percentage: 40 },
        { label: "Someone else", percentage: 15 }
      ],
      pool: "$89K",
      endsIn: "7 days"
    },
    {
      title: "Transfer Window Drama",
      description: "Biggest transfer window drama this summer",
      options: [
        { label: "Mbappé saga continues", percentage: 55 },
        { label: "Haaland to Real Madrid", percentage: 35 },
        { label: "Something else crazy", percentage: 10 }
      ],
      pool: "$210K",
      endsIn: "90 days"
    }
  ];

  const handlePredictionClick = (market: any) => {
    setSelectedMarket(market);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-blue-900">
      <div className="relative z-10 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-green-300 hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-white">Tiki Taka Dashboard</h1>
            <p className="text-green-100">Welcome back, Predictor!</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white">1,250</div>
            <div className="text-green-100 text-sm">TIKI Balance</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white">$62.50</div>
            <div className="text-green-100 text-sm">Portfolio Value</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white">78%</div>
            <div className="text-green-100 text-sm">Accuracy Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white">24</div>
            <div className="text-green-100 text-sm">Active Predictions</div>
          </div>
        </div>

        {/* Active Prediction Markets */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Active Prediction Markets</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {/* Market 1 */}
             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
               <div className="flex justify-between items-start mb-4">
                 <h3 className="text-lg font-bold text-white">Pep's Touchline Meltdown</h3>
                 <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs">Live</span>
               </div>
               <p className="text-green-100 text-sm mb-4">Will Pep Guardiola have a touchline meltdown this season?</p>
               <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Yes - Epic meltdown</span>
                    <span className="text-white font-bold">65%</span>
                  </div>
                 <div className="flex justify-between items-center">
                   <span className="text-green-100">No - He's chilled</span>
                   <span className="text-white font-bold">35%</span>
                 </div>
               </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex justify-between text-sm text-green-100">
                  <span>Ends: 30 days</span>
                  <span>Pool: $125K</span>
                </div>
              </div>
              <button 
                onClick={() => handlePredictionClick(markets[0])}
                className="w-full mt-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
              >
                Place Prediction
              </button>
            </div>

                         {/* Market 2 */}
             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
               <div className="flex justify-between items-start mb-4">
                 <h3 className="text-lg font-bold text-white">VAR Controversy of the Week</h3>
                 <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs">Live</span>
               </div>
               <p className="text-green-100 text-sm mb-4">Which team will be robbed by VAR this weekend?</p>
               <div className="space-y-3">
                 <div className="flex justify-between items-center">
                   <span className="text-green-100">Arsenal (always)</span>
                   <span className="text-white font-bold">45%</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-green-100">Liverpool (standard)</span>
                   <span className="text-white font-bold">40%</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-green-100">Someone else</span>
                   <span className="text-white font-bold">15%</span>
                 </div>
               </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex justify-between text-sm text-green-100">
                  <span>Ends: 45 days</span>
                  <span>Pool: $89K</span>
                </div>
              </div>
              <button 
                onClick={() => handlePredictionClick(markets[1])}
                className="w-full mt-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
              >
                Place Prediction
              </button>
            </div>

                         {/* Market 3 */}
             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
               <div className="flex justify-between items-start mb-4">
                 <h3 className="text-lg font-bold text-white">Transfer Window Drama</h3>
                 <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs">Live</span>
               </div>
               <p className="text-green-100 text-sm mb-4">Biggest transfer window drama this summer</p>
               <div className="space-y-3">
                 <div className="flex justify-between items-center">
                   <span className="text-green-100">Mbappé saga continues</span>
                   <span className="text-white font-bold">55%</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-green-100">Haaland to Real Madrid</span>
                   <span className="text-white font-bold">35%</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-green-100">Something else crazy</span>
                   <span className="text-white font-bold">10%</span>
                 </div>
               </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex justify-between text-sm text-green-100">
                  <span>Ends: 90 days</span>
                  <span>Pool: $210K</span>
                </div>
              </div>
              <button 
                onClick={() => handlePredictionClick(markets[2])}
                className="w-full mt-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
              >
                Place Prediction
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Recent Predictions</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="space-y-4">
                                 <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                   <div>
                     <div className="text-white font-semibold">Klopp's Touchline Rant</div>
                     <div className="text-green-100 text-sm">Predicted: Epic meltdown</div>
                   </div>
                   <div className="text-right">
                     <div className="text-green-300 font-bold">+150 TIKI</div>
                     <div className="text-green-100 text-sm">Won</div>
                   </div>
                 </div>
                                 <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                   <div>
                     <div className="text-white font-semibold">VAR Robs Arsenal Again</div>
                     <div className="text-green-100 text-sm">Predicted: Classic Arsenal moment</div>
                   </div>
                   <div className="text-right">
                     <div className="text-yellow-300 font-bold">Pending</div>
                     <div className="text-green-100 text-sm">Live</div>
                   </div>
                 </div>
                                 <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                   <div>
                     <div className="text-white font-semibold">Mbappé Transfer Saga</div>
                     <div className="text-green-100 text-sm">Predicted: Another summer of drama</div>
                   </div>
                   <div className="text-right">
                     <div className="text-red-300 font-bold">-50 TIKI</div>
                     <div className="text-green-100 text-sm">Lost</div>
                   </div>
                 </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Leaderboard</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🥇</span>
                                         <div>
                       <div className="text-white font-semibold">BanterKing</div>
                       <div className="text-green-100 text-sm">85% accuracy</div>
                     </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">5,420 TIKI</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-500/20 to-gray-400/20 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🥈</span>
                                         <div>
                       <div className="text-white font-semibold">MemeLord</div>
                       <div className="text-green-100 text-sm">82% accuracy</div>
                     </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">4,890 TIKI</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🥉</span>
                                         <div>
                       <div className="text-white font-semibold">VARVictim</div>
                       <div className="text-green-100 text-sm">79% accuracy</div>
                     </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">4,210 TIKI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prediction Modal */}
      {selectedMarket && (
        <PredictionModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedMarket(null);
          }}
          market={selectedMarket}
        />
      )}
    </div>
  );
}
