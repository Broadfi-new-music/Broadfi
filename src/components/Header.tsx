import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Home, Music, User } from "lucide-react";

const Header = () => {
  const { currentUser } = useApp();

  return (
    <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-end">
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center justify-end gap-2 px-3 py-1.5 bg-secondary rounded-full text-sm">
            <span className="text-muted-foreground">Balance:</span>
            <span className="font-semibold">{currentUser.walletBalance.toFixed(2)} BRD</span>
          </div>
          <Link to="/create-contest">
            <Button variant="outline" size="sm" className="hidden md:flex gap-1.5">
              Create Schedule
            </Button>
          </Link>

          <Link to="/upload">
            <Button variant="outline" size="sm" className="hidden md:flex gap-1.5">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </Link>
          
          {/* <Link to="/profile">
            <Avatar className="h-9 w-9 border-2 border-border hover:border-primary/50 transition-colors">
              <AvatarImage src="" alt={currentUser.username} />
              <AvatarFallback className="bg-brand/10 text-brand-dark">
                {currentUser.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link> */}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-10">
        <div className="grid grid-cols-1 gap-1 py-2">
          <Link to="/upload" className="flex flex-col items-end justify-center py-1 pr-2 text-xs">
            <Upload className="h-5 w-5 mb-1" />
            Upload
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
