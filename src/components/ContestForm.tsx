
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FileUpload from  "./FileUpload";
import AudioForm from "./AudioForm";
import PrizePoolInput, { PrizePool } from  "./PrizePoolInput";
import { MusicIcon } from "lucide-react";

const ContestForm = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [hostName, setHostName] = useState("");
  const [overview, setOverview] = useState("");
  const [albumArt, setAlbumArt] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [prizes, setPrizes] = useState<PrizePool[]>([
    { position: 1, amount: "" },
    { position: 2, amount: "" },
    { position: 3, amount: "" }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating form submission
    setTimeout(() => {
      console.log({
        title,
        hostName,
        overview,
        albumArt,
        audioFile,
        prizes
      });
      
      toast({
        title: "Contest Created!",
        description: "Your remix contest has been created successfully.",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MusicIcon className="h-6 w-6 text-contest-purple" />
            <CardTitle>Create Remix Contest</CardTitle>
          </div>
          <CardDescription>
            Set up a new remix contest for creators to participate in.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Contest Title</Label>
            <Input
              id="title"
              placeholder="Enter contest title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hostName">Host Name</Label>
            <Input
              id="hostName"
              placeholder="Your name or artist name"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              required
            />
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUpload 
              title="Album Art"
              description="Upload your album artwork (JPG, PNG, up to 5MB)"
              accept=".jpg,.jpeg,.png"
              maxSize={5}
              onFileSelect={setAlbumArt}
              isImage
            />
            
            <div className="space-y-2">
              <FileUpload 
                title="Audio Track"
                description="Upload your audio track (MP3, WAV, up to 20MB)"
                accept=".mp3,.wav"
                maxSize={20}
                onFileSelect={setAudioFile}
              />
              
              {audioFile && (
                <AudioForm audioFile={audioFile} className="mt-4" />
              )}
            </div>
          </div>
          
          <Separator />
          
          <PrizePoolInput 
            prizes={prizes}
            onChange={setPrizes}
          />
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="overview">Contest Overview</Label>
            <Textarea
              id="overview"
              placeholder="Describe your contest rules, requirements, and any additional details"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              required
              className="min-h-32"
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => {
              // Reset form
              setTitle("");
              setHostName("");
              setOverview("");
              setAlbumArt(null);
              setAudioFile(null);
              setPrizes([
                { position: 1, amount: "" },
                { position: 2, amount: "" },
                { position: 3, amount: "" }
              ]);
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-gradient-contest hover:opacity-90 transition-opacity"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Contest"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ContestForm;
