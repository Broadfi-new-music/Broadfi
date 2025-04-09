import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Creator, Gift } from "@/types/livebattle";
import { Gift as GiftIcon } from "lucide-react";

interface GiftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  creator: Creator | null;
  currentGifts: number;
  gifts: Gift[];
  onGift: (gift: Gift) => void;
}

const GiftDialog: React.FC<GiftDialogProps> = ({
  open,
  onOpenChange,
  creator,
  currentGifts,
  gifts,
  onGift
}) => {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  
  if (!creator) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Gifts</DialogTitle>
          <DialogDescription>
            Show your appreciation by sending gifts to your favorite creator.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={creator.avatar} />
              <AvatarFallback>{creator.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{creator.username}</p>
              <p className="text-sm text-muted-foreground">Total gifts: {currentGifts} BRD</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {gifts.map(gift => (
              <Button
                key={gift.id}
                variant={selectedGift?.id === gift.id ? "default" : "outline"}
                className="flex flex-col h-24 p-2"
                onClick={() => setSelectedGift(gift)}
              >
                <span className="text-2xl mb-1">{gift.icon}</span>
                <span className="text-sm">{gift.name}</span>
                <span className="text-xs">{gift.price} BRD</span>
              </Button>
            ))}
          </div>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => selectedGift && onGift(selectedGift)} 
            disabled={!selectedGift}
            className="gap-1"
          >
            <GiftIcon className="h-4 w-4" />
            Send {selectedGift?.name} ({selectedGift?.price} BRD)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GiftDialog;
