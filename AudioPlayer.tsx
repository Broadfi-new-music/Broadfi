import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, Download, Share, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  likes?: number;
  comments?: number;
  onDownload?: () => void;
  onShare?: () => void;
  onLike?: () => void;
  onComment?: () => void;
  compact?: boolean;
  className?: string;
}

const AudioPlayer = ({
  title,
  artist,
  coverUrl,
  audioUrl,
  likes = 0,
  comments = 0,
  onDownload,
  onShare,
  onLike,
  onComment,
  compact = false,
  className,
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const updateVolume = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const seek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  return (
    <div className={cn("relative bg-black/40 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden", className)}>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={updateTime}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="flex items-start p-4">
        {!compact && (
          <div className="flex-shrink-0 mr-4">
            <div className="relative w-20 h-20 rounded-md overflow-hidden">
              <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                <Play className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-white font-medium truncate">{title}</h3>
              <p className="text-white/60 text-sm">{artist}</p>
            </div>
            {compact && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-white/10"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
            )}
          </div>
          
          <div className="mt-2 space-y-2">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-white/10"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <div className="flex-1 flex items-center space-x-2">
                <span className="text-xs text-white/60 w-8">{formatTime(currentTime)}</span>
                <Slider
                  value={[currentTime]}
                  min={0}
                  max={duration || 100}
                  step={0.01}
                  onValueChange={seek}
                  className="flex-1"
                />
                <span className="text-xs text-white/60 w-8">{formatTime(duration)}</span>
              </div>
              
              <div className="flex items-center space-x-1 ml-2">
                <Volume2 className="h-4 w-4 text-white/60" />
                <Slider
                  value={[volume]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={updateVolume}
                  className="w-16"
                />
              </div>
            </div>
            
            {!compact && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 rounded-full hover:bg-white/10"
                    onClick={onLike}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">{likes}</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 rounded-full hover:bg-white/10"
                    onClick={onComment}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span className="text-xs">{comments}</span>
                  </Button>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-white/10"
                    onClick={onShare}
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-white/10"
                    onClick={onDownload}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
