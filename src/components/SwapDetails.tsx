import React from "react";
import { formatAmount } from  "../lib/swap-utils";

interface SwapDetailsProps {
  exchangeRate: number;
  sourceToken: string;
  targetToken: string;
  gasFee: number;
  gasToken: string;
  estimatedTime?: string;
}

const SwapDetails: React.FC<SwapDetailsProps> = ({
  exchangeRate,
  sourceToken,
  targetToken,
  gasFee,
  gasToken,
  estimatedTime = "~1 minute",
}) => {
  return (
    <div className="p-4 bg-muted/30 rounded-lg space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Exchange Rate</span>
        <span className="font-medium">
          1 {sourceToken} = {formatAmount(exchangeRate, 6)} {targetToken}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Gas Fee</span>
        <span className="font-medium">
          {formatAmount(gasFee, 6)} {gasToken}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Estimated Time</span>
        <span className="font-medium">{estimatedTime}</span>
      </div>
      
      <div className="pt-2 text-xs text-muted-foreground">
        Cross-chain transactions may take longer depending on network conditions
      </div>
    </div>
  );
};

export default SwapDetails;
