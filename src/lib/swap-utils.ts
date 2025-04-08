import { EXCHANGE_RATES, GAS_FEE_BROADFI } from "../lib/token-data";

// Calculate estimated receive amount based on source amount and token pair
export const calculateReceiveAmount = (
  sourceAmount: number,
  sourceToken: string,
  targetToken: string
): number => {
  if (sourceAmount <= 0) return 0;
  
  const pair = `${sourceToken}-${targetToken}`;
  const rate = EXCHANGE_RATES[pair] || 0;
  
  return sourceAmount * rate;
};

// Calculate gas fee in BROADFI
export const calculateGasFee = (): number => {
  return GAS_FEE_BROADFI;
};

// Format amount with appropriate decimals
export const formatAmount = (amount: number | string, decimals: number = 6): string => {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  
  if (isNaN(num)) return "0";
  
  return num.toFixed(decimals);
};

// Parse user input, ensuring it's a valid number
export const parseInputAmount = (input: string): number => {
  const parsed = parseFloat(input);
  return isNaN(parsed) ? 0 : parsed;
};

// Simulate a swap transaction (in real app, this would be a blockchain transaction)
export const executeSwap = async (
  sourceAmount: number,
  sourceToken: string,
  targetToken: string,
  targetChain: string
): Promise<{ success: boolean; txHash?: string; error?: string }> => {
  // This is a mock function - in a real implementation, this would call a blockchain API
  return new Promise((resolve) => {
    setTimeout(() => {
      // 90% chance of success for demo purposes
      if (Math.random() > 0.1) {
        resolve({
          success: true,
          txHash: `0x${Math.random().toString(16).slice(2)}`,
        });
      } else {
        resolve({
          success: false,
          error: "Transaction failed. Please try again.",
        });
      }
    }, 2000); // Simulate blockchain delay
  });
};
