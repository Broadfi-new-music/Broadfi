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
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { Wallet, Medal } from 'lucide-react';

interface Creator {
  id: string;
  name: string;
  avatar: string;
}

interface VotingModalProps {
  isOpen: boolean;
  onClose: () => void;
  creator1: Creator;
  creator2: Creator;
}

const VotingModal = ({ isOpen, onClose, creator1, creator2 }: VotingModalProps) => {
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null);
  const [amount, setAmount] = useState('10');
  
  const handleVote = () => {
    toast.success(`You've successfully voted with ${amount} BRD tokens!`);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Medal className="h-5 w-5 text-yellow-500" />
            Vote with BRD Tokens
          </DialogTitle>
          <DialogDescription>
            Support your favorite creator in this battle with BRD tokens.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2">
              <Wallet className="h-4 w-4" />
              <span className="text-sm">Your Balance: 1,250 BRD</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div 
              className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer ${
                selectedCreator === creator1.id ? 'border-primary bg-primary/10' : 'border-border'
              }`}
              onClick={() => setSelectedCreator(creator1.id)}
            >
              <img src={creator1.avatar} alt={creator1.name} className="w-16 h-16 rounded-full mb-3" />
              <h4 className="font-medium text-sm">{creator1.name}</h4>
            </div>
            
            <div 
              className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer ${
                selectedCreator === creator2.id ? 'border-primary bg-primary/10' : 'border-border'
              }`}
              onClick={() => setSelectedCreator(creator2.id)}
            >
              <img src={creator2.avatar} alt={creator2.name} className="w-16 h-16 rounded-full mb-3" />
              <h4 className="font-medium text-sm">{creator2.name}</h4>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm">Amount (BRD Tokens)</label>
            <div className="flex gap-2">
              {['10', '50', '100', '500'].map((value) => (
                <Button 
                  key={value}
                  type="button" 
                  variant={amount === value ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setAmount(value)}
                >
                  {value}
                </Button>
              ))}
            </div>
            <Input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              className="mt-2"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            disabled={!selectedCreator} 
            onClick={handleVote}
          >
            Vote Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VotingModal;
