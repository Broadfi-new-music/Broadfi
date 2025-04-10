import React from "react";
import Dashboard from "@/components/ContestDashboard";
import { StreamProvider } from "@/context/StreamContext";

const CreateSchedule = () => {
  return (
    <StreamProvider>
      <div className="min-h-screen">
        <Dashboard />
      </div>
    </StreamProvider>
  );
};

export default CreateSchedule;