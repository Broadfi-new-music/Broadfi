import React from 'react';
import NavigationBar from '@/components/NavigationBar';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PodcastCard, { type Podcast } from '@/components/PodcastCard';
import { mockPodcasts } from '@/data/mockDataPodcast';
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";



const Podcast = () => {
  const { viewMode = 'grid', onPlay = () => {} } = useOutletContext<{
    viewMode: 'grid' | 'list';
    onPlay: (podcast: Podcast, episodeIndex?: number) => void;
  }>() || {};
  
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price' | 'roi'>('popular');
  
  useEffect(() => {
    // Simulate loading data
    setPodcasts(mockPodcasts);
  }, []);
  
  const filteredPodcasts = podcasts.filter(podcast => 
    podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    podcast.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const sortedPodcasts = [...filteredPodcasts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.listeners - a.listeners;
      case 'price':
        return b.tokenPrice - a.tokenPrice;
      case 'roi':
        return b.roi - a.roi;
      default:
        return 0;
    }
  });
  return (
    <div className="min-h-screen bg-stream-dark">
      <NavigationBar />
      <div>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 mt-[20px]">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search podcasts or creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
             <Link to="/uploads">
                <Button variant="outline" size="sm" className="hidden md:flex gap-1.5">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </Link>
            <button 
              className={`px-4 py-2 text-sm rounded-md ${sortBy === 'popular' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
              onClick={() => setSortBy('popular')}
            >
              Popular
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded-md ${sortBy === 'price' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
              onClick={() => setSortBy('price')}
            >
              Price
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded-md ${sortBy === 'roi' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
              onClick={() => setSortBy('roi')}
            >
              ROI
            </button>
          </div>
        </div>
        
        {sortedPodcasts.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">No podcasts found</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedPodcasts.map((podcast) => (
              <PodcastCard 
                key={podcast.id} 
                podcast={podcast} 
                layout="grid" 
                onPlay={onPlay}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedPodcasts.map((podcast) => (
              <PodcastCard 
                key={podcast.id} 
                podcast={podcast} 
                layout="list" 
                onPlay={onPlay}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Podcast;
