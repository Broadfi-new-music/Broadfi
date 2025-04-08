import { Contest, Gift, LiveStream, Playlist, Podcast, StakeInfo, TokenTransaction, UserProfile } from "@/types/dashboard";

export const mockUser: UserProfile = {
  id: "user1",
  username: "cosmic_creator",
  displayName: "Cosmic Creator",
  avatar: "/placeholder.svg",
  isCreator: true,
  subscribers: 12543,
  likes: 87921,
  walletAddress: "0x3Fc7...8f4D",
  tokensEarned: 14752.89,
  joined: "2023-08-15"
};

export const mockGifts: Gift[] = [
  { id: "g1", name: "Lion", iconUrl: "🦁", value: 150, count: 12 },
  { id: "g2", name: "Rose", iconUrl: "🌹", value: 25, count: 87 },
  { id: "g3", name: "Diamond", iconUrl: "💎", value: 500, count: 4 },
  { id: "g4", name: "Fire", iconUrl: "🔥", value: 10, count: 165 }
];

export const mockLiveStreams: LiveStream[] = [
  {
    id: "ls1",
    creatorId: "user1",
    title: "Friday Night Session",
    description: "Join us for some chill beats and vibes",
    thumbnailUrl: "/placeholder.svg",
    isLive: true,
    viewersCount: 356,
    tokensEarned: 450.25,
    gifts: mockGifts,
    startedAt: "2025-04-05T18:30:00Z",
    collaborators: ["user2", "user3"]
  },
  {
    id: "ls2",
    creatorId: "user1",
    title: "Morning Meditation Mix",
    description: "Start your day with peaceful sounds",
    thumbnailUrl: "/placeholder.svg",
    isLive: false,
    viewersCount: 1245,
    tokensEarned: 1287.50,
    gifts: mockGifts.slice(0, 2),
    startedAt: "2025-04-03T08:00:00Z",
    collaborators: []
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: "pl1",
    creatorId: "user1",
    title: "Summer Vibes 2025",
    coverArt: "/placeholder.svg",
    description: "The hottest tracks for your summer",
    tokensEarned: 5280.75,
    tokensStaked: 15000,
    roi: 35.2,
    marketCap: 28500,
    listeners: 4250,
    tracks: 18,
    rank: 3
  },
  {
    id: "pl2",
    creatorId: "user1",
    title: "Chill Lo-Fi Beats",
    coverArt: "/placeholder.svg",
    description: "Perfect for study and focus",
    tokensEarned: 3150.25,
    tokensStaked: 8500,
    roi: 37.1,
    marketCap: 12750,
    listeners: 3120,
    tracks: 24,
    rank: 8
  },
  {
    id: "pl3",
    creatorId: "user2",
    title: "Top Urban Hits",
    coverArt: "/placeholder.svg",
    description: "Latest urban and hip-hop tracks",
    tokensEarned: 7845.30,
    tokensStaked: 22000,
    roi: 35.7,
    marketCap: 35600,
    listeners: 5840,
    tracks: 16,
    rank: 1
  }
];

export const mockPodcasts: Podcast[] = [
  {
    id: "pod1",
    creatorId: "user1",
    title: "Tech Talks Weekly",
    coverArt: "/placeholder.svg",
    description: "The latest in tech and innovation",
    tokensEarned: 4210.50,
    tokensStaked: 12000,
    roi: 35.1,
    marketCap: 23500,
    listeners: 3750,
    episodes: 45,
    rank: 5
  },
  {
    id: "pod2",
    creatorId: "user1",
    title: "Crypto Corner",
    coverArt: "/placeholder.svg",
    description: "Discussions about crypto and blockchain",
    tokensEarned: 2865.25,
    tokensStaked: 7500,
    roi: 38.2,
    marketCap: 11250,
    listeners: 2230,
    episodes: 28,
    rank: 12
  },
  {
    id: "pod3",
    creatorId: "user3",
    title: "Music Producer Stories",
    coverArt: "/placeholder.svg",
    description: "Interviews with top music producers",
    tokensEarned: 6120.75,
    tokensStaked: 18000,
    roi: 34.0,
    marketCap: 32400,
    listeners: 4120,
    episodes: 36,
    rank: 2
  }
];

export const mockStakedContent: StakeInfo[] = [
  {
    id: "stake1",
    contentId: "pl3",
    contentType: "playlist",
    title: "Top Urban Hits",
    coverArt: "/placeholder.svg",
    stakedAmount: 500,
    earningsAmount: 185.25,
    roi: 37.05
  },
  {
    id: "stake2",
    contentId: "pod3",
    contentType: "podcast",
    title: "Music Producer Stories",
    coverArt: "/placeholder.svg",
    stakedAmount: 750,
    earningsAmount: 262.50,
    roi: 35.0
  }
];

