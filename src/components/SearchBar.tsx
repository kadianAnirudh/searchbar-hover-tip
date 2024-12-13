import React from 'react';
import { Search, Camera, Mic } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SearchBarProps {
  onCameraClick: () => void;
}

const SearchBar = ({ onCameraClick }: SearchBarProps) => {
  return (
    <div className="w-full max-w-[584px] mx-auto">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="search-bar rounded-full flex items-center px-4 py-3 mb-8 border border-gray-700">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                className="bg-transparent flex-1 outline-none text-white"
                aria-label="Search"
              />
              <button className="p-2 hover:bg-gray-700 rounded-full" onClick={onCameraClick}>
                <Camera className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-full ml-2">
                <Mic className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Search</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <div className="flex justify-center space-x-3">
        <button className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] rounded text-sm">
          Google Search
        </button>
        <button className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] rounded text-sm">
          I'm Feeling Lucky
        </button>
      </div>
    </div>
  );
};

export default SearchBar;