import React, { useState } from "react";
import { LivestreamBattle, Comment, Gift } from "@/types/livebattle";
import { useToast } from "@/hooks/use-toast";
import LivestreamPlayer from "@/components/LivestreamPlayers";
import CommentSection from "./CommentSection";
import InteractionBar from "./InteractionBar";
import VoteDialog from "./VoteDialog";
import GiftDialog from "./GiftDialog";

interface LivestreamViewProps {
  battle: LivestreamBattle;
  comments: Comment[];
  gifts: Gift[];
  onExit: () => void;
  onUpdateBattle: (updatedBattle: LivestreamBattle) => void;
}

const LivestreamView: React.FC<LivestreamViewProps> = ({ 
  battle, 
  comments: initialComments, 
  gifts, 
  onExit,
  onUpdateBattle 
}) => {
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [showVoteDialog, setShowVoteDialog] = useState(false);
  const [showGiftDialog, setShowGiftDialog] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<"creator1" | "creator2" | null>(null);
  
  const handleSendComment = (text: string) => {
    const newComment: Comment = {
      id: `comment${Date.now()}`,
      userId: "currentUser",
      username: "You",
      avatar: "https://i.pravatar.cc/150?img=20",
      text,
      timestamp: Date.now(),
    };
    
    setComments([newComment, ...comments]);
  };
  
  const handleLike = (creatorType: "creator1" | "creator2") => {
    const updatedBattle = {
      ...battle,
      likes1: creatorType === "creator1" ? battle.likes1 + 1 : battle.likes1,
      likes2: creatorType === "creator2" ? battle.likes2 + 1 : battle.likes2,
    };
    
    onUpdateBattle(updatedBattle);
    
    toast({
      title: "Liked!",
      description: `You liked ${creatorType === "creator1" ? battle.creator1.username : battle.creator2.username}'s performance`,
    });
  };
  
  const handleVoteClick = (creatorType: "creator1" | "creator2") => {
    setSelectedCreator(creatorType);
    setShowVoteDialog(true);
  };
  
  const handleVoteSubmit = (amount: number) => {
    if (!selectedCreator) return;
    
    const updatedBattle = {
      ...battle,
      votes1: selectedCreator === "creator1" ? battle.votes1 + amount : battle.votes1,
      votes2: selectedCreator === "creator2" ? battle.votes2 + amount : battle.votes2,
    };
    
    onUpdateBattle(updatedBattle);
    
    toast({
      title: "Vote submitted!",
      description: `You voted ${amount} BRD tokens for ${selectedCreator === "creator1" ? battle.creator1.username : battle.creator2.username}`,
    });
    
    setShowVoteDialog(false);
  };
  
  const handleGiftClick = (creatorType: "creator1" | "creator2") => {
    setSelectedCreator(creatorType);
    setShowGiftDialog(true);
  };
  
  const handleGiftSubmit = (gift: Gift) => {
    if (!selectedCreator) return;
    
    const updatedBattle = {
      ...battle,
      gifts1: selectedCreator === "creator1" ? battle.gifts1 + gift.price : battle.gifts1,
      gifts2: selectedCreator === "creator2" ? battle.gifts2 + gift.price : battle.gifts2,
    };
    
    onUpdateBattle(updatedBattle);
    
    toast({
      title: "Gift sent!",
      description: `You sent a ${gift.name} (${gift.price} BRD) to ${selectedCreator === "creator1" ? battle.creator1.username : battle.creator2.username}`,
    });
    
    setShowGiftDialog(false);
  };
  
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] md:h-auto">
      {/* Video feed */}
      <div className="w-full md:w-2/3 relative">
        <div className="aspect-video w-full relative">
          <LivestreamPlayer 
            battle={battle}
            onExit={onExit}
          />
        </div>
        
        <InteractionBar
          creator1Username={battle.creator1.username}
          creator2Username={battle.creator2.username}
          onLike={handleLike}
          onVote={handleVoteClick}
          onGift={handleGiftClick}
        />
      </div>
      
      {/* Comments and interaction sidebar */}
      <div className="hidden md:block w-1/3 border-l h-full max-h-[600px] bg-background">
        <CommentSection
          comments={comments}
          viewCount={battle.viewCount}
          totalPrize={battle.totalPrize}
          title={battle.title}
          onSendComment={handleSendComment}
        />
      </div>
      
      {/* Vote Dialog */}
      <VoteDialog
        open={showVoteDialog}
        onOpenChange={setShowVoteDialog}
        creator={selectedCreator ? battle[selectedCreator] : null}
        currentVotes={selectedCreator === "creator1" ? battle.votes1 : (selectedCreator === "creator2" ? battle.votes2 : 0)}
        onVote={handleVoteSubmit}
      />
      
      {/* Gift Dialog */}
      <GiftDialog
        open={showGiftDialog}
        onOpenChange={setShowGiftDialog}
        creator={selectedCreator ? battle[selectedCreator] : null}
        currentGifts={selectedCreator === "creator1" ? battle.gifts1 : (selectedCreator === "creator2" ? battle.gifts2 : 0)}
        gifts={gifts}
        onGift={handleGiftSubmit}
      />
    </div>
  );
};

export default LivestreamView;
