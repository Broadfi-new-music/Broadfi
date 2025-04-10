import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Gift, Flower, Crown, Diamond, Heart, Star, Wallet } from 'lucide-react';

interface Creator {
  id: string;
  name: string;
  avatar: string;
}

interface GiftingModalProps {
  isOpen: boolean;
  onClose: () => void;
  creator1: Creator;
  creator2: Creator;
}

interface GiftOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  value: number;
  color: string;
}

const GiftingModal = ({ isOpen, onClose, creator1, creator2 }: GiftingModalProps) => {
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null);
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  
  const giftOptions: GiftOption[] = [
    { id: 'heart', name: 'Heart', icon: <Heart className="h-6 w-6" />, value: 5, color: 'text-red-500' },
    { id: 'star', name: 'Star', icon: <Star className="h-6 w-6" />, value: 20, color: 'text-yellow-400' },
    { id: 'flower', name: 'Flower', icon: <Flower className="h-6 w-6" />, value: 50, color: 'text-pink-400' },
    { id: 'crown', name: 'Crown', icon: <Crown className="h-6 w-6" />, value: 100, color: 'text-amber-500' },
    { id: 'diamond', name: 'Diamond', icon: <Diamond className="h-6 w-6" />, value: 500, color: 'text-blue-400' },
  ];
  
  const selectedGiftOption = giftOptions.find(gift => gift.id === selectedGift);
  
  const handleSendGift = () => {
    if (selectedCreator && selectedGift) {
      const gift = giftOptions.find(g => g.id === selectedGift);
      const creator = selectedCreator === creator1.id ? creator1.name : creator2.name;
      
      if (gift) {
        toast.success(`You've sent a ${gift.name} to ${creator}!`);
      }
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Send Gifts with BRD Tokens
          </DialogTitle>
          <DialogDescription>
            Support creators with gifts that they can convert to real earnings.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2">
              <Wallet className="h-4 w-4" />
              <span className="text-sm">Your Balance: 1,250 BRD</span>
            </div>
          </div>
          
          {/* Select Creator */}
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Select Creator:</h4>
            <div className="grid grid-cols-2 gap-3">
              <div 
                className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer ${
                  selectedCreator === creator1.id ? 'border-primary bg-primary/10' : 'border-border'
                }`}
                onClick={() => setSelectedCreator(creator1.id)}
              >
                <img src={creator1.avatar} alt={creator1.name} className="w-8 h-8 rounded-full" />
                <span className="text-sm">{creator1.name}</span>
              </div>
              
              <div 
                className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer ${
                  selectedCreator === creator2.id ? 'border-primary bg-primary/10' : 'border-border'
                }`}
                onClick={() => setSelectedCreator(creator2.id)}
              >
                <img src={creator2.avatar} alt={creator2.name} className="w-8 h-8 rounded-full" />
                <span className="text-sm">{creator2.name}</span>
              </div>
            </div>
          </div>
          
          {/* Select Gift */}
          <div>
            <h4 className="text-sm font-medium mb-2">Select Gift:</h4>
            <div className="grid grid-cols-5 gap-2">
              {giftOptions.map((gift) => (
                <div
                  key={gift.id}
                  className={`flex flex-col items-center p-2 rounded-lg border cursor-pointer ${
                    selectedGift === gift.id ? 'border-primary bg-primary/10' : 'border-border'
                  }`}
                  onClick={() => setSelectedGift(gift.id)}
                >
                  <div className={gift.color}>{gift.icon}</div>
                  <span className="text-xs mt-1">{gift.value} BRD</span>
                </div>
              ))}
            </div>
          </div>
          
          {selectedGift && (
            <div className="mt-4 p-3 bg-muted rounded-lg text-center">
              <p className="text-sm">
                You will send a {selectedGiftOption?.name} worth {selectedGiftOption?.value} BRD
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            disabled={!selectedCreator || !selectedGift} 
            onClick={handleSendGift}
          >
            Send Gift
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GiftingModal;
