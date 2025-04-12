import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  minimal?: boolean;
}

const AudioContests: React.FC<AudioPlayerProps> = ({ audioUrl, title, minimal = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLInputElement | null>(null);

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

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (progressRef.current) {
        progressRef.current.value = audioRef.current.currentTime.toString();
      }
    }
  };

  const handleLoadedData = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      if (progressRef.current) {
        progressRef.current.max = audioRef.current.duration.toString();
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setCurrentTime(Number(e.target.value));
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadeddata', handleLoadedData);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadeddata', handleLoadedData);
        }
      };
    }
  }, [audioRef.current]);

  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (minimal) {
    return (
      <div className="audio-player flex items-center space-x-2 p-1">
        <audio ref={audioRef} src={audioUrl} />
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-brand-purple" 
          onClick={togglePlay}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </Button>
        <span className="text-xs truncate max-w-[100px]">{title}</span>
      </div>
    );
  }

  return (
    <div className="audio-player text-white border border-gray-800 rounded-lg p-4 shadow-md w-full">
      <audio ref={audioRef} src={audioUrl} />
      <div className="flex flex-col space-y-3">
        <h3 className="font-medium text-whie truncate">{title}</h3>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white" 
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>
          
          <div className="flex-1">
            <input
              ref={progressRef}
              type="range"
              value={currentTime}
              min={0}
              max={duration}
              onChange={handleSeek}
              className="audio-progress"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" onClick={toggleMute}>
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AudioContests;
