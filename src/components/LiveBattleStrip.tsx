import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Creator {
  name: string;
  avatar: string;
}

interface LiveBattleProps {
  id: string;
  creator1: Creator;
  creator2: Creator;
  viewCount: string;
  previewUrl: string;
}

const LiveBattleItem = ({ battle }: { battle: LiveBattleProps }) => {
  return (
    <div className="flex-shrink-0 w-[120px] cursor-pointer relative group">
      <div 
        className="w-full h-[160px] rounded-lg bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${battle.previewUrl})` }}
      >
        <div className="live-indicator">
          <span className="live-dot"></span>
          <span>LIVE</span>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
          <div className="flex -space-x-2 items-center">
            <img src={battle.creator1.avatar} alt={battle.creator1.name} className="w-6 h-6 rounded-full border border-primary" />
            <img src={battle.creator2.avatar} alt={battle.creator2.name} className="w-6 h-6 rounded-full border border-primary" />
            <span className="text-xs ml-1 text-white">{battle.viewCount}</span>
          </div>
        </div>
      </div>
      <div className="mt-1.5 text-xs line-clamp-2 text-muted-foreground">
        {battle.creator1.name} vs {battle.creator2.name}
      </div>
    </div>
  );
};

const LiveBattleStrip = ({ battles }: { battles: LiveBattleProps[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };
  
  return (
    <div className="relative">
      {/* Left scroll button */}
      {showLeftScroll && (
        <button 
          onClick={scrollLeft} 
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-1 shadow-md backdrop-blur-sm"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      
      {/* Live battles horizontal scroll */}
      <div 
        ref={scrollRef} 
        className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide" 
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none' }}
      >
        {battles.map((battle) => (
          <LiveBattleItem key={battle.id} battle={battle} />
        ))}
      </div>
      
      {/* Right scroll button */}
      {showRightScroll && (
        <button 
          onClick={scrollRight} 
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-1 shadow-md backdrop-blur-sm"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default LiveBattleStrip;
