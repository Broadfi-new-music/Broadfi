import { useEffect, useRef } from "react";

interface AudioWaveformProps {
  isPlaying: boolean;
  barCount?: number;
}

const AudioWaveform = ({ isPlaying, barCount = 10 }: AudioWaveformProps) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (waveformRef.current) {
      const bars = waveformRef.current.querySelectorAll('.audio-wave-bar');
      bars.forEach((bar, index) => {
        (bar as HTMLElement).style.setProperty('--index', index.toString());
      });
    }
  }, []);

  return (
    <div 
      ref={waveformRef}
      className={`audio-wave ${isPlaying ? 'is-playing' : ''}`}
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className="audio-wave-bar"
          style={{ 
            height: `${Math.floor(Math.random() * 20) + 5}px`,
          }}
        />
      ))}
    </div>
  );
};

export default AudioWaveform;
