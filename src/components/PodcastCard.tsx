import { useState } from 'react';
import { Play, User, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Outlet } from 'react-router-dom';

export interface PodcastEpisode {
  id: string;
  title: string;
  audioUrl: string;
  imageUrl: string;
  duration: string;
  tokenPrice: number;
}

export interface Podcast {
  id: string;
  title: string;
  creator: string;
  imageUrl: string;
  episodes: PodcastEpisode[];
  tokenPrice: number; // BRD token price
  marketCap: number; // Market cap in BRD tokens
  roi: number; // ROI percentage (can be positive or negative)
  listeners: number;
  stakedAmount: number; // Total staked by users
}

interface PodcastCardProps {
  podcast: Podcast;
  layout: 'grid' | 'list';
  onPlay: (podcast: Podcast, episodeIndex?: number) => void;
}

const PodcastCard = ({ podcast, layout, onPlay }: PodcastCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const priceChangeClass = podcast.roi >= 0 ? 'text-positive' : 'text-negative';
  const TrendIcon = podcast.roi >= 0 ? TrendingUp : TrendingDown;

  if (layout === 'list') {
    return (
      <div 
        className="podcast-card flex items-center w-full mb-3 animate-slide-up"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative mr-4 min-w-[80px] h-20">
          <img 
            src={podcast.imageUrl} 
            alt={podcast.title} 
            className="w-20 h-20 object-cover rounded-md"
          />
          {isHovered && (
            <Button 
              size="icon" 
              variant="secondary" 
              className="absolute inset-0 m-auto bg-black/50 hover:bg-black/70"
              onClick={() => onPlay(podcast)}
            >
              <Play className="h-6 w-6" />
            </Button>
          )}
        </div>
        
        <div className="flex-grow">
          <Link to={`/podcast/${podcast.id}`} className="hover:text-accent">
            <h3 className="font-bold text-lg truncate">{podcast.title}</h3>
          </Link>
          <div className="flex items-center text-xs text-muted-foreground">
            <User className="h-3 w-3 mr-1" />
            <span>{podcast.creator}</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm">
          <div>
            <div className="text-muted-foreground text-xs">Listeners</div>
            <div>{podcast.listeners.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs">Episodes</div>
            <div>{podcast.episodes.length}</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs">Price</div>
            <div>{podcast.tokenPrice.toFixed(3)} BRD</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs">ROI</div>
            <div className="flex items-center gap-1">
              <TrendIcon className={cn("h-3 w-3", priceChangeClass)} />
              <span className={priceChangeClass}>{Math.abs(podcast.roi).toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout
  return (
    <div 
      className="podcast-card h-full flex flex-col animate-slide-up"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-3">
        <img 
          src={podcast.imageUrl} 
          alt={podcast.title} 
          className="w-full aspect-square object-cover rounded-md"
        />
        {isHovered && (
          <Button 
            size="icon" 
            variant="secondary" 
            className="absolute inset-0 m-auto bg-black/50 hover:bg-black/70"
            onClick={() => onPlay(podcast)}
          >
            <Play className="h-8 w-8" />
          </Button>
        )}
      </div>
      
      <Link to={`/podcast/${podcast.id}`} className="hover:text-accent">
        <h3 className="font-bold truncate">{podcast.title}</h3>
      </Link>
      
      <div className="flex items-center text-xs text-muted-foreground mb-2">
        <User className="h-3 w-3 mr-1" />
        <span className="truncate">{podcast.creator}</span>
      </div>
      
      <div className="mt-auto grid grid-cols-2 gap-2 text-sm">
        <div className="stat-card">
          <div className="text-muted-foreground text-xs">Price</div>
          <div>{podcast.tokenPrice.toFixed(3)} BRD</div>
        </div>
        <div className="stat-card">
          <div className="text-muted-foreground text-xs">ROI</div>
          <div className="flex items-center gap-1">
            <TrendIcon className={cn("h-3 w-3", priceChangeClass)} />
            <span className={priceChangeClass}>{Math.abs(podcast.roi).toFixed(2)}%</span>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default PodcastCard;
