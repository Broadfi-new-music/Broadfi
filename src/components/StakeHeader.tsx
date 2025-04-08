import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Wallet } from 'lucide-react';

const Header: React.FC = () => {
  const { toast } = useToast();
  const [connected, setConnected] = React.useState(false);
  const [walletAddress, setWalletAddress] = React.useState("");

  const connectWallet = () => {
    // Mock wallet connection
    const mockAddress = "0x" + Math.random().toString(16).slice(2, 10) + "..." + Math.random().toString(16).slice(2, 6);
    setWalletAddress(mockAddress);
    setConnected(true);
    toast({
      title: "Wallet Connected",
      description: `Connected to ${mockAddress}`,
    });
  };

  return (
    <header className="py-4 border-b">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold brd-gradient">BroadFi</span>
          <span className="text-2xl font-bold">Staking</span>
        </div>

        <Button 
          onClick={connectWallet} 
          variant={connected ? "outline" : "default"}
          className={connected ? "bg-green-50 text-green-600 hover:bg-green-100 border-green-200" : ""}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {connected ? walletAddress : "Connect Wallet"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
