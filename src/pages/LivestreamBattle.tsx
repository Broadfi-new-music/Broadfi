import { useState } from 'react';
import Header from '../components/HeaderBattle';
import BattleCard from '../components/BattleCard';
import LiveBattleStrip from '../components/LiveBattleStrip';
import ScheduledBattles from '../components/ScheduledBatlle';
// import VotingModal from '../components/VotingModal';
// import GiftingModal from '../components/GiftngModal';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Trophy, Flame, Gift, Vote } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const liveBattles = [
  {
    id: '1',
    creator1: { name: 'Alex Dance', avatar: 'https://i.pravatar.cc/150?img=32' },
    creator2: { name: 'Mia Beats', avatar: 'https://i.pravatar.cc/150?img=44' },
    viewCount: '3.2K',
    previewUrl: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16'
  },
  {
    id: '2',
    creator1: { name: 'Jay Smooth', avatar: 'https://i.pravatar.cc/150?img=68' },
    creator2: { name: 'Emma Flow', avatar: 'https://i.pravatar.cc/150?img=47' },
    viewCount: '1.8K',
    previewUrl: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1'
  },
  {
    id: '3',
    creator1: { name: 'Mike Rythem', avatar: 'https://i.pravatar.cc/150?img=11' },
    creator2: { name: 'Sara Vibe', avatar: 'https://i.pravatar.cc/150?img=24' },
    viewCount: '4.5K',
    previewUrl: 'https://images.unsplash.com/photo-1594434533760-02e0f3b7114b'
  },
  {
    id: '4',
    creator1: { name: 'Tom Groove', avatar: 'https://i.pravatar.cc/150?img=15' },
    creator2: { name: 'Lily Twist', avatar: 'https://i.pravatar.cc/150?img=9' },
    viewCount: '2.1K',
    previewUrl: 'https://images.unsplash.com/photo-1560807707-8cc77767d783'
  },
  {
    id: '5',
    creator1: { name: 'Ryan Moves', avatar: 'https://i.pravatar.cc/150?img=3' },
    creator2: { name: 'Nina Steps', avatar: 'https://i.pravatar.cc/150?img=26' },
    viewCount: '5.3K',
    previewUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad'
  },
  {
    id: '6',
    creator1: { name: 'Kevin Beat', avatar: 'https://i.pravatar.cc/150?img=7' },
    creator2: { name: 'Zoe Rhythm', avatar: 'https://i.pravatar.cc/150?img=20' },
    viewCount: '2.7K',
    previewUrl: 'https://images.unsplash.com/photo-1524673278499-6c3723678fb4'
  }
];

