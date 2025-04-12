import { useState } from 'react';
import { Heart, MessageSquare, Gift, ThumbsUp, Vote,  Calendar, Clock, Trophy, } from 'lucide-react';
import VotingModal from '../components/VotingModal';
import GiftingModal from '../components/GiftngModal';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

interface Creator {
  name: string;
  username: string;
  avatar: string;
  followers: string;
}

interface BattleProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  viewCount: string;
  isLive: boolean;
  scheduledTime?: string;
  creator1: Creator;
  creator2: Creator;
  description: string;
}
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
const BattleCard = ({
  id,
  title,
  thumbnailUrl,
  viewCount,
  isLive,
  scheduledTime,
  creator1,
  creator2,
  description
}: BattleProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [isVotingModalOpen, setIsVotingModalOpen] = useState(false);
  const [isGiftingModalOpen, setIsGiftingModalOpen] = useState(false);
   const [selectedCreators, setSelectedCreators] = useState({
      creator1: { id: '', name: '', avatar: '' },
      creator2: { id: '', name: '', avatar: '' }
    });
  const handleOpenVotingModal = (creator1: any, creator2: any) => {
    setSelectedCreators({
      creator1: { id: '1', name: creator1.name, avatar: creator1.avatar },
      creator2: { id: '2', name: creator2.name, avatar: creator2.avatar }
    });
    setIsVotingModalOpen(true);
  };
  
  const handleOpenGiftingModal = (creator1: any, creator2: any) => {
    setSelectedCreators({
      creator1: { id: '1', name: creator1.name, avatar: creator1.avatar },
      creator2: { id: '2', name: creator2.name, avatar: creator2.avatar }
    });
    setIsGiftingModalOpen(true);
  };
  return (
    <div className="relative overflow-hidden rounded-lg bg-secondary hover:bg-secondary/90 transition-all duration-300 hover:scale-[1.01] cursor-pointer">
      <div 
        className="relative aspect-video w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${thumbnailUrl})` }}
        onClick={() => setShowDialog(true)}
      >
        {/* Live indicator */}
        {isLive && (
          <div className="live-indicator">
            <span className="live-dot"></span>
            LIVE
          </div>
        )}
        
        {/* Scheduled time */}
        {!isLive && scheduledTime && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {scheduledTime}
          </div>
        )}
        
        {/* View count */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          {viewCount}
        </div>
        
        {/* Creators avatars */}
        <div className="absolute bottom-2 left-2 flex -space-x-2">
          <img 
            src={creator1.avatar} 
            alt={creator1.name} 
            className="w-8 h-8 rounded-full border-2 border-background"
          />
          <img 
            src={creator2.avatar} 
            alt={creator2.name} 
            className="w-8 h-8 rounded-full border-2 border-background"
          />
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>{creator1.username} vs {creator2.username}</span>
          <div className="flex items-center gap-2">
            <span className="flex items-center">
              <Heart className="h-3 w-3 mr-1" />
              2.1k
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-3 w-3 mr-1" />
              450
            </span>
          </div>
        </div>
      </div>
      
      {/* Battle Detail Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[600px] p-0">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-col-1 lg:grid-cols-1">
            {/* Video Section */}
            <div className="relative bg-black">
              <video 
                className="w-full h-[250px] object-contain"
                poster={thumbnailUrl} 
                autoPlay 
                muted 
                loop
                controls
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-young-woman-vlogging-with-her-smartphone-at-a-urban-42477-large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {isLive && (
                <div className="absolute top-4 left-4 flex items-center gap-1">
                  <div className="h-2 w-2 bg-destructive rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-white">LIVE</span>
                </div>
                
              )}
              
              {/* Live reactions section */}
               <div className="absolute bottom-23 right-4 flex flex-col items-end space-y-2">
               <div className="flex gap-2 pl-[10px]">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleOpenVotingModal(featuredBattles[0].creator1, featuredBattles[0].creator2)}
                  className="flex items-center gap-1"
                >
                  <Vote className="h-4 w-4" /> 
                  <span className="hidden sm:inline">Vote</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleOpenGiftingModal(featuredBattles[0].creator1, featuredBattles[0].creator2)}
                  className="flex items-center gap-1"
                >
                  <Gift className="h-4 w-4" /> 
                  <span className="hidden sm:inline">Gift</span>
                </Button>
              </div>
              </div>
              {/* Creator info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <img src={creator1.avatar} alt={creator1.name} className="w-10 h-10 rounded-full border-2 border-primary" />
                    <div>
                      <p className="text-sm font-medium">{creator1.name}</p>
                      <p className="text-xs text-muted-foreground">{creator1.followers} followers</p>
                    </div>
                  </div>
                  {/* <Button size="sm" variant="outline" className="bg-primary/20 border-primary text-primary">
                    <ThumbsUp className="mr-1 h-4 w-4" /> Support
                  </Button> */}
                </div>
              </div>
            </div>
            
            {/* Info and Comments Section */}
            <div className="flex flex-col h-full max-h-[500px] overflow-hidden">
              <DialogHeader className="p-4 border-b border-border">
                <DialogTitle className="text-lg">{title}</DialogTitle>
                <p className="text-sm text-muted-foreground mt-2">{description}</p>
              </DialogHeader>
              
              {/* Battle Stats */}
              <div className="grid grid-cols-2 p-4 border-b border-border gap-4">
                <div className="flex flex-col items-center">
                  <img src={creator1.avatar} alt={creator1.name} className="w-14 h-14 rounded-full" />
                  <h4 className="font-medium text-sm mt-2">{creator1.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1 text-primary" />
                      <span className="text-xs">2.4k</span>
                    </div>
                    <div className="flex items-center">
                      <Gift className="h-4 w-4 mr-1 text-yellow-400" />
                      <span className="text-xs">576</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <img src={creator2.avatar} alt={creator2.name} className="w-14 h-14 rounded-full" />
                  <h4 className="font-medium text-sm mt-2">{creator2.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1 text-primary" />
                      <span className="text-xs">2.1k</span>
                    </div>
                    <div className="flex items-center">
                      <Gift className="h-4 w-4 mr-1 text-yellow-400" />
                      <span className="text-xs">489</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              {/* <div className="bottom-16 right-4 flex flex-col items-end space-y-2 pointer-events-none"> */}
                 
              {/* </div> */}
              
              {/* Comments */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex gap-2">
                  <img src="https://github.com/shadcn.png" alt="User" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-xs font-medium">@user123</p>
                    <p className="text-sm">This battle is fire! 🔥</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" alt="User" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-xs font-medium">@viewer456</p>
                    <p className="text-sm">Let's go Team Blue! 💙</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36" alt="User" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-xs font-medium">@fan2022</p>
                    <p className="text-sm">Amazing skills from both creators!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <VotingModal 
        isOpen={isVotingModalOpen} 
        onClose={() => setIsVotingModalOpen(false)} 
        creator1={selectedCreators.creator1} 
        creator2={selectedCreators.creator2}
      />
      
      {/* Gifting Modal */}
      <GiftingModal
        isOpen={isGiftingModalOpen} 
        onClose={() => setIsGiftingModalOpen(false)} 
        creator1={selectedCreators.creator1} 
        creator2={selectedCreators.creator2}
      />
    </div>
  );
};

export default BattleCard;
