'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface WaitlistEntry {
  id: string;
  email: string;
  timestamp: string;
}

export default function AdminPage() {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ count: 0 });

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const fetchWaitlist = async () => {
    try {
      // Fetch full waitlist data
      const response = await fetch('/api/waitlist?full=true');
      const data = await response.json();
      
      if (response.ok) {
        setStats({ count: data.count });
        setWaitlist(data.waitlist || []);
      } else {
        console.error('Error fetching waitlist:', data.error);
      }
    } catch (error) {
      console.error('Error fetching waitlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportWaitlist = () => {
    const csvContent = [
      'Email,Date Joined',
      ...waitlist.map(entry => `${entry.email},${new Date(entry.timestamp).toLocaleDateString()}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tiki-taka-waitlist.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-blue-900">
      <div className="relative z-10 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-green-300 hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-white">Tiki Taka Admin</h1>
            <p className="text-green-100">BanterFi Waitlist Management</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white">{stats.count}</div>
            <div className="text-green-100 text-sm">Total Waitlist</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white">{waitlist.length}</div>
            <div className="text-green-100 text-sm">Real Entries</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white">Q2 2024</div>
            <div className="text-green-100 text-sm">Launch Target</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-green-100 text-sm">Banter Powered</div>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-8">
          <div className="flex gap-4">
            <button
              onClick={exportWaitlist}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              📊 Export CSV
            </button>
            <button
              onClick={fetchWaitlist}
              className="bg-transparent border-2 border-white/30 hover:border-white/50 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-white/10"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Waitlist Table */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-6">Recent Waitlist Entries</h2>
          
          {waitlist.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📭</div>
              <p className="text-green-100 text-lg">No waitlist entries yet</p>
              <p className="text-green-200 text-sm mt-2">Share the platform to start collecting emails!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-green-100 font-semibold py-3 px-4">Email</th>
                    <th className="text-green-100 font-semibold py-3 px-4">Date Joined</th>
                    <th className="text-green-100 font-semibold py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {waitlist.map((entry) => (
                    <tr key={entry.id} className="border-b border-white/10">
                      <td className="text-white py-3 px-4">{entry.email}</td>
                      <td className="text-green-100 py-3 px-4">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-green-300 hover:text-white text-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Development Notes */}
        <div className="mt-8 bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">🚧 Development Notes</h3>
          <ul className="text-green-100 space-y-2">
            <li>• This admin panel now shows real waitlist data</li>
            <li>• In production, implement proper authentication and authorization</li>
            <li>• Connect to a real database (PostgreSQL, MongoDB)</li>
            <li>• Add email marketing integration (Mailchimp, ConvertKit)</li>
            <li>• Implement analytics and reporting features</li>
            <li>• Add user management and role-based access control</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
