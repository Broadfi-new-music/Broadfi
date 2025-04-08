import React from "react";
import { LiveStream } from "@/types/battle";
import { CalendarDays, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface ScheduleCardProps {
  stream: LiveStream;
  onNotifyClick: (streamId: string) => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ stream, onNotifyClick }) => {
  const startTime = new Date(stream.startTime);
  const formattedTime = formatDistanceToNow(startTime, { addSuffix: true });
  
  return (
    <div className="bg-battle-card rounded-lg p-4 flex flex-col md:flex-row gap-4 mb-4">
      <div className="md:w-1/4">
        <div className="aspect-video rounded-md overflow-hidden relative">
          <img 
            src={stream.thumbnail} 
            alt={stream.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm md:text-base mb-1">{stream.title}</h3>
          <div className="flex items-center text-xs text-battle-text/70 mb-2">
            <CalendarDays className="w-3 h-3 mr-1" />
            {startTime.toLocaleDateString()} at {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            <span className="mx-2">•</span>
            <Users className="w-3 h-3 mr-1" />
            {stream.creators.map(c => c.username).join(" vs ")}
          </div>
          
          <p className="text-xs md:text-sm text-battle-text/80 line-clamp-2">
            Starting {formattedTime}. Don't miss this epic battle between top creators!
          </p>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {stream.creators.map(creator => (
            <div key={creator.id} className="flex items-center">
              <img 
                src={creator.avatar} 
                alt={creator.name}
                className="w-6 h-6 rounded-full mr-1" 
              />
              <span className="text-xs">{creator.username}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-row md:flex-col items-center justify-end gap-2">
        <Button 
          className="bg-battle-secondary hover:bg-battle-secondary/80 text-xs md:text-sm h-8 w-full"
          onClick={() => onNotifyClick(stream.id)}
        >
          Notify Me
        </Button>
        <div className="text-center">
          <span className="block text-xs font-medium text-battle-text/70">Starts</span>
          <span className="text-sm font-bold">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
