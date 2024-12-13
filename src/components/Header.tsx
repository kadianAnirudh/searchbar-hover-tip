import React from 'react';
import { Avatar } from '@/components/ui/avatar';

const Header = () => {
  return (
    <header className="flex justify-end items-center p-4 space-x-4">
      <a href="#" className="nav-link">Gmail</a>
      <a href="#" className="nav-link">Images</a>
      <button className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
        A
      </button>
    </header>
  );
};

export default Header;