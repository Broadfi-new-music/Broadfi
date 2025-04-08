import { Playlist, Podcast } from "@/types/dashboard";
import { formatCompactNumber, formatNumber } from "@/utils/formatters";
import { Users, TrendingUp, Coins, BarChart } from "lucide-react";
import { Button } from "./button";

interface ContentCardProps {
  content: Playlist | Podcast;
  type: 'playlist' | 'podcast';
}

export function ContentCard({ content, type }: ContentCardProps) {
  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={content.coverArt} 
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="font-bold text-white truncate">{content.title}</h3>
          <p className="text-xs text-white/70 truncate">{content.description}</p>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center text-xs">
            <Coins className="h-3 w-3 mr-1 text-brand-purple" />
            <span className="text-white/70 mr-1">Earned:</span>
            <span className="font-medium">{formatNumber(content.tokensEarned)}</span>
          </div>
          <div className="flex items-center text-xs">
            <TrendingUp className="h-3 w-3 mr-1 text-brand-green" />
            <span className="text-white/70 mr-1">ROI:</span>
            <span className="font-medium">{content.roi}%</span>
          </div>
          <div className="flex items-center text-xs">
            <Users className="h-3 w-3 mr-1 text-brand-blue" />
            <span className="text-white/70 mr-1">Listeners:</span>
            <span className="font-medium">{formatCompactNumber(content.listeners)}</span>
          </div>
          <div className="flex items-center text-xs">
            <BarChart className="h-3 w-3 mr-1 text-brand-orange" />
            <span className="text-white/70 mr-1">Rank:</span>
            <span className="font-medium">#{content.rank}</span>
          </div>
        </div>
        
        <div className="pt-2 flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
            {type === 'playlist' ? 'Edit Playlist' : 'Edit Podcast'}
          </Button>
          <Button size="sm" className="flex-1 h-8 text-xs bg-brand-purple hover:bg-brand-purple/80">
            Boost
          </Button>
        </div>
      </div>
    </div>
  );
}
