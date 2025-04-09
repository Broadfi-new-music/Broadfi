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
  
  export interface Creator {
    id: string;
    username: string;
    avatar: string;
    followers: number;
    brdTokens: number;
  }
  
  export interface Gift {
    id: string;
    name: string;
    icon: string;
    price: number;
  }
  
  export interface Comment {
    id: string;
    userId: string;
    username: string;
    avatar: string;
    text: string;
    timestamp: number;
  }
  
  export interface LivestreamBattle {
    id: string;
    title: string;
    status: 'scheduled' | 'live' | 'ended';
    scheduledTime: number;
    creator1: Creator;
    creator2: Creator;
    viewCount: number;
    likes1: number;
    likes2: number;
    votes1: number;
    votes2: number;
    gifts1: number;
    gifts2: number;
    totalPrize: number;
    thumbnailUrl: string;
    videoUrl?: string;
    durationMinutes?: number;
  }
  