'use client';

import { useState } from 'react';

interface PredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  market: {
    title: string;
    description: string;
    options: Array<{
      label: string;
      percentage: number;
    }>;
    pool: string;
    endsIn: string;
  };
}

export default function PredictionModal({ isOpen, onClose, market }: PredictionModalProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption || !amount) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-green-900 to-blue-900 rounded-2xl p-8 max-w-md w-full border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Place Prediction</h2>
          <button
            onClick={onClose}
            className="text-green-300 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">{market.title}</h3>
          <p className="text-green-100 text-sm mb-4">{market.description}</p>
          
          <div className="space-y-3 mb-6">
            {market.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(index)}
                className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                  selectedOption === index
                    ? 'border-green-400 bg-green-400/20'
                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-white">{option.label}</span>
                  <span className="text-green-300 font-bold">{option.percentage}%</span>
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-green-100 mb-6">
            <div>
              <span>Pool Size:</span>
              <div className="text-white font-bold">{market.pool}</div>
            </div>
            <div>
              <span>Ends In:</span>
              <div className="text-white font-bold">{market.endsIn}</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-100 text-sm mb-2">Amount (TIKI)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-green-300 focus:outline-none focus:border-green-400"
              min="1"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedOption || !amount || isSubmitting}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Place Prediction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
