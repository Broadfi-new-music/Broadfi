import React, { createContext, useContext, useState, useEffect } from "react";
import { Playlist, Track, User } from "../types/index";
import { mockPlaylists, mockTracks, mockUser } from "../data/mockData";
import { toast } from "@/components/ui/use-toast";

interface AppContextType {
  playlists: Playlist[];
  tracks: Track[];
  currentUser: User;
  currentPlaylist: Playlist | null;
  currentTrack: Track | null;
  isPlaying: boolean;
  setCurrentPlaylist: (playlist: Playlist | null) => void;
  setCurrentTrack: (track: Track | null) => void;
  togglePlayPause: () => void;
  stakeTokens: (playlistId: string, amount: number) => void;
  withdrawTokens: (playlistId: string, amount: number) => void;
  uploadTrack: (track: Omit<Track, "id" | "tokenPrice" | "marketCap" | "roi" | "listeners">) => void;
  createPlaylist: (playlist: Omit<Playlist, "id" | "tokenPrice" | "marketCap" | "roi" | "stakingAmount" | "listeners">) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>(mockPlaylists);
  const [tracks, setTracks] = useState<Track[]>(mockTracks);
  const [currentUser, setCurrentUser] = useState<User>(mockUser);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const stakeTokens = (playlistId: string, amount: number) => {
    if (amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to stake",
        variant: "destructive",
      });
      return;
    }

    if (amount > currentUser.walletBalance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough BRD tokens in your wallet",
        variant: "destructive",
      });
      return;
    }

    // Update user state
    const updatedUser = { ...currentUser };
    updatedUser.walletBalance -= amount;
    updatedUser.stakedAmount += amount;
    
    // Update staked playlists
    if (updatedUser.stakedPlaylists[playlistId]) {
      updatedUser.stakedPlaylists[playlistId] += amount;
    } else {
      updatedUser.stakedPlaylists[playlistId] = amount;
    }
    
    setCurrentUser(updatedUser);

    // Update playlist state
    const updatedPlaylists = playlists.map(playlist => {
      if (playlist.id === playlistId) {
        const updatedPlaylist = { ...playlist };
        updatedPlaylist.stakingAmount += amount;
        
        // Increase token price and ROI when staked
        updatedPlaylist.tokenPrice = +(updatedPlaylist.tokenPrice * 1.05).toFixed(3);
        updatedPlaylist.roi = +(updatedPlaylist.roi * 1.08).toFixed(1);
        updatedPlaylist.marketCap = Math.round(updatedPlaylist.marketCap * 1.05);
        
        return updatedPlaylist;
      }
      return playlist;
    });
    
    setPlaylists(updatedPlaylists);
    
    // Update current playlist if it's the one being staked
    if (currentPlaylist && currentPlaylist.id === playlistId) {
      const updatedCurrentPlaylist = updatedPlaylists.find(p => p.id === playlistId);
      if (updatedCurrentPlaylist) {
        setCurrentPlaylist(updatedCurrentPlaylist);
      }
    }

    toast({
      title: "Tokens staked successfully",
      description: `You have staked ${amount} BRD tokens to this playlist`,
    });
  };

  const withdrawTokens = (playlistId: string, amount: number) => {
    if (amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to withdraw",
        variant: "destructive",
      });
      return;
    }

    const stakedAmount = currentUser.stakedPlaylists[playlistId] || 0;
    
    if (amount > stakedAmount) {
      toast({
        title: "Insufficient staked amount",
        description: "You don't have enough tokens staked in this playlist",
        variant: "destructive",
      });
      return;
    }

    // Update user state
    const updatedUser = { ...currentUser };
    updatedUser.walletBalance += amount;
    updatedUser.stakedAmount -= amount;
    
    // Update staked playlists
    updatedUser.stakedPlaylists[playlistId] -= amount;
    if (updatedUser.stakedPlaylists[playlistId] === 0) {
      delete updatedUser.stakedPlaylists[playlistId];
    }
    
    setCurrentUser(updatedUser);

    // Update playlist state
    const updatedPlaylists = playlists.map(playlist => {
      if (playlist.id === playlistId) {
        const updatedPlaylist = { ...playlist };
        updatedPlaylist.stakingAmount -= amount;
        
        // Decrease token price and ROI when withdrawn
        updatedPlaylist.tokenPrice = +(updatedPlaylist.tokenPrice * 0.98).toFixed(3);
        updatedPlaylist.roi = +(updatedPlaylist.roi * 0.95).toFixed(1);
        updatedPlaylist.marketCap = Math.round(updatedPlaylist.marketCap * 0.97);
        
        return updatedPlaylist;
      }
      return playlist;
    });
    
    setPlaylists(updatedPlaylists);
    
    // Update current playlist if it's the one being withdrawn from
    if (currentPlaylist && currentPlaylist.id === playlistId) {
      const updatedCurrentPlaylist = updatedPlaylists.find(p => p.id === playlistId);
      if (updatedCurrentPlaylist) {
        setCurrentPlaylist(updatedCurrentPlaylist);
      }
    }

    toast({
      title: "Tokens withdrawn successfully",
      description: `You have withdrawn ${amount} BRD tokens from this playlist`,
    });
  };

  const uploadTrack = (trackData: Omit<Track, "id" | "tokenPrice" | "marketCap" | "roi" | "listeners">) => {
    const newTrack: Track = {
      ...trackData,
      id: `track-${Date.now()}`,
      tokenPrice: 2.370, // Starting token price as per requirements
      marketCap: 50000 + Math.floor(Math.random() * 50000),
      roi: 5 + Math.floor(Math.random() * 10),
      listeners: Math.floor(Math.random() * 1000),
    };
    
    setTracks([...tracks, newTrack]);
    
    toast({
      title: "Track uploaded successfully",
      description: "Your track has been added to the platform",
    });
    
    return newTrack;
  };

  const createPlaylist = (playlistData: Omit<Playlist, "id" | "tokenPrice" | "marketCap" | "roi" | "stakingAmount" | "listeners">) => {
    const newPlaylist: Playlist = {
      ...playlistData,
      id: `playlist-${Date.now()}`,
      tokenPrice: 2.370, // Starting token price as per requirements
      marketCap: 100000 + Math.floor(Math.random() * 100000),
      roi: 8 + Math.floor(Math.random() * 15),
      stakingAmount: 0,
      listeners: Math.floor(Math.random() * 5000),
    };
    
    setPlaylists([...playlists, newPlaylist]);
    
    toast({
      title: "Playlist created successfully",
      description: "Your playlist has been added to the platform",
    });
    
    return newPlaylist;
  };

  const value = {
    playlists,
    tracks,
    currentUser,
    currentPlaylist,
    currentTrack,
    isPlaying,
    setCurrentPlaylist,
    setCurrentTrack,
    togglePlayPause,
    stakeTokens,
    withdrawTokens,
    uploadTrack,
    createPlaylist,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
