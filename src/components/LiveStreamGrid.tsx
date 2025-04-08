import React from "react";
import LiveStreamCard from "./LiveStreamCard";
import { LiveStream } from "@/types/battle";

interface LiveStreamGridProps {
  streams: LiveStream[];
  onStreamClick: (streamId: string) => void;
}

const LiveStreamGrid: React.FC<LiveStreamGridProps> = ({ streams, onStreamClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {streams.map((stream) => (
        <LiveStreamCard 
          key={stream.id} 
          stream={stream} 
          onClick={onStreamClick}
        />
      ))}
    </div>
  );
};

export default LiveStreamGrid;
