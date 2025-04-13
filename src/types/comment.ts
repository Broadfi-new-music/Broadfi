export interface Creator {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
    videoUrl: string;
    likes: number;
    votes: number;
  }
  
  export interface Comment {
    id: string;
    username: string;
    avatarUrl: string;
    text: string;
    timestamp: number;
  }
  
  export interface Gift {
    id: string;
    name: string;
    icon: string;
    price: number;
    animation: string;
  }
  
  export interface Battle {
    id: string;
    status: 'live' | 'upcoming' | 'ended';
    creator1: Creator;
    creator2: Creator;
    viewerCount: number;
    startTime: number;
    endTime?: number;
  }
  