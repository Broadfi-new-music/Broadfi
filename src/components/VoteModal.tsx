import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface VoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  type: 'vote' | 'withdraw';
  remixTitle: string;
}

const VoteModal: React.FC<VoteModalProps> = ({ isOpen, onClose, onConfirm, type, remixTitle }) => {
  const [amount, setAmount] = useState<number>(100);
  const [error, setError] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (type === 'withdraw' && amount > 1000) {
      // This is just for demo - normally you'd check against actual held tokens
      setError('You cannot withdraw more than you have staked');
      return;
    }
    
    onConfirm(amount);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
    setError('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {type === 'vote' 
              ? `Vote for "${remixTitle}" with BRD tokens` 
              : `Withdraw BRD tokens from "${remixTitle}"`}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">BRD Tokens</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                min={1}
                className={error ? 'border-red-500' : ''}
                placeholder="Enter amount of BRD tokens"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
            
            {type === 'vote' ? (
              <p className="text-sm text-gray-500">
                Voting increases the token price and market cap of this remix.
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                Withdrawing decreases the token price and market cap of this remix.
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button 
              type="submit" 
              className={type === 'vote' 
                ? 'bg-brand-purple hover:bg-brand-purple-dark' 
                : 'bg-amber-500 hover:bg-amber-600'
              }
            >
              {type === 'vote' ? 'Confirm Vote' : 'Confirm Withdrawal'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VoteModal;
