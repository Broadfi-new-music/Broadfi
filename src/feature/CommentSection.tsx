import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Comment } from "@/types/livebattle";
import { getRelativeTime } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Send, Users, Trophy } from "lucide-react";

interface CommentSectionProps {
  comments: Comment[];
  viewCount: number;
  totalPrize: number;
  title: string;
  onSendComment: (comment: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  viewCount,
  totalPrize,
  title,
  onSendComment
}) => {
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();
  
  const handleSendComment = () => {
    if (newComment.trim() === "") return;
    
    onSendComment(newComment);
    setNewComment("");
    
    toast({
      title: "Comment sent",
      description: "Your comment is now visible in the livestream",
    });
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex justify-between mt-2 text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{viewCount} watching</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-brand" />
            <span>{totalPrize} BRD</span>
          </div>
        </div>
      </div>
      
      {/* Comments section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="flex gap-2">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={comment.avatar} />
              <AvatarFallback>{comment.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{comment.username}</span>
                <span className="text-xs text-muted-foreground">{getRelativeTime(comment.timestamp)}</span>
              </div>
              <p className="text-sm">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Comment input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input 
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendComment()}
          />
          <Button variant="ghost" size="icon" onClick={handleSendComment}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
