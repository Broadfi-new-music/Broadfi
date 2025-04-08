export interface UserProfile {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    isCreator: boolean;
    subscribers: number;
    likes: number;
    walletAddress: string;
    tokensEarned: number;
    joined: string;
  }
  
  export interface LiveStream {
    id: string;
    creatorId: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    isLive: boolean;
    viewersCount: number;
    tokensEarned: number;
    gifts: Gift[];
    startedAt: string;
    collaborators: string[];
  }
  
  export interface Gift {
    id: string;
    name: string;
    iconUrl: string;
    value: number;
    count: number;
  }
  
  export interface Playlist {
    id: string;
    creatorId: string;
    title: string;
    coverArt: string;
    description: string;
    tokensEarned: number;
    tokensStaked: number;
    roi: number;
    marketCap: number;
    listeners: number;
    tracks: number;
    rank: number;
  }
  
  export interface Podcast {
    id: string;
    creatorId: string;
    title: string;
    coverArt: string;
    description: string;
    tokensEarned: number;
    tokensStaked: number;
    roi: number;
    marketCap: number;
    listeners: number;
    episodes: number;
    rank: number;
  }
  
  export interface StakeInfo {
    id: string;
    contentId: string;
    contentType: 'playlist' | 'podcast';
    title: string;
    coverArt: string;
    stakedAmount: number;
    earningsAmount: number;
    roi: number;
  }
  
  export interface Contest {
    id: string;
    title: string;
    description: string;
    status: 'upcoming' | 'active' | 'completed';
    prize: number;
    entriesCount: number;
    hasEntered: boolean;
    isWinner: boolean;
    deadline: string;
  }
  
  export interface TokenTransaction {
    id: string;
    type: 'earning' | 'withdrawal' | 'staking';
    amount: number;
    timestamp: string;
    status: 'pending' | 'completed' | 'failed';
    source?: string;
  }
  