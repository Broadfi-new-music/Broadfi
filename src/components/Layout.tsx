import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Headphones, Plus, ListMusic, LayoutGrid, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AudioPlayer from './AudioPodcast';
import { Podcast } from './PodcastCard';

const Layout = () => {
  const location = useLocation();
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | undefined>(undefined);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handlePlay = (podcast: Podcast, episodeIndex = 0) => {
    setCurrentPodcast(podcast);
    setCurrentEpisodeIndex(episodeIndex);
  };

  const handleEpisodeEnd = () => {
    if (!currentPodcast) return;
    
    // Auto-play next episode
    if (currentEpisodeIndex < currentPodcast.episodes.length - 1) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Headphones className="h-6 w-6 text-brd" />
            <span className="font-bold text-xl">TokenCast</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Discover
            </Link>
            <Link 
              to="/upload"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/upload" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Upload
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link to="/upload">
                <Plus className="h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container px-4 py-6 pb-32">
        {location.pathname === "/" && (
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Discover Podcasts</h1>
            
            <div className="flex items-center gap-4">
              <Tabs 
                value={viewMode} 
                onValueChange={(v) => setViewMode(v as 'grid' | 'list')} 
                className="hidden sm:block"
              >
                <TabsList>
                  <TabsTrigger value="grid">
                    <LayoutGrid className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <ListMusic className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        )}
        
        <Outlet context={{ viewMode, onPlay: handlePlay }} />
      </main>
      
      <div className={cn("h-24", currentPodcast ? "" : "hidden")}>
        {/* Spacer for the audio player */}
      </div>
      
      {currentPodcast && (
        <AudioPlayer 
          podcast={currentPodcast} 
          episodeIndex={currentEpisodeIndex} 
          onEpisodeEnd={handleEpisodeEnd}
          onEpisodeChange={setCurrentEpisodeIndex}
        />
      )}
      
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-30">
        <div className="flex items-center justify-around h-16">
          <Link 
            to="/"
            className={cn(
              "flex flex-col items-center gap-1 py-2",
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Headphones className="h-5 w-5" />
            <span className="text-xs">Discover</span>
          </Link>
          <Link 
            to="/upload"
            className={cn(
              "flex flex-col items-center gap-1 py-2",
              location.pathname === "/upload" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs">Upload</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
