
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CommentInputProps {
  onSubmit: (comment: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="absolute left-3 right-3 bottom-3 flex">
      <Input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        className="bg-stream-dark border-stream-gray text-white flex-1"
      />
      <Button 
        type="submit" 
        className="ml-2 bg-stream-primary hover:bg-opacity-80 text-white"
        disabled={!comment.trim()}
      >
        Send
      </Button>
    </form>
  );
};

export default CommentInput;
