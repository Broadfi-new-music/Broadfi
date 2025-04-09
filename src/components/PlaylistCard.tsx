import { Link } from "react-router-dom";
import { Playlist } from "@/types/index";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Play } from "lucide-react";

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const { id, title, creator, imageUrl, tokenPrice, roi, listeners } = playlist;
  
  return (
    <Link to={`/playlist/${id}`}>
      <Card className="overflow-hidden group h-full hover:shadow-md transition-all duration-300 cursor-pointer border-border/50 hover:border-brand/30">
        <div className="relative aspect-square overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="rounded-full bg-brand p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <Play className="h-8 w-8 text-white fill-current" />
            </div>
          </div>
          <img 
            src={imageUrl} 
            alt={title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-base mb-1 truncate">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">by {creator}</p>
          
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex flex-col items-center p-1.5 rounded-md bg-secondary/80">
              <span className="text-muted-foreground mb-0.5">Price</span>
              <span className="font-medium">{tokenPrice.toFixed(3)} BRD</span>
            </div>
            
            <div className="flex flex-col items-center p-1.5 rounded-md bg-secondary/80">
              <span className="text-muted-foreground mb-0.5">ROI</span>
              <span className="font-medium text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-0.5" />
                {roi}%
              </span>
            </div>
            
            <div className="flex flex-col items-center p-1.5 rounded-md bg-secondary/80">
              <span className="text-muted-foreground mb-0.5">Listeners</span>
              <span className="font-medium flex items-center">
                <Users className="h-3 w-3 mr-0.5" />
                {listeners >= 1000 ? `${(listeners / 1000).toFixed(1)}K` : listeners}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlaylistCard;
