import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LivestreamBattle } from "@/types/livebattle";
import { formatNumber } from "@/lib/utils";
import { ArrowLeft, Users, Heart, Gift, Trophy } from "lucide-react";

interface LivestreamPlayerProps {
  battle: LivestreamBattle;
  onExit: () => void;
}

const LivestreamPlayers: React.FC<LivestreamPlayerProps> = ({ battle, onExit }) => {
  const totalVotes = battle.votes1 + battle.votes2;
  const votes1Percentage = totalVotes > 0 ? (battle.votes1 / totalVotes) * 100 : 50;
  
  const totalGifts = battle.gifts1 + battle.gifts2;
  const gifts1Percentage = totalGifts > 0 ? (battle.gifts1 / totalGifts) * 100 : 50;
  
  const creator1Winning = battle.votes1 > battle.votes2 || battle.gifts1 > battle.gifts2;
  const creator2Winning = battle.votes2 > battle.votes1 || battle.gifts2 > battle.gifts1;
  
  return (
    <div className="relative w-full h-full">
      {/* Video */}
      {battle.videoUrl ? (
        <video
          src={battle.videoUrl}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted
          loop
          controls
        />
      ) : (
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
          <p className="text-white">Livestream starting soon...</p>
        </div>
      )}
      
      {/* Top info bar */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-3 flex items-center justify-between">
        <Button variant="ghost" size="sm" className="text-white p-2" onClick={onExit}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center">
          <Badge className={`mr-2 ${battle.status === 'live' ? 'bg-red-500' : 'bg-gray-500'}`}>
            {battle.status === 'live' ? 'LIVE' : 'REPLAY'}
          </Badge>
          <div className="flex items-center gap-1 text-white bg-black/40 px-2 py-1 rounded-full text-sm">
            <Users className="h-3 w-3" />
            <span>{formatNumber(battle.viewCount)}</span>
          </div>
        </div>
      </div>
      
      {/* Creator info and stats */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-white font-medium mb-2">{battle.title}</h3>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src={battle.creator1.avatar} />
              <AvatarFallback>{battle.creator1.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <span className="text-white text-sm font-medium">{battle.creator1.username}</span>
                {creator1Winning && (
                  <Badge className="ml-1 bg-green-500 text-[10px] py-0">Leading</Badge>
                )}
              </div>
              <span className="text-white/80 text-xs">{formatNumber(battle.creator1.followers)} followers</span>
            </div>
          </div>
          
          <div className="text-white font-bold">VS</div>
          
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="flex items-center justify-end">
                <span className="text-white text-sm font-medium">{battle.creator2.username}</span>
                {creator2Winning && (
                  <Badge className="ml-1 bg-green-500 text-[10px] py-0">Leading</Badge>
                )}
              </div>
              <span className="text-white/80 text-xs">{formatNumber(battle.creator2.followers)} followers</span>
            </div>
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src={battle.creator2.avatar} />
              <AvatarFallback>{battle.creator2.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        
        {/* Voting progress */}
        <div className="mb-2">
          <div className="flex justify-between text-white text-xs mb-1">
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3 text-red-400" />
              <span>{formatNumber(battle.likes1)}</span>
            </div>
            <span className="text-white/80">Likes</span>
            <div className="flex items-center gap-1">
              <span>{formatNumber(battle.likes2)}</span>
              <Heart className="h-3 w-3 text-red-400" />
            </div>
          </div>
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between text-white text-xs mb-1">
            <div className="flex items-center gap-1">
              <Trophy className="h-3 w-3 text-yellow-400" />
              <span>{formatNumber(battle.votes1)}</span>
            </div>
            <span className="text-white/80">Votes</span>
            <div className="flex items-center gap-1">
              <span>{formatNumber(battle.votes2)}</span>
              <Trophy className="h-3 w-3 text-yellow-400" />
            </div>
          </div>
          <Progress value={votes1Percentage} className="h-1.5 bg-white/20"/>
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between text-white text-xs mb-1">
            <div className="flex items-center gap-1">
              <Gift className="h-3 w-3 text-pink-400" />
              <span>{formatNumber(battle.gifts1)}</span>
            </div>
            <span className="text-white/80">Gifts</span>
            <div className="flex items-center gap-1">
              <span>{formatNumber(battle.gifts2)}</span>
              <Gift className="h-3 w-3 text-pink-400" />
            </div>
          </div>
          <Progress value={gifts1Percentage} className="h-1.5 bg-white/20" />
        </div>
      </div>
    </div>
  );
};

export default LivestreamPlayers;
