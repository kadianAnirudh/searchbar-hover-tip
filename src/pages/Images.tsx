import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Camera, Search, Menu, Grid, Apple } from 'lucide-react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface LocationState {
  imageSource: string;
}

type ActionType = 'search' | 'text' | 'translate';

const Images = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [imageSource, setImageSource] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<ActionType>('search');
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 0,
    y: 0,
    width: 100,
    height: 100
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
            <button 
              className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#303134] hover:bg-[#303134]/80 px-6 py-2 rounded-full flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Find image source
            </button>

            <div className="relative max-w-full max-h-[70vh] w-full">
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
            <div className="action-button-group">
              <button
                className={selectedAction === 'search' ? 'active' : ''}
                onClick={() => setSelectedAction('search')}
              >
                Search
              </button>
              <button
                className={selectedAction === 'text' ? 'active' : ''}
                onClick={() => setSelectedAction('text')}
              >
                Text
              </button>
              <button
                className={selectedAction === 'translate' ? 'active' : ''}
                onClick={() => setSelectedAction('translate')}
              >
                Translate
              </button>
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