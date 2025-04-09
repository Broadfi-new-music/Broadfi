import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Creator } from "@/types/livebattle";
import { Coins } from "lucide-react";

interface VoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  creator: Creator | null;
  currentVotes: number;
  onVote: (amount: number) => void;
}

const VoteDialog: React.FC<VoteDialogProps> = ({
  open,
  onOpenChange,
  creator,
  currentVotes,
  onVote
}) => {
  const [voteAmount, setVoteAmount] = useState(10);
  
  if (!creator) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Vote with BRD Tokens</DialogTitle>
          <DialogDescription>
            Support your favorite creator by voting with BRD tokens. The more tokens you vote, the higher their chances of winning.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={creator.avatar} />
              <AvatarFallback>{creator.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{creator.username}</p>
              <p className="text-sm text-muted-foreground">Current votes: {currentVotes} BRD</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="vote-amount" className="text-sm font-medium">
              Amount to vote (BRD)
            </label>
            <Input
              id="vote-amount"
              type="number"
              min="1"
              value={voteAmount}
              onChange={(e) => setVoteAmount(Number(e.target.value))}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => setVoteAmount(10)}
              variant="outline"
              className="flex-1"
            >
              10 BRD
            </Button>
            <Button
              onClick={() => setVoteAmount(50)}
              variant="outline"
              className="flex-1"
            >
              50 BRD
            </Button>
            <Button
              onClick={() => setVoteAmount(100)}
              variant="outline"
              className="flex-1"
            >
              100 BRD
            </Button>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onVote(voteAmount)} className="gap-1">
            <Coins className="h-4 w-4" />
            Vote {voteAmount} BRD
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VoteDialog;
