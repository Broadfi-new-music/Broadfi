
import React, { useEffect, useRef, useState } from 'react';

interface Comment {
  id: number;
  username: string;
  avatarUrl: string;
  text: string;
  timestamp: Date;
}

interface CommentsProps {
  comments: Comment[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  return (
    <div className="absolute left-3 bottom-20 w-3/4 max-w-xs max-h-80 overflow-hidden">
      <div className="space-y-2">
        {comments.slice(-5).map((comment) => (
          <div key={comment.id} className="comment-bubble">
            <div className="flex items-center space-x-2">
              <img
                src={comment.avatarUrl}
                alt={comment.username}
                className="w-6 h-6 rounded-full"
              />
              <span className="font-bold text-xs text-stream-secondary">{comment.username}</span>
            </div>
            <div className="text-sm text-white mt-1">{comment.text}</div>
          </div>
        ))}
        <div ref={commentsEndRef} />
      </div>
    </div>
  );
};

export default Comments;
