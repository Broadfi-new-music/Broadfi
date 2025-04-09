import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Download, Share, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import AudioWaveform from "./AudioWaveform";

interface AudioPlayerProps {
  title: string;
  artist: string;
  audioSrc: string;
  coverUrl: string;
  audioUrl: string;
  compact?: boolean;
}

const AudioPlayer = ({ title, artist, audioSrc, coverUrl,  audioUrl, compact = false }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };
  
  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`glass-card rounded-lg ${compact ? 'p-3' : 'p-4'}`}>
      <audio 
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      
      <div className="flex items-center space-x-3">
        <Button 
          variant="ghost" 
          size="icon"
          className="h-10 w-10 rounded-full bg-primary/20 hover:bg-primary/30 text-primary"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        
        <div className="flex-grow">
          {!compact && (
            <div className="flex justify-between text-sm mb-1">
              <div className="font-medium truncate">{title}</div>
              <div className="text-muted-foreground">{artist}</div>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground w-10">
              {formatTime(currentTime)}
            </span>
            
            <div className="flex-grow relative">
              {compact ? (
                <AudioWaveform isPlaying={isPlaying} barCount={16} />
              ) : (
                <>
                  <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={0.1}
                    onValueChange={handleSliderChange}
                    className="z-10"
                  />
                  <div className="absolute inset-0 z-0 flex items-center">
                    <AudioWaveform isPlaying={isPlaying} barCount={30} />
                  </div>
                </>
              )}
            </div>
            
            <span className="text-xs text-muted-foreground w-10 text-right">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        
        {!compact && (
          <div className="flex items-center space-x-2 ml-2">
            <div className="hidden sm:flex items-center space-x-2 w-28">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
              />
            </div>
            
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Download className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      {!compact && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary h-8 px-2">
                <Heart className="h-4 w-4 mr-1" />
                <span className="text-xs">128</span>
              </Button>
            </div>
            
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary h-8 px-2">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span className="text-xs">24</span>
              </Button>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            45.2K plays
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
