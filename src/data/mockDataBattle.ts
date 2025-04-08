import { LiveStream, Gift, Comment, User, Creator } from "../types/battle";

// Mock Creators
export const creators: Creator[] = [
  {
    id: "1",
    name: "Sarah Lee",
    username: "sarah_dancequeen",
    avatar: "https://i.pravatar.cc/150?img=1",
    followers: 1200000,
  },
  {
    id: "2",
    name: "Mike Chen",
    username: "mike_beats",
    avatar: "https://i.pravatar.cc/150?img=2",
    followers: 980000,
  },
  {
    id: "3",
    name: "Jessica Wang",
    username: "jess_sing",
    avatar: "https://i.pravatar.cc/150?img=3",
    followers: 1500000,
  },
  {
    id: "4",
    name: "Tyler Jackson",
    username: "tj_rhymes",
    avatar: "https://i.pravatar.cc/150?img=4",
    followers: 2200000,
  },
  {
    id: "5",
    name: "Zoe Martinez",
    username: "zoe_vibes",
    avatar: "https://i.pravatar.cc/150?img=5",
    followers: 870000,
  },
  {
    id: "6",
    name: "Alex Kim",
    username: "alex_moves",
    avatar: "https://i.pravatar.cc/150?img=6",
    followers: 1800000,
  },
];

// Mock Live Streams
export const liveStreams: LiveStream[] = [
  {
    id: "1",
    title: "Dance Battle Royale",
    thumbnail: "https://placehold.co/600x400/FF1F9C/FFF?text=Dance+Battle",
    creators: [creators[0], creators[1]],
    viewers: 12500,
    startTime: new Date().toISOString(),
    status: "live",
    category: "Dance",
    votes: { "1": 5800, "2": 6700 },
  },
  {
    id: "2",
    title: "Beat Box Championship",
    thumbnail: "https://placehold.co/600x400/4E31AA/FFF?text=Beat+Box+Battle",
    creators: [creators[2], creators[3]],
    viewers: 8900,
    startTime: new Date().toISOString(),
    status: "live",
    category: "Music",
    votes: { "3": 4300, "4": 4500 },
  },
  {
    id: "3",
    title: "Singing Contest Finals",
    thumbnail: "https://placehold.co/600x400/FFC107/000?text=Singing+Contest",
    creators: [creators[4], creators[5]],
    viewers: 15200,
    startTime: (() => {
      const date = new Date();
      date.setHours(date.getHours() + 2);
      return date.toISOString();
    })(),
    status: "scheduled",
    category: "Music",
    votes: { "5": 0, "6": 0 },
  },
  {
    id: "4",
    title: "Fashion Face-Off",
    thumbnail: "https://placehold.co/600x400/FF4D4F/FFF?text=Fashion+Battle",
    creators: [creators[0], creators[4]],
    viewers: 7800,
    startTime: (() => {
      const date = new Date();
      date.setHours(date.getHours() + 5);
      return date.toISOString();
    })(),
    status: "scheduled",
    category: "Fashion",
    votes: { "1": 0, "5": 0 },
  },
  {
    id: "5",
    title: "Comedy Showdown",
    thumbnail: "https://placehold.co/600x400/4E31AA/FFF?text=Comedy+Battle",
    creators: [creators[1], creators[3]],
    viewers: 9200,
    startTime: (() => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      return date.toISOString();
    })(),
    status: "scheduled",
    category: "Comedy",
    votes: { "2": 0, "4": 0 },
  },
];

// Mock Gifts
export const gifts: Gift[] = [
  {
    id: "1",
    name: "Rose",
    icon: "🌹",
    price: 50,
    animation: "float",
  },
  {
    id: "2",
    name: "Lion",
    icon: "🦁",
    price: 500,
    animation: "bounce",
  },
  {
    id: "3",
    name: "Fire",
    icon: "🔥",
    price: 100,
    animation: "pulse",
  },
  {
    id: "4",
    name: "Crown",
    icon: "👑",
    price: 1000,
    animation: "spin",
  },
  {
    id: "5",
    name: "Heart",
    icon: "❤️",
    price: 200,
    animation: "pulse",
  },
];

// Mock Comments
export const generateComments = (): Comment[] => {
  const comments: Comment[] = [
    {
      id: "1",
      userId: "101",
      username: "fan_101",
      avatar: "https://i.pravatar.cc/150?img=7",
      text: "Sarah is killing it tonight! 🔥",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      userId: "102",
      username: "music_lover",
      avatar: "https://i.pravatar.cc/150?img=8",
      text: "Mike's beats are insane!!! 🙌",
      timestamp: new Date(Date.now() - 30000).toISOString(),
    },
    {
      id: "3",
      userId: "103",
      username: "dance_fanatic",
      avatar: "https://i.pravatar.cc/150?img=9",
      text: "This battle is too close to call",
      timestamp: new Date(Date.now() - 60000).toISOString(),
    },
    {
      id: "4",
      userId: "104",
      username: "night_owl",
      avatar: "https://i.pravatar.cc/150?img=10",
      text: "Sending 1000 BRD tokens now!!",
      timestamp: new Date(Date.now() - 90000).toISOString(),
    },
    {
      id: "5",
      userId: "105",
      username: "crypto_queen",
      avatar: "https://i.pravatar.cc/150?img=11",
      text: "Let's go Team Sarah! 💃",
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
  ];
  
  return comments;
};

// Mock Current User
export const currentUser: User = {
  id: "current",
  name: "You",
  username: "web3_fan",
  avatar: "https://i.pravatar.cc/150?img=12",
  brdTokens: 5000,
};
