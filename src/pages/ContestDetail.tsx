import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavigationBar from '@/components/NavigationBar';
import AudioPlayer from "@/components/AudioPlayer";
import RemixEntry from "@/components/RemixEntry";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, Calendar, Trophy, Users, Music, Upload } from "lucide-react";

// Mock contest data
const contestData = {
  id: "1",
  title: "Electronic Summer Remix",
  category: "Electronic",
  prize: 5000,
  deadline: "Apr 30, 2025",
  image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1470&auto=format&fit=crop",
  description: "Create your best summer electronic remix using our theme track. Be creative with your production and make it stand out with unique elements. The top remixes will share a prize pool of 5000 BRD tokens.",
  rules: [
    "Use only the provided theme track as your source material",
    "Your remix must be between 2-5 minutes in duration",
    "Submissions must be in MP3 or WAV format",
    "All sounds must be legally cleared for use",
    "One submission per participant",
    "Deadline for submissions is April 30, 2025 at 11:59 PM UTC"
  ],
  themeTrack: {
    title: "Summer Vibes Theme",
    artist: "RemixToken Official",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1470&auto=format&fit=crop",
    audioUrl: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg",
  },
  announcements: [
    {
      date: "Apr 5, 2025",
      title: "Contest Launch",
      content: "We're excited to announce the launch of our Electronic Summer Remix contest! Download the theme track and start creating your remix today."
    },
    {
      date: "Apr 15, 2025",
      title: "Prize Pool Increase",
      content: "Due to overwhelming participation, we've increased the prize pool to 5000 BRD tokens! Keep those amazing submissions coming."
    }
  ]
};

// Mock remix entries data
const remixEntriesData = [
  {
    id: "entry1",
    title: "Sunset Beach Remix",
    artist: "DJ Waveform",
    audioUrl: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg",
    coverUrl: "https://images.unsplash.com/photo-1525469718471-0e5888a6c71f?q=80&w=1476&auto=format&fit=crop",
    plays: 8745,
    tokenPrice: 0.0234,
    priceChange: 12.5,
    marketCap: 23450,
    position: 1,
    positionChange: 2,
  },
  {
    id: "entry2",
    title: "Tropical House Edit",
    artist: "Summer Beats",
    audioUrl: "https://actions.google.com/sounds/v1/alarms/dinner_bell_triangle.ogg",
    coverUrl: "https://images.unsplash.com/photo-1525469718471-0e5888a6c71f?q=80&w=1476&auto=format&fit=crop",
    plays: 6543,
    tokenPrice: 0.0198,
    priceChange: 8.3,
    marketCap: 19800,
    position: 2,
    positionChange: -1,
  },
  {
    id: "entry3",
    title: "Chill Wave Summer",
    artist: "Beachy Vibes",
    audioUrl: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg",
    coverUrl: "https://images.unsplash.com/photo-1525469718471-0e5888a6c71f?q=80&w=1476&auto=format&fit=crop",
    plays: 4329,
    tokenPrice: 0.0156,
    priceChange: -3.2,
    marketCap: 15600,
    position: 3,
    positionChange: 0,
  },
  {
    id: "entry4",
    title: "Sunset Groove Mix",
    artist: "ElectroMaster",
    audioUrl: "https://actions.google.com/sounds/v1/alarms/dinner_bell_triangle.ogg",
    coverUrl: "https://images.unsplash.com/photo-1525469718471-0e5888a6c71f?q=80&w=1476&auto=format&fit=crop",
    plays: 3892,
    tokenPrice: 0.0142,
    priceChange: 5.7,
    marketCap: 14200,
    position: 4,
    positionChange: 1,
  },
  {
    id: "entry5",
    title: "Dance Floor Heat",
    artist: "Synth Wizard",
    audioUrl: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg",
    coverUrl: "https://images.unsplash.com/photo-1525469718471-0e5888a6c71f?q=80&w=1476&auto=format&fit=crop",
    plays: 3125,
    tokenPrice: 0.0129,
    priceChange: -2.1,
    marketCap: 12900,
    position: 5,
    positionChange: -2,
  },
];

const ContestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [userVotes, setUserVotes] = useState<{ [key: string]: number }>({});
  const [userBalance, setUserBalance] = useState(1000); // Mock user balance
  
  // For demo purposes, we're using the mock data
  const contest = contestData;
  const remixEntries = remixEntriesData;
  
  const handleDownload = () => {
    // In a real app, this would download the theme track
    toast({
      title: "Download started",
      description: "The theme track is downloading to your device",
    });
  };
  
  const handleVote = (entryId: string, amount: number) => {
    // Update user votes
    const newVotes = { ...userVotes };
    newVotes[entryId] = (newVotes[entryId] || 0) + amount;
    setUserVotes(newVotes);
    
    // Update user balance
    setUserBalance(prevBalance => prevBalance - amount);
    
    // In a real app, this would send a transaction to the blockchain
    console.log(`Voted ${amount} BRD for entry ${entryId}`);
  };
  
  const handleWithdraw = (entryId: string) => {
    // Get amount to withdraw
    const amount = userVotes[entryId] || 0;
    
    if (amount <= 0) return;
    
    // Update user votes
    const newVotes = { ...userVotes };
    delete newVotes[entryId];
    setUserVotes(newVotes);
    
    // Update user balance
    setUserBalance(prevBalance => prevBalance + amount);
    
    // In a real app, this would send a transaction to the blockchain
    console.log(`Withdrew ${amount} BRD from entry ${entryId}`);
    
    toast({
      title: "Tokens withdrawn",
      description: `Successfully withdrew ${amount} BRD tokens`,
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-black text-white">
      <NavigationBar />
      <div className="pt-16">
        {/* Contest Header */}
        <div className="relative h-[40vh] overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${contest.image}')`,
            }}
          ></div>
          
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8 relative z-20">
            <div className="bg-primary/80 text-white text-sm font-medium py-1 px-3 rounded-full inline-block mb-4 max-w-max">
              {contest.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{contest.title}</h1>
            <div className="flex flex-wrap items-center text-white/70 gap-4 mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Deadline: {contest.deadline}</span>
              </div>
              <div className="flex items-center">
                <Trophy className="h-4 w-4 mr-1" />
                <span>Prize: {contest.prize} BRD</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>Participants: {remixEntries.length}</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mt-4 md:w-1/2">
              <h3 className="text-lg font-medium mb-2">Your Balance</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">{userBalance.toFixed(2)} BRD</span>
                  <div className="text-white/60 text-sm">Available for voting</div>
                </div>
                <Button variant="outline" className="border-primary text-white">
                  Get More Tokens
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contest Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="entries">Entries</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Contest Description</h2>
                    <p className="text-white/80">{contest.description}</p>
                  </div>
                  
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Rules</h2>
                    <ul className="list-disc pl-5 space-y-2 text-white/80">
                      {contest.rules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6 sticky top-20">
                    <h2 className="text-xl font-bold mb-4">Theme Track</h2>
                    <AudioPlayer
                      title={contest.themeTrack.title}
                      artist={contest.themeTrack.artist}
                      coverUrl={contest.themeTrack.coverUrl}
                      audioUrl={contest.themeTrack.audioUrl}
                    />
                    <Button 
                      className="w-full mt-4 gap-2" 
                      onClick={handleDownload}
                    >
                      <Download className="h-4 w-4" />
                      Download Theme Track
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="entries">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Remix Entries</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Newest First
                    </Button>
                    <Button variant="outline" size="sm">
                      Highest Ranked
                    </Button>
                  </div>
                </div>
                
                {remixEntries.map((entry) => (
                  <RemixEntry
                    key={entry.id}
                    id={entry.id}
                    title={entry.title}
                    artist={entry.artist}
                    audioUrl={entry.audioUrl}
                    coverUrl={entry.coverUrl}
                    plays={entry.plays}
                    tokenPrice={entry.tokenPrice}
                    priceChange={entry.priceChange}
                    marketCap={entry.marketCap}
                    votedAmount={userVotes[entry.id] || 0}
                    position={entry.position}
                    positionChange={entry.positionChange}
                    userBalance={userBalance}
                    onVote={handleVote}
                    onWithdraw={handleWithdraw}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="announcements">
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Contest Announcements</h2>
                
                {contest.announcements.map((announcement, index) => (
                  <div 
                    key={index} 
                    className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{announcement.title}</h3>
                      <span className="text-white/60 text-sm">{announcement.date}</span>
                    </div>
                    <p className="text-white/80">{announcement.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="upload">
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6 max-w-3xl mx-auto">
                <h2 className="text-xl font-bold mb-6 text-center">Upload Your Remix</h2>
                
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-white/40 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Drag and drop your audio file</h3>
                  <p className="text-white/60 mb-4">Supported formats: MP3, WAV (Max size: 20MB)</p>
                  <Button className="mx-auto">
                    <Upload className="h-4 w-4 mr-2" />
                    Select File
                  </Button>
                </div>
                
                <div className="mt-8 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Remix Title
                    </label>
                    <input
                      type="text"
                      className="bg-white/5 w-full p-2 rounded-md border border-white/10 focus:border-primary focus:outline-none"
                      placeholder="Enter the title of your remix"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Description
                    </label>
                    <textarea
                      className="bg-white/5 w-full p-2 rounded-md border border-white/10 focus:border-primary focus:outline-none min-h-[100px]"
                      placeholder="Describe your remix approach and techniques used"
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 border-white/30 rounded bg-white/5 focus:ring-primary"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-white/70">
                      I confirm this is my original work and I have rights to all sounds used
                    </label>
                  </div>
                  
                  <Button className="w-full">
                    <Music className="h-4 w-4 mr-2" />
                    Submit Remix
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-black/80 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Music className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-bold text-gradient">RemixToken</span>
            </div>
            <div className="flex space-x-4 text-white/60">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-6 text-center text-white/40 text-sm">
            &copy; 2025 RemixToken. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContestDetail;
