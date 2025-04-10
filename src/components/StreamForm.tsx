import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/ImageUploader";
import { DateTimePicker } from "./DateTimePickerComponent";
import { useStreams } from "@/context/StreamContext";
import { Camera, X } from "lucide-react";

interface StreamFormProps {
  onClose?: () => void;
}

const StreamForm: React.FC<StreamFormProps> = ({ onClose }) => {
  const { addStream } = useStreams();
  const [title, setTitle] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [collaborators, setCollaborators] = useState("");
  const [scheduledTime, setScheduledTime] = useState<Date | undefined>(new Date());
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!scheduledTime) {
      alert("Please select a date and time");
      return;
    }

    addStream({
      title,
      creatorName,
      collaborators,
      scheduledTime,
      imageUrl,
      description,
    });

    // Reset form
    setTitle("");
    setCreatorName("");
    setCollaborators("");
    setScheduledTime(new Date());
    setImageUrl(null);
    setDescription("");
    
    // Close form if provided
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Stream Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter stream title"
          className="mt-1"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="creatorName">Creator Name</Label>
          <Input
            id="creatorName"
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
            placeholder="Your name"
            className="mt-1"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="collaborators">Collaborators</Label>
          <Input
            id="collaborators"
            value={collaborators}
            onChange={(e) => setCollaborators(e.target.value)}
            placeholder="Separate names with commas"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label>Stream Thumbnail</Label>
        <div className="mt-1">
          <ImageUploader onImageUpload={setImageUrl} initialImage={imageUrl} />
        </div>
      </div>

      <div>
        <Label htmlFor="scheduledTime">Schedule Date & Time</Label>
        <div className="mt-1">
          <DateTimePicker date={scheduledTime} setDate={setScheduledTime} />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter stream description"
          className="mt-1"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2">
        {onClose && (
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button type="submit" className="bg-stream-purple hover:bg-stream-purple/90">
          Schedule Stream
        </Button>
      </div>
    </form>
  );
};

export default StreamForm;
