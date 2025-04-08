import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import Header from "@/components/Header";
import AudioPlayer from "@/components/AudioPlaylist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Upload as UploadIcon, Plus, X, Music } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Track } from "../types";

interface TrackFormData {
  title: string;
  audioUrl: string;
  imageUrl: string;
  duration: number;
}

interface PlaylistFormData {
  title: string;
  imageUrl: string;
  trackIds: string[];
}

const Upload = () => {
  const navigate = useNavigate();
  const { tracks, uploadTrack, createPlaylist, currentUser } = useApp();
  
  // Track form state
  const [trackForm, setTrackForm] = useState<TrackFormData>({
    title: "",
    audioUrl: "",
    imageUrl: "/placeholder.svg",
    duration: 180,
  });
  
  // Playlist form state
  const [playlistForm, setPlaylistForm] = useState<PlaylistFormData>({
    title: "",
    imageUrl: "/placeholder.svg",
    trackIds: [],
  });
  
  // Handle track form changes
  const handleTrackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTrackForm((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle playlist form changes
  const handlePlaylistChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPlaylistForm((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle adding a track to the playlist
  const handleAddTrackToPlaylist = (trackId: string) => {
    if (!playlistForm.trackIds.includes(trackId)) {
      setPlaylistForm((prev) => ({
        ...prev,
        trackIds: [...prev.trackIds, trackId],
      }));
    }
  };
  
  // Handle removing a track from the playlist
  const handleRemoveTrackFromPlaylist = (trackId: string) => {
    setPlaylistForm((prev) => ({
      ...prev,
      trackIds: prev.trackIds.filter((id) => id !== trackId),
    }));
  };
  
  // Handle track upload
  const handleTrackUpload = () => {
    // Validate form
    if (!trackForm.title || !trackForm.audioUrl) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Upload track
    const newTrack = uploadTrack({
      title: trackForm.title,
      audioUrl: trackForm.audioUrl,
      imageUrl: trackForm.imageUrl,
      creator: currentUser.username,
      duration: trackForm.duration,
    });
    
    // Reset form
    setTrackForm({
      title: "",
      audioUrl: "",
      imageUrl: "/placeholder.svg",
      duration: 180,
    });
    
    // Add to playlist if we're on the playlist tab
    // if (newTrack) {
    //   handleAddTrackToPlaylist(newTrack.id);
    // }
  };
  
  // Handle playlist creation
  const handleCreatePlaylist = () => {
    // Validate form
    if (!playlistForm.title || playlistForm.trackIds.length === 0) {
      toast({
        title: "Missing information",
        description: "Please add a title and at least one track to your playlist",
        variant: "destructive",
      });
      return;
    }
    
    // Create playlist
    const selectedTracks = tracks.filter((track) => playlistForm.trackIds.includes(track.id));
    
    createPlaylist({
      title: playlistForm.title,
      creator: currentUser.username,
      imageUrl: playlistForm.imageUrl,
      tracks: selectedTracks,
    });
    
    // Navigate to home
    navigate("/");
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
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Upload Your Music</h1>
          
          <Tabs defaultValue="track" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="track">Upload Track</TabsTrigger>
              <TabsTrigger value="playlist">Create Playlist</TabsTrigger>
            </TabsList>
            
            <TabsContent value="track">
              <Card>
                <CardHeader>
                  <CardTitle>Upload a New Track</CardTitle>
                  <CardDescription>
                    Add your track to the platform. It will start with a token price of 2.370 BRD.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="track-title">Track Title</Label>
                    <Input 
                      id="track-title"
                      name="title"
                      value={trackForm.title}
                      onChange={handleTrackChange}
                      placeholder="Enter track title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="track-audio-url">Audio URL</Label>
                    <Input 
                      id="track-audio-url"
                      name="audioUrl"
                      value={trackForm.audioUrl}
                      onChange={handleTrackChange}
                      placeholder="Enter audio URL (e.g., https://example.com/audio.mp3)"
                    />
                    <p className="text-xs text-muted-foreground">
                      Add a direct link to your audio file (MP3, WAV, etc.)
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="track-image-url">Cover Image URL</Label>
                    <Input 
                      id="track-image-url"
                      name="imageUrl"
                      value={trackForm.imageUrl}
                      onChange={handleTrackChange}
                      placeholder="Enter image URL (optional)"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="track-duration">Duration (seconds)</Label>
                    <Input 
                      id="track-duration"
                      name="duration"
                      type="number"
                      min="1"
                      value={trackForm.duration}
                      onChange={handleTrackChange}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleTrackUpload}
                    className="w-full bg-brand hover:bg-brand-dark"
                  >
                    <UploadIcon className="mr-2 h-4 w-4" />
                    Upload Track
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="playlist">
              <Card>
                <CardHeader>
                  <CardTitle>Create a New Playlist</CardTitle>
                  <CardDescription>
                    Combine your tracks into a playlist. It will start with a token price of 2.370 BRD.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="playlist-title">Playlist Title</Label>
                      <Input 
                        id="playlist-title"
                        name="title"
                        value={playlistForm.title}
                        onChange={handlePlaylistChange}
                        placeholder="Enter playlist title"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="playlist-image-url">Cover Image URL</Label>
                      <Input 
                        id="playlist-image-url"
                        name="imageUrl"
                        value={playlistForm.imageUrl}
                        onChange={handlePlaylistChange}
                        placeholder="Enter image URL (optional)"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Selected Tracks ({playlistForm.trackIds.length})</Label>
                    <div className="max-h-60 overflow-y-auto space-y-2 border rounded-md p-2">
                      {playlistForm.trackIds.length > 0 ? (
                        playlistForm.trackIds.map((trackId) => {
                          const track = tracks.find((t) => t.id === trackId);
                          if (!track) return null;
                          return (
                            <div key={trackId} className="flex items-center justify-between p-2 bg-secondary/50 rounded-md">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded overflow-hidden mr-2">
                                  <img 
                                    src={track.imageUrl} 
                                    alt={track.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="text-sm">{track.title}</div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                onClick={() => handleRemoveTrackFromPlaylist(trackId)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Music className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No tracks selected</p>
                          <p className="text-xs">Add tracks to your playlist below</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Available Tracks</Label>
                    <div className="max-h-60 overflow-y-auto space-y-2 border rounded-md p-2">
                      {tracks.length > 0 ? (
                        tracks.filter(track => track.creator === currentUser.username).map((track) => (
                          <div key={track.id} className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded-md">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded overflow-hidden mr-2">
                                <img 
                                  src={track.imageUrl} 
                                  alt={track.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="text-sm">{track.title}</div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 text-muted-foreground hover:text-brand"
                              onClick={() => handleAddTrackToPlaylist(track.id)}
                              disabled={playlistForm.trackIds.includes(track.id)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>No tracks available</p>
                          <p className="text-xs">Upload tracks first to add them to your playlist</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCreatePlaylist}
                    className="w-full bg-brand hover:bg-brand-dark"
                    disabled={!playlistForm.title || playlistForm.trackIds.length === 0}
                  >
                    Create Playlist
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <AudioPlayer />
    </div>
  );
};

export default Upload;
