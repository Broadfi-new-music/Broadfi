
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, Music } from 'lucide-react';

interface UploadFormProps {
  contestId: string;
  onUploadSuccess: () => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ contestId, onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !artist || !audioFile) {
      toast({
        title: "Missing Fields",
        description: "Please fill all required fields and upload an audio file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload Successful!",
        description: "Your remix has been submitted to the contest.",
      });
      
      // Reset form
      setTitle('');
      setArtist('');
      setAudioFile(null);
      setCoverImage(null);
      
      onUploadSuccess();
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Submit Your Remix</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Remix Title</Label>
            <Input
              id="title"
              placeholder="Enter a title for your remix"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="artist">Artist Name</Label>
            <Input
              id="artist"
              placeholder="Your artist/producer name"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="audio">Audio File</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {audioFile ? (
                <div className="flex items-center justify-center space-x-2">
                  <Music className="h-6 w-6 text-brand-purple" />
                  <span className="font-medium">{audioFile.name}</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <Music className="h-8 w-8 mx-auto text-gray-400" />
                  <div className="text-sm text-gray-500">
                    <label htmlFor="audio-upload" className="cursor-pointer text-brand-purple hover:text-brand-purple-dark">
                      Upload an audio file
                    </label>
                    <p>MP3, WAV, or AIFF (max 15MB)</p>
                  </div>
                </div>
              )}
              <Input
                id="audio-upload"
                type="file"
                className="hidden"
                accept="audio/*"
                onChange={handleAudioChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image (Optional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {coverImage ? (
                <div className="flex items-center justify-center">
                  <img 
                    src={URL.createObjectURL(coverImage)} 
                    alt="Cover preview" 
                    className="h-24 w-24 object-cover rounded-md" 
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 mx-auto text-gray-400" />
                  <div className="text-sm text-gray-500">
                    <label htmlFor="cover-upload" className="cursor-pointer text-brand-purple hover:text-brand-purple-dark">
                      Upload a cover image
                    </label>
                    <p>PNG, JPG, or GIF (max 2MB)</p>
                  </div>
                </div>
              )}
              <Input
                id="cover-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          
          <CardFooter className="px-0 pt-6">
            <Button 
              type="submit" 
              className="w-full bg-brand-purple hover:bg-brand-purple-dark"
              disabled={isUploading}
            >
              {isUploading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Submit Remix
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadForm;