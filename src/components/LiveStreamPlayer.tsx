import React, { useState } from "react";
import { X, Heart, Gift, ThumbsUp, Send, DollarSign } from "lucide-react";
import { LiveStream, Gift as GiftType, Comment, User } from "@/types/battle";
import { gifts as availableGifts, generateComments } from "@/data/mockDataBattle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface LiveStreamPlayerProps {
  stream: LiveStream;
  currentUser: User;
  onClose: () => void;
}

const LiveStreamPlayer: React.FC<LiveStreamPlayerProps> = ({ 
  stream, 
  currentUser,
  onClose 
}) => {
  const [comments, setComments] = useState<Comment[]>(generateComments());
  const [message, setMessage] = useState("");
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null);
  const [voteAmount, setVoteAmount] = useState(100);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newComment: Comment = {
      id: `new-${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      avatar: currentUser.avatar,
      text: message,
      timestamp: new Date().toISOString()
    };
    
    setComments([newComment, ...comments]);
    setMessage("");
  };
  
  const handleGiftSelect = (gift: GiftType) => {
    // Here we would handle the actual gift transaction with BRD tokens
    console.log(`Gifting ${gift.name} to creator ${selectedCreatorId}`);
    setShowGiftModal(false);
  };
  
  const handleVoteSubmit = () => {
    if (!selectedCreatorId || voteAmount <= 0) return;
    
    // Here we would handle the actual voting with BRD tokens
    console.log(`Voting ${voteAmount} BRD tokens for creator ${selectedCreatorId}`);
    setShowVoteModal(false);
  };
  
  const getCreatorById = (id: string) => {
    return stream.creators.find(creator => creator.id === id);
  };
  
  return (
    <div className="fixed inset-0 bg-battle-dark z-50 flex flex-col">
      {/* Stream Header */}
      <div className="bg-battle-bg px-4 py-2 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-bold">{stream.title}</h2>
          <p className="text-xs text-battle-text/70">
            {stream.creators.map(c => c.username).join(" vs ")}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Stream Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Main Video Area - 2/3 width on desktop */}
        <div className="flex-1 md:w-2/3 relative">
          {/* Split Screen for Battle */}
          <div className="h-full flex flex-col md:flex-row">
            {/* Creator 1 Side */}
            <div className="flex-1 relative bg-battle-dark border-r border-battle-bg/30">
              <video
                className="w-full h-full object-cover"
                src="https://joy1.videvo.net/videvo_files/video/free/2013-08/large_watermarked/hd0992_preview.mp4"
                autoPlay
                muted
                loop
              ></video>
              
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center">
                  <img 
                    src={stream.creators[0].avatar} 
                    alt={stream.creators[0].name}
                    className="w-8 h-8 rounded-full border-2 border-battle-accent" 
                  />
                  <div className="ml-2">
                    <div className="text-sm font-bold">{stream.creators[0].username}</div>
                    <div className="text-xs">{stream.votes[stream.creators[0].id] || 0} votes</div>
                  </div>
                </div>
              </div>
              
              {/* Heart button for this creator */}
              <button 
                className="absolute top-2 right-2 bg-black/30 rounded-full p-2"
                onClick={() => {
                  console.log(`Liked ${stream.creators[0].username}`);
                }}
              >
                <Heart className="h-6 w-6 text-battle-accent" />
              </button>
            </div>
            
            {/* Creator 2 Side */}
            <div className="flex-1 relative bg-battle-dark">
              <video
                className="w-full h-full object-cover"
                src="https://joy1.videvo.net/videvo_files/video/free/2014-12/large_watermarked/Bokeh_Street_Preview.mp4"
                autoPlay
                muted
                loop
              ></video>
              
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center">
                  <img 
                    src={stream.creators[1].avatar} 
                    alt={stream.creators[1].name}
                    className="w-8 h-8 rounded-full border-2 border-battle-secondary" 
                  />
                  <div className="ml-2">
                    <div className="text-sm font-bold">{stream.creators[1].username}</div>
                    <div className="text-xs">{stream.votes[stream.creators[1].id] || 0} votes</div>
                  </div>
                </div>
              </div>
              
              {/* Heart button for this creator */}
              <button 
                className="absolute top-2 right-2 bg-black/30 rounded-full p-2"
                onClick={() => {
                  console.log(`Liked ${stream.creators[1].username}`);
                }}
              >
                <Heart className="h-6 w-6 text-battle-secondary" />
              </button>
            </div>
          </div>
          
          {/* Floating Action Buttons */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <Button
              className="bg-battle-accent hover:bg-battle-accent/80 rounded-full"
              onClick={() => {
                setSelectedCreatorId(null);
                setShowVoteModal(true);
              }}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              Vote
            </Button>
            
            <Button
              className="bg-battle-token text-battle-dark hover:bg-battle-token/80 rounded-full"
              onClick={() => {
                setSelectedCreatorId(null);
                setShowGiftModal(true);
              }}
            >
              <Gift className="h-4 w-4 mr-1" />
              Gift
            </Button>
          </div>
        </div>
        
        {/* Comments Section - 1/3 width on desktop */}
        <div className="h-56 md:h-auto md:w-1/3 bg-battle-card border-t border-battle-bg md:border-l md:border-t-0">
          <div className="h-full flex flex-col">
            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-2">
                  <img 
                    src={comment.avatar} 
                    alt={comment.username}
                    className="w-6 h-6 rounded-full" 
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="text-xs font-bold">{comment.username}</span>
                      <span className="text-[10px] text-battle-text/50 ml-2">
                        {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Comment Input */}
            <div className="p-2 border-t border-battle-bg flex items-center">
              <Input
                className="flex-1 bg-battle-dark border-battle-dark text-battle-text"
                placeholder="Add a comment..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-2"
                onClick={handleSendMessage}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gift Modal */}
      {showGiftModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-battle-card rounded-lg w-full max-w-md">
            <div className="p-4 border-b border-battle-bg flex justify-between items-center">
              <h3 className="font-bold">Send Gift</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowGiftModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {!selectedCreatorId ? (
              <div className="p-4">
                <p className="text-center mb-4">Select a creator to gift</p>
                <div className="flex justify-center space-x-4">
                  {stream.creators.map(creator => (
                    <button
                      key={creator.id}
                      className="flex flex-col items-center p-2 rounded-lg hover:bg-battle-bg transition"
                      onClick={() => setSelectedCreatorId(creator.id)}
                    >
                      <img 
                        src={creator.avatar} 
                        alt={creator.name}
                        className="w-16 h-16 rounded-full mb-2" 
                      />
                      <span className="font-medium">{creator.username}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <div className="flex flex-col items-center">
                    <img 
                      src={getCreatorById(selectedCreatorId)?.avatar} 
                      alt={getCreatorById(selectedCreatorId)?.name}
                      className="w-16 h-16 rounded-full mb-2" 
                    />
                    <span className="font-medium">
                      {getCreatorById(selectedCreatorId)?.username}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {availableGifts.map(gift => (
                    <button
                      key={gift.id}
                      className="flex flex-col items-center p-3 rounded-lg border border-battle-bg hover:bg-battle-bg transition"
                      onClick={() => handleGiftSelect(gift)}
                    >
                      <span className="text-3xl mb-1">{gift.icon}</span>
                      <span className="text-sm font-medium">{gift.name}</span>
                      <span className="text-xs flex items-center text-battle-token">
                        <DollarSign className="h-3 w-3 mr-0.5" />{gift.price}
                      </span>
                    </button>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCreatorId(null)}
                  >
                    Back to creator selection
                  </Button>
                </div>
              </div>
            )}
            
            <div className="p-4 border-t border-battle-bg flex items-center justify-between">
              <span className="text-sm">Your balance: {currentUser.brdTokens} BRD</span>
              <Button
                className="bg-battle-token text-battle-dark hover:bg-battle-token/80"
                disabled={!selectedCreatorId}
              >
                Add BRD Tokens
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Vote Modal */}
      {showVoteModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-battle-card rounded-lg w-full max-w-md">
            <div className="p-4 border-b border-battle-bg flex justify-between items-center">
              <h3 className="font-bold">Vote with BRD Tokens</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowVoteModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {!selectedCreatorId ? (
              <div className="p-4">
                <p className="text-center mb-4">Select creator to vote for</p>
                <div className="flex justify-center space-x-4">
                  {stream.creators.map((creator, index) => (
                    <button
                      key={creator.id}
                      className={cn(
                        "flex flex-col items-center p-3 rounded-lg hover:bg-battle-bg transition border-2",
                        index === 0 ? "border-battle-accent" : "border-battle-secondary"
                      )}
                      onClick={() => setSelectedCreatorId(creator.id)}
                    >
                      <img 
                        src={creator.avatar} 
                        alt={creator.name}
                        className="w-16 h-16 rounded-full mb-2" 
                      />
                      <span className="font-medium">{creator.username}</span>
                      <span className="text-xs">{stream.votes[creator.id] || 0} votes</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <div className="flex flex-col items-center">
                    <img 
                      src={getCreatorById(selectedCreatorId)?.avatar} 
                      alt={getCreatorById(selectedCreatorId)?.name}
                      className="w-16 h-16 rounded-full mb-2" 
                    />
                    <span className="font-medium">
                      {getCreatorById(selectedCreatorId)?.username}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    BRD Tokens to vote:
                  </label>
                  <div className="flex">
                    <Button 
                      variant="outline" 
                      className="rounded-r-none"
                      onClick={() => setVoteAmount(Math.max(50, voteAmount - 50))}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      min="50"
                      className="flex-1 rounded-none text-center"
                      value={voteAmount}
                      onChange={(e) => setVoteAmount(parseInt(e.target.value) || 50)}
                    />
                    <Button 
                      variant="outline" 
                      className="rounded-l-none"
                      onClick={() => setVoteAmount(voteAmount + 50)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button
                    className="bg-battle-accent hover:bg-battle-accent/80 w-full"
                    onClick={handleVoteSubmit}
                  >
                    Vote with {voteAmount} BRD
                  </Button>
                </div>
                
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCreatorId(null)}
                  >
                    Back to creator selection
                  </Button>
                </div>
              </div>
            )}
            
            <div className="p-4 border-t border-battle-bg flex items-center justify-between">
              <span className="text-sm">Your balance: {currentUser.brdTokens} BRD</span>
              <Button
                className="bg-battle-token text-battle-dark hover:bg-battle-token/80"
              >
                Add BRD Tokens
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveStreamPlayer;
