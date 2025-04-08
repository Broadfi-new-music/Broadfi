import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, X, Plus, Image, Music, Link as LinkIcon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { mockPodcasts } from '@/data/mockDataPodcast';

const UploadForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [episodes, setEpisodes] = useState([{ 
    title: '', 
    audioUrl: '', 
    audioFile: null as File | null,
    audioType: 'link' as 'link' | 'file',
    imageUrl: '',
    imageFile: null as File | null,
    duration: '0:00'
  }]);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEpisodeImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const updatedEpisodes = [...episodes];
      updatedEpisodes[index].imageFile = file;
      updatedEpisodes[index].imageUrl = URL.createObjectURL(file);
      setEpisodes(updatedEpisodes);
    }
  };

  const handleEpisodeAudioChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const updatedEpisodes = [...episodes];
      updatedEpisodes[index].audioFile = file;
      updatedEpisodes[index].audioUrl = URL.createObjectURL(file);
      
      // Estimate duration (in a real app this would use Web Audio API)
      updatedEpisodes[index].duration = '3:45';
      setEpisodes(updatedEpisodes);
    }
  };

  const handleAddEpisode = () => {
    setEpisodes([
      ...episodes,
      { 
        title: '', 
        audioUrl: '', 
        audioFile: null,
        audioType: 'link',
        imageUrl: '',
        imageFile: null,
        duration: '0:00'
      }
    ]);
  };

  const handleRemoveEpisode = (index: number) => {
    if (episodes.length > 1) {
      const updatedEpisodes = episodes.filter((_, i) => i !== index);
      setEpisodes(updatedEpisodes);
    } else {
      toast({
        variant: "destructive",
        title: "Cannot remove",
        description: "You must have at least one episode"
      });
    }
  };

  const handleEpisodeChange = (index: number, field: string, value: string) => {
    const updatedEpisodes = [...episodes];
    updatedEpisodes[index] = { ...updatedEpisodes[index], [field]: value };
    setEpisodes(updatedEpisodes);
  };

  const handleToggleAudioType = (index: number) => {
    const updatedEpisodes = [...episodes];
    updatedEpisodes[index].audioType = updatedEpisodes[index].audioType === 'link' ? 'file' : 'link';
    updatedEpisodes[index].audioUrl = ''; // Reset URL when changing type
    updatedEpisodes[index].audioFile = null; // Reset file when changing type
    setEpisodes(updatedEpisodes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "Podcast title is required"
      });
      return;
    }
    
    if (!coverImage) {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "Cover image is required"
      });
      return;
    }
    
    // Validate episodes
    const invalidEpisodes = episodes.filter(ep => !ep.title.trim() || !ep.audioUrl);
    if (invalidEpisodes.length > 0) {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "All episodes must have a title and audio source"
      });
      return;
    }
    
    // In a real app, this would upload the files to a server
    // For this demo, we'll simulate a successful upload
    toast({
      title: "Podcast uploaded successfully",
      description: "Your podcast is now available on TokenCast"
    });
    
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload New Podcast</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Podcast Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter podcast title"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter podcast description"
                className="mt-1"
                rows={4}
              />
            </div>
            
            <div>
              <Label htmlFor="cover-image">Cover Image</Label>
              <div className="mt-1 flex items-center gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex items-center gap-2"
                  onClick={() => document.getElementById('cover-image')?.click()}
                >
                  <Image className="h-4 w-4" />
                  <span>Select Cover</span>
                </Button>
                <Input
                  id="cover-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverImageChange}
                />
                <p className="text-sm text-muted-foreground">
                  {coverImage ? coverImage.name : "No file selected"}
                </p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mt-4">
                Each podcast starts with 2.370 BRD tokens. The price will change based on audience engagement.
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            {coverImagePreview ? (
              <div className="relative">
                <img
                  src={coverImagePreview}
                  alt="Cover preview"
                  className="w-full max-w-[200px] h-auto rounded-md object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={() => {
                    setCoverImage(null);
                    setCoverImagePreview(null);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="w-full max-w-[200px] aspect-square bg-secondary/50 rounded-md flex flex-col items-center justify-center">
                <Image className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Cover Image</p>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Episodes</h2>
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleAddEpisode}
            >
              <Plus className="h-4 w-4" />
              <span>Add Episode</span>
            </Button>
          </div>
          
          {episodes.map((episode, index) => (
            <div 
              key={index} 
              className="p-4 mb-4 border border-border rounded-md bg-card/50"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-medium">Episode {index + 1}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemoveEpisode(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`episode-title-${index}`}>Episode Title</Label>
                    <Input
                      id={`episode-title-${index}`}
                      value={episode.title}
                      onChange={(e) => handleEpisodeChange(index, 'title', e.target.value)}
                      placeholder="Enter episode title"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Audio Source</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        type="button"
                        variant={episode.audioType === 'link' ? 'default' : 'outline'}
                        size="sm"
                        className="text-xs"
                        onClick={() => handleToggleAudioType(index)}
                      >
                        <LinkIcon className="h-3 w-3 mr-1" />
                        Link
                      </Button>
                      <Button
                        type="button"
                        variant={episode.audioType === 'file' ? 'default' : 'outline'}
                        size="sm"
                        className="text-xs"
                        onClick={() => handleToggleAudioType(index)}
                      >
                        <Upload className="h-3 w-3 mr-1" />
                        Upload
                      </Button>
                    </div>
                    
                    {episode.audioType === 'link' ? (
                      <Input
                        value={episode.audioUrl}
                        onChange={(e) => handleEpisodeChange(index, 'audioUrl', e.target.value)}
                        placeholder="Enter audio URL"
                        className="mt-2"
                      />
                    ) : (
                      <div className="mt-2 flex items-center gap-4">
                        <Button
                          type="button"
                          variant="secondary"
                          className="flex items-center gap-2"
                          onClick={() => document.getElementById(`episode-audio-${index}`)?.click()}
                        >
                          <Music className="h-4 w-4" />
                          <span>Select Audio</span>
                        </Button>
                        <Input
                          id={`episode-audio-${index}`}
                          type="file"
                          accept="audio/*"
                          className="hidden"
                          onChange={(e) => handleEpisodeAudioChange(index, e)}
                        />
                        <p className="text-sm text-muted-foreground">
                          {episode.audioFile ? episode.audioFile.name : "No file selected"}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor={`episode-image-${index}`}>Episode Image (Optional)</Label>
                    <div className="mt-1 flex items-center gap-4">
                      <Button
                        type="button"
                        variant="secondary"
                        className="flex items-center gap-2"
                        onClick={() => document.getElementById(`episode-image-${index}`)?.click()}
                      >
                        <Image className="h-4 w-4" />
                        <span>Select Image</span>
                      </Button>
                      <Input
                        id={`episode-image-${index}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleEpisodeImageChange(index, e)}
                      />
                      <p className="text-sm text-muted-foreground">
                        {episode.imageFile ? episode.imageFile.name : "No file selected"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  {episode.imageUrl ? (
                    <div className="relative">
                      <img
                        src={episode.imageUrl}
                        alt="Episode preview"
                        className="w-full max-w-[150px] h-auto rounded-md object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => {
                          const updatedEpisodes = [...episodes];
                          updatedEpisodes[index].imageUrl = '';
                          updatedEpisodes[index].imageFile = null;
                          setEpisodes(updatedEpisodes);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full max-w-[150px] aspect-square bg-secondary/50 rounded-md flex flex-col items-center justify-center">
                      <Image className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground">Episode Image</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end pt-4">
          <Button type="submit" className="bg-brd hover:bg-brdDark">
            <Upload className="h-4 w-4 mr-2" />
            Publish Podcast
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
