import { useState } from 'react';
import { ArrowDownUp, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface StakingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  podcastId: string;
  podcastTitle: string;
  tokenPrice: number;
  onStake: (amount: number) => void;
  onWithdraw: (amount: number) => void;
  userStakedAmount?: number;
}

const StakingModal = ({ 
  open, 
  onOpenChange, 
  podcastId, 
  podcastTitle, 
  tokenPrice, 
  onStake, 
  onWithdraw,
  userStakedAmount = 0
}: StakingModalProps) => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [activeTab, setActiveTab] = useState("stake");
  const { toast } = useToast();

  const handleStakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(stakeAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid amount to stake"
      });
      return;
    }
    
    onStake(amount);
    setStakeAmount("");
    toast({
      title: "Tokens staked successfully",
      description: `You've staked ${amount.toFixed(3)} BRD tokens to "${podcastTitle}"`
    });
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid amount to withdraw"
      });
      return;
    }
    
    if (amount > userStakedAmount) {
      toast({
        variant: "destructive",
        title: "Insufficient staked amount",
        description: `You only have ${userStakedAmount.toFixed(3)} BRD tokens staked`
      });
      return;
    }
    
    onWithdraw(amount);
    setWithdrawAmount("");
    toast({
      title: "Tokens withdrawn successfully",
      description: `You've withdrawn ${amount.toFixed(3)} BRD tokens from "${podcastTitle}"`
    });
  };

  const handleMaxStake = () => {
    // This would typically fetch the user's wallet balance
    // For demo purposes we'll use a placeholder value
    const maxAmount = 100;
    setStakeAmount(maxAmount.toString());
  };

  const handleMaxWithdraw = () => {
    setWithdrawAmount(userStakedAmount.toString());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Stake Tokens</DialogTitle>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6" 
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">Podcast</p>
            <p className="font-medium">{podcastTitle}</p>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Token Price</p>
              <p className="font-medium">{tokenPrice.toFixed(3)} BRD</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Your Stake</p>
              <p className="font-medium">{userStakedAmount.toFixed(3)} BRD</p>
            </div>
          </div>
          
          <Tabs 
            defaultValue="stake" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stake">Stake</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stake">
              <form onSubmit={handleStakeSubmit} className="space-y-4 pt-4">
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Enter amount to stake"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="pr-16"
                    step="any"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleMaxStake}
                    className="absolute right-1 top-1 h-8 px-2 text-xs"
                  >
                    MAX
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Staking increases token price and provides ROI
                  </p>
                </div>
                
                <Button type="submit" className="w-full bg-brd hover:bg-brdDark">
                  Stake Tokens
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="withdraw">
              <form onSubmit={handleWithdrawSubmit} className="space-y-4 pt-4">
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Enter amount to withdraw"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="pr-16"
                    step="any"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleMaxWithdraw}
                    className="absolute right-1 top-1 h-8 px-2 text-xs"
                  >
                    MAX
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Withdrawing decreases token price
                  </p>
                </div>
                
                <Button type="submit" className="w-full bg-brd hover:bg-brdDark">
                  Withdraw Tokens
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StakingModal;
