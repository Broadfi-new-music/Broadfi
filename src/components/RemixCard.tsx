import React, { useState } from 'react';
import { 
  Play, Pause, ThumbsUp, MessageSquare, Share2, 
  TrendingUp, TrendingDown, Award
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Remix } from '@/types/contest';
import { voteForRemix, withdrawVoteFromRemix } from '@/data/contest';
import AudioContests from './AudioContests';
import VoteModal from './VoteModal';
import { useToast } from '@/hooks/use-toast';

interface RemixCardProps {
  remix: Remix;
  rank: number;
  onUpdate: () => void;
}

const RemixCard: React.FC<RemixCardProps> = ({ remix, rank, onUpdate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [voteType, setVoteType] = useState<'vote' | 'withdraw'>('vote');
  const { toast } = useToast();

  const formattedDate = new Date(remix.timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  const handleVoteClick = () => {
    setVoteType('vote');
    setShowVoteModal(true);
  };

  const handleWithdrawClick = () => {
    setVoteType('withdraw');
    setShowVoteModal(true);
  };

  const handleVote = async (amount: number) => {
    try {
      if (voteType === 'vote') {
        await voteForRemix(remix.id, amount);
        toast({
          title: "Vote successful!",
          description: `You voted ${amount} BRD tokens for ${remix.title}`,
        });
      } else {
        await withdrawVoteFromRemix(remix.id, amount);
        toast({
          title: "Withdraw successful!",
          description: `You withdrew ${amount} BRD tokens from ${remix.title}`,
        });
      }
      setShowVoteModal(false);
      onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleEngagement = (type: 'like' | 'comment' | 'share') => {
    const messages = {
      like: 'You liked this remix!',
      comment: 'Comment functionality coming soon!',
      share: 'Share dialog will be implemented soon!'
    };
    
    toast({
      title: messages[type],
      duration: 2000,
    });
  };

  return (
    <>
      <Card className="overflow-hidden remix-card">
        <div className="flex flex-col md:flex-row">
          {/* Rank and Image Section */}
          <div className="relative md:w-1/4 flex-shrink-0">
            <div className="absolute top-2 left-2 z-10 w-8 h-8 rounded-full bg-brand-purple text-white flex items-center justify-center font-semibold">
              {rank}
            </div>
            <img 
              src={remix.coverImage || "/Images/t1.jpg"} 
              alt={remix.title}
              className="w-full h-48 md:h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "Audio Image";
              }}
            />
            <Button 
              variant="secondary" 
              size="icon"
              className="absolute bottom-3 right-3 rounded-full bg-white/90 hover:bg-white"
              onClick={handlePlayClick}
            >
              {isPlaying ? <Pause /> : <Play />}
            </Button>
          </div>

          {/* Content Section */}
          <div className="p-4 md:w-3/4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{remix.title}</h3>
                  <p className="text-sm text-gray-500">{remix.artist} • {formattedDate}</p>
                </div>
                {remix.roi.isPositive ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3" /> +{remix.roi.value}%
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-200 flex items-center border-0">
                    <TrendingDown className="mr-1 h-3 w-3" /> {remix.roi.value}%
                  </Badge>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 text-sm">
                <div className="p-2 rounded">
                  <p className="text-gray-500 text-xs">Token Price</p>
                  <p className="font-semibold">{remix.tokenPrice} BRD</p>
                </div>
                <div className="p-2 rounded">
                  <p className="text-gray-500 text-xs">Market Cap</p>
                  <p className="font-semibold">{remix.marketCap} BRD</p>
                </div>
                <div className="p-2 rounded">
                  <p className="text-gray-500 text-xs">Total Votes</p>
                  <p className="font-semibold">{remix.votes}</p>
                </div>
                <div className="p-2 rounded">
                  <p className="text-gray-500 text-xs">Listens</p>
                  <p className="font-semibold">{remix.totalListens.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Interaction Buttons */}
            <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
              <div className="flex space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600" 
                        onClick={() => handleEngagement('like')}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {remix.likes}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Like this remix</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600"
                        onClick={() => handleEngagement('comment')}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {remix.comments}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Comment on this remix</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600"
                        onClick={() => handleEngagement('share')}
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        {remix.shares}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Share this remix</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={handleVoteClick}>
                      <Award className="h-4 w-4 mr-2 text-brand-purple" />
                      Vote
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Listen to remix</DialogTitle>
                    </DialogHeader>
                    <AudioContests audioUrl={remix.audioUrl} title={remix.title} />
                  </DialogContent>
                </Dialog>
                
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-brand-purple hover:bg-brand-purple-dark"
                  onClick={handleVoteClick}
                >
                  Vote with BRD
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleWithdrawClick}
                >
                  Withdraw
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {showVoteModal && (
        <VoteModal
          isOpen={showVoteModal}
          onClose={() => setShowVoteModal(false)}
          onConfirm={handleVote}
          type={voteType}
          remixTitle={remix.title}
        />
      )}
    </>
  );
};

export default RemixCard;
