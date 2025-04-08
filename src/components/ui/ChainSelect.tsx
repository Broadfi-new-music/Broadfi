import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Chain } from "../lib/token-data";

interface ChainSelectProps {
  chains: Chain[];
  selectedChain: Chain | null;
  onChainChange: (chainId: string) => void;
}

const ChainSelect: React.FC<ChainSelectProps> = ({
  chains,
  selectedChain,
  onChainChange,
}) => {
  return (
    <Select
      value={selectedChain?.id}
      onValueChange={onChainChange}
    >
      <SelectTrigger className="w-full bg-muted border-muted-foreground/20 h-12">
        <SelectValue placeholder="Select chain">
          {selectedChain && (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                <img
                  src={selectedChain.logo}
                  alt={selectedChain.name}
                  className="w-4 h-4 object-contain"
                />
              </div>
              <span>{selectedChain.name}</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-muted border-muted-foreground/20">
        {chains.map((chain) => (
          <SelectItem key={chain.id} value={chain.id} className="cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                <img
                  src={chain.logo}
                  alt={chain.name}
                  className="w-4 h-4 object-contain"
                />
              </div>
              <span>{chain.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ChainSelect;
