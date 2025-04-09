import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LivestreamBattle } from "@/types/livebattle";
import { formatNumber, formatLivestreamDate } from "@/lib/utils";
import { Clock, Trophy } from "lucide-react";

interface ScheduledBattleCardProps {
  battle: LivestreamBattle;
}

const ScheduledBattleCard: React.FC<ScheduledBattleCardProps> = ({ battle }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={battle.thumbnailUrl} 
          alt={battle.title}
          className="w-full aspect-video object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-amber-500 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          SCHEDULED
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2 truncate">{battle.title}</h3>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={battle.creator1.avatar} />
              <AvatarFallback>{battle.creator1.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-sm truncate">{battle.creator1.username}</span>
          </div>
          <span className="text-xs text-muted-foreground">VS</span>
          <div className="flex items-center gap-2">
            <span className="text-sm truncate">{battle.creator2.username}</span>
            <Avatar className="h-6 w-6">
              <AvatarImage src={battle.creator2.avatar} />
              <AvatarFallback>{battle.creator2.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-brand" />
            <span>{formatNumber(battle.totalPrize)} BRD</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatLivestreamDate(battle.scheduledTime)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ScheduledBattleCard;
