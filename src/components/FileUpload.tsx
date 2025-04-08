import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  title: string;
  description: string;
  accept: string;
  maxSize?: number;
  onFileSelect: (file: File | null) => void;
  className?: string;
  isImage?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  title,
  description,
  accept,
  maxSize = 5, // Default 5MB
  onFileSelect,
  className,
  isImage = false,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setError(null);

    if (!selectedFile) {
      setFile(null);
      setPreview(null);
      onFileSelect(null);
      return;
    }

    // Check file size (in MB)
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    setFile(selectedFile);
    onFileSelect(selectedFile);

    // Create preview URL for images
    if (isImage && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else if (isImage) {
      setError("Please select an image file");
      setFile(null);
      setPreview(null);
      onFileSelect(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("flex flex-col w-full gap-2", className)}>
      <h3 className="text-lg font-medium">{title}</h3>
      
      {!file ? (
        <div 
          className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/30 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2"
          onClick={() => fileInputRef.current?.click()}
        >
          {isImage ? (
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
          ) : (
            <Upload className="h-12 w-12 text-muted-foreground" />
          )}
          <p className="text-sm text-muted-foreground">{description}</p>
          <Button variant="secondary" size="sm" type="button" className="mt-2">
            Choose File
          </Button>
        </div>
      ) : (
        <div className="relative">
          {isImage && preview ? (
            <div className="rounded-lg overflow-hidden aspect-square relative group">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
              <Button 
                variant="destructive" 
                size="icon" 
                type="button"
                className="absolute top-2 right-2 opacity-80 hover:opacity-100"
                onClick={handleRemoveFile}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between border rounded-lg p-3">
              <span className="text-sm truncate max-w-[80%]">{file.name}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                type="button"
                onClick={handleRemoveFile}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-destructive text-sm">{error}</p>}
      
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
    </div>
  );
};

export default FileUpload;
