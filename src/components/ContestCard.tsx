import React from "react";
import { Calendar, Music, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ContestCardProps {
  id: string;
  title: string;
  category: string;
  prize: number;
  deadline: string;
  image: string;
  participants: number;
  className?: string;
}

const ContestCard = ({
  id,
  title,
  category,
  prize,
  deadline,
  image,
  participants,
  className,
}: ContestCardProps) => {
  return (
    <div className={cn("relative group hover-scale overflow-hidden rounded-lg border border-white/10", className)}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-10" />
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      
      <div className="absolute top-3 right-3 z-20">
        <div className="bg-primary/80 backdrop-blur-sm text-white text-xs font-medium py-1 px-2 rounded-full">
          {category}
        </div>
      </div>
      
      <div className="relative z-20 p-4">
        <h3 className="text-white text-lg font-bold leading-tight mb-1">{title}</h3>
        
        <div className="flex items-center text-white/60 text-xs mb-3">
          <div className="flex items-center mr-3">
            <Trophy className="h-3 w-3 mr-1" />
            <span>{prize} BRD</span>
          </div>
          <div className="flex items-center mr-3">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{deadline}</span>
          </div>
          <div className="flex items-center">
            <Music className="h-3 w-3 mr-1" />
            <span>{participants} entries</span>
          </div>
        </div>
        
        <Link to={`/contest/${id}`}>
          <Button 
            className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white" 
            variant="secondary"
          >
            View Contest
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ContestCard;
