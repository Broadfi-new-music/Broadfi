import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PrizePool {
  position: number;
  amount: string;
}

interface PrizePoolInputProps {
  prizes: PrizePool[];
  onChange: (prizes: PrizePool[]) => void;
  className?: string;
}

const PrizePoolInput: React.FC<PrizePoolInputProps> = ({
  prizes,
  onChange,
  className,
}) => {
  const addPrize = () => {
    const newPosition = prizes.length + 1;
    onChange([...prizes, { position: newPosition, amount: "" }]);
  };

  const removePrize = (index: number) => {
    const newPrizes = prizes.filter((_, i) => i !== index).map((prize, i) => ({
      ...prize,
      position: i + 1,
    }));
    onChange(newPrizes);
  };

  const updatePrizeAmount = (index: number, amount: string) => {
    // Only allow numbers and decimal points
    if (!/^(\d*\.?\d*)$/.test(amount) && amount !== "") return;
    
    const newPrizes = [...prizes];
    newPrizes[index] = { ...newPrizes[index], amount };
    onChange(newPrizes);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Prize Pool</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addPrize}
          disabled={prizes.length >= 10}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          <span>Add Prize</span>
        </Button>
      </div>

      <div className="space-y-2">
        {prizes.map((prize, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
              {prize.position}
            </div>
            <div className="flex-1 flex items-center">
              <div className="relative flex-1">
                <Input
                  value={prize.amount}
                  onChange={(e) => updatePrizeAmount(index, e.target.value)}
                  placeholder="0.00"
                  className="pl-7"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removePrize(index)}
              className="h-9 w-9 text-muted-foreground hover:text-destructive"
              disabled={prizes.length <= 1}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrizePoolInput;
