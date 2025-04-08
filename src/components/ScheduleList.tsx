import React from "react";
import ScheduleCard from "./ScheduleCard";
import { LiveStream } from "@/types/battle";
import { toast } from "@/hooks/use-toast";

interface ScheduleListProps {
  streams: LiveStream[];
}

const ScheduleList: React.FC<ScheduleListProps> = ({ streams }) => {
  const handleNotify = (streamId: string) => {
    const stream = streams.find(s => s.id === streamId);
    if (stream) {
      toast({
        title: "Notification Set",
        description: `You will be notified when "${stream.title}" goes live`,
      });
    }
  };

  if (streams.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-battle-text/70">No scheduled streams available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {streams.map((stream) => (
        <ScheduleCard 
          key={stream.id} 
          stream={stream} 
          onNotifyClick={handleNotify}
        />
      ))}
    </div>
  );
};

export default ScheduleList;
