import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, Radio, Search, Wallet } from "lucide-react";
import { formatNumber } from "@/utils/formatters";

export default function Header() {
  const { user, createLivestream, isCreatorMode } = useUser();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-background border-b border-white/5 py-2 px-4 flex items-center justify-between">
      <div className="flex items-center flex-1">
        <div className="relative w-64 mr-4">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
          <Input 
            type="text" 
            placeholder="Search..." 
            className="pl-8 bg-secondary/40 border-white/10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {isCreatorMode && (
          <Button 
            onClick={createLivestream}
            className="flex items-center bg-brand-purple hover:bg-brand-purple/80"
          >
            <Radio className="mr-2 h-4 w-4" />
            Go Live
          </Button>
        )}

        {/* <div className="flex items-center bg-secondary/40 py-1.5 px-3 rounded-md">
          <Wallet className="text-brand-purple h-4 w-4 mr-2" />
          <span className="text-sm font-medium">{formatNumber(user.tokensEarned)} BRD</span>
        </div> */}
        <img className="w-[5%] cursor-pointer flex justify-center bg-secondary/40 py-1.5 rounded-md" src="/Images/share.png" alt="" />

        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" variant="outline" className="relative h-9 w-9 rounded-full border-white/10 bg-secondary/40">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-brand-red text-white text-[10px] flex items-center justify-center">
                3
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b border-white/10">
              <h3 className="font-medium">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-white/10">
              <div className="p-4 hover:bg-secondary/40 cursor-pointer">
                <div className="font-medium">New Subscriber</div>
                <div className="text-sm text-white/70">MusicLover248 subscribed to your channel</div>
                <div className="text-xs text-white/50 mt-1">2 hours ago</div>
              </div>
              <div className="p-4 hover:bg-secondary/40 cursor-pointer">
                <div className="font-medium">Playlist Earnings</div>
                <div className="text-sm text-white/70">You earned 125 BRD from "Summer Vibes 2025"</div>
                <div className="text-xs text-white/50 mt-1">5 hours ago</div>
              </div>
              <div className="p-4 hover:bg-secondary/40 cursor-pointer">
                <div className="font-medium">Contest Winner!</div>
                <div className="text-sm text-white/70">Congratulations! You won the Summer Remix Challenge</div>
                <div className="text-xs text-white/50 mt-1">1 day ago</div>
              </div>
            </div>
            <div className="p-2 border-t border-white/10">
              <Button variant="ghost" className="w-full text-sm">View all notifications</Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* <div className="flex items-center">
          <img 
            src={user.avatar} 
            alt={user.displayName}
            className="h-9 w-9 rounded-full bg-secondary"
          />
        </div> */}
      </div>
    </header>
  );
}
