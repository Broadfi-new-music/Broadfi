import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VotingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trackTitle: string;
  artistName: string;
  balance: number;
  onVote: (amount: number) => void;
}

const VotingModal = ({
  open,
  onOpenChange,
  trackTitle,
  artistName,
  balance,
  onVote,
}: VotingModalProps) => {
  const [amount, setAmount] = useState(1);
  const { toast } = useToast();

  const handleVote = () => {
    if (amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter an amount greater than 0",
        variant: "destructive",
      });
      return;
    }

    if (amount > balance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough BRD tokens",
        variant: "destructive",
      });
      return;
    }

    onVote(amount);
    onOpenChange(false);
    
    toast({
      title: "Vote successful!",
      description: `You voted ${amount} BRD tokens for "${trackTitle}"`,
    });
  };

  const handleSliderChange = (value: number[]) => {
    setAmount(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= balance) {
      setAmount(value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border border-white/10 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-gradient">Vote with BRD Tokens</DialogTitle>
          <DialogDescription>
            Support "{trackTitle}" by {artistName} with your BRD tokens
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          <div className="bg-muted p-3 rounded-md flex items-center justify-between">
            <div className="flex items-center">
              <Wallet className="h-5 w-5 mr-2 text-primary" />
              <span className="text-sm">Available Balance</span>
            </div>
            <span className="font-bold">{balance.toFixed(2)} BRD</span>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/70">Amount to Vote</label>
            <div className="flex items-center space-x-2">
              <Slider
                value={[amount]}
                min={0.1}
                max={balance}
                step={0.1}
                onValueChange={handleSliderChange}
                className="flex-1"
              />
              <div className="relative w-24">
                <Input
                  type="number"
                  value={amount}
                  onChange={handleInputChange}
                  className="pr-8"
                  min={0.1}
                  max={balance}
                  step={0.1}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/50">
                  BRD
                </span>
              </div>
            </div>
          </div>

          <div className="bg-muted p-3 rounded-md">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-white/70">Voting Amount</span>
              <span>{amount.toFixed(2)} BRD</span>
            </div>
            <div className="h-1 w-full bg-black/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                style={{ width: `${(amount / balance) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button onClick={handleVote} className="flex-1 sm:flex-none">
            Vote Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VotingModal;
