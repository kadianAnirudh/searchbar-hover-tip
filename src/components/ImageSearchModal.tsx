import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface ImageSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImageSearchModal = ({ isOpen, onClose }: ImageSearchModalProps) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = (file: File | string) => {
    if (typeof file === 'string') {
      navigate('/images', { state: { imageSource: file } });
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        navigate('/images', { state: { imageSource: reader.result } });
      };
      reader.readAsDataURL(file);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      handleImageUpload(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  });

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      handleImageUpload(imageUrl);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 top-[200px] w-[650px] z-50">
      <div className="bg-[#303134] rounded-lg overflow-hidden">
        <div className="text-center py-4">
          <h2 className="text-white text-lg">Search any image with Google Lens</h2>
        </div>
        
        <div className="bg-[#202124] p-8 border border-gray-700">
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed ${isDragActive ? 'border-blue-500' : 'border-gray-600'} 
              rounded-lg p-8 text-center cursor-pointer transition-colors hover:bg-[#303134]`}
          >
            <input {...getInputProps()} />
            <div className="flex items-center justify-center gap-2 mb-2">
              <Image className="w-6 h-6 text-blue-400" />
              <span className="text-gray-400">
                Drag an image here or{' '}
                <span className="text-blue-400 hover:underline">upload a file</span>
              </span>
            </div>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#202124] px-4 text-sm text-gray-400 uppercase">OR</span>
            </div>
          </div>

          <form onSubmit={handleUrlSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Paste image link"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="flex-1 px-4 py-2 bg-[#202124] border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImageSearchModal;