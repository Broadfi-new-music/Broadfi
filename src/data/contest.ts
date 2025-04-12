import { Contest, Remix } from "../types/contest";

export const contests: Contest[] = [
  {
    id: "c1",
    title: "Summer Vibes Challenge",
    description: "Create a remix that captures the essence of summer",
    category: "EDM",
    prize: 10000,
    deadline: "2025-06-01",
    image: "/Images/pl1.jpg",
    themeAudioUrl: "/audio/summer-theme.mp3",
    rules: "Create a remix between 2-5 minutes. Must include the provided samples. Original elements are encouraged."
  },
  {
    id: "c2",
    title: "Hip-Hop Revolution",
    description: "Push the boundaries of hip-hop with innovative production",
    category: "Hip-Hop",
    prize: 15000,
    deadline: "2025-05-15",
    image: "/Images/pl2.jpg",
    themeAudioUrl: "/audio/hiphop-theme.mp3",
    rules: "Must use the provided beat. Add your own vocals or find collaborators. BPM should be between 85-95."
  },
  {
    id: "c3",
    title: "Ambient Soundscapes",
    description: "Create peaceful, immersive ambient soundscapes",
    category: "Ambient",
    prize: 8000,
    deadline: "2025-07-10",
    image: "/Images/pl3.jpg",
    themeAudioUrl: "/audio/ambient-theme.mp3",
    rules: "Minimum length 3 minutes. Should include at least 3 layers of sounds. Peaceful atmosphere required."
  },
  {
    id: "c4",
    title: "Drum & Bass Energizer",
    description: "Craft a high-energy D&B track that moves crowds",
    category: "Drum & Bass",
    prize: 12000,
    deadline: "2025-05-30",
    image: "/Images/pl4.jpg",
    themeAudioUrl: "/audio/dnb-theme.mp3", 
    rules: "170-175 BPM. Must include the provided bass sample. Creative drum patterns strongly encouraged."
  },
  {
    id: "c5",
    title: "Pop Remix Challenge",
    description: "Turn this pop track into your own masterpiece",
    category: "Pop",
    prize: 20000,
    deadline: "2025-06-15",
    image: "/Images/pl5.jpg",
    themeAudioUrl: "/audio/pop-theme.mp3",
    rules: "Keep vocals intact. Change instrumentation and structure as desired. Radio-friendly output preferred."
  }
];

