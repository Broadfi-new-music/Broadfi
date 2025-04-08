import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { Token } from  "../lib/token-data";

interface TokenSelectProps {
  tokens: Token[];
  selectedToken: Token | null;
  onTokenChange: (tokenId: string) => void;
  disabled?: boolean;
}

const TokenSelect: React.FC<TokenSelectProps> = ({
  tokens,
  selectedToken,
  onTokenChange,
  disabled = false,
}) => {
  return (
    <Select
      disabled={disabled}
      value={selectedToken?.id}
      onValueChange={onTokenChange}
    >
      <SelectTrigger className="w-full bg-muted border-muted-foreground/20 h-14">
        <SelectValue placeholder="Select token">
          {selectedToken && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                <img
                  src={selectedToken.logo}
                  alt={selectedToken.symbol}
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span>{selectedToken.symbol}</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-muted border-muted-foreground/20">
        {tokens.map((token) => (
          <SelectItem key={token.id} value={token.id} className="cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                <img
                  src={token.logo}
                  alt={token.symbol}
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span>{token.name}</span>
              <span className="ml-1 text-muted-foreground">
                ({token.symbol})
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TokenSelect;
