import React, { useState } from "react";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  onImageUpload: (imageData: string | null) => void;
  initialImage?: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageUpload, 
  initialImage = null 
}) => {
  const [image, setImage] = useState<string | null>(initialImage);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Please upload an image smaller than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImage(result);
      onImageUpload(result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    onImageUpload(null);
  };

  return (
    <div className="relative rounded-lg overflow-hidden">
      {image ? (
        <div className="relative w-full h-48 bg-muted">
          <img
            src={image}
            alt="Stream thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="image-upload-overlay">
            <Button 
              variant="destructive" 
              size="sm"
              onClick={removeImage}
              className="rounded-full p-1 h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 bg-muted rounded-lg border-2 border-dashed border-border cursor-pointer hover:bg-muted/80 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Camera className="w-10 h-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploader;
