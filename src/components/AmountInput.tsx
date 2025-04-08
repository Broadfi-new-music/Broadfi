import React from "react";
import { Input } from "@/components/ui/input";

interface AmountInputProps {
  amount: string;
  onChange: (value: string) => void;
  max?: number;
  disabled?: boolean;
  placeholder?: string;
}

const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  onChange,
  max,
  disabled = false,
  placeholder = "0.0",
}) => {
  // Only allow numbers and decimals
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty string or valid numbers with decimals
    if (value === "" || /^[0-9]*[.]?[0-9]*$/.test(value)) {
      onChange(value);
    }
  };

  const handleMaxClick = () => {
    if (max !== undefined) {
      onChange(max.toString());
    }
  };

  return (
    <div className="relative w-full">
      <Input
        type="text"
        value={amount}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        className="h-14 bg-muted border-muted-foreground/20 text-xl font-medium pr-16"
      />
      {max !== undefined && (
        <button
          type="button"
          onClick={handleMaxClick}
          className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-primary/20 hover:bg-primary/30 text-primary-foreground rounded transition"
        >
          MAX
        </button>
      )}
    </div>
  );
};

export default AmountInput;
