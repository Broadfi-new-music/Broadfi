import { useRef, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useApp } from "@/context/AppContext";
import { Card, CardContent } from "@/components/ui/card";

const Player = () => {
  const { currentTrack, isPlaying, togglePlayPause } = useApp();
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.audio.current.play();
      } else {
        playerRef.current.audio.current.pause();
      }
    }
  }, [isPlaying]);

  // Only show the player if there's a track selected
  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 pb-16 md:pb-0">
      <Card className="border-t shadow-lg">
        <CardContent className="p-2">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded overflow-hidden">
              <img 
                src={currentTrack.imageUrl} 
                alt={currentTrack.title}
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="flex-grow min-w-0">
              <div className="text-sm font-medium truncate">{currentTrack.title}</div>
              <div className="text-xs text-muted-foreground truncate">{currentTrack.creator}</div>
            </div>
            
            <div className="flex-grow max-w-xl audio-player-container">
              <AudioPlayer
                ref={playerRef}
                src={currentTrack.audioUrl}
                showJumpControls={false}
                layout="horizontal"
                // customProgressBarSection={["PROGRESS_BAR"]}
                autoPlayAfterSrcChange={true}
                onPlay={() => !isPlaying && togglePlayPause()}
                onPause={() => isPlaying && togglePlayPause()}
              />
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              <div className="text-sm">
                <span className="font-medium text-brand">{currentTrack.tokenPrice.toFixed(3)}</span>
                <span className="text-muted-foreground ml-1">BRD</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Player;
