
import React from 'react';
import { Button } from '@/components/ui/button';

interface Gift {
  id: string;
  name: string;
  icon: string;
  price: number;
}

interface GiftModalProps {
  onClose: () => void;
  onSelect: (giftType: string) => void;
}

const GiftModal: React.FC<GiftModalProps> = ({ onClose, onSelect }) => {
  const gifts: Gift[] = [
    { id: 'flower', name: 'Flower', icon: '🌹', price: 50 },
    { id: 'lion', name: 'Lion', icon: '🦁', price: 500 },
    { id: 'crown', name: 'Crown', icon: '👑', price: 1000 },
    { id: 'diamond', name: 'Diamond', icon: '💎', price: 5000 },
    { id: 'rocket', name: 'Rocket', icon: '🚀', price: 10000 },
    { id: 'heart', name: 'Heart', icon: '❤️', price: 100 },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-white mb-4">Send a Gift</h2>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          {gifts.map((gift) => (
            <div 
              key={gift.id}
              onClick={() => onSelect(gift.id)}
              className="flex flex-col items-center p-3 rounded-lg border border-stream-gray bg-stream-dark hover:border-stream-primary cursor-pointer transition-all"
            >
              <span className="text-3xl mb-1">{gift.icon}</span>
              <span className="text-sm text-white">{gift.name}</span>
              <span className="text-xs text-stream-secondary">{gift.price} BRD</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose} className="border-stream-gray text-white">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GiftModal;
