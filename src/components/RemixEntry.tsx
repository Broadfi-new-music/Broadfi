import React, { useState } from "react";
import { ArrowUp, ArrowDown, Headphones, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioPlayer from "../../AudioPlayer";
import VotingModal from "./VotingModal";
import { cn } from "@/lib/utils";

interface RemixEntryProps {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl: string;
  plays: number;
  tokenPrice: number;
  priceChange: number;
  marketCap: number;
  votedAmount: number;
  position: number;
  positionChange: number;
  userBalance: number;
  onVote: (id: string, amount: number) => void;
  onWithdraw: (id: string) => void;
  className?: string;
}

const RemixEntry = ({
  id,
  title,
  artist,
  audioUrl,
  coverUrl,
  plays,
  tokenPrice,
  priceChange,
  marketCap,
  votedAmount,
  position,
  positionChange,
  userBalance,
  onVote,
  onWithdraw,
  className,
}: RemixEntryProps) => {
  const [expanded, setExpanded] = useState(false);
  const [votingOpen, setVotingOpen] = useState(false);

  const handleVote = (amount: number) => {
    onVote(id, amount);
  };

  const handleWithdraw = () => {
    onWithdraw(id);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K";
    } else {
      return num.toFixed(2);
    }
  };

  return (
    <>
      <div 
        className={cn("bg-black/40 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden", className)}
      >
        <div className="p-4">
          <div className="flex items-center">
            <div className="w-8 text-center mr-2">
              <span className="text-white/70 text-sm font-medium">{position}</span>
              <div className="flex justify-center mt-1">
                {positionChange > 0 ? (
                  <ArrowUp className="h-3 w-3 text-positive" />
                ) : positionChange < 0 ? (
                  <ArrowDown className="h-3 w-3 text-negative" />
                ) : (
                  <div className="h-3 w-3 bg-white/20 rounded-full"></div>
                )}
              </div>
            </div>
            
            <div 
              className="flex-shrink-0 mr-3 cursor-pointer" 
              onClick={() => setExpanded(!expanded)}
            >
              <div className="relative w-12 h-12 rounded-md overflow-hidden">
                <img 
                  src={coverUrl} 
                  alt={title} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            
            <div className="flex-1 min-w-0 mr-4" onClick={() => setExpanded(!expanded)}>
              <h3 className="text-white font-medium truncate cursor-pointer">{title}</h3>
              <p className="text-white/60 text-sm truncate">{artist}</p>
            </div>
            
            <div className="hidden md:flex items-center justify-end space-x-6 flex-shrink-0 flex-1">
              <div className="flex flex-col items-end">
                <div className="flex items-center">
                  <Headphones className="h-3 w-3 mr-1 text-white/50" />
                  <span className="text-sm text-white/70">{formatNumber(plays)}</span>
                </div>
                <span className="text-xs text-white/50">Plays</span>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="flex items-center">
                  <DollarSign className="h-3 w-3 mr-1 text-white/50" />
                  <span className="text-sm text-white/70">{tokenPrice.toFixed(4)} BRD</span>
                </div>
                <span className={`text-xs ${priceChange >= 0 ? 'text-positive text-green-600' : 'text-negative text-red-600'}`}>
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                </span>
              </div>
              
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-sm text-white/70">{formatNumber(marketCap)} BRD</span>
                <span className="text-xs text-white/50">Market Cap</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 border-primary text-white"
                onClick={() => setVotingOpen(true)}
              >
                Vote
              </Button>
              
              {votedAmount > 0 && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="h-8"
                  onClick={handleWithdraw}
                >
                  Withdraw
                </Button>
              )}
            </div>
          </div>
          
          {expanded && (
            <div className="mt-4">
              <AudioPlayer
                title={title}
                artist={artist}
                coverUrl={coverUrl}
                audioUrl={audioUrl}
                likes={Math.floor(marketCap / tokenPrice / 10)}
                comments={Math.floor(plays / 100)}
              />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-black/30 rounded-md p-3">
                  <span className="text-xs text-white/50">Your Votes</span>
                  <div className="text-white font-medium mt-1">{votedAmount.toFixed(2)} BRD</div>
                </div>
                
                <div className="bg-black/30 rounded-md p-3">
                  <span className="text-xs text-white/50">Token Price</span>
                  <div className="flex items-baseline mt-1">
                    <span className="text-white font-medium">{tokenPrice.toFixed(4)} BRD</span>
                    <span className={`text-xs ml-1 ${priceChange >= 0 ? 'text-positive' : 'text-negative'}`}>
                      {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                    </span>
                  </div>
                </div>
                
                <div className="bg-black/30 rounded-md p-3">
                  <span className="text-xs text-white/50">Total Plays</span>
                  <div className="text-white font-medium mt-1">{formatNumber(plays)}</div>
                </div>
                
                <div className="bg-black/30 rounded-md p-3">
                  <span className="text-xs text-white/50">Market Cap</span>
                  <div className="text-white font-medium mt-1">{formatNumber(marketCap)} BRD</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <VotingModal
        open={votingOpen}
        onOpenChange={setVotingOpen}
        trackTitle={title}
        artistName={artist}
        balance={userBalance}
        onVote={handleVote}
      />
    </>
  );
};

export default RemixEntry;
