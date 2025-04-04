
import React, { useRef, useState, useEffect } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  creatorName?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, creatorName }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((error) => {
          console.error("Video playback error:", error);
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-full" onClick={togglePlay}>
      {creatorName && (
        <div className="absolute top-4 left-4 z-10 flex items-center">
          <span className="text-white text-lg font-bold drop-shadow-lg">{creatorName}</span>
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={videoUrl}
        loop
        playsInline
        muted // Set muted to true to ensure autoplay works on most browsers
        onError={(e) => console.error("Video error:", e)}
      />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-stream-overlay rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
