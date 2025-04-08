import React from "react";
import ContestForm from "@/components/ContestForm";
import NavigationBar from '@/components/NavigationBar';

const CreateContest = () => {
  return (
    <div className="min-h-screen bg-stream-dark">
        <NavigationBar />
        <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8 px-4 mt-[40px]">
      <div className="">
        <div className="">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-contest animate-pulse-slow">
              Create Your Remix Contest
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Launch your Web3 music remix competition and discover amazing talent
            </p>
          </header>
          
          <ContestForm />
          
          <footer className="mt-16 text-center text-sm text-muted-foreground">
            <p>© 2025 Web3 Remix Platform</p>
          </footer>
        </div>
      </div>
    </div>
    </div>
  );
};
export default CreateContest;