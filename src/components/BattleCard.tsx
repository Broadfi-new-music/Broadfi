import { useState } from 'react';
import { Heart, MessageSquare, Gift, ThumbsUp } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden max-h-[90vh]">
          <div className="grid md:grid-cols-2 h-full">
            {/* Video Section */}
            <div className="relative bg-black">
              <video 
                className="w-full h-full object-contain"
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
              <div className="absolute bottom-16 right-4 flex flex-col items-end space-y-2 pointer-events-none">
                <div className="gift-animation bg-black/40 rounded-full p-1">
                  <Gift className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="gift-animation bg-black/40 rounded-full p-1 animation-delay-300">
                  <Heart className="h-5 w-5 text-red-500" />
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
                  <Button size="sm" variant="outline" className="bg-primary/20 border-primary text-primary">
                    <ThumbsUp className="mr-1 h-4 w-4" /> Support
                  </Button>
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
              <div className="flex p-4 border-b border-border gap-2">
                <Button className="flex-1" variant="outline">
                  <Heart className="mr-2 h-4 w-4" /> Like
                </Button>
                <Button className="flex-1" variant="outline">
                  <Gift className="mr-2 h-4 w-4" /> Send Gift
                </Button>
                <Button className="flex-1" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" /> Comment
                </Button>
              </div>
              
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
    </div>
  );
};

export default BattleCard;
