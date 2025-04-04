
import React, { useEffect, useState } from 'react';

interface GiftAnimationProps {
  giftType: string;
  username: string;
  onComplete: () => void;
}

const GiftAnimation: React.FC<GiftAnimationProps> = ({ giftType, username, onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 300); // Give time for exit animation
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  const getGiftIcon = () => {
    switch (giftType) {
      case 'flower': return '🌹';
      case 'lion': return '🦁';
      case 'crown': return '👑';
      case 'diamond': return '💎';
      case 'rocket': return '🚀';
      case 'heart': return '❤️';
      default: return '🎁';
    }
  };

  if (!visible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
      <div className="bg-stream-overlay bg-opacity-60 rounded-lg p-4 animate-fade-in flex flex-col items-center">
        <div className="text-5xl mb-2 animate-bounce">{getGiftIcon()}</div>
        <div className="text-white font-bold">{username} sent a gift!</div>
      </div>
    </div>
  );
};

export default GiftAnimation;
