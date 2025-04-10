import { useState } from 'react';
import { BellIcon, Menu, Wallet } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const HeaderBattle = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mr-4 md:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            BRD Battles
          </h1>
        </div>
        
        {/* Navigation - Desktop */}
        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <a href="/create-schedule" className="text-foreground hover:text-primary transition">Schedule</a>
          {/* Wallet */}
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <span className="text-xs">1250 BRD</span>
          </Button>
          
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-accent rounded-full"></span>
          </Button>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My BRD Tokens</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background border-r border-border p-4 animate-fade-in">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BRD Battles
            </h1>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
          <nav className="flex flex-col space-y-4 text-lg">
            <a href="#" className="py-2 border-b border-border">Home</a>
            <a href="#" className="py-2 border-b border-border">Live Now</a>
            <a href="#" className="py-2 border-b border-border">Schedule</a>
            <a href="#" className="py-2 border-b border-border">Creators</a>
            <div className="py-2 flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              <span>1250 BRD</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderBattle;
