export interface Creator {
    id: string;
    name: string;
    username: string;
    avatar: string;
    followers: number;
  }
  
  export interface LiveStream {
    id: string;
    title: string;
    thumbnail: string;
    creators: Creator[];
    viewers: number;
    startTime: string;
    status: "live" | "scheduled" | "ended";
    category: string;
    votes: Record<string, number>;
  }
  
  export interface Gift {
    id: string;
    name: string;
    icon: string;
    price: number;
    animation: string;
  }
  
  export interface Comment {
    id: string;
    userId: string;
    username: string;
    avatar: string;
    text: string;
    timestamp: string;
  }
  
  export interface User {
    id: string;
    name: string;
    username: string;
    avatar: string;
    brdTokens: number;
  }
  