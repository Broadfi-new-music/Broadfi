import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveStream } from "@/types/battle";
import { cn } from "@/lib/utils";

interface FeaturedStreamsProps {
  liveStreams: LiveStream[];
  onStreamClick: (streamId: string) => void;
}

const FeaturedStreams: React.FC<FeaturedStreamsProps> = ({ liveStreams, onStreamClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredStreams = liveStreams.filter(stream => stream.status === "live");

  const nextStream = () => {
    setCurrentIndex((currentIndex + 1) % featuredStreams.length);
  };

  const prevStream = () => {
    setCurrentIndex((currentIndex - 1 + featuredStreams.length) % featuredStreams.length);
  };

  if (featuredStreams.length === 0) return null;

  const currentStream = featuredStreams[currentIndex];

  return (
    <div className="relative mb-6 rounded-lg overflow-hidden">
      <div className="aspect-video relative">
        <img 
          src={currentStream.thumbnail} 
          alt={currentStream.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
        
        {/* Featured Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <div className="live-badge inline-block mb-2">LIVE FEATURED</div>
              <h1 className="text-white text-xl md:text-2xl font-bold mb-2">
                {currentStream.title}
              </h1>
              <div className="flex items-center mb-3">
                {currentStream.creators.map((creator, index) => (
                  <div key={creator.id} className="flex items-center">
                    <img 
                      src={creator.avatar} 
                      alt={creator.name}
                      className={cn(
                        "w-8 h-8 rounded-full border-2",
                        index === 0 ? "border-battle-accent" : "border-battle-secondary"
                      )}
                    />
                    <span className="text-white text-sm font-medium ml-1 mr-3">
                      {creator.username}
                    </span>
                  </div>
                ))}
              </div>
              <p className="hidden md:block text-white/80 text-sm mb-4">
                Watch these creators battle it out live! Vote for your favorite with BRD tokens 
                and send gifts to support them.
              </p>
              <Button 
                className="bg-battle-accent hover:bg-battle-accent/80"
                onClick={() => onStreamClick(currentStream.id)}
              >
                Watch Now
              </Button>
            </div>
            
            <div className="flex mt-4 md:mt-0">
              <div className="bg-battle-dark/80 px-3 py-1 rounded flex items-center">
                <span className="text-battle-text/80 text-sm mr-2">Featured</span>
                <span className="text-battle-text text-sm">{currentIndex + 1} / {featuredStreams.length}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-2 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/30 text-white rounded-full hover:bg-black/50"
            onClick={prevStream}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/30 text-white rounded-full hover:bg-black/50"
            onClick={nextStream}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedStreams;
