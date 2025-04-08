export interface Track {
    id: string;
    title: string;
    audioUrl: string;
    imageUrl: string;
    creator: string;
    tokenPrice: number;
    marketCap: number;
    roi: number;
    listeners: number;
    duration: number;
}
  
export interface Playlist {
id: string;
title: string;
creator: string;
imageUrl: string;
tracks: Track[];
tokenPrice: number;
marketCap: number;
roi: number;
stakingAmount: number;
listeners: number;
}
  
export interface User {
id: string;
username: string;
walletBalance: number;
stakedAmount: number;
stakedPlaylists: Record<string, number>;
}
  