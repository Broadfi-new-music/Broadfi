import React, { useState } from "react";
import Header from "@/components/HeaderBattle";
import NavigationTabs from "@/components/NavigationTabs";
import FeaturedStreams from "@/components/FeaturedStream";
import LiveStreamGrid from "@/components/LiveStreamGrid";
import LiveStreamPlayer from "@/components/LiveStreamPlayer";
import ScheduleList from "@/components/ScheduleList";
import { liveStreams, currentUser } from "@/data/mockDataBattle";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import StreamScheduler from "@/components/StreamScheduler";

const Index = () => {
  const [activeTab, setActiveTab] = useState("live");
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  
  const tabs = [
    { id: "live", label: "Live Now" },
    { id: "scheduled", label: "Scheduled" },
    { id: "categories", label: "Categories" },
    { id: "following", label: "Following" },
    { id: "schedule", label: "Schedule" },
  ];
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };
  
  const handleStreamClick = (streamId: string) => {
    const stream = liveStreams.find(s => s.id === streamId);
    if (stream && stream.status === "live") {
      setSelectedStream(streamId);
    } else if (stream) {
      // For scheduled streams, just show a notification
      toast(`"${stream.title}" is scheduled to go live soon!`);
    }
  };
  
  const getActiveStreams = () => {
    return liveStreams.filter(stream => stream.status === "live");
  };
  
  const getScheduledStreams = () => {
    return liveStreams.filter(stream => stream.status === "scheduled")
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case "live":
        return (
          <LiveStreamGrid 
            streams={getActiveStreams()} 
            onStreamClick={handleStreamClick} 
          />
        );
      case "scheduled":
        return <ScheduleList streams={getScheduledStreams()} />;
      case "categories":
        return (
          <div className="py-8 text-center">
            <p className="text-battle-text/70">Categories coming soon</p>
          </div>
        );
      case "following":
        return (
          <div className="py-8 text-center">
            <p className="text-battle-text/70">Following coming soon</p>
          </div>
        );
      case "schedule":
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                Stream Scheduler
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Create and schedule your next livestream for your audience to anticipate
              </p>
            </div>
            
            <StreamScheduler />
          </div>
        </div>
        );
      default:
        return null;
    }
  };
  
  const selectedStreamData = liveStreams.find(s => s.id === selectedStream);
  
  return (
    <div className="min-h-screen bg-battle-bg text-battle-text">
      <Toaster position="top-center" />
      <Header />
      
      <main className="container px-4 py-6">
        {/* Featured Streams Carousel */}
        {activeTab === "live" && (
          <FeaturedStreams 
            liveStreams={liveStreams} 
            onStreamClick={handleStreamClick}
          />
        )}
        
        {/* Navigation Tabs */}
        <NavigationTabs tabs={tabs} onTabChange={handleTabChange} />
        
        {/* Content Area */}
        <div className="mt-6">
          {renderContent()}
        </div>
      </main>
      
      {/* Live Stream Player Modal */}
      {selectedStream && selectedStreamData && (
        <LiveStreamPlayer 
          stream={selectedStreamData} 
          currentUser={currentUser}
          onClose={() => setSelectedStream(null)} 
        />
      )}
    </div>
  );
};

export default Index;
