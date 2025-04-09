import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import DateTimePicker from "./DateTimePicker";
import ImageUpload from "./ImageUpload";
import ScheduleCard from "./ScheduleCardStream";

const StreamScheduler: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [streamDate, setStreamDate] = useState<Date | undefined>(undefined);
  const [creator, setCreator] = useState("");
  const [collaborators, setCollaborators] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !streamDate || !creator) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // In a real app, you would submit to a backend here
    toast.success("Stream scheduled successfully!", {
      description: `Your stream "${title}" has been scheduled for ${streamDate.toLocaleString()}`,
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setStreamDate(undefined);
    setCreator("");
    setCollaborators("");
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-black">Schedule Your Stream</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-black">
                  Stream Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter your stream title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-black">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="What's this stream about?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full min-h-[100px] resize-y"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-black">
                  Stream Date & Time <span className="text-red-500">*</span>
                </Label>
                <DateTimePicker date={streamDate} setDate={setStreamDate} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="creator" className="text-black">
                  Creator Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="creator"
                  placeholder="Your name or channel name"
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="collaborators" className="text-black">
                  Collaborators
                </Label>
                <Input
                  id="collaborators"
                  placeholder="Other creators joining (comma separated)"
                  value={collaborators}
                  onChange={(e) => setCollaborators(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-black">Stream Thumbnail</Label>
                <ImageUpload
                  onImageChange={handleImageChange}
                  className="min-h-[140px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-6 text-lg bg-primary hover:bg-primary/90"
              >
                Schedule Stream
              </Button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-6">
            <h3 className="text-xl font-semibold mb-4">Stream Preview</h3>
            <ScheduleCard
              title={title}
              description={description}
              streamDate={streamDate}
              creator={creator}
              collaborators={collaborators}
              image={imagePreview}
              className="max-w-md mx-auto lg:mx-0"
            />
            <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
              <h4 className="font-medium mb-2">Tips for a successful stream</h4>
              <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Choose a clear, descriptive title that captures interest</li>
                <li>• Add a detailed description about what viewers can expect</li>
                <li>• Schedule at least 24 hours in advance to build anticipation</li>
                <li>• Upload a custom thumbnail that stands out</li>
                <li>• Promote your upcoming stream on social media</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamScheduler;
