import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Camera, Search, Grid, Menu, Apple, Text, Languages } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface LocationState {
  imageSource: string;
}

const Images = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [imageSource, setImageSource] = useState<string>('');
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50
  });

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
          <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
            {/* Find image source button */}
            <Button 
              variant="outline" 
              className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#303134] hover:bg-[#303134]/80 border-none"
            >
              <Search className="w-4 h-4 mr-2" />
              Find image source
            </Button>

            <div className="relative max-w-full max-h-[70vh]">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                className="max-h-[70vh]"
              >
                <img
                  src={imageSource}
                  alt="Uploaded"
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </ReactCrop>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="bg-[#303134] hover:bg-[#303134]/80 border-none">
                <Search className="w-4 h-4" />
                Search
              </Button>
              <Button variant="outline" className="bg-[#303134] hover:bg-[#303134]/80 border-none">
                <Text className="w-4 h-4" />
                Text
              </Button>
              <Button variant="outline" className="bg-[#303134] hover:bg-[#303134]/80 border-none">
                <Languages className="w-4 h-4" />
                Translate
              </Button>
            </div>
          </div>
        </div>

        {/* Right Half - Loading State */}
        <div className="w-1/2 flex flex-col items-center justify-center">
          <Apple className="w-16 h-16 text-red-500 mb-4" />
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Results are loadin'</p>
        </div>
      </div>
    </div>
  );
};

export default Images;