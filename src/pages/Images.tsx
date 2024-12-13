import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Camera, Search, Grid, Menu } from 'lucide-react';
import { Strawberry } from 'lucide-react';

interface LocationState {
  imageSource: string;
}

const Images = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [imageSource, setImageSource] = useState<string>('');
  const [cropBounds, setCropBounds] = useState({ x: 0, y: 0, width: 100, height: 100 });

  useEffect(() => {
    const state = location.state as LocationState;
    if (!state?.imageSource) {
      navigate('/');
      return;
    }
    setImageSource(state.imageSource);
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen bg-[#202124] text-white">
      {/* Navbar */}
      <div className="border-b border-gray-700">
        <div className="flex items-center justify-between px-6 py-2">
          <div className="flex items-center gap-6">
            <Menu className="w-6 h-6 text-gray-400" />
            <div className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-blue-400" />
              <span className="text-lg">Google Lens</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Grid className="w-6 h-6 text-gray-400" />
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              A
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Half - Image Editor */}
        <div className="w-1/2 p-6 border-r border-gray-700">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative">
              <img
                src={imageSource}
                alt="Uploaded"
                className="max-w-full max-h-[70vh] object-contain"
              />
              <div className="absolute inset-0 border-2 border-white rounded-lg pointer-events-none">
                <div className="absolute left-0 top-0 w-4 h-4 border-l-4 border-t-4 border-white rounded-tl-lg" />
                <div className="absolute right-0 top-0 w-4 h-4 border-r-4 border-t-4 border-white rounded-tr-lg" />
                <div className="absolute left-0 bottom-0 w-4 h-4 border-l-4 border-b-4 border-white rounded-bl-lg" />
                <div className="absolute right-0 bottom-0 w-4 h-4 border-r-4 border-b-4 border-white rounded-br-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Half - Loading State */}
        <div className="w-1/2 flex flex-col items-center justify-center">
          <Strawberry className="w-16 h-16 text-red-500 mb-4" />
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Results are loadin'</p>
        </div>
      </div>
    </div>
  );
};

export default Images;