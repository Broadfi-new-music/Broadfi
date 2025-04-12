export interface Contest {
    id: string;
    title: string;
    description: string;
    category: string;
    prize: number;
    deadline: string;
    image: string;
    themeAudioUrl: string;
    rules: string;
  }
  
  export interface Remix {
    id: string;
    contestId: string;
    title: string;
    artist: string;
    audioUrl: string;
    coverImage: string;
    timestamp: string;
    votes: number;
    tokenPrice: number;
    marketCap: number;
    totalListens: number;
    roi: {
      value: number;
      isPositive: boolean;
    };
    likes: number;
    comments: number;
    shares: number;
  }
  
    export interface VoteTransaction {
    id: string;
    remixId: string;
    amount: number;
    timestamp: string;
    }
  