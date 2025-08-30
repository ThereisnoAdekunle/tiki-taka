'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Waitlist submission error:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-blue-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-8">
              <span className="text-3xl font-bold text-white">⚽</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Tiki Taka
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-4xl mx-auto">
              The world's first{" "}
              <span className="font-semibold text-yellow-300">BanterFi platform</span> where{" "}
              <span className="font-semibold text-yellow-300">football banter meets prediction markets</span> and{" "}
              <span className="font-semibold text-yellow-300">every joke could earn you crypto</span>
            </p>
          </div>

          {/* Waitlist Section */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">🚀 Join the BanterFi Revolution</h2>
                <p className="text-green-100 text-lg">
                  Be among the first to turn your football banter into crypto rewards
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-green-100 text-sm mb-2">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-green-300 focus:outline-none focus:border-green-400 text-lg"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading || !email}
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Joining...' : 'Join BanterFi'}
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-white mb-4">You're in the banter!</h3>
                  <p className="text-green-100 mb-6">
                    We'll notify you as soon as Tiki Taka launches. Get ready to banter your way to crypto rewards!
                  </p>
                  <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4">
                    <p className="text-green-200 text-sm">
                      💡 Early access users will receive exclusive TIKI tokens and premium banter features
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features Preview */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              What's BanterFi?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-bold text-white mb-3">Social Banter Markets</h3>
                <p className="text-green-100">
                  Predict on real football events: transfer rumors, player drama, manager meltdowns, and more.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">Banter2Earn</h3>
                <p className="text-green-100">
                  Earn tokens for witty predictions, quality banter, and being the funniest football oracle.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-xl font-bold text-white mb-3">Viral Moments</h3>
                <p className="text-green-100">
                  Predict on football's most chaotic moments: VAR controversies, touchline bust-ups, and more.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="text-center mb-16">
            <div className="flex justify-center space-x-8 text-green-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">3,247</div>
                <div className="text-sm">BanterFi Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">Q2 2024</div>
                <div className="text-sm">Launch Date</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm">Banter Powered</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/roadmap" className="bg-transparent border-2 border-white/30 hover:border-white/50 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:bg-white/10">
                📊 View Roadmap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-green-100">
          <p className="text-sm">
            © 2024 Tiki Taka. BanterFi - Where football banter meets crypto rewards! ⚽💬💎
          </p>
        </div>
      </footer>
    </div>
  );
}
