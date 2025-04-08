import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatAmount } from  "../lib/swap-utils";
import { ArrowDown } from "lucide-react";

interface SwapConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sourceAmount: number;
  sourceToken: string;
  targetAmount: number;
  targetToken: string;
  targetChain: string;
  gasFee: number;
  isLoading: boolean;
}

const SwapConfirmation: React.FC<SwapConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  sourceAmount,
  sourceToken,
  targetAmount,
  targetToken,
  targetChain,
  gasFee,
  isLoading,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Confirm Swap</DialogTitle>
          <DialogDescription>
            Please review the details of your cross-chain swap
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-8">
          <div className="space-y-2">
            <div className="p-4 bg-muted/30 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">From</div>
                <div className="text-xl font-medium">
                  {formatAmount(sourceAmount)} {sourceToken}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="bg-muted/50 rounded-full p-2">
                <ArrowDown size={16} />
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">
                  To ({targetChain})
                </div>
                <div className="text-xl font-medium">
                  {formatAmount(targetAmount)} {targetToken}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Gas Fee</span>
              <span className="font-medium">
                {formatAmount(gasFee)} BROADFI
              </span>
            </div>
          </div>

          <div className="text-sm text-muted-foreground text-center">
            Confirm this transaction in your wallet
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-col gap-2">
          <Button
            onClick={onConfirm}
            className="w-full bg-broadfi hover:bg-broadfi-dark"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Confirm Swap"}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full"
            disabled={isLoading}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SwapConfirmation;
