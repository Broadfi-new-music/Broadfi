
import React from 'react';
import NavigationBar from '@/components/NavigationBar';
import SwapCard from "../components/SwapCard";
import { Toaster } from "sonner";
const Swap = () => {
  return (
    <div className="min-h-screen bg-stream-dark  flex flex-col py-10">
      <NavigationBar />
      <header className="container mb-8">
        <div className="flex justify-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-broadfi-light via-broadfi to-ton-light text-transparent bg-clip-text">
            BroadFi Bridge Swap
          </h1>
        </div>
        <p className="text-center text-muted-foreground max-w-xl mx-auto">
          Swap your BroadFi tokens across multiple chains with lightning-fast transactions and low fees
        </p>
      </header>

      <main className="container flex-1 flex items-start justify-center px-4">
        <SwapCard />
      </main>

      <footer className="container mt-auto pt-10 pb-6">
        <div className="text-center text-sm text-muted-foreground">
          <p>
            BroadFi Bridge Swap &copy; {new Date().getFullYear()} | 
            Contract: <span className="text-xs">EQDHNPOj5wBW3htK8OBqg4iMLEzdxxJYPC_eaLBdNPkuCWqd</span>
          </p>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Swap;
