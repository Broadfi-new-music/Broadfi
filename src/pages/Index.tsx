
import React, { useState, useEffect } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import ProfileInfo from '@/components/ProfileInfo';
import LiveStreamActions from '@/components/LiveStreamActions';
import Comments from '@/components/Comments';
import CommentInput from '@/components/CommentInput';
import GiftAnimation from '@/components/GiftAnimation';
import NotificationBanner from '@/components/NotificationBanner';
import NavigationBar from '@/components/NavigationBar';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface Comment {
  id: number;
  username: string;
  avatarUrl: string;
  text: string;
  timestamp: Date;
}

interface Notification {
  id: number;
  message: string;
  type: 'vote' | 'gift' | 'subscription';
}

interface Gift {
  id: number;
  type: string;
  username: string;
}

// Update to a more reliable video source that works in browsers
const SAMPLE_VIDEO_URL = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const MOCK_AVATARS = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=6",
];

const MOCK_USERNAMES = [
  "crypto_enthusiast",
  "token_master",
  "blockchain_queen",
  "web3_dev",
  "nft_collector",
  "defi_guru",
];

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [likeCount, setLikeCount] = useState(1238);
  const [dislikeCount, setDislikeCount] = useState(45);
  const [tokensEarned, setTokensEarned] = useState(5280);
  const [viewerCount, setViewerCount] = useState(834);
  const [comments, setComments] = useState<Comment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [creatorName, setCreatorName] = useState("musicLover324");

  // Auto-increment viewers randomly
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        setViewerCount(prev => prev + Math.floor(Math.random() * 5) + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simulate random comments
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        const randomUserIndex = Math.floor(Math.random() * MOCK_USERNAMES.length);
        const randomComment = [
          "Great stream!",
          "Love your content",
          "Where are you from?",
          "How long have you been streaming?",
          "Can you play my favorite song next?",
          "Your voice is amazing",
          "How many BRD tokens do you have?",
          "This is so cool!",
          "First time here, love it!",
          "Web3 streaming is the future!",
        ][Math.floor(Math.random() * 10)];
        
        addComment(randomComment, MOCK_USERNAMES[randomUserIndex], MOCK_AVATARS[randomUserIndex]);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setLikeCount(prev => prev + 1);
  };

  const handleDislike = () => {
    setDislikeCount(prev => prev + 1);
  };

  const handleVote = (amount: number) => {
    setTokensEarned(prev => prev + amount);
    addNotification(`Someone voted ${amount} BRD tokens!`, 'vote');
    toast({
      title: "Vote Successful",
      description: `You voted ${amount} BRD tokens`,
    });
  };

  const handleGift = (giftType: string) => {
    const giftValues: Record<string, number> = {
      flower: 50,
      lion: 500,
      crown: 1000,
      diamond: 5000,
      rocket: 10000,
      heart: 100
    };

    const giftValue = giftValues[giftType] || 100;
    setTokensEarned(prev => prev + giftValue);
    
    const giftId = Date.now();
    setGifts(prev => [...prev, { 
      id: giftId, 
      type: giftType, 
      username: "You" 
    }]);

    addNotification(`Someone sent a ${giftType} gift!`, 'gift');
    
    toast({
      title: "Gift Sent",
      description: `You sent a ${giftType} gift (${giftValue} BRD)`,
    });
  };

  const addComment = (text: string, username: string = "You", avatarUrl: string = MOCK_AVATARS[0]) => {
    const newComment = {
      id: Date.now(),
      username,
      avatarUrl,
      text,
      timestamp: new Date(),
    };
    
    setComments(prev => [...prev, newComment]);
  };

  const addNotification = (message: string, type: 'vote' | 'gift' | 'subscription') => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Remove notification after it disappears
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 4500);
  };

  const removeGift = (id: number) => {
    setGifts(prev => prev.filter(gift => gift.id !== id));
  };

  return (
    <div className="min-h-screen bg-stream-dark flex flex-col">
      {/* Navigation */}
      <NavigationBar />
      
      {/* Main Content */}
      <div className="flex-1 relative flex flex-col md:flex-row">
        {/* Video Section - Take full height on mobile, 100% width on desktop */}
        <div className={`${isMobile ? 'h-[calc(100vh-112px)]' : 'h-[calc(100vh-64px)]'} md:w-[70%] relative`}>
          <VideoPlayer videoUrl={SAMPLE_VIDEO_URL} creatorName={creatorName} />
          
          {/* Profile Info */}
          <ProfileInfo 
            username={creatorName}
            avatarUrl="https://i.pravatar.cc/150?img=6"
            isLive={true}
            viewerCount={viewerCount}
            tokensEarned={tokensEarned}
          />
          
          {/* Comments */}
          <Comments comments={comments} />
          
          {/* Action Buttons */}
          <LiveStreamActions 
            likeCount={likeCount}
            dislikeCount={dislikeCount}
            onLike={handleLike}
            onDislike={handleDislike}
            onVote={handleVote}
            onGift={handleGift}
          />
          
          {/* Comment Input */}
          <CommentInput onSubmit={(text) => addComment(text)} />
          
          {/* Notifications */}
          {notifications.map((notification) => (
            <NotificationBanner
              key={notification.id}
              message={notification.message}
              type={notification.type}
              onComplete={() => {}}
            />
          ))}
          
          {/* Gift Animations */}
          {gifts.map((gift) => (
            <GiftAnimation
              key={gift.id}
              giftType={gift.type}
              username={gift.username}
              onComplete={() => removeGift(gift.id)}
            />
          ))}
        </div>

        {/* Side Panel - Only on desktop */}
        <div className="hidden md:block md:w-[30%] bg-[#1e1e1e] border-l border-stream-gray p-4">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-3">Top Supporters</h2>
            <div className="space-y-3">
              {["crypto_king", "nft_collector", "web3_guru"].map((username, i) => (
                <div key={username} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={MOCK_AVATARS[i]} 
                      className="w-8 h-8 rounded-full mr-2" 
                      alt={username}
                    />
                    <span className="text-white">{username}</span>
                  </div>
                  <span className="text-stream-secondary">{(5000 - i * 1200)} BRD</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* <div>
            <h2 className="text-xl font-bold text-white mb-3">Upcoming Streams</h2>
            <div className="space-y-4">
              {["Music Session", "NFT Discussion", "Web3 Gaming"].map((title, i) => (
                <div key={title} className="bg-stream-dark rounded-lg p-3">
                  <h3 className="text-white font-medium">{title}</h3>
                  <p className="text-stream-gray text-sm">Today, {6 + i}:00 PM</p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
      {/* Fixed position wallet button on mobile */}
      {/* Mobile navigation tabs at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-stream-dark border-t border-stream-gray flex justify-around py-2">
        {["Home", "Contest", "Playlists", "Podcast", "More"].map((item) => (
          <div key={item} className="flex flex-col items-center text-xs text-stream-gray">
            <div className="w-6 h-6 mb-1 flex items-center justify-center">
              {item === "Home" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
              {item === "Contest" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
              {item === "Playlists" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
              {item === "Podcast" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>}
              {item === "More" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}
            </div>
            <span className={item === "Home" ? "text-stream-primary" : ""}>{item}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 relative flex flex-col md:flex-row mt-[90px]">
        {/* Video Section - Take full height on mobile, 100% width on desktop */}
        <div className={`${isMobile ? 'h-[calc(100vh-112px)]' : 'h-[calc(100vh-64px)]'} md:w-[70%] relative`}>
          <VideoPlayer videoUrl={SAMPLE_VIDEO_URL} creatorName={creatorName} />
          
          {/* Profile Info */}
          <ProfileInfo 
            username={creatorName}
            avatarUrl="https://i.pravatar.cc/150?img=5"
            isLive={true}
            viewerCount={viewerCount}
            tokensEarned={tokensEarned}
          />
          
          {/* Comments */}
          <Comments comments={comments} />
          
          {/* Action Buttons */}
          <LiveStreamActions 
            likeCount={likeCount}
            dislikeCount={dislikeCount}
            onLike={handleLike}
            onDislike={handleDislike}
            onVote={handleVote}
            onGift={handleGift}
          />
          
          {/* Comment Input */}
          <CommentInput onSubmit={(text) => addComment(text)} />
          
          {/* Notifications */}
          {notifications.map((notification) => (
            <NotificationBanner
              key={notification.id}
              message={notification.message}
              type={notification.type}
              onComplete={() => {}}
            />
          ))}
          
          {/* Gift Animations */}
          {gifts.map((gift) => (
            <GiftAnimation
              key={gift.id}
              giftType={gift.type}
              username={gift.username}
              onComplete={() => removeGift(gift.id)}
            />
          ))}
        </div>

        {/* Side Panel - Only on desktop */}
        <div className="hidden md:block md:w-[30%] bg-[#1e1e1e] border-l border-stream-gray p-4">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-3">Top Supporters</h2>
            <div className="space-y-3">
              {["crypto_king", "nft_collector", "web3_guru"].map((username, i) => (
                <div key={username} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={MOCK_AVATARS[i]} 
                      className="w-8 h-8 rounded-full mr-2" 
                      alt={username}
                    />
                    <span className="text-white">{username}</span>
                  </div>
                  <span className="text-stream-secondary">{(5000 - i * 1200)} BRD</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* <div>
            <h2 className="text-xl font-bold text-white mb-3">Upcoming Streams</h2>
            <div className="space-y-4">
              {["Music Session", "NFT Discussion", "Web3 Gaming"].map((title, i) => (
                <div key={title} className="bg-stream-dark rounded-lg p-3">
                  <h3 className="text-white font-medium">{title}</h3>
                  <p className="text-stream-gray text-sm">Today, {6 + i}:00 PM</p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
