import React, { useState } from 'react';
import { Heart, ThumbsUp, ThumbsDown, DollarSign, Gift } from 'lucide-react';
import TokenVoteModal from './TokenVoteModal';
import GiftModal from './GiftModal';

interface LiveStreamActionsProps {
  likeCount: number;
  dislikeCount: number;
  onLike: () => void;
  onDislike: () => void;
  onVote: (amount: number) => void;
  onGift: (giftType: string) => void;
}

const LiveStreamActions: React.FC<LiveStreamActionsProps> = ({
  likeCount,
  dislikeCount,
  onLike,
  onDislike,
  onVote,
  onGift
}) => {
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [likeAnimations, setLikeAnimations] = useState<{ id: number; x: number }[]>([]);

  const handleLikeClick = () => {
    onLike();
    const newId = Date.now();
    const randomOffset = Math.floor(Math.random() * 40) - 20; // Random position between -20px and 20px
    setLikeAnimations(prev => [...prev, { id: newId, x: randomOffset }]);
    
    // Remove the animation after it completes
    setTimeout(() => {
      setLikeAnimations(prev => prev.filter(item => item.id !== newId));
    }, 1500);
  };

  return (
    <div className="absolute right-3 bottom-20 flex flex-col space-y-4">
      <div className="action-button" onClick={handleLikeClick}>
        <div className="relative">
          <div className="bg-stream-dark rounded-full p-3">
            <Heart className="w-6 h-6 text-stream-primary" />
          </div>
          {likeAnimations.map(animation => (
            <div 
              key={animation.id}
              className="absolute bottom-full like-animation"
              style={{ left: `calc(50% + ${animation.x}px)`, transform: 'translateX(-50%)' }}
            >
              <Heart className="w-6 h-6 text-stream-primary animate-pulse-heart" fill="#FF2C55" />
            </div>
          ))}
        </div>
        <span className="reaction-count">{likeCount}</span>
      </div>
      
      <div className="action-button" onClick={onDislike}>
        <div className="bg-stream-dark rounded-full p-3">
          <ThumbsDown className="w-6 h-6 text-white" />
        </div>
        <span className="reaction-count">{dislikeCount}</span>
      </div>
      
      <div className="action-button" onClick={() => setShowVoteModal(true)}>
        <div className="bg-stream-dark rounded-full p-3">
          <DollarSign className="w-6 h-6 text-stream-secondary" />
        </div>
        <span className="reaction-count">Vote</span>
      </div>
      
      <div className="action-button" onClick={() => setShowGiftModal(true)}>
        <div className="bg-stream-dark rounded-full p-3">
          <Gift className="w-6 h-6 text-yellow-400" />
        </div>
        <span className="reaction-count">Gift</span>
      </div>

      {showVoteModal && (
        <TokenVoteModal 
          onClose={() => setShowVoteModal(false)} 
          onSubmit={(amount) => {
            onVote(amount);
            setShowVoteModal(false);
          }}
        />
      )}

      {showGiftModal && (
        <GiftModal 
          onClose={() => setShowGiftModal(false)} 
          onSelect={(giftType) => {
            onGift(giftType);
            setShowGiftModal(false);
          }}
        />
      )}
    </div>
  );
};

export default LiveStreamActions;
