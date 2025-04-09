import { Playlist, Track, User } from "../types"

// Mock tracks
export const mockTracks: Track[] = [
  {
    id: "track-1",
    title: "Celestial Harmony",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    imageUrl: "/Images/t8.jpg",
    creator: "CryptoBeats",
    tokenPrice: 3.241,
    marketCap: 156000,
    roi: 12.5,
    listeners: 3240,
    duration: 238,
  },
  {
    id: "track-2",
    title: "Digital Dreams",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    imageUrl: "/Images/t7.jpg",
    creator: "BlockchainBard",
    tokenPrice: 2.879,
    marketCap: 98500,
    roi: 8.2,
    listeners: 2150,
    duration: 185,
  },
  {
    id: "track-3",
    title: "Web3 Waves",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    imageUrl: "/Images/t6.jpg",
    creator: "TokenTunes",
    tokenPrice: 4.567,
    marketCap: 210000,
    roi: 15.8,
    listeners: 5420,
    duration: 263,
  },
  {
    id: "track-4",
    title: "Crypto Groove",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    imageUrl: "/Images/t5.jpg",
    creator: "DeFiDJ",
    tokenPrice: 3.125,
    marketCap: 145000,
    roi: 11.3,
    listeners: 2980,
    duration: 214,
  },
  {
    id: "track-5",
    title: "Blockchain Beats",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    imageUrl: "/Images/t4.jpg",
    creator: "NFTNoise",
    tokenPrice: 2.750,
    marketCap: 89000,
    roi: 7.5,
    listeners: 1850,
    duration: 198,
  },
  {
    id: "track-6",
    title: "Decentralized Dreams",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    imageUrl: "/Images/t3.jpg",
    creator: "SonicSats",
    tokenPrice: 5.123,
    marketCap: 245000,
    roi: 18.2,
    listeners: 6780,
    duration: 274,
  },
  {
    id: "track-7",
    title: "Staked Sound",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    imageUrl: "/Images/t2.jpg",
    creator: "MintMelody",
    tokenPrice: 3.876,
    marketCap: 178000,
    roi: 14.1,
    listeners: 4230,
    duration: 226,
  },
  {
    id: "track-8",
    title: "Token Trance",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    imageUrl: "/Images/t1.jpg",
    creator: "HashBeats",
    tokenPrice: 2.451,
    marketCap: 112000,
    roi: 9.7,
    listeners: 2540,
    duration: 196,
  },
];

// Mock playlists with tracks from the tracks array
export const mockPlaylists: Playlist[] = [
  {
    id: "playlist-1",
    title: "Crypto Summer Vibes",
    creator: "CryptoBeats",
    imageUrl: "/Images/pl1.jpg",
    tracks: [mockTracks[0], mockTracks[3], mockTracks[5]],
    tokenPrice: 8.912,
    marketCap: 425000,
    roi: 21.5,
    stakingAmount: 35000,
    listeners: 8540,
  },
  {
    id: "playlist-2",
    title: "Blockchain Chill",
    creator: "TokenTunes",
    imageUrl: "/Images/pl2.jpg",
    tracks: [mockTracks[2], mockTracks[4], mockTracks[7]],
    tokenPrice: 6.789,
    marketCap: 315000,
    roi: 17.8,
    stakingAmount: 28000,
    listeners: 6250,
  },
  {
    id: "playlist-3",
    title: "Staking Beats",
    creator: "DeFiDJ",
    imageUrl: "/Images/pl6.jpg",
    tracks: [mockTracks[1], mockTracks[6]],
    tokenPrice: 5.124,
    marketCap: 210000,
    roi: 13.2,
    stakingAmount: 19000,
    listeners: 4120,
  },
  {
    id: "playlist-4",
    title: "NFT Nightclub",
    creator: "NFTNoise",
    imageUrl: "/Images/pl3.jpg",
    tracks: [mockTracks[4], mockTracks[5], mockTracks[7]],
    tokenPrice: 7.456,
    marketCap: 350000,
    roi: 19.5,
    stakingAmount: 31000,
    listeners: 7320,
  },
  {
    id: "playlist-5",
    title: "Web3 Workouts",
    creator: "BlockchainBard",
    imageUrl: "/Images/pl4.jpg",
    tracks: [mockTracks[1], mockTracks[3], mockTracks[6]],
    tokenPrice: 6.123,
    marketCap: 285000,
    roi: 15.7,
    stakingAmount: 24000,
    listeners: 5780,
  },
  {
    id: "playlist-6",
    title: "Decentralized Dreams",
    creator: "SonicSats",
    imageUrl: "/Images/pl5.jpg",
    tracks: [mockTracks[0], mockTracks[2], mockTracks[5], mockTracks[7]],
    tokenPrice: 9.567,
    marketCap: 480000,
    roi: 23.4,
    stakingAmount: 42000,
    listeners: 9650,
  },
];

// Mock current user
export const mockUser: User = {
  id: "user-1",
  username: "CryptoListener",
  walletBalance: 100,
  stakedAmount: 25,
  stakedPlaylists: {
    "playlist-1": 10,
    "playlist-3": 15,
  },
};
