
import React, { useState, useCallback } from "react";
import { ImageIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImageChange: (image: File | null) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, className }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onImageChange(file);
      } else {
        setPreview(null);
        onImageChange(null);
      }
    },
    [onImageChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    handleFileChange(file || null);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileChange(e.dataTransfer.files[0]);
      }
    },
    [handleFileChange]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange(null);
  };

  return (
    <div className={cn("w-full", className)}>
      {!preview ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-primary/50",
            className
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            id="image-upload"
            className="hidden"
            accept="image/*"
            onChange={handleInputChange}
          />
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="p-3 rounded-full bg-primary/10 mb-3">
                <ImageIcon className="h-8 w-8 text-primary" />
              </div>
              <p className="text-lg font-medium mb-1">Upload thumbnail</p>
              <p className="text-sm text-gray-500 text-center">
                Drag and drop an image or click to browse
              </p>
              <div className="mt-4 flex items-center">
                <Upload className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm text-primary font-medium">
                  Select an image
                </span>
              </div>
            </div>
          </label>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={handleRemove}
              className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

