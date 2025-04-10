import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import StreamCard from "./StreamCard";
import StreamForm from "./StreamForm";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useStreams } from "@/context/StreamContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const Dashboard: React.FC = () => {
  const { streams } = useStreams();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const today = new Date();
  // Sort streams by date (upcoming first)
  const sortedStreams = [...streams].sort((a, b) => {
    return new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime();
  });

  // Split streams into upcoming and past
  const upcomingStreams = sortedStreams.filter(
    (stream) => new Date(stream.scheduledTime) >= today
  );
  
  const pastStreams = sortedStreams.filter(
    (stream) => new Date(stream.scheduledTime) < today
  );

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Stream Schedule</h1>
          <p className="text-muted-foreground">
            Manage your upcoming livestream schedule
          </p>
        </div>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="mt-4 md:mt-0 bg-stream-purple hover:bg-stream-purple/90"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Schedule New Stream
        </Button>
      </div>

      {/* Create stream dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-lg">
          <DialogTitle>Schedule New Stream</DialogTitle>
          <ScrollArea className="max-h-[80vh] pr-4">
            <StreamForm onClose={() => setIsFormOpen(false)} />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Upcoming streams */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Upcoming Streams</h2>
        {upcomingStreams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {upcomingStreams.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        ) : (
          <div className="bg-muted/30 border border-border rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium">No upcoming streams</h3>
            <p className="text-muted-foreground mt-2">
              Click "Schedule New Stream" to create your first stream.
            </p>
          </div>
        )}
      </div>

      {/* Past streams */}
      {pastStreams.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Past Streams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pastStreams.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