export const mockContests: Contest[] = [
  {
    id: "c1",
    title: "Summer Remix Challenge",
    description: "Create the best summer remix and win BRD tokens",
    status: "completed",
    prize: 5000,
    entriesCount: 278,
    hasEntered: true,
    isWinner: true,
    deadline: "2025-03-15T23:59:59Z"
  },
  {
    id: "c2",
    title: "EDM Production Contest",
    description: "Show off your EDM production skills",
    status: "active",
    prize: 7500,
    entriesCount: 124,
    hasEntered: true,
    isWinner: false,
    deadline: "2025-04-30T23:59:59Z"
  },
  {
    id: "c3",
    title: "Vocal Sample Challenge",
    description: "Create something amazing with our vocal sample pack",
    status: "upcoming",
    prize: 3000,
    entriesCount: 0,
    hasEntered: false,
    isWinner: false,
    deadline: "2025-05-20T23:59:59Z"
  }
];

export const mockTransactions: TokenTransaction[] = [
  {
    id: "tx1",
    type: "earning",
    amount: 250.75,
    timestamp: "2025-04-04T14:23:15Z",
    status: "completed",
    source: "Summer Vibes 2025"
  },
  {
    id: "tx2",
    type: "withdrawal",
    amount: 1000,
    timestamp: "2025-04-02T09:45:30Z",
    status: "completed"
  },
  {
    id: "tx3",
    type: "staking",
    amount: 500,
    timestamp: "2025-03-28T16:12:45Z",
    status: "completed",
    source: "Top Urban Hits"
  },
  {
    id: "tx4",
    type: "earning",
    amount: 125.50,
    timestamp: "2025-03-25T11:30:20Z",
    status: "completed",
    source: "Friday Night Session"
  },
  {
    id: "tx5",
    type: "withdrawal",
    amount: 750,
    timestamp: "2025-03-20T08:15:10Z",
    status: "pending"
  }
];

export const topChartPlaylists = [
  mockPlaylists[2], // Top Urban Hits (rank 1)
  {
    id: "pl4",
    creatorId: "user4",
    title: "Electronic Dreams",
    coverArt: "/placeholder.svg",
    description: "Best electronic tracks of the month",
    tokensEarned: 7245.55,
    tokensStaked: 20500,
    roi: 35.3,
    marketCap: 34200,
    listeners: 5620,
    tracks: 20,
    rank: 2
  },
  mockPlaylists[0], // Summer Vibes 2025 (rank 3)
  {
    id: "pl5",
    creatorId: "user5",
    title: "Workout Motivation",
    coverArt: "/placeholder.svg",
    description: "High energy tracks to keep you going",
    tokensEarned: 6125.30,
    tokensStaked: 17800,
    roi: 34.4,
    marketCap: 31500,
    listeners: 4980,
    tracks: 22,
    rank: 4
  },
  {
    id: "pl6",
    creatorId: "user6",
    title: "Ambient Relaxation",
    coverArt: "/placeholder.svg",
    description: "Calming sounds for relaxation",
    tokensEarned: 5780.15,
    tokensStaked: 16500,
    roi: 35.0,
    marketCap: 29700,
    listeners: 4620,
    tracks: 15,
    rank: 5
  }
];

export const topChartPodcasts = [
  {
    id: "pod4",
    creatorId: "user7",
    title: "Daily Music News",
    coverArt: "/placeholder.svg",
    description: "Your daily dose of music industry news",
    tokensEarned: 6450.80,
    tokensStaked: 19000,
    roi: 33.9,
    marketCap: 34200,
    listeners: 4380,
    episodes: 125,
    rank: 1
  },
  mockPodcasts[2], // Music Producer Stories (rank 2)
  {
    id: "pod5",
    creatorId: "user8",
    title: "Songwriter Sessions",
    coverArt: "/placeholder.svg",
    description: "Interviews with top songwriters",
    tokensEarned: 5920.45,
    tokensStaked: 17000,
    roi: 34.8,
    marketCap: 30600,
    listeners: 4050,
    episodes: 42,
    rank: 3
  },
  {
    id: "pod6",
    creatorId: "user9",
    title: "Music Theory Explained",
    coverArt: "/placeholder.svg",
    description: "Understanding music theory concepts",
    tokensEarned: 5450.60,
    tokensStaked: 15500,
    roi: 35.2,
    marketCap: 28500,
    listeners: 3860,
    episodes: 50,
    rank: 4
  },
  mockPodcasts[0] // Tech Talks Weekly (rank 5)
];
