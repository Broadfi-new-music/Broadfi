import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useStaking } from "../context/StakingContext";

const UnstakeForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const { toast } = useToast();
  const { positions, unstake } = useStaking();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numeric input with up to 6 decimal places
    const value = e.target.value;
    if (value === "" || /^\d+(\.\d{0,6})?$/.test(value)) {
      setAmount(value);
    }
  };

  const handleMaxClick = () => {
    if (!selectedPosition) return;
    
    const position = positions.find(p => p.id === selectedPosition);
    if (position) {
      setAmount(position.amount.toString());
    }
  };

  const handleUnstake = () => {
    if (!selectedPosition) {
      toast({
        variant: "destructive",
        title: "No position selected",
        description: "Please select a staking position to unstake from.",
      });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid amount to unstake.",
      });
      return;
    }

    const position = positions.find(p => p.id === selectedPosition);
    if (!position) return;

    if (parseFloat(amount) > position.amount) {
      toast({
        variant: "destructive",
        title: "Insufficient staked amount",
        description: `You only have ${position.amount} BRD staked in this position.`,
      });
      return;
    }

    unstake(position.id, parseFloat(amount));

    toast({
      title: "Tokens Unstaked Successfully",
      description: `You have unstaked ${amount} BRD.`,
    });

    // Reset form
    setAmount('');
    setSelectedPosition('');
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="position">Select Position</Label>
        <Select value={selectedPosition} onValueChange={setSelectedPosition}>
          <SelectTrigger id="position">
            <SelectValue placeholder="Select a staking position" />
          </SelectTrigger>
          <SelectContent>
            {positions.length > 0 ? (
              positions.map((position) => (
                <SelectItem key={position.id} value={position.id}>
                  {position.amount} BRD ({position.duration})
                </SelectItem>
              ))
            ) : (
              <SelectItem value="none" disabled>
                No staked positions found
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="unstake-amount">Amount</Label>
          <span className="text-xs text-muted-foreground">
            Staked: {selectedPosition ? 
              positions.find(p => p.id === selectedPosition)?.amount || 0 : 
              0} BRD
          </span>
        </div>
        <div className="flex space-x-2">
          <Input
            id="unstake-amount"
            type="text"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
            disabled={!selectedPosition}
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleMaxClick}
            disabled={!selectedPosition}
          >
            MAX
          </Button>
        </div>
      </div>

      {selectedPosition && (
        <div className="rounded-md bg-muted p-3 space-y-1">
          <div className="flex justify-between text-sm">
            <span>Unlock Status</span>
            <span>
              {positions.find(p => p.id === selectedPosition)?.isUnlocked ? (
                <span className="text-success">Available to Unstake</span>
              ) : (
                <span className="text-amber-500">Locked</span>
              )}
            </span>
          </div>
          {!positions.find(p => p.id === selectedPosition)?.isUnlocked && (
            <div className="flex justify-between text-sm">
              <span>Early Unstaking Fee</span>
              <span className="text-destructive">10%</span>
            </div>
          )}
        </div>
      )}

      <Button 
        className="w-full" 
        onClick={handleUnstake}
        disabled={!selectedPosition || !amount || parseFloat(amount) <= 0}
      >
        Unstake BRD
      </Button>
    </div>
  );
};

export default UnstakeForm;
