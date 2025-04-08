import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import Header from "@/components/Header";
import TrackList from "@/components/TrackList";
import StakingPanel from "@/components/StakingPanel";
import AudioPlayer from "@/components/AudioPlaylist";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Play, TrendingUp, Users, DollarSign } from "lucide-react";

const PlaylistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playlists, setCurrentPlaylist, setCurrentTrack, currentPlaylist } = useApp();
  
  // Find the playlist by id
  const playlist = playlists.find((p) => p.id === id);
  
  useEffect(() => {
    if (playlist) {
      setCurrentPlaylist(playlist);
    }
    
    // Cleanup on unmount
    return () => {
      setCurrentPlaylist(null);
    };
  }, [playlist, setCurrentPlaylist]);
  
  if (!playlist) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Playlist not found</h2>
            <Button onClick={() => navigate("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  const handlePlayAll = () => {
    if (playlist.tracks.length > 0) {
      setCurrentTrack(playlist.tracks[0]);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-16">
      <Header />
      
      <main className="flex-1 container py-6">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="md:col-span-2 lg:col-span-3 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-48 lg:w-64 aspect-square rounded-xl overflow-hidden shadow-md flex-shrink-0">
                <img 
                  src={playlist.imageUrl} 
                  alt={playlist.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-grow space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">{playlist.title}</h1>
                  <p className="text-muted-foreground">by {playlist.creator}</p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-brand" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Price</div>
                      <div className="font-semibold">{playlist.tokenPrice.toFixed(3)} BRD</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">ROI</div>
                      <div className="font-semibold text-green-600">{playlist.roi.toFixed(1)}%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Listeners</div>
                      <div className="font-semibold">
                        {playlist.listeners >= 1000 ? `${(playlist.listeners / 1000).toFixed(1)}K` : playlist.listeners}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    onClick={handlePlayAll} 
                    className="bg-brand hover:bg-brand-dark"
                    disabled={playlist.tracks.length === 0}
                  >
                    <Play className="mr-2 h-4 w-4 fill-current" />
                    Play All
                  </Button>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Tracks</h2>
              <TrackList tracks={playlist.tracks} showCreator={false} />
            </div>
          </div>
          
          <div className="md:col-span-1">
            <StakingPanel playlist={playlist} />
          </div>
        </div>
      </main>
      
      <AudioPlayer />
    </div>
  );
};

export default PlaylistDetail;
