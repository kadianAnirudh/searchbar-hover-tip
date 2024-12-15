import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Upload, Grid, Menu, Camera, Search } from 'lucide-react';
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
  const [activeButton, setActiveButton] = useState<'search' | 'text' | 'translate'>('search');
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
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-6">
            <Menu className="w-6 h-6 text-gray-600 cursor-pointer" />
            <img 
              src="/lovable-uploads/61b6b21c-39e3-4149-9cbc-d4d3137624d9.png"
              alt="Google"
              className="h-8"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-gray-100"
            >
              <Upload className="w-5 h-5 text-gray-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-gray-100"
            >
              <Grid className="w-5 h-5 text-gray-600" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer">
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
              className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full bg-[#303134] hover:bg-[#303134]/80 border-none"
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
            <div className="action-buttons-group">
              <button
                className={`action-button ${activeButton === 'search' ? 'active' : 'inactive'}`}
                onClick={() => setActiveButton('search')}
              >
                Search
              </button>
              <button
                className={`action-button ${activeButton === 'text' ? 'active' : 'inactive'}`}
                onClick={() => setActiveButton('text')}
              >
                Text
              </button>
              <button
                className={`action-button ${activeButton === 'translate' ? 'active' : 'inactive'}`}
                onClick={() => setActiveButton('translate')}
              >
                Translate
              </button>
            </div>
          </div>
        </div>

        {/* Right Half - Loading State */}
        <div className="w-1/2 flex flex-col bg-white text-black">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 text-red-500 mb-4">
              <svg viewBox="0 0 1024 1024" className="w-full h-full">
                <path
                  fill="currentColor"
                  d="M544 768v128h-64V768H544zm256-384a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 656.128 800 502.144 800 384zM512 960C277.312 746.688 160 565.312 160 384a352 352 0 0 1 704 0c0 181.312-117.312 362.688-352 576z"
                />
              </svg>
            </div>
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-black border-t-transparent mb-4"></div>
            <p className="text-black">Results are loadin'</p>
          </div>
          <div className="h-16 border-t border-gray-200 flex items-center justify-center gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M11 17h2v-6h-2v6Zm1-8q.425 0 .713-.288T13 8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8q0 .425.288.713T12 9Zm0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"/>
              </svg>
              Did you find these results useful?
            </div>
            <button className="text-sm text-blue-600 hover:underline">Yes</button>
            <button className="text-sm text-blue-600 hover:underline">No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;