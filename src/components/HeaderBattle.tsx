import React from "react";
import { Bell, Menu, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/data/mockDataBattle";

const HeaderBattle: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-battle-card bg-battle-bg bg-opacity-80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold gradient-text">BattleStreamVerse</h1>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center mr-2">
            <span className="token-badge mr-1">
              <span className="mr-1">💰</span>
              {currentUser.brdTokens} BRD
            </span>
          </div>
          
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-battle-live rounded-full"></span>
          </Button>
          
          <Button variant="outline" size="icon" className="hidden md:flex">
            <Wallet className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <img
              src={currentUser.avatar}
              alt="User avatar"
              className="h-8 w-8 rounded-full border border-battle-accent"
            />
            <span className="hidden md:inline text-sm font-medium">
              {currentUser.username}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBattle;
