import React from 'react';
import NavigationBar from '@/components/NavigationBar';
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import Header from "@/components/Header";
import PlaylistCard from "@/components/PlaylistCard";
import AudioPlayer from "@/components/AudioPlaylist";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, TrendingUp, Crown } from "lucide-react";
const Playlists = () => {
  const { playlists } = useApp();
  const [activeTab, setActiveTab] = useState("all");
  
  // Sort playlists by different criteria
  const trendingPlaylists = [...playlists].sort((a, b) => b.roi - a.roi);
  const popularPlaylists = [...playlists].sort((a, b) => b.listeners - a.listeners);
  
  return (
    <div className="min-h-screen bg-stream-dark">
      <NavigationBar />
      <Header />
      
      <main className="flex-1 container py-6">
        <section className="mb-8">
          <div className="rounded-2xl bg-gradient-to-r from-brand/20 via-brand/10 to-background p-6 sm:p-2 md:p-8 lg:p-8">
            <div className="max-w-xl space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">Discover, Stream & Invest in Music</h1>
              <p className="text-muted-for  eground text-lg">
                Listen to your favorite music while earning returns through BRD tokens. Stake on trending playlists and grow your portfolio.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-brand hover:bg-brand-dark">
                  <Music className="mr-2 h-4 w-4" />
                  Explore Playlists
                </Button>
                <Button variant="outline">
                  Learn about BRD
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Featured Playlists</h2>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="trending">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="popular">
                  <Crown className="mr-1 h-4 w-4" />
                  Popular
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {playlists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="trending" className="mt-0">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {trendingPlaylists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="mt-0">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {popularPlaylists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <AudioPlayer />
    </div>
  );
};

export default Playlists;
