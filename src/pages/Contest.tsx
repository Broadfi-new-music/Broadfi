import React from 'react';
import { useNavigate } from "react-router-dom";
import NavigationBar from '@/components/NavigationBar';
import ContestCard from "@/components/ContestCard";
import { Button } from "@/components/ui/button";
import { Music, Trophy, ArrowRight } from "lucide-react";

// Mock data for featured contests
const featuredContests = [
  {
    id: "1",
    title: "Electronic Summer Remix",
    category: "Electronic",
    prize: 5000,
    deadline: "Apr 30, 2025",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1470&auto=format&fit=crop",
    participants: 127,
  },
  {
    id: "2",
    title: "Hip Hop Beats Challenge",
    category: "Hip Hop",
    prize: 3500,
    deadline: "May 15, 2025",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1470&auto=format&fit=crop",
    participants: 89,
  },
  {
    id: "3",
    title: "Pop Vocal Remix",
    category: "Pop",
    prize: 4200,
    deadline: "Apr 22, 2025",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1470&auto=format&fit=crop",
    participants: 154,
  },
  {
    id: "4",
    title: "Lofi Chill Contest",
    category: "Lofi",
    prize: 2800,
    deadline: "May 5, 2025",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1470&auto=format&fit=crop",
    participants: 73,
  },
];

// Mock data for categories
const categories = [
  "Electronic", "Hip Hop", "Pop", "Rock", "Lofi", "Jazz", "Classical", "Country"
];
const Contest = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-stream-dark">
      <NavigationBar />
      <div className="pt-0">
        {/* Hero Section */}
        <div className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1474&auto=format&fit=crop')",
            }}
          ></div>
          
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-20">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 text-gradient">
              Remix, Vote, Earn
            </h1>
            <p className="text-lg md:text-xl text-center text-white/80 max-w-2xl mb-8">
              Join the Web3 music revolution. Create remixes, vote with BRD tokens, and earn rewards in the first decentralized music competition platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/80"
              >
                <Music className="mr-2 h-5 w-5" />
                <a href="#feature">Explore Contests</a>
              </Button>
              <Button
                onClick={() => navigate("/wallet")}
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Trophy className="mr-2 h-5 w-5" />
                Get BRD Tokens
              </Button>
              <Button
                onClick={() => navigate("/create-contest")}
                variant="outline"
                size="lg"
                className="border-white/20 bg-secondary text-white hover:bg-white/10"
              >
                <Trophy className="mr-2 h-5 w-5" />
                  Create Contest
              </Button>
            </div>
          </div>
        </div>
        
        {/* Featured Contests */}
        <div id='feature' className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Contests</h2>
            <Button
              onClick={() => navigate("/contest")}
              variant="ghost"
              className="text-primary hover:text-primary/80"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredContests.map((contest) => (
              <ContestCard
                key={contest.id}
                id={contest.id}
                title={contest.title}
                category={contest.category}
                prize={contest.prize}
                deadline={contest.deadline}
                image={contest.image}
                participants={contest.participants}
              />
            ))}
          </div>
        </div>
        
        {/* Categories */}
        <div className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Browse Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="border-white/20 hover:border-primary hover:bg-primary/10"
                onClick={() => navigate(`/contests?category=${category}`)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* How it Works */}
        <div className="bg-black/40 backdrop-blur-md py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Remixes</h3>
                <p className="text-white/70">
                  Download theme music, create your unique remix, and upload it to the contest.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Vote with Tokens</h3>
                <p className="text-white/70">
                  Use BRD tokens to vote for your favorite remixes and help them climb the leaderboard.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
                <p className="text-white/70">
                  Win prizes for top remixes. Voters earn returns when backing successful tracks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-black/80 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-stream-primary font-bold text-[30px] sm:text-[20px] md:text-[25px] lg:text-[30px]">BROADFI</span>
            </div>
            <div className="flex space-x-4 text-white/60">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-6 text-center text-white/40 text-sm">
            &copy; 2025 RemixToken. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contest;
