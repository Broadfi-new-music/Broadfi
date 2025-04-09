import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LivestreamBattle } from "@/types/livebattle";
import { formatNumber } from "@/lib/utils";
import { Flame, Users, Trophy, Heart, Play } from "lucide-react";

interface LiveBattleCardProps {
  battle: LivestreamBattle;
  onJoin: (battle: LivestreamBattle) => void;
}

const LiveBattleCard: React.FC<LiveBattleCardProps> = ({ battle, onJoin }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={battle.thumbnailUrl} 
          alt={battle.title}
          className="w-full aspect-video object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-red-500 flex items-center gap-1">
          <Flame className="h-3 w-3" />
          LIVE
        </Badge>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm flex items-center gap-1">
          <Users className="h-3 w-3" />
          {formatNumber(battle.viewCount)}
        </div>
        <Button 
          variant="default" 
          size="sm" 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-90 hover:opacity-100"
          onClick={() => onJoin(battle)}
        >
          <Play className="mr-1 h-4 w-4" />
          Join Now
        </Button>
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
            <Heart className="h-4 w-4 text-red-500" />
            <span>{formatNumber(battle.likes1 + battle.likes2)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LiveBattleCard;
