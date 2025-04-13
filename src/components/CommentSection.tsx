import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { Comment } from '@/types/comment';

interface CommentSectionProps {
  comments: Comment[];
  onSendComment: (text: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onSendComment }) => {
  const [commentText, setCommentText] = useState('');
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new comments arrive
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    }
  }, [comments]);

  const handleSendComment = () => {
    if (commentText.trim()) {
      onSendComment(commentText);
      setCommentText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  return (
    <div className="flex flex-col bg-battle-dark/90 rounded-xl border border-battle-purple/30 h-full">
      <div className="p-3 border-b border-battle-purple/30">
        <h3 className="text-sm font-medium">Live Chat</h3>
      </div>
      
      {/* Comments display */}
      <div 
        ref={commentsContainerRef}
        className="flex-1 overflow-y-auto p-3 space-y-3"
      >
        {comments.map((comment) => (
          <div 
            key={comment.id} 
            className="bg-black/20 rounded-lg p-2 animate-fade-in"
          >
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full overflow-hidden">
                <img 
                  src={comment.avatarUrl} 
                  alt={comment.username} 
                  className="h-full w-full object-cover" 
                />
              </div>
              <span className="text-xs font-semibold text-battle-pink">@{comment.username}</span>
            </div>
            <p className="text-sm mt-1 break-words">{comment.text}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <p className="text-white/50 text-sm">No comments yet</p>
          </div>
        )}
      </div>
      
      {/* Comment input */}
      <div className="p-3 border-t border-battle-purple/30">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-black/50 rounded-full px-4 py-2 text-sm placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-battle-purple"
            placeholder="Add a comment..."
          />
          <button 
            onClick={handleSendComment}
            className="bg-battle-purple text-white p-2 rounded-full hover:bg-battle-pink transition-colors"
            disabled={!commentText.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