const upcomingBattles = [
  {
    id: '1',
    title: 'Dance Battle Championship',
    date: 'Apr 15, 2025',
    time: '8:00 PM EST',
    creator1: {
      name: 'DanceKing',
      username: 'danceking',
      avatar: 'https://i.pravatar.cc/150?img=57'
    },
    creator2: {
      name: 'FlowQueen',
      username: 'flowqueen',
      avatar: 'https://i.pravatar.cc/150?img=23'
    }
  },
  {
    id: '2',
    title: 'Beat Boxing Showdown',
    date: 'Apr 18, 2025',
    time: '7:30 PM EST',
    creator1: {
      name: 'BeatMaster',
      username: 'beatmaster',
      avatar: 'https://i.pravatar.cc/150?img=13'
    },
    creator2: {
      name: 'RhythmPro',
      username: 'rhythmpro',
      avatar: 'https://i.pravatar.cc/150?img=19'
    }
  },
  {
    id: '3',
    title: 'Rap Battle Finals',
    date: 'Apr 20, 2025',
    time: '9:00 PM EST',
    creator1: {
      name: 'LyricKing',
      username: 'lyricking',
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    creator2: {
      name: 'FlowMaster',
      username: 'flowmaster',
      avatar: 'https://i.pravatar.cc/150?img=60'
    }
  },
  {
    id: '4',
    title: 'Comedy Improv Challenge',
    date: 'Apr 22, 2025',
    time: '8:30 PM EST',
    creator1: {
      name: 'JokeStar',
      username: 'jokestar',
      avatar: 'https://i.pravatar.cc/150?img=30'
    },
    creator2: {
      name: 'LaughMaster',
      username: 'laughmaster',
      avatar: 'https://i.pravatar.cc/150?img=41'
    }
  }
];

const featuredBattles = [
  {
    id: '1',
    title: 'Epic Dance Battle: Hip Hop vs Contemporary',
    thumbnailUrl: '/Images/pl4.jpg',
    viewCount: '45.2K',
    isLive: true,
    creator1: {
      name: 'Michael Groove',
      username: 'michgroove',
      avatar: 'https://i.pravatar.cc/150?img=51',
      followers: '256K'
    },
    creator2: {
      name: 'Sophie Flow',
      username: 'sophflow',
      avatar: 'https://i.pravatar.cc/150?img=44',
      followers: '189K'
    },
    description: 'Watch the ultimate showdown between hip hop and contemporary dance styles! Vote for your favorite using BRD tokens.'
  },
  {
    id: '2',
    title: 'Beat Boxing Championship Finals',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81',
    viewCount: '32.7K',
    isLive: true,
    creator1: {
      name: 'DJ Beats',
      username: 'djbeats',
      avatar: 'https://i.pravatar.cc/150?img=33',
      followers: '321K'
    },
    creator2: {
      name: 'Rhythm Master',
      username: 'rhythmaster',
      avatar: 'https://i.pravatar.cc/150?img=12',
      followers: '278K'
    },
    description: 'The most anticipated beatboxing battle of the year is happening right now! Two champions, one winner.'
  },
  {
    id: '3',
    title: 'Freestyle Rap Battle: East vs West',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf',
    viewCount: '28.4K',
    isLive: false,
    scheduledTime: 'Apr 15, 8:00 PM',
    creator1: {
      name: 'EastSide MC',
      username: 'eastsidemc',
      avatar: 'https://i.pravatar.cc/150?img=62',
      followers: '156K'
    },
    creator2: {
      name: 'WestCoast Flow',
      username: 'westcoastflow',
      avatar: 'https://i.pravatar.cc/150?img=59',
      followers: '143K'
    },
    description: 'East meets West in this epic freestyle rap battle. Don\'t miss the cultural showdown of lyrical masters.'
  },
  {
    id: '4',
    title: 'Comedy Improv Face-Off',
    thumbnailUrl: '/Images/pl2.jpg',
    viewCount: '18.9K',
    isLive: false,
    scheduledTime: 'Apr 16, 9:30 PM',
    creator1: {
      name: 'Laugh King',
      username: 'laughking',
      avatar: 'https://i.pravatar.cc/150?img=53',
      followers: '98K'
    },
    creator2: {
      name: 'Joke Queen',
      username: 'jokequeen',
      avatar: 'https://i.pravatar.cc/150?img=5',
      followers: '112K'
    },
    description: 'Who will make you laugh harder? Join us for a hilarious improv battle between two comedy legends.'
  },
  {
    id: '5',
    title: 'Vocal Battle: R&B vs Pop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742',
    viewCount: '22.1K',
    isLive: false,
    scheduledTime: 'Apr 17, 7:00 PM',
    creator1: {
      name: 'Soul Voice',
      username: 'soulvoice',
      avatar: 'https://i.pravatar.cc/150?img=27',
      followers: '187K'
    },
    creator2: {
      name: 'Pop Star',
      username: 'popstar',
      avatar: 'https://i.pravatar.cc/150?img=19',
      followers: '210K'
    },
    description: 'Two incredible vocal talents battle it out across R&B and pop genres. Who will win your vote?'
  },
  {
    id: '6',
    title: 'Street Art Live Challenge',
    thumbnailUrl: '/Images/pl1.jpg',
    viewCount: '15.3K',
    isLive: false,
    scheduledTime: 'Apr 18, 6:30 PM',
    creator1: {
      name: 'Urban Artist',
      username: 'urbanartist',
      avatar: 'https://i.pravatar.cc/150?img=15',
      followers: '76K'
    },
    creator2: {
      name: 'Graffiti Master',
      username: 'graffitimaster',
      avatar: 'https://i.pravatar.cc/150?img=17',
      followers: '82K'
    },
    description: 'Watch two street artists create amazing pieces in real-time. Support your favorite with gifts and votes!'
  }
];

const LivestreamBattle = () => {
  const [isVotingModalOpen, setIsVotingModalOpen] = useState(false);
  const [isGiftingModalOpen, setIsGiftingModalOpen] = useState(false);
  const [selectedCreators, setSelectedCreators] = useState({
    creator1: { id: '', name: '', avatar: '' },
    creator2: { id: '', name: '', avatar: '' }
  });
  
  // const handleOpenVotingModal = (creator1: any, creator2: any) => {
  //   setSelectedCreators({
  //     creator1: { id: '1', name: creator1.name, avatar: creator1.avatar },
  //     creator2: { id: '2', name: creator2.name, avatar: creator2.avatar }
  //   });
  //   setIsVotingModalOpen(true);
  // };
  
  // const handleOpenGiftingModal = (creator1: any, creator2: any) => {
  //   setSelectedCreators({
  //     creator1: { id: '1', name: creator1.name, avatar: creator1.avatar },
  //     creator2: { id: '2', name: creator2.name, avatar: creator2.avatar }
  //   });
  //   setIsGiftingModalOpen(true);
  // };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Live Status Bar */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <Flame className="h-5 w-5 mr-2 text-accent" />
            Live Now
          </h2>
          <LiveBattleStrip battles={liveBattles} />
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="trending" className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="trending">
                <Flame className="h-4 w-4 mr-2" /> 
                Trending
              </TabsTrigger>
              <TabsTrigger value="upcoming">
                <Calendar className="h-4 w-4 mr-2" /> 
                Upcoming
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Trending Tab */}
          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBattles.map((battle) => (
                <BattleCard key={battle.id} {...battle} />
              ))}
            </div>
          </TabsContent>
          
          {/* Upcoming Tab */}
          <TabsContent value="upcoming" className="space-y-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold flex items-center mb-3">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Battles
              </h3>
              <ScheduledBattles battles={upcomingBattles} />
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Weekly Highlights */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-500" /> 
              Weekly Highlights
            </h2>
            <Button variant="link" className="text-primary">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBattles.slice(0, 3).map((battle) => (
              <BattleCard key={`highlight-${battle.id}`} {...battle} />
            ))}
          </div>
        </section>
      </main>
      
      {/* Voting Modal */}
      {/* <VotingModal 
        isOpen={isVotingModalOpen} 
        onClose={() => setIsVotingModalOpen(false)} 
        creator1={selectedCreators.creator1} 
        creator2={selectedCreators.creator2}
      /> */}
      
      {/* Gifting Modal */}
      {/* <GiftingModal
        isOpen={isGiftingModalOpen} 
        onClose={() => setIsGiftingModalOpen(false)} 
        creator1={selectedCreators.creator1} 
        creator2={selectedCreators.creator2}
      /> */}
    </div>
  );
};

export default LivestreamBattle;
