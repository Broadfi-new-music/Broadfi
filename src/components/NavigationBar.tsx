
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, PlaySquare, Music, Repeat, Disc, LineChart, Wallet } from 'lucide-react';
import { useState } from "react";
const NavigationBar: React.FC = () => {
  const [nav, setNav] = useState(false);
  const showNav = ()  => {
     setNav(!nav)
  }
  const navItems = [
    { name: 'Home', icon: <Home size={20} />, path: '/' },
    { name: 'Contest', icon: <Compass size={20} />, path: '/contest' },
    { name: 'Playlists', icon: <PlaySquare size={20} />, path: '/playlists' },
    { name: 'Podcast', icon: <Music size={20} />, path: '/podcast' },
    { name: 'Livestream', icon: <Wallet size={20} />, path: '/livestream' },
    { name: 'Swap', icon: <Repeat size={20} />, path: '/swap' },
    { name: 'Stake', icon: <Wallet size={20} />, path: '/stake' },
    { name: 'Dashboard', icon: <PlaySquare size={20} />, path: '/dashboard' },
  ];

  return (
    <nav className="bg-gray-800 border-b border-stream-gray p-6">
      <div className="md:hidden flex justify-between items-center w-full" onClick={showNav}>
        <div>
          <span className="text-stream-primary font-bold text-[30px] sm:text-[20px] md:text-[25px] lg:text-[30px]">BROADFI</span>
        </div>
        {!nav ?  <img className='w-[17%] cursor-pointer' src="/Images/menu.png" alt="" /> : <img  className='w-[15%] cursor-pointer' src="/Images/cancel.png" alt="" />}
      </div>
      {/* Desktop Navigation */}
      <div className="hidden justify-between items-center px-[30px] sm:hidden md:hidden lg:flex">
        <div className="flex items-center space-x-2">
          <span className="text-stream-primary font-bold text-[30px]">BROADFI</span>
        </div>
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-stream-gray hover:text-stream-primary flex flex-col items-center text-xs"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={!nav ? 'fixed right-[-100%]' : 'fixed right-0 top-[10px] w-[40%] text-black mt-[68px] h-full bg-blue-500 z-[1000] shadow-md ease-in-out duration-1000 text-white lg:hidden'}>
        <div className='flex flex-row'>
          <div className="flex space-x-6 flex-col">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-white hover:text-stream-primary flex flex-col items-center text-[15px] my-[10xpx] mx-[30px]"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
