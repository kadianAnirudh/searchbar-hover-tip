import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowUp, Mic } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import VoiceSearch from './VoiceSearch';

interface SearchBarProps {
  onCameraClick: () => void;
}

const MOCK_SUGGESTIONS = [
  'google search',
  'google maps',
  'google translate',
  'google drive',
  'google docs',
  'google photos',
  'google meet',
];

const SearchBar = ({ onCameraClick }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const filtered = MOCK_SUGGESTIONS.filter(s => 
        s.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        const searchQuery = selectedIndex >= 0 ? suggestions[selectedIndex] : query;
        if (searchQuery) {
          window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(suggestion)}`;
  };

  const handleSearch = () => {
    if (query) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
  };

  const handleFeelingLucky = () => {
    if (query) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=I%27m+Feeling+Lucky`;
    }
  };

  return (
    <div className="w-full max-w-[584px] mx-auto relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="search-bar rounded-full flex items-center px-4 py-3 mb-8 border border-gray-700 h-[46px]">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                className="bg-transparent flex-1 outline-none text-white text-base"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Search"
              />
              <div className="flex items-center gap-1">
                <button 
                  className="p-2 hover:bg-gray-700 rounded-full h-[40px] flex items-center justify-center"
                  onClick={() => setIsVoiceSearchOpen(true)}
                >
                  <Mic className="w-6 h-6 text-[#4285f4]" />
                </button>
                <button 
                  className="p-2 hover:bg-gray-700 rounded-full h-[40px] flex items-center justify-center" 
                  onClick={onCameraClick}
                >
                  <svg className="w-6 h-6" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#FBC02D" d="M94.3,43.6c6.6,0,12.1,5.4,12.1,12.1v9.7h12.1v-9.7c0-13.3-10.8-24.2-24.2-24.2h-9.7v12.1H94.3z"/>
                    <path fill="#E53935" d="M43.6,55.7c0-6.6,5.4-12.1,12.1-12.1h9.7V31.5h-9.7c-13.3,0-24.2,10.8-24.2,24.2v9.7h12.1V55.7z"/>
                    <path fill="#1A73E8" d="M55.7,106.4c-6.6,0-12.1-5.4-12.1-12.1v-9.7H31.5v9.7c0,13.3,10.8,24.2,24.2,24.2h9.7v-12.1L55.7,106.4L55.7,106.4z"/>
                    <circle fill="#1E88E5" cx="75" cy="75" r="16.9"/>
                    <circle fill="#4CAF50" cx="104" cy="104" r="9.7"/>
                  </svg>
                </button>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Search</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute w-full bg-[#2f3133] rounded-lg shadow-lg mt-[-24px] overflow-hidden z-50"
        >
          <div className="py-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion}
                className={`flex items-center px-4 py-2 cursor-pointer ${
                  index === selectedIndex ? 'bg-[#3c4043]' : 'hover:bg-[#3c4043]'
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <ArrowUp className="w-4 h-4 text-gray-400 mr-4 transform -rotate-90" />
                <span className="text-white">{suggestion}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-700 p-4 flex justify-center space-x-3">
            <button 
              onClick={handleSearch}
              className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] rounded text-sm text-white"
            >
              Google Search
            </button>
            <button 
              onClick={handleFeelingLucky}
              className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] rounded text-sm text-white"
            >
              I'm Feeling Lucky
            </button>
          </div>
        </div>
      )}
      
      {!showSuggestions && (
        <div className="flex justify-center space-x-3">
          <button 
            onClick={handleSearch}
            className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] rounded text-sm text-white"
          >
            Google Search
          </button>
          <button 
            onClick={handleFeelingLucky}
            className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] rounded text-sm text-white"
          >
            I'm Feeling Lucky
          </button>
        </div>
      )}

      <VoiceSearch 
        isOpen={isVoiceSearchOpen}
        onClose={() => setIsVoiceSearchOpen(false)}
      />
    </div>
  );
};

export default SearchBar;
