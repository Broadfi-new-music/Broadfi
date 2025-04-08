import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Users } from "lucide-react";
import { LiveStream } from "@/types/battle";
import { cn } from "@/lib/utils";

interface LiveStreamCardProps {
  stream: LiveStream;
  onClick: (streamId: string) => void;
}

const LiveStreamCard: React.FC<LiveStreamCardProps> = ({ stream, onClick }) => {
  const isLive = stream.status === "live";
  const formattedViewers = stream.viewers > 1000 
    ? `${(stream.viewers / 1000).toFixed(1)}K` 
    : stream.viewers;
  
  // Format time for scheduled streams
  const timeDisplay = isLive 
    ? "LIVE NOW" 
    : formatDistanceToNow(new Date(stream.startTime), { addSuffix: true });

  return (
    <div 
      className="card-hover relative rounded-lg overflow-hidden bg-battle-card cursor-pointer"
      onClick={() => onClick(stream.id)}
    >
      {/* Thumbnail with gradient overlay */}
      <div className="aspect-video relative">
        <img 
          src={stream.thumbnail} 
          alt={stream.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        {/* Status badge */}
        <div className="absolute top-2 left-2">
          {isLive ? (
            <span className="live-badge flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-1 animate-blink"></span>
              LIVE
            </span>
          ) : (
            <span className="bg-battle-secondary text-white text-xs font-bold px-2 py-0.5 rounded-full">
              SCHEDULED
            </span>
          )}
        </div>
        
        {/* Viewers count */}
        <div className="absolute top-2 right-2">
          <span className="bg-black/60 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
            <Users className="w-3 h-3 mr-1" />
            {formattedViewers}
          </span>
        </div>
        
        {/* Creator avatars */}
        <div className="absolute bottom-2 left-2 flex items-center">
          <div className="flex -space-x-2">
            {stream.creators.map((creator) => (
              <div key={creator.id} className="ring-2 ring-battle-bg rounded-full">
                <img 
                  src={creator.avatar} 
                  alt={creator.name} 
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="ml-2">
            <span className="text-xs text-white">
              {stream.creators.map(c => c.username).join(" vs ")}
            </span>
          </div>
        </div>
        
        {/* Time display */}
        <div className="absolute bottom-2 right-2">
          <span className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            isLive ? "bg-battle-live text-white" : "bg-battle-secondary/80 text-white"
          )}>
            {timeDisplay}
          </span>
        </div>
      </div>
      
      {/* Stream info */}
      <div className="p-3">
        <h3 className="text-sm font-bold line-clamp-1">{stream.title}</h3>
        <p className="text-xs text-battle-text/70 mt-1">{stream.category}</p>
      </div>
    </div>
  );
};

export default LiveStreamCard;
