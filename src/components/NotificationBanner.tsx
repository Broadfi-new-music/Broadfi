
import React, { useEffect, useState } from 'react';

interface NotificationBannerProps {
  message: string;
  type: 'vote' | 'gift' | 'subscription';
  onComplete: () => void;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ message, type, onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 300); // Give time for exit animation
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  const getBgColor = () => {
    switch (type) {
      case 'vote': return 'bg-stream-secondary';
      case 'gift': return 'bg-yellow-500';
      case 'subscription': return 'bg-purple-600';
      default: return 'bg-stream-primary';
    }
  };

  return (
    <div className={`absolute top-16 left-0 right-0 mx-auto w-4/5 ${getBgColor()} text-white py-2 px-4 rounded-full text-center animate-slide-in z-30`}>
      {message}
    </div>
  );
};

export default NotificationBanner;
