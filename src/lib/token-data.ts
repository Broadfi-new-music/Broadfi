export type Token = {
    id: string;
    name: string;
    symbol: string;
    logo: string;
    contractAddress: string;
    decimals: number;
  };
  
  export type Chain = {
    id: string;
    name: string;
    logo: string;
  };
  
  // BroadFi token data
  export const BROADFI_TOKEN: Token = {
    id: "broadfi",
    name: "BroadFi",
    symbol: "BROADFI",
    logo: "/placeholder.svg", // We'll use a placeholder for now
    contractAddress: "EQDHNPOj5wBW3htK8OBqg4iMLEzdxxJYPC_eaLBdNPkuCWqd",
    decimals: 18,
  };
  
  // Available tokens for swapping
  export const AVAILABLE_TOKENS: Token[] = [
    {
      id: "ton",
      name: "Toncoin",
      symbol: "TON",
      logo: "/placeholder.svg",
      contractAddress: "0x000000000000000000000000000000000000ton",
      decimals: 9,
    },
    {
      id: "usdt",
      name: "Tether USD",
      symbol: "USDT",
      logo: "/placeholder.svg",
      contractAddress: "0x000000000000000000000000000000000000usdt",
      decimals: 6,
    },
  ];
  
  // Available chains
  export const AVAILABLE_CHAINS: Chain[] = [
    {
      id: "ton",
      name: "TON",
      logo: "/placeholder.svg",
    },
    {
      id: "ethereum",
      name: "Ethereum",
      logo: "/placeholder.svg",
    },
    {
      id: "bsc",
      name: "BNB Chain",
      logo: "/placeholder.svg",
    },
  ];
  
  // Mock exchange rates for demonstration
  export const EXCHANGE_RATES = {
    "broadfi-ton": 0.125, // 1 BROADFI = 0.125 TON
    "broadfi-usdt": 1.25, // 1 BROADFI = 1.25 USDT
  };
  
  // Gas fee in BROADFI
  export const GAS_FEE_BROADFI = 0.001;
  