
import React from 'react';
import NavigationBar from '@/components/NavigationBar';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';


const Stake = () => {
  return (
    <div className="min-h-screen  flex flex-col bg-stream-dark">
      <NavigationBar />
      <Header />
      <Dashboard />
    </div>
  );
};

export default Stake;
