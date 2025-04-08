import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { useStaking } from '@/context/StakingContext';

interface StakingOption {
  id: string;
  duration: string;
  period: number; // in days
  apy: number;
}

const stakingOptions: StakingOption[] = [
  { id: "3w", duration: "3 Weeks", period: 21, apy: 5.2 },
  { id: "6w", duration: "6 Weeks", period: 42, apy: 7.8 },
  { id: "3m", duration: "3 Months", period: 90, apy: 12.5 },
];

const StakeForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>(stakingOptions[0].id);
  const { toast } = useToast();
  const { stake } = useStaking();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numeric input with up to 6 decimal places
    const value = e.target.value;
    if (value === "" || /^\d+(\.\d{0,6})?$/.test(value)) {
      setAmount(value);
    }
  };

  const handleMaxClick = () => {
    // In a real app, this would get the actual balance
    setAmount('1000');
  };

  const handleStake = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid amount to stake.",
      });
      return;
    }

    const option = stakingOptions.find(opt => opt.id === selectedOption);
    if (!option) return;

    stake(parseFloat(amount), option);

    toast({
      title: "Tokens Staked Successfully",
      description: `You have staked ${amount} BRD for ${option.duration}.`,
    });

    // Reset form
    setAmount('');
  };

  // Calculate potential rewards for selected option and amount
  const calculateReward = () => {
    if (!amount || parseFloat(amount) <= 0) return "0.00";
    
    const option = stakingOptions.find(opt => opt.id === selectedOption);
    if (!option) return "0.00";
    
    const principal = parseFloat(amount);
    const apy = option.apy / 100;
    const periodInYears = option.period / 365;
    const reward = principal * apy * periodInYears;
    
    return reward.toFixed(2);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="amount">Amount</Label>
          <span className="text-xs text-muted-foreground">
            Balance: 1000 BRD
          </span>
        </div>
        <div className="flex space-x-2">
          <Input
            id="amount"
            type="text"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
          />
          <Button variant="outline" size="sm" onClick={handleMaxClick}>
            MAX
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Lock Period</Label>
        <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
          {stakingOptions.map((option) => (
            <div key={option.id} className="mb-2">
              <Card className="overflow-hidden">
                <label
                  htmlFor={`option-${option.id}`}
                  className={`flex cursor-pointer items-center justify-between p-3 ${
                    selectedOption === option.id ? 'bg-primary/5 border-primary' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                    <div>
                      <div className="font-medium">{option.duration}</div>
                      <div className="text-xs text-muted-foreground">Lock until reward distribution</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-success">{option.apy}% APY</div>
                  </div>
                </label>
              </Card>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="rounded-md bg-muted p-3 space-y-1">
        <div className="flex justify-between text-sm">
          <span>Expected Reward</span>
          <span className="font-semibold text-success">+{calculateReward()} BRD</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Unlock Date</span>
          <span>
            {new Date(
              Date.now() +
                (stakingOptions.find(opt => opt.id === selectedOption)?.period || 0) * 24 * 60 * 60 * 1000
            ).toLocaleDateString()}
          </span>
        </div>
      </div>

      <Button className="w-full" onClick={handleStake}>
        Stake BRD
      </Button>
    </div>
  );
};

export default StakeForm;
