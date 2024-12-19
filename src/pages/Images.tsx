import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Upload, Grid, Menu, Camera, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ReactCrop, { type Crop } from 'react-image-crop';
import { Card } from "@/components/ui/card";
import 'react-image-crop/dist/ReactCrop.css';

interface LocationState {
  imageSource: string;
}

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  favicon?: string;
  thumbnail?: string;
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

  // Mock results - replace with actual API call later
  const mockResults = {
    results: [
      {
        position: 1,
        title: "Utopia | Pagani",
        link: "https://www.pagani.com/pagani-utopia/",
        redirect_link: "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.pagani.com/pagani-utopia/&ved=2ahUKEwia7Nqrs7OKAxUlle4BHdSsJw0QFnoECAoQAQ&usg=AOvVaw3ljw_hKGMVOUymRtW66570",
        displayed_link: "https://www.pagani.com › pagani-utopia",
        favicon: "https://serpapi.com/searches/6763d758e6dd21f85bd599c0/images/d2739170505dec111bb0d7f874af9254366c33840905bf00.png",
        snippet: "Each car represents the natural and necessary convergence of multiple disciplines, each of which combines technology and aesthetics. It is the mastery of this ...",
        snippet_highlighted_words: [
          "car"
        ],
        source: "Pagani"
      },
      {
        position: 2,
        title: "Pagani Utopia - Wikipedia",
        link: "https://en.wikipedia.org/wiki/Pagani_Utopia",
        redirect_link: "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://en.wikipedia.org/wiki/Pagani_Utopia&ved=2ahUKEwia7Nqrs7OKAxUlle4BHdSsJw0QFnoECAwQAQ&usg=AOvVaw2C3TEMoF3PcyuMur8j8wwN",
        displayed_link: "https://en.wikipedia.org › wiki › Pagani_Utopia",
        favicon: "https://serpapi.com/searches/6763d758e6dd21f85bd599c0/images/d2739170505dec11adcc6cc39cea4261d25de54b23b4cb7e.png",
        snippet: "The Pagani Utopia is a mid-engine sports car produced by the Italian sports car manufacturer Pagani. It was developed under the 'C10' codename and presented ...",
        snippet_highlighted_words: [
          "Pagani Utopia",
          "car",
          "car",
          "Pagani"
        ],
        source: "Wikipedia"
      },
      {
        position: 3,
        title: "Pagani Utopia 2023-current - Car Voting - FH - Forza Forums",
        link: "https://forums.forza.net/t/pagani-utopia-2023-current/572072",
        redirect_link: "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://forums.forza.net/t/pagani-utopia-2023-current/572072&ved=2ahUKEwia7Nqrs7OKAxUlle4BHdSsJw0QFnoECA4QAQ&usg=AOvVaw08VfWSNHbCI9qurmIJdIBM",
        displayed_link: "https://forums.forza.net › ... › Car Voting - FH",
        thumbnail: "https://serpapi.com/searches/6763d758e6dd21f85bd599c0/images/d2739170505dec112974db97c015093f4415c0e23fbb06cf94d9281a46690f0b.jpeg",
        favicon: "https://serpapi.com/searches/6763d758e6dd21f85bd599c0/images/d2739170505dec112974db97c015093f171eb41bac6a9b68.png",
        date: "Oct 29, 2022",
        snippet: "The flamboyant, bombastic Utopia is the car at its most sculptural, creative and majestic. A howling V12 theatre on wheels.",
        snippet_highlighted_words: [
          "Utopia",
          "car"
        ],
        source: "Forza.net"
      },
      {
        position: 4,
        title: "2023 Pagani clit Utopia - skiboard.ru",
        link: "https://www.skiboard.ru/?g=23482364820",
        redirect_link: "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.skiboard.ru/%3Fg%3D23482364820&ved=2ahUKEwia7Nqrs7OKAxUlle4BHdSsJw0QFnoECCIQAQ&usg=AOvVaw0QFMMtDVOu3Q04KHA5duJI",
        displayed_link: "https://www.skiboard.ru › ...",
        thumbnail: "https://serpapi.com/searches/6763d758e6dd21f85bd599c0/images/d2739170505dec1106d7b112937babae4267874c3ff018af3ab97daa3cb65ddc.jpeg",
        favicon: "https://serpapi.com/searches/6763d758e6dd21f85bd599c0/images/d2739170505dec1106d7b112937babae8bc6aee2f0f13044.png",
        snippet: "... Pagani clit Utopia, LEGO 76915 Speed Champions Race to Victory at BumbleToys clit. ... Cars clit, Pagani Utopia The Perfect Hypercar 30 Years in The Making clit ...",
        snippet_highlighted_words: [
          "Pagani",
          "Utopia",
          "Cars",
          "Pagani Utopia"
        ],
        source: "skiboard.ru"
      }
    ]
  };

  useEffect(() => {
    const state = location.state as LocationState;
    if (!state?.imageSource) {
      navigate('/');
      return;
    }
    setImageSource(state.imageSource);
  }, [location.state, navigate]);

  const handleCardClick = (link: string) => {
    window.open(link, '_blank');
  };

  const ResultCard = ({ result }: { result: SearchResult }) => (
    <Card 
      className="bg-[#303134] border-none cursor-pointer hover:bg-[#3c4043] transition-colors duration-200"
      onClick={() => handleCardClick(result.link)}
    >
      <div className="p-4 space-y-3">
        <div className="w-full h-40 bg-[#202124] rounded-lg overflow-hidden">
          <img 
            src={result.thumbnail || result.favicon} 
            alt={result.title}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-white font-medium line-clamp-2">{result.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">{result.snippet}</p>
      </div>
    </Card>
  );

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

        {/* Right Half - Results */}
        <div className="w-1/2 bg-[#202124] p-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            {mockResults.results.slice(0, 4).map((result, index) => (
              <ResultCard key={index} result={result} />
            ))}
          </div>
          <div className="h-16 border-t border-gray-700 mt-auto flex items-center justify-center gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M11 17h2v-6h-2v6Zm1-8q.425 0 .713-.288T13 8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8q0 .425.288.713T12 9Zm0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"/>
              </svg>
              Did you find these results useful?
            </div>
            <button className="text-sm text-blue-500 hover:underline">Yes</button>
            <button className="text-sm text-blue-500 hover:underline">No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
