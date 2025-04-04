
import React from 'react';
import { Button } from '@/components/ui/button';

interface ProfileInfoProps {
  username: string;
  avatarUrl: string;
  isLive: boolean;
  viewerCount: number;
  tokensEarned: number;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  username,
  avatarUrl,
  isLive,
  viewerCount,
  tokensEarned,
}) => {
  return (
    <div className="flex items-center space-x-2 p-4">
      <div className="relative">
        <img 
          src={avatarUrl} 
          alt={username} 
          className="w-12 h-12 rounded-full object-cover border-2 border-stream-primary" 
        />
        {isLive && (
          <div className="absolute -bottom-1 -right-1 bg-stream-primary text-white text-xs px-1 rounded">
            LIVE
          </div>
        )}
      </div>
      <div>
        <div className="font-bold text-white">{username}</div>
        <div className="flex items-center space-x-2 text-xs text-stream-gray">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            {viewerCount.toLocaleString()}
          </span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
            {tokensEarned} BRD
          </span>
        </div>
      </div>
      <Button variant="outline" size="sm" className="ml-auto bg-stream-primary hover:bg-opacity-80 text-white border-none">
        Subscribe
      </Button>
    </div>
  );
};

export default ProfileInfo;
