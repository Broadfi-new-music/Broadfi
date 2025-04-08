import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Playlist } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StakingPanelProps {
  playlist: Playlist;
}

const StakingPanel = ({ playlist }: StakingPanelProps) => {
  const { currentUser, stakeTokens, withdrawTokens } = useApp();
  const [stakeAmount, setStakeAmount] = useState<string>("0");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("0");
  
  const userStakedAmount = currentUser.stakedPlaylists[playlist.id] || 0;
  
  const handleStake = () => {
    const amount = parseFloat(stakeAmount);
    if (!isNaN(amount) && amount > 0) {
      stakeTokens(playlist.id, amount);
      setStakeAmount("0");
    }
  };
  
  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!isNaN(amount) && amount > 0) {
      withdrawTokens(playlist.id, amount);
      setWithdrawAmount("0");
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Staking Dashboard</CardTitle>
        <CardDescription>
          Stake BRD tokens to this playlist to earn returns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="rounded-lg bg-secondary p-3">
              <h4 className="text-sm text-muted-foreground">Your Wallet Balance</h4>
              <div className="text-xl font-semibold">{currentUser.walletBalance.toFixed(2)} BRD</div>
            </div>
            
            <div className="rounded-lg bg-secondary p-3">
              <h4 className="text-sm text-muted-foreground">Your Staked Amount</h4>
              <div className="text-xl font-semibold">{userStakedAmount.toFixed(2)} BRD</div>
            </div>
            
            <div className="rounded-lg bg-secondary p-3">
              <h4 className="text-sm text-muted-foreground">Expected ROI</h4>
              <div className="text-xl font-semibold text-green-500 flex items-center">
                <TrendingUp className="mr-1 h-5 w-5" />
                {playlist.roi.toFixed(1)}%
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Stake Tokens</h4>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder="Amount to stake"
                  min="0"
                  step="0.1"
                />
                <Button onClick={handleStake} className="bg-brand hover:bg-brand-dark">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Stake
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Withdraw Tokens</h4>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Amount to withdraw"
                  min="0"
                  max={userStakedAmount.toString()}
                  step="0.1"
                />
                <Button 
                  onClick={handleWithdraw} 
                  variant="outline"
                  className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <TrendingDown className="mr-2 h-4 w-4" />
                  Withdraw
                </Button>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-3 text-sm">
              <p className="mb-2 text-muted-foreground">Token Price Impact:</p>
              <ul className="space-y-1.5 ml-5 list-disc text-muted-foreground">
                <li>Staking increases token price and ROI</li>
                <li>Withdrawing decreases token price and ROI</li>
                <li>Earn returns based on playlist performance</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StakingPanel;
