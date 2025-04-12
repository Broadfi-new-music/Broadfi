import React, { useEffect, useState } from 'react';
import { Contest } from '@/types/contest';
import { fetchContests } from '@/data/contest';
import ContestCard from '@/components/ContestCard';
import Header from '@/components/Header';
import { Music, Music2 } from 'lucide-react';

const Contest = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContests()
      .then(data => {
        setContests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch contests:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-purple to-purple-600 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                  Remix, Vote, Earn Rewards
                </h1>
                <p className="text-xl mb-6">
                  Join the next generation of music contests powered by BRD tokens. 
                  Create remixes, vote for your favorites, and earn rewards in the process.
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="#contests" 
                    className="px-6 py-3 bg-black text-brand-purple font-medium rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Browse Contests
                  </a>
                  <a 
                    href="#" 
                    className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Learn More
                  </a>
                  <a 
                    href="/create-contest" 
                    className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Create Contest
                  </a>
                </div>
              </div>
              
              <div className="md:w-1/3">
                <div className="relative">
                  <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl animate-pulse-light"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                    <div className="flex items-center mb-4">
                      <Music className="h-8 w-8 mr-3" />
                      <h3 className="text-xl font-bold">Featured Contest</h3>
                    </div>
                    <p className="font-semibold text-2xl mb-2">Summer Vibes Challenge</p>
                    <p className="text-sm opacity-90 mb-4">Create a remix that captures the essence of summer</p>
                    <div className="flex justify-between text-sm">
                      <span>Prize Pool: 10,000 BRD</span>
                      <span>Ends in 32 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contest Listings */}
        <section id="contests" className="py-12 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Active Contests</h2>
          <p className="text-gray-600 mb-8">Choose a contest to participate in or vote on remixes</p>
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="w-12 h-12 border-4 border-brand-purple-light border-t-brand-purple rounded-full animate-spin"></div>
            </div>
          ) : contests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contests.map(contest => (
                <ContestCard key={contest.id} contest={contest} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-700">No active contests found</h3>
              <p className="text-gray-500 mt-2">Check back soon for new contest opportunities!</p>
            </div>
          )}
        </section>
        
        {/* How it Works */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-center">How It Works</h2>
            <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
              Our platform combines music creation with token-based voting for a new kind of remix competition
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-brand-purple-light text-brand-purple rounded-full flex items-center justify-center mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Create</h3>
                <p className="text-gray-600">
                  Download the theme track from any contest and create your remix. Upload your finished track to participate.
                </p>
              </div>
              
              <div className="p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-brand-purple-light text-brand-purple rounded-full flex items-center justify-center mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Vote</h3>
                <p className="text-gray-600">
                  Use BRD tokens to vote for your favorite remixes. The more votes a remix gets, the higher its token value rises.
                </p>
              </div>
              
              <div className="p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-brand-purple-light text-brand-purple rounded-full flex items-center justify-center mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Earn</h3>
                <p className="text-gray-600">
                  Winners receive BRD token rewards. Voters can withdraw their tokens or keep them in highly-ranked remixes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <Music2 className="h-6 w-6 text-brand-purple" />
              <span className="ml-2 text-lg font-bold">BRD Remix</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">The future of music remix contests</p>
          </div>
          
          <div className="flex space-x-8 text-sm">
            <a href="#" className="text-gray-300 hover:text-white">Terms & Conditions</a>
            <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white">Contact Us</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-gray-800 text-center text-gray-400 text-xs">
          © 2025 BRD Remix Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Contest;
