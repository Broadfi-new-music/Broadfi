import React from "react";
import { format } from "date-fns";
import { Calendar, Clock, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduleCardProps {
  title: string;
  description: string;
  streamDate: Date | undefined;
  creator: string;
  collaborators: string;
  image: string | null;
  className?: string;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  title,
  description,
  streamDate,
  creator,
  collaborators,
  image,
  className,
}) => {
  return (
    <div className={cn("stream-card", className)}>
      <div className="relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full aspect-video object-cover"
          />
        ) : (
          <div className="w-full aspect-video bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-medium opacity-70">
              Stream Thumbnail
            </span>
          </div>
        )}
        {streamDate && (
          <div className="absolute top-3 right-3 bg-black/70 text-white text-sm py-1 px-3 rounded-full flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {format(streamDate, "h:mm a")}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg line-clamp-1 mb-1">{title || "Untitled Stream"}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
          {description || "No description provided."}
        </p>

        <div className="flex flex-col gap-2 text-sm">
          {streamDate && (
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{format(streamDate, "EEEE, MMMM d, yyyy")}</span>
            </div>
          )}

          {creator && (
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <User className="w-4 h-4 mr-2" />
              <span>{creator}</span>
            </div>
          )}

          {collaborators && (
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Users className="w-4 h-4 mr-2" />
              <span>{collaborators}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
