import React from "react";
import { format } from "date-fns";
import { Calendar, Clock, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Stream } from "@/types/stream";
import { Button } from "@/components/ui/button";
import { useStreams } from "@/context/StreamContext";

interface StreamCardProps {
  stream: Stream;
}

const StreamCard: React.FC<StreamCardProps> = ({ stream }) => {
  const { deleteStream } = useStreams();
  const defaultImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden relative">
        <img
          src={stream.imageUrl || defaultImage}
          alt={stream.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="font-bold text-white text-lg line-clamp-1">{stream.title}</h3>
        </div>
      </div>
      
      <CardHeader className="p-3 pb-0">
        <div className="text-sm text-muted-foreground line-clamp-1">
          By <span className="font-semibold text-foreground">{stream.creatorName}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-3 flex-grow">
        <div className="space-y-2">
          {stream.collaborators && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span className="line-clamp-1">With: {stream.collaborators}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{format(new Date(stream.scheduledTime), "MMM d, yyyy")}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>{format(new Date(stream.scheduledTime), "h:mm a")}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => deleteStream(stream.id)}
        >
          Cancel Stream
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StreamCard;
