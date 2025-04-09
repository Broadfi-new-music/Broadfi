import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { type Podcast, type PodcastEpisode } from "./PodcastCard";

interface AudioPlayerProps {
  podcast?: Podcast;
  episodeIndex?: number;
  onEpisodeEnd?: () => void;
  onEpisodeChange?: (index: number) => void;
}

const AudioPlayer = ({ podcast, episodeIndex = 0, onEpisodeEnd, onEpisodeChange }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const episode = podcast?.episodes[episodeIndex];

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    
    setCurrentTime(audioRef.current.currentTime);
    
    if (audioRef.current.currentTime === audioRef.current.duration) {
      setIsPlaying(false);
      if (onEpisodeEnd) onEpisodeEnd();
    }
  };
  
  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };
  
  const handleSeek = (value: number) => {
    if (!audioRef.current) return;
    
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };
  
  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return;
    
    const newVolume = value[0];
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = volume;
    } else {
      audioRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };
  
  const skipToPrevious = () => {
    if (!podcast || !onEpisodeChange) return;
    
    const newIndex = episodeIndex === 0 ? podcast.episodes.length - 1 : episodeIndex - 1;
    onEpisodeChange(newIndex);
  };
  
  const skipToNext = () => {
    if (!podcast || !onEpisodeChange) return;
    
    const newIndex = episodeIndex === podcast.episodes.length - 1 ? 0 : episodeIndex + 1;
    onEpisodeChange(newIndex);
  };
  
  // Format time display (mm:ss)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Reset and play when episode changes
  useEffect(() => {
    if (audioRef.current && episode) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [episode, isPlaying]);

  if (!podcast || !episode) {
    return (
      <div className="audio-player flex items-center justify-center h-24">
        <p className="text-muted-foreground">No podcast selected</p>
      </div>
    );
  }

  return (
    <div className="audio-player fixed bottom-0 left-0 right-0 z-50">
      <audio
        ref={audioRef}
        src={episode.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="flex items-center gap-4">
        <img 
          src={episode.imageUrl || podcast.imageUrl} 
          alt={episode.title} 
          className="h-16 w-16 rounded-md hidden sm:block"
        />
        
        <div className="flex-grow overflow-hidden mr-4">
          <h4 className="font-medium truncate">{episode.title}</h4>
          <p className="text-sm text-muted-foreground truncate">{podcast.creator}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={skipToPrevious}
          >
            <SkipBack className="h-5 w-5" />
          </Button>
          
          <Button 
            size="icon" 
            variant="secondary" 
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={skipToNext}
          >
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="hidden md:flex flex-grow items-center gap-2">
          <span className="text-xs w-10">{formatTime(currentTime)}</span>
          <div className="w-full">
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.1}
              onValueChange={(value) => handleSeek(value[0])}
            />
          </div>
          <span className="text-xs w-10">{formatTime(duration)}</span>
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
          
          <div className="w-24">
            <Slider
              value={[isMuted ? 0 : volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
      
      <div className="md:hidden mt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <div className="w-full">
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.1}
              onValueChange={(value) => handleSeek(value[0])}
            />
          </div>
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
