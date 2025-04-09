import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, ThumbsUp, Gift as GiftIcon } from "lucide-react";

interface InteractionBarProps {
  creator1Username: string;
  creator2Username: string;
  onLike: (creatorType: "creator1" | "creator2") => void;
  onVote: (creatorType: "creator1" | "creator2") => void;
  onGift: (creatorType: "creator1" | "creator2") => void;
}

const InteractionBar: React.FC<InteractionBarProps> = ({
  creator1Username,
  creator2Username,
  onLike,
  onVote,
  onGift
}) => {
  return (
    <div className="bg-background md:bg-background/90 backdrop-blur-sm md:backdrop-blur-0 p-3 flex justify-around border-t md:border-t-0 fixed bottom-0 left-0 right-0 md:relative md:bottom-auto">
      <Button
        variant="ghost"
        className="flex flex-col items-center text-xs gap-1"
        onClick={() => onLike("creator1")}
      >
        <Heart className="h-5 w-5 text-red-500" />
        <span>{creator1Username}</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-col items-center text-xs gap-1"
        onClick={() => onLike("creator2")}
      >
        <Heart className="h-5 w-5 text-red-500" />
        <span>{creator2Username}</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-col items-center text-xs gap-1"
        onClick={() => onVote("creator1")}
      >
        <ThumbsUp className="h-5 w-5 text-brand" />
        <span>Vote 1</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-col items-center text-xs gap-1"
        onClick={() => onVote("creator2")}
      >
        <ThumbsUp className="h-5 w-5 text-brand" />
        <span>Vote 2</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-col items-center text-xs gap-1"
        onClick={() => onGift("creator1")}
      >
        <GiftIcon className="h-5 w-5 text-amber-500" />
        <span>Gift 1</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-col items-center text-xs gap-1"
        onClick={() => onGift("creator2")}
      >
        <GiftIcon className="h-5 w-5 text-amber-500" />
        <span>Gift 2</span>
      </Button>
    </div>
  );
};

export default InteractionBar;
