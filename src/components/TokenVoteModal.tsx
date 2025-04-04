
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TokenVoteModalProps {
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

const TokenVoteModal: React.FC<TokenVoteModalProps> = ({ onClose, onSubmit }) => {
  const [tokenAmount, setTokenAmount] = useState<number>(10);

  const handleQuickAmount = (amount: number) => {
    setTokenAmount(amount);
  };

  const handleSubmit = () => {
    if (tokenAmount > 0) {
      onSubmit(tokenAmount);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-white mb-4">Vote with BRD tokens</h2>
        <div className="mb-4">
          <label className="block text-sm text-stream-gray mb-2">Amount of BRD tokens</label>
          <Input
            type="number"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(Number(e.target.value))}
            min={1}
            className="bg-stream-dark border-stream-gray text-white"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {[10, 50, 100, 500].map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAmount(amount)}
              className={`border-stream-gray ${
                tokenAmount === amount ? 'bg-stream-primary text-white' : 'text-white'
              }`}
            >
              {amount} BRD
            </Button>
          ))}
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} className="border-stream-gray text-white">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-stream-primary hover:bg-opacity-80 text-white">
            Vote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TokenVoteModal;
