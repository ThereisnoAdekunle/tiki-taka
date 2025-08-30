import Link from "next/link";

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-blue-900">
      <div className="relative z-10 container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Link href="/" className="inline-flex items-center text-green-300 hover:text-white mb-8 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Roadmap
            </span>
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Our journey to revolutionize football banter with BanterFi - where every joke could earn you crypto
          </p>
        </div>

        {/* Development Phases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Development Phases</h2>
          <div className="space-y-8">
            {/* Phase 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Phase 1: Foundation (Q1 2024)</h3>
                  <p className="text-green-300">Completed</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">✅ Completed</h4>
                                            <ul className="text-green-100 space-y-2">
                            <li>• BanterFi platform design</li>
                            <li>• Social prediction markets</li>
                            <li>• Community banter features</li>
                            <li>• Meme integration</li>
                          </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">🎯 Current Focus</h4>
                                            <ul className="text-green-100 space-y-2">
                            <li>• Beta testing launch</li>
                            <li>• TIKI token distribution</li>
                            <li>• Football meme partnerships</li>
                            <li>• Social features testing</li>
                          </ul>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Phase 2: TIKI Pre-TGE (Q2 2024)</h3>
                  <p className="text-blue-300">In Progress</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">🚀 Launch Features</h4>
                                            <ul className="text-green-100 space-y-2">
                            <li>• TIKI token launch</li>
                            <li>• Advanced banter markets</li>
                            <li>• Social media integration</li>
                            <li>• Mobile app beta</li>
                          </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">📈 Growth Targets</h4>
                                            <ul className="text-green-100 space-y-2">
                            <li>• 50K+ active users</li>
                            <li>• $1M+ TVL</li>
                            <li>• 100K+ banter predictions</li>
                            <li>• 10+ football meme partnerships</li>
                          </ul>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Phase 3: TAKA Mainnet (Q3 2024)</h3>
                  <p className="text-purple-300">Planned</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">🎯 Mainnet Launch</h4>
                  <ul className="text-green-100 space-y-2">
                    <li>• TAKA token launch</li>
                    <li>• 1:1 TIKI → TAKA conversion</li>
                    <li>• Full governance activation</li>
                    <li>• Staking & yield farming</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">🌍 Expansion</h4>
                                            <ul className="text-green-100 space-y-2">
                            <li>• Multi-sport expansion</li>
                            <li>• Influencer partnerships</li>
                            <li>• Advanced banter features</li>
                            <li>• Global meme market access</li>
                          </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tokenomics Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Tokenomics</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-8 border border-yellow-300/30">
              <h3 className="text-2xl font-bold text-white mb-4">🎯 TIKI (Pre-TGE)</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Token Details</h4>
                  <ul className="text-green-100 space-y-2">
                    <li>• Total Supply: 100,000,000 TIKI</li>
                    <li>• Current Price: $0.05</li>
                    <li>• Network: Polygon</li>
                    <li>• Conversion Rate: 1:1 to TAKA</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Use Cases</h4>
                  <ul className="text-green-100 space-y-2">
                    <li>• Earn through predictions</li>
                    <li>• Community governance</li>
                    <li>• Early access to features</li>
                    <li>• Staking rewards</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-8 border border-green-300/30">
              <h3 className="text-2xl font-bold text-white mb-4">🚀 TAKA (Mainnet)</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Token Details</h4>
                  <ul className="text-green-100 space-y-2">
                    <li>• Total Supply: 100,000,000 TAKA</li>
                    <li>• Initial Price: $0.10</li>
                    <li>• Network: Ethereum L2</li>
                    <li>• Governance: Full DAO</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Use Cases</h4>
                  <ul className="text-green-100 space-y-2">
                    <li>• Platform governance</li>
                    <li>• Revenue sharing</li>
                    <li>• RWA investment access</li>
                    <li>• Premium features</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            href="/" 
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
          >
            🚀 Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
