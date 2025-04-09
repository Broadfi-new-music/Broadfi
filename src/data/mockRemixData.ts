export interface RemixContest {
    id: string;
    title: string;
    category: string;
    description: string;
    prizePool: number;
    deadline: string;
    coverImage: string;
    themeAudio: string;
    isHot: boolean;
    participantsCount: number;
    announcements: {
      title: string;
      date: string;
      content: string;
    }[];
  }
  
  export interface RemixParticipant {
    id: string;
    contestId: string;
    creator: string;
    title: string;
    remixAudio: string;
    votes: number;
    listens: number;
    tokenPrice: number;
    marketCap: number;
    priceChangePercent: number;
    lastAction?: 'vote' | 'withdraw' | null;
    lastActionTimestamp?: string;
  }
  
  // Mock data for the remix contests
  export const mockRemixContests: RemixContest[] = [
    {
      id: '1',
      title: 'Summer Vibes EDM Challenge',
      category: 'Electronic',
      description: 'Create the ultimate summer EDM track using our beach-themed stems. The winning remix will be featured on our summer playlist with 50,000+ followers!',
      prizePool: 5000,
      deadline: '2025-06-15',
      coverImage: 'https://source.unsplash.com/random/300x300/?edm',
      themeAudio: 'https://audio-samples.github.io/samples/mp3/basilisk/basilisk-loop-2.mp3',
      isHot: true,
      participantsCount: 87,
      announcements: [
        {
          title: 'Contest Launch',
          date: '2025-04-01',
          content: 'Welcome to the Summer Vibes EDM Challenge! Download the stem pack and start creating your summer hit!'
        },
        {
          title: 'New Prize Sponsor',
          date: '2025-04-05',
          content: 'We\'re excited to announce that BeatMaker Pro has joined as a sponsor, adding a license to their premium software to the prize pool!'
        }
      ]
    },
    {
      id: '2',
      title: 'Hip Hop Golden Era Remix',
      category: 'Hip Hop',
      description: 'Take these classic hip hop stems from the 90s and bring them into 2025. Looking for innovative approaches while respecting the original vibe.',
      prizePool: 8000,
      deadline: '2025-05-30',
      coverImage: 'https://source.unsplash.com/random/300x300/?hiphop',
      themeAudio: 'https://audio-samples.github.io/samples/mp3/blippy-trance-loop.mp3',
      isHot: true,
      participantsCount: 124,
      announcements: [
        {
          title: 'Contest Launch',
          date: '2025-03-15',
          content: 'The Hip Hop Golden Era Remix contest is now live! Download the original 90s samples and start creating.'
        }
      ]
    },
    {
      id: '3',
      title: 'Future Pop Vocals Challenge',
      category: 'Pop',
      description: 'We provide the vocals, you create the production. Looking for cutting-edge pop productions that could define the sound of tomorrow.',
      prizePool: 3500,
      deadline: '2025-06-30',
      coverImage: 'https://source.unsplash.com/random/300x300/?popmusic',
      themeAudio: 'https://audio-samples.github.io/samples/mp3/berlin-hall-reverb.mp3',
      isHot: false,
      participantsCount: 65,
      announcements: [
        {
          title: 'Contest Launch',
          date: '2025-04-02',
          content: 'Create the future of pop music with our exclusive vocal stems. The winners will be featured on our platform and social media channels.'
        }
      ]
    },
    {
      id: '4',
      title: 'Neo-Soul Jazz Fusion',
      category: 'R&B',
      description: 'Blend neo-soul and jazz elements using our high-quality instrument stems. Looking for smooth, innovative arrangements.',
      prizePool: 4200,
      deadline: '2025-07-15',
      coverImage: 'https://source.unsplash.com/random/300x300/?jazz',
      themeAudio: 'https://audio-samples.github.io/samples/mp3/castle-town-theme.mp3',
      isHot: false,
      participantsCount: 42,
      announcements: [
        {
          title: 'Contest Launch',
          date: '2025-04-10',
          content: 'The Neo-Soul Jazz Fusion contest is now open! Download the instrument stems and start creating your fusion masterpiece.'
        }
      ]
    },
    {
      id: '5',
      title: 'Rock Anthem Reimagined',
      category: 'Rock',
      description: 'Take this classic rock anthem and reimagine it for 2025. Open to any style from indie to metal.',
      prizePool: 6000,
      deadline: '2025-05-20',
      coverImage: 'https://source.unsplash.com/random/300x300/?rock',
      themeAudio: 'https://audio-samples.github.io/samples/mp3/downlifting-acoustic-guitar.mp3',
      isHot: false,
      participantsCount: 78,
      announcements: [
        {
          title: 'Contest Launch',
          date: '2025-03-20',
          content: 'Rock Anthem Reimagined is now live! Download the stems from the classic track and bring it into 2025.'
        },
        {
          title: 'Special Judge Announcement',
          date: '2025-03-25',
          content: 'We\'re excited to announce that Grammy-winning producer Alex Rockwell will be judging the final submissions!'
        }
      ]
    }
  ];
  
  // Mock data for remix participants
  export const mockParticipants: RemixParticipant[] = [
    {
      id: '1',
      contestId: '1',
      creator: 'BassDropMaster',
      title: 'Summer Nights (Tropical Remix)',
      remixAudio: 'https://audio-samples.github.io/samples/mp3/downlifting-acoustic-guitar.mp3',
      votes: 235.45,
      listens: 12500,
      tokenPrice: 0.0412,
      marketCap: 9700.55,
      priceChangePercent: 12.6,
      lastAction: 'vote',
      lastActionTimestamp: '2025-04-08T14:23:15Z'
    },
    {
      id: '2',
      contestId: '1',
      creator: 'MelodyQueen',
      title: 'Sunset Beach (Progressive Mix)',
      remixAudio: 'https://audio-samples.github.io/samples/mp3/castle-town-theme.mp3',
      votes: 187.20,
      listens: 9800,
      tokenPrice: 0.0362,
      marketCap: 6776.64,
      priceChangePercent: 8.3,
      lastAction: 'vote',
      lastActionTimestamp: '2025-04-08T16:45:22Z'
    },
    {
      id: '3',
      contestId: '1',
      creator: 'WaveSculptor',
      title: 'Ocean Breeze (Deep House Edit)',
      remixAudio: 'https://audio-samples.github.io/samples/mp3/berlin-hall-reverb.mp3',
      votes: 142.75,
      listens: 7200,
      tokenPrice: 0.0289,
      marketCap: 4125.48,
      priceChangePercent: -3.2,
      lastAction: 'withdraw',
      lastActionTimestamp: '2025-04-08T12:10:45Z'
    },
    {
      id: '4',
      contestId: '1',
      creator: 'ElectroVibe',
      title: 'Summer Nights (Future Bass Remix)',
      remixAudio: 'https://audio-samples.github.io/samples/mp3/blippy-trance-loop.mp3',
      votes: 118.30,
      listens: 6500,
      tokenPrice: 0.0245,
      marketCap: 2898.35,
      priceChangePercent: 5.7,
      lastAction: 'vote',
      lastActionTimestamp: '2025-04-08T10:33:18Z'
    },
    {
      id: '5',
      contestId: '1',
      creator: 'RhythmHacker',
      title: 'Beach Party (Tropical House Mix)',
      remixAudio: 'https://audio-samples.github.io/samples/mp3/basilisk/basilisk-loop-2.mp3',
      votes: 94.60,
      listens: 5100,
      tokenPrice: 0.0198,
      marketCap: 1873.08,
      priceChangePercent: -1.8,
      lastAction: 'withdraw',
      lastActionTimestamp: '2025-04-08T09:15:42Z'
    },
    {
      id: '6',
      contestId: '1',
      creator: 'SynthWizard',
      title: 'Summer Waves (Chillstep Remix)',
      remixAudio: 'https://audio-samples.github.io/samples/mp3/forest-cherry-blossoms.mp3',
      votes: 76.20,
      listens: 4200,
      tokenPrice: 0.0163,
      marketCap: 1242.06,
      priceChangePercent: 3.4,
      lastAction: 'vote',
      lastActionTimestamp: '2025-04-08T08:42:30Z'
    },
    {
      id: '7',
      contestId: '1',
      creator: 'BeachBeatsmith',
      title: 'Coastal Dreams (Dance Mix)',
      remixAudio: 'https://audio-samples.github.io/samples/mp3/downlifting-acoustic-guitar.mp3',
      votes: 65.80,
      listens: 3800,
      tokenPrice: 0.0142,
      marketCap: 934.36,
      priceChangePercent: 0.9,
      lastAction: null,
      lastActionTimestamp: '2025-04-07T22:14:50Z'
    },
    {
      id: '8',
      contestId: '1',
      creator: 'TropicalProducer',
      title: 'Island Vibes (Mainstage Edit)',
      remixAudio: 'https://audio-samples.github.io/samples/mp3/castle-town-theme.mp3',
      votes: 52.40,
      listens: 2900,
      tokenPrice: 0.0124,
      marketCap: 649.76,
      priceChangePercent: -2.5,
      lastAction: 'withdraw',
      lastActionTimestamp: '2025-04-07T20:35:12Z'
    }
  ];
  