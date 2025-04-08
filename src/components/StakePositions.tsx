import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useStaking } from '../context/StakingContext';
import { Clock, Calendar } from 'lucide-react';

const StakePositions: React.FC = () => {
  const { positions } = useStaking();

  // Calculate time progress for a position
  const calculateProgress = (startDate: number, endDate: number) => {
    const now = Date.now();
    const total = endDate - startDate;
    const elapsed = now - startDate;
    
    if (elapsed <= 0) return 0;
    if (elapsed >= total) return 100;
    
    return Math.floor((elapsed / total) * 100);
  };

  // Format time remaining
  const timeRemaining = (endDate: number) => {
    const now = Date.now();
    const remaining = endDate - now;
    
    if (remaining <= 0) return "Unlocked";
    
    const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    
    if (days > 0) {
      return `${days}d ${hours}h remaining`;
    }
    
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}h ${minutes}m remaining`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Staking Positions</CardTitle>
      </CardHeader>
      <CardContent>
        {positions.length > 0 ? (
          <div className="space-y-4">
            {positions.map((position) => (
              <div 
                key={position.id}
                className="border rounded-lg p-4 bg-card"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{position.amount} BRD</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" /> {position.duration} • {position.apy}% APY
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-success">+{position.reward} BRD earned</div>
                    <div className="text-xs text-muted-foreground">
                      Started {new Date(position.startDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {position.isUnlocked ? "Completed" : timeRemaining(position.endDate)}
                    </div>
                    <div>
                      {new Date(position.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <Progress 
                    value={calculateProgress(position.startDate, position.endDate)} 
                    className={position.isUnlocked ? "bg-success/20" : ""}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No Staking Positions Yet</h3>
            <p className="text-sm text-muted-foreground mb-6">Start staking your BRD tokens to earn rewards</p>
            <Button variant="outline">Stake Now</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StakePositions;
