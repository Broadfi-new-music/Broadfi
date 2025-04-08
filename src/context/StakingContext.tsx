import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface StakingOption {
  id: string;
  duration: string;
  period: number; // in days
  apy: number;
}

interface StakingPosition {
  id: string;
  amount: number;
  startDate: number;
  endDate: number;
  duration: string;
  apy: number;
  reward: number;
  isUnlocked: boolean;
}

interface StakingContextType {
  positions: StakingPosition[];
  stake: (amount: number, option: StakingOption) => void;
  unstake: (positionId: string, amount: number) => void;
}

const StakingContext = createContext<StakingContextType | undefined>(undefined);

export const StakingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [positions, setPositions] = useState<StakingPosition[]>([]);
  const { toast } = useToast();
  
  // Load positions from local storage on mount
  useEffect(() => {
    const savedPositions = localStorage.getItem('brd-staking-positions');
    if (savedPositions) {
      try {
        setPositions(JSON.parse(savedPositions));
      } catch (error) {
        console.error("Failed to parse saved positions:", error);
      }
    } else {
      // Add some demo positions if none exist
      const demoPositions = [
        {
          id: '1',
          amount: 500,
          startDate: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 days ago
          endDate: Date.now() + 6 * 24 * 60 * 60 * 1000, // 6 days in future
          duration: '3 Weeks',
          apy: 5.2,
          reward: 4.23,
          isUnlocked: false
        },
        {
          id: '2',
          amount: 250,
          startDate: Date.now() - 45 * 24 * 60 * 60 * 1000, // 45 days ago
          endDate: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
          duration: '6 Weeks',
          apy: 7.8,
          reward: 8.52,
          isUnlocked: true
        }
      ];
      setPositions(demoPositions);
      localStorage.setItem('brd-staking-positions', JSON.stringify(demoPositions));
    }
  }, []);
  
  // Update local storage when positions change
  useEffect(() => {
    localStorage.setItem('brd-staking-positions', JSON.stringify(positions));
  }, [positions]);
  
  // Update positions unlocked status every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPositions(prevPositions => 
        prevPositions.map(position => ({
          ...position,
          isUnlocked: Date.now() >= position.endDate
        }))
      );
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const stake = (amount: number, option: StakingOption) => {
    const now = Date.now();
    const endDate = now + option.period * 24 * 60 * 60 * 1000;
    
    // Calculate expected reward
    const apy = option.apy / 100;
    const periodInYears = option.period / 365;
    const expectedReward = amount * apy * periodInYears;
    
    const newPosition: StakingPosition = {
      id: `pos_${now}_${Math.random().toString(36).substring(2, 9)}`,
      amount,
      startDate: now,
      endDate,
      duration: option.duration,
      apy: option.apy,
      reward: parseFloat(expectedReward.toFixed(2)),
      isUnlocked: false
    };
    
    setPositions(prev => [...prev, newPosition]);
  };
  
  const unstake = (positionId: string, amount: number) => {
    setPositions(prevPositions => 
      prevPositions.map(position => {
        if (position.id === positionId) {
          const newAmount = position.amount - amount;
          
          // If fully unstaked, remove the position
          if (newAmount <= 0) {
            return null;
          }
          
          // Partially unstake
          return {
            ...position,
            amount: newAmount,
            // Recalculate reward proportionally
            reward: (position.reward * newAmount) / position.amount
          };
        }
        return position;
      }).filter(Boolean) as StakingPosition[]
    );
  };
  
  return (
    <StakingContext.Provider value={{ positions, stake, unstake }}>
      {children}
    </StakingContext.Provider>
  );
};

export const useStaking = (): StakingContextType => {
  const context = useContext(StakingContext);
  if (context === undefined) {
    throw new Error('useStaking must be used within a StakingProvider');
  }
  return context;
};
