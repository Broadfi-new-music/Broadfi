import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import { TonConnectButton } from '@tonconnect/ui-react';
import { 
  Home, 
  Radio, 
  Music, 
  BookAudio, 
  Trophy, 
  Wallet, 
  User, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, isCreatorMode, toggleCreatorMode } = useUser();

  const navigationItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Livestreams", icon: Radio, path: "/livestream" },
    { name: "Playlists", icon: Music, path: "/playlists" },
    { name: "Podcasts", icon: BookAudio, path: "/podcast" },
    { name: "Contests", icon: Trophy, path: "/contest" },
    { name: "Wallet", icon: Wallet, path: "/wallet" },
    { name: "Swap", icon: User, path: "/swap" },
  ];

  return (
    <div 
      className={cn(
        "glass-card h-full transition-all duration-300 border-r border-white/5 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-brand-purple rounded-md flex items-center justify-center">
              <span className="text-white font-bold">BF</span>
            </div>
            <h1 className="font-bold text-xl">Broadfi</h1>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-white/10 text-white"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none py-4">
        <nav className="space-y-1 px-2">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "group flex items-center p-2 rounded-md hover:bg-white/10 transition-colors",
                location.pathname === item.path ? "bg-white/10" : ""
              )}
            >
              <item.icon 
                className={cn(
                  "text-white/70 mr-3 h-5 w-5",
                  collapsed ? "mr-0" : ""
                )} 
              />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        <div className="flex mt-[20px]">
          <TonConnectButton />
        </div>
      </div>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center">
          <img 
            src={user.avatar} 
            alt={user.displayName}
            className="h-10 w-10 rounded-full bg-secondary"
          />
          {!collapsed && (
            <div className="ml-3">
              <p className="font-medium">{user.displayName}</p>
              <div className="flex items-center mt-1">
                <div 
                  className={cn(
                    "h-3 w-3 rounded-full",
                    isCreatorMode ? "bg-brand-green" : "bg-brand-blue"
                  )}
                />
                <button 
                  onClick={toggleCreatorMode}
                  className="text-xs ml-1.5 text-white/70 hover:text-white transition-colors"
                >
                  {isCreatorMode ? "Creator" : "Audience"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