export const remixes: Record<string, Remix[]> = {
  "c1": [
    {
      id: "r1",
      contestId: "c1",
      title: "Summer Breeze Remix",
      artist: "DJ Sunbeam",
      audioUrl: "/audio/summer-remix-1.mp3",
      coverImage: "/Images/t1.jpg",
      timestamp: "2025-05-20T10:30:00Z",
      votes: 3500,
      tokenPrice: 0.25,
      marketCap: 875,
      totalListens: 15420,
      roi: {
        value: 12.5,
        isPositive: true
      },
      likes: 320,
      comments: 45,
      shares: 87
    },
    {
      id: "r2",
      contestId: "c1",
      title: "Tropical Heat",
      artist: "WaveMaker",
      audioUrl: "/audio/summer-remix-2.mp3",
      coverImage: "/Images/t2.jpg",
      timestamp: "2025-05-21T14:45:00Z",
      votes: 2800,
      tokenPrice: 0.18,
      marketCap: 504,
      totalListens: 9870,
      roi: {
        value: 8.2,
        isPositive: true
      },
      likes: 230,
      comments: 32,
      shares: 56
    },
    {
      id: "r3",
      contestId: "c1",
      title: "Beach Party",
      artist: "SandStorm",
      audioUrl: "/audio/summer-remix-3.mp3",
      coverImage: "/Images/t3.jpg",
      timestamp: "2025-05-19T09:15:00Z",
      votes: 4200,
      tokenPrice: 0.31,
      marketCap: 1302,
      totalListens: 18600,
      roi: {
        value: 15.3,
        isPositive: true
      },
      likes: 415,
      comments: 63,
      shares: 112
    }
  ],
  "c2": [
    {
      id: "r4",
      contestId: "c2",
      title: "Urban Flow",
      artist: "MC Rhymesayer",
      audioUrl: "/audio/hiphop-remix-1.mp3",
      coverImage: "/Images/t4.jpg",
      timestamp: "2025-05-10T16:20:00Z",
      votes: 5600,
      tokenPrice: 0.42,
      marketCap: 2352,
      totalListens: 24300,
      roi: {
        value: 21.5,
        isPositive: true
      },
      likes: 540,
      comments: 87,
      shares: 156
    },
    {
      id: "r5",
      contestId: "c2",
      title: "Street Beat",
      artist: "BoomBox",
      audioUrl: "/audio/hiphop-remix-2.mp3",
      coverImage: "/Images/t5.jpg",
      timestamp: "2025-05-11T12:10:00Z",
      votes: 3200,
      tokenPrice: 0.24,
      marketCap: 768,
      totalListens: 13500,
      roi: {
        value: 2.3,
        isPositive: false
      },
      likes: 290,
      comments: 41,
      shares: 73
    }
  ],
  "c3": [
    {
      id: "r6",
      contestId: "c3",
      title: "Celestial Dreams",
      artist: "StarGazer",
      audioUrl: "/audio/ambient-remix-1.mp3",
      coverImage: "/Images/t6.jpg",
      timestamp: "2025-05-25T08:40:00Z",
      votes: 2100,
      tokenPrice: 0.15,
      marketCap: 315,
      totalListens: 8700,
      roi: {
        value: 5.8,
        isPositive: true
      },
      likes: 180,
      comments: 25,
      shares: 43
    }
  ],
  "c4": [],
  "c5": []
};

// Placeholder functions to simulate API calls
export const fetchContests = () => {
  return Promise.resolve(contests);
};

export const fetchContestById = (id: string) => {
  const contest = contests.find(c => c.id === id);
  return Promise.resolve(contest);
};

export const fetchRemixesByContestId = (contestId: string) => {
  return Promise.resolve(remixes[contestId] || []);
};

export const addRemixToContest = (contestId: string, remix: Remix) => {
  if (!remixes[contestId]) {
    remixes[contestId] = [];
  }
  remixes[contestId].push(remix);
  return Promise.resolve(remix);
};

export const voteForRemix = (remixId: string, amount: number) => {
  // Find the remix and update its vote count
  for (const contestId in remixes) {
    const remixIndex = remixes[contestId].findIndex(r => r.id === remixId);
    if (remixIndex !== -1) {
      const remix = remixes[contestId][remixIndex];
      remix.votes += amount;
      remix.tokenPrice = Number((remix.tokenPrice + amount * 0.001).toFixed(2));
      remix.marketCap = Number((remix.tokenPrice * remix.votes).toFixed(2));
      remix.roi.value = Number((Math.random() * 5 + 5).toFixed(1));
      remix.roi.isPositive = true;
      
      // Update in place
      remixes[contestId][remixIndex] = { ...remix };
      
      return Promise.resolve(remix);
    }
  }
  return Promise.reject(new Error("Remix not found"));
};

export const withdrawVoteFromRemix = (remixId: string, amount: number) => {
  // Find the remix and update its vote count
  for (const contestId in remixes) {
    const remixIndex = remixes[contestId].findIndex(r => r.id === remixId);
    if (remixIndex !== -1) {
      const remix = remixes[contestId][remixIndex];
      remix.votes = Math.max(0, remix.votes - amount);
      remix.tokenPrice = Number(Math.max(0.01, remix.tokenPrice - amount * 0.001).toFixed(2));
      remix.marketCap = Number((remix.tokenPrice * remix.votes).toFixed(2));
      remix.roi.value = Number((Math.random() * 5 + 1).toFixed(1));
      remix.roi.isPositive = false;
      
      // Update in place
      remixes[contestId][remixIndex] = { ...remix };
      
      return Promise.resolve(remix);
    }
  }
  return Promise.reject(new Error("Remix not found"));
};
