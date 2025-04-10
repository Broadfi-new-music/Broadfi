import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Stream } from "../types/stream";
import { toast } from "sonner";

interface StreamContextType {
  streams: Stream[];
  addStream: (stream: Omit<Stream, "id">) => void;
  deleteStream: (id: string) => void;
  updateStream: (id: string, stream: Partial<Stream>) => void;
}

const StreamContext = createContext<StreamContextType | undefined>(undefined);

export function StreamProvider({ children }: { children: ReactNode }) {
  const [streams, setStreams] = useState<Stream[]>(() => {
    const savedStreams = localStorage.getItem("streams");
    return savedStreams ? JSON.parse(savedStreams) : [];
  });

  // Save streams to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("streams", JSON.stringify(streams));
  }, [streams]);

  const addStream = (streamData: Omit<Stream, "id">) => {
    const newStream = {
      ...streamData,
      id: crypto.randomUUID(),
    };
    setStreams([...streams, newStream]);
    toast.success("Stream scheduled successfully!");
  };

  const deleteStream = (id: string) => {
    setStreams(streams.filter((stream) => stream.id !== id));
    toast.success("Stream deleted successfully!");
  };

  const updateStream = (id: string, updatedData: Partial<Stream>) => {
    setStreams(
      streams.map((stream) =>
        stream.id === id ? { ...stream, ...updatedData } : stream
      )
    );
    toast.success("Stream updated successfully!");
  };

  return (
    <StreamContext.Provider value={{ streams, addStream, deleteStream, updateStream }}>
      {children}
    </StreamContext.Provider>
  );
}

export function useStreams() {
  const context = useContext(StreamContext);
  if (context === undefined) {
    throw new Error("useStreams must be used within a StreamProvider");
  }
  return context;
}
