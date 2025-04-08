import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowDown } from "lucide-react";
import TokenSelect from "../components/TokenSelect";
import ChainSelect from "./ChainSelect";
import AmountInput from "./AmountInput";
import SwapDetails from "../components/SwapDetails";
import SwapConfirmation from "./SwapConfirmation";
import {
  BROADFI_TOKEN,
  AVAILABLE_TOKENS,
  AVAILABLE_CHAINS,
  EXCHANGE_RATES,
} from  "../lib/token-data";
import {
  calculateReceiveAmount,
  calculateGasFee,
  parseInputAmount,
  executeSwap,
} from "../lib/swap-utils";

const SwapCard: React.FC = () => {
  const { toast } = useToast();
  const [sourceAmount, setSourceAmount] = useState("");
  const [selectedTargetToken, setSelectedTargetToken] = useState(AVAILABLE_TOKENS[0]);
  const [selectedChain, setSelectedChain] = useState(AVAILABLE_CHAINS[0]);
  const [slippage, setSlippage] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  // Calculate estimated receive amount
  const parsedAmount = parseInputAmount(sourceAmount);
  const receiveAmount = calculateReceiveAmount(
    parsedAmount,
    BROADFI_TOKEN.id,
    selectedTargetToken.id
  );
  const gasFee = calculateGasFee();

  // Get exchange rate
  const exchangeRate = EXCHANGE_RATES[`${BROADFI_TOKEN.id}-${selectedTargetToken.id}`] || 0;

  // Handle token selection
  const handleTargetTokenChange = (tokenId: string) => {
    const token = AVAILABLE_TOKENS.find((t) => t.id === tokenId);
    if (token) {
      setSelectedTargetToken(token);
    }
  };

  // Handle chain selection
  const handleChainChange = (chainId: string) => {
    const chain = AVAILABLE_CHAINS.find((c) => c.id === chainId);
    if (chain) {
      setSelectedChain(chain);
    }
  };

  // Handle swap button click
  const handleSwapClick = () => {
    if (!walletConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to continue",
        variant: "destructive",
      });
      return;
    }

    if (parsedAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to swap",
        variant: "destructive",
      });
      return;
    }

    setConfirmationOpen(true);
  };

  // Handle swap confirmation
  const handleConfirmSwap = async () => {
    setIsSwapping(true);

    try {
      const result = await executeSwap(
        parsedAmount,
        BROADFI_TOKEN.id,
        selectedTargetToken.id,
        selectedChain.id
      );

      if (result.success) {
        toast({
          title: "Swap successful",
          description: `Successfully swapped ${parsedAmount} BROADFI to ${receiveAmount.toFixed(6)} ${selectedTargetToken.symbol}`,
        });
        setSourceAmount("");
      } else {
        toast({
          title: "Swap failed",
          description: result.error || "An error occurred during the swap",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Swap failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSwapping(false);
      setConfirmationOpen(false);
    }
  };

  // Connect wallet function (mock)
  const connectWallet = () => {
    setWalletConnected(true);
    toast({
      title: "Wallet connected",
      description: "Successfully connected to wallet",
    });
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto bg-card/40 backdrop-blur border-muted/30">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold">Cross-Chain Swap</CardTitle>
            {walletConnected ? (
              <Button
                variant="outline"
                className="text-xs h-8 px-3 bg-muted/50 hover:bg-muted border-muted-foreground/20"
              >
                0x1234...5678
              </Button>
            ) : (
              <Button 
                onClick={connectWallet}
                className="text-xs h-8 px-3 bg-broadfi hover:bg-broadfi-dark"
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* From section */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="sourceAmount">You Pay</Label>
              <div className="text-sm text-muted-foreground">
                Balance: 100.00 BROADFI
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <AmountInput
                  amount={sourceAmount}
                  onChange={setSourceAmount}
                  max={100}
                />
              </div>
              <div className="w-1/3">
                <div className="relative h-14 flex items-center px-4 rounded-md bg-muted border border-muted-foreground/20">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                      <img
                        src={BROADFI_TOKEN.logo}
                        alt={BROADFI_TOKEN.symbol}
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                    <span className="font-medium">{BROADFI_TOKEN.symbol}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center relative h-8">
            <div className="absolute -left-4 -right-4">
              <Separator />
            </div>
            <div className="bg-muted/50 w-10 h-10 rounded-full flex items-center justify-center z-10">
              <ArrowDown size={20} />
            </div>
          </div>

          {/* To section */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="targetAmount">You Receive</Label>
              <div className="text-sm text-muted-foreground">
                On: {selectedChain.name}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <AmountInput
                  amount={receiveAmount.toFixed(6)}
                  onChange={() => {}}
                  disabled={true}
                />
              </div>
              <div className="w-1/3">
                <TokenSelect
                  tokens={AVAILABLE_TOKENS}
                  selectedToken={selectedTargetToken}
                  onTokenChange={handleTargetTokenChange}
                />
              </div>
            </div>
          </div>

          {/* Chain select */}
          <div className="space-y-2">
            <Label htmlFor="targetChain">Target Chain</Label>
            <ChainSelect
              chains={AVAILABLE_CHAINS}
              selectedChain={selectedChain}
              onChainChange={handleChainChange}
            />
          </div>

          {/* Slippage */}
          <div className="flex items-center justify-between space-x-2 p-3 bg-muted/30 rounded-lg">
            <Label htmlFor="slippage" className="cursor-pointer">
              Advanced slippage protection
            </Label>
            <Switch
              id="slippage"
              checked={slippage}
              onCheckedChange={setSlippage}
            />
          </div>

          {/* Swap details */}
          <SwapDetails
            exchangeRate={exchangeRate}
            sourceToken={BROADFI_TOKEN.symbol}
            targetToken={selectedTargetToken.symbol}
            gasFee={gasFee}
            gasToken={BROADFI_TOKEN.symbol}
          />

          {/* Swap button */}
          <Button
            className="w-full bg-broadfi hover:bg-broadfi-dark h-14 text-lg"
            onClick={handleSwapClick}
            disabled={parseInputAmount(sourceAmount) <= 0}
          >
            Swap
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation modal */}
      <SwapConfirmation
        isOpen={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={handleConfirmSwap}
        sourceAmount={parsedAmount}
        sourceToken={BROADFI_TOKEN.symbol}
        targetAmount={receiveAmount}
        targetToken={selectedTargetToken.symbol}
        targetChain={selectedChain.name}
        gasFee={gasFee}
        isLoading={isSwapping}
      />
    </>
  );
};

export default SwapCard;
