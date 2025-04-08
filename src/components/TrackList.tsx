import { Track } from "@/types";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { formatDuration } from "@/lib/utils";
import { Play, TrendingUp, Users } from "lucide-react";

interface TrackListProps {
  tracks: Track[];
  showCreator?: boolean;
}

const TrackList = ({ tracks, showCreator = true }: TrackListProps) => {
  const { currentTrack, setCurrentTrack, togglePlayPause } = useApp();

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      togglePlayPause();
    } else {
      setCurrentTrack(track);
    }
  };

  return (
    <div className="space-y-1">
      {tracks.map((track) => (
        <div 
          key={track.id}
          className={`flex items-center p-3 rounded-lg hover:bg-secondary/50 transition-colors ${
            currentTrack?.id === track.id ? "bg-secondary" : ""
          }`}
        >
          <div className="flex-shrink-0 w-12 h-12 mr-3 relative group">
            <img 
              src={track.imageUrl} 
              alt={track.title}
              className="object-cover w-full h-full rounded-md"
            />
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handlePlayTrack(track)}
            >
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                <Play className="h-5 w-5 fill-current" />
              </Button>
            </div>
          </div>
          
          <div className="flex-grow min-w-0 mr-2">
            <h4 className="font-medium truncate">{track.title}</h4>
            {showCreator && (
              <p className="text-sm text-muted-foreground truncate">
                {track.creator}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <div className="flex items-center text-sm">
                <TrendingUp className="h-3.5 w-3.5 mr-1 text-green-500" />
                <span className="text-green-500">{track.roi}%</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {track.tokenPrice.toFixed(3)} BRD
              </div>
            </div>
            
            <div className="hidden md:flex items-center text-sm text-muted-foreground">
              <Users className="h-3.5 w-3.5 mr-1" />
              <span>
                {track.listeners >= 1000 ? `${(track.listeners / 1000).toFixed(1)}K` : track.listeners}
              </span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {formatDuration(track.duration)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
