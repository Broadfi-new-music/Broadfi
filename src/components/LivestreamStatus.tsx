import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import { LivestreamBattle } from "@/types/livebattle";
import { Users } from "lucide-react";

interface LivestreamStatusProps {
  battle: LivestreamBattle;
  onJoin: () => void;
}

const LivestreamStatus: React.FC<LivestreamStatusProps> = ({ battle, onJoin }) => {
  return (
    <div 
      className="flex-shrink-0 w-28 rounded-full cursor-pointer" 
      onClick={onJoin}
    >
      <div className="relative">
        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-brand p-0.5 relative">
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <img 
              src={battle.thumbnailUrl} 
              alt={battle.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
            <Users className="h-3 w-3 mr-1" />
            {formatNumber(battle.viewCount)}
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex">
              <Avatar className="h-10 w-10 border-2 border-white -mr-2 shadow-lg">
                <AvatarImage src={battle.creator1.avatar} />
                <AvatarFallback>{battle.creator1.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10 border-2 border-white shadow-lg">
                <AvatarImage src={battle.creator2.avatar} />
                <AvatarFallback>{battle.creator2.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-2 text-center">
        <p className="text-xs font-medium truncate">{battle.title}</p>
        <Button 
          variant="default" 
          size="sm" 
          className="mt-1 h-6 w-full text-xs py-0"
          onClick={onJoin}
        >
          Join
        </Button>
      </div>
    </div>
  );
};

export default LivestreamStatus;
