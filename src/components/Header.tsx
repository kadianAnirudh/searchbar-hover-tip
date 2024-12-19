import React from 'react';
import { Beaker, Grid } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4">
      {/* Left side navigation */}
      <div className="flex items-center">
        <a href="#" className="nav-link text-sm mr-6">About</a>
        <a href="#" className="nav-link text-sm mr-6">Store</a>
      </div>

      {/* Right side navigation */}
      <div className="flex items-center space-x-4">
        <a href="#" className="nav-link text-sm text-white hover:text-white">Gmail</a>
        <a href="/images" className="nav-link text-sm text-white hover:text-white">Images</a>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-700 rounded-full">
          <Beaker className="w-5 h-5 text-white" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-700 rounded-full">
          <Grid className="w-5 h-5 text-white" />
        </button>
        <button 
          onClick={() => window.open('https://youtube.com', '_blank')}
          className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm cursor-strawberry"
        >
          A
        </button>
      </div>
    </header>
  );
};

export default Header;