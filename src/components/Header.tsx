import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Home, Music, User } from "lucide-react";

const Header = () => {
  const { currentUser } = useApp();

  return (
    <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <Music className="h-6 w-6 text-brand" />
            <span className="text-xl font-bold">Sonic</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium hover:text-brand transition-colors">
              Home
            </Link>
            <Link to="/explore" className="text-sm font-medium hover:text-brand transition-colors">
              Explore
            </Link>
            <Link to="/trending" className="text-sm font-medium hover:text-brand transition-colors">
              Trending
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full text-sm">
            <span className="text-muted-foreground">Balance:</span>
            <span className="font-semibold">{currentUser.walletBalance.toFixed(2)} BRD</span>
          </div>
          
          <Link to="/upload">
            <Button variant="outline" size="sm" className="hidden md:flex gap-1.5">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </Link>
          
          <Link to="/profile">
            <Avatar className="h-9 w-9 border-2 border-border hover:border-primary/50 transition-colors">
              <AvatarImage src="" alt={currentUser.username} />
              <AvatarFallback className="bg-brand/10 text-brand-dark">
                {currentUser.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-10">
        <div className="grid grid-cols-4 gap-1 py-2">
          <Link to="/" className="flex flex-col items-center justify-center py-1 text-xs">
            <Home className="h-5 w-5 mb-1" />
            Home
          </Link>
          <Link to="/explore" className="flex flex-col items-center justify-center py-1 text-xs">
            <Music className="h-5 w-5 mb-1" />
            Explore
          </Link>
          <Link to="/upload" className="flex flex-col items-center justify-center py-1 text-xs">
            <Upload className="h-5 w-5 mb-1" />
            Upload
          </Link>
          <Link to="/profile" className="flex flex-col items-center justify-center py-1 text-xs">
            <User className="h-5 w-5 mb-1" />
            Profile
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
