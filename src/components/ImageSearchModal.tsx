import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ImageSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImageSearchModal = ({ isOpen, onClose }: ImageSearchModalProps) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (file: File | string) => {
    // In a real app, we'd upload the file to a server
    // For now, we'll just navigate to the images page with the file/URL
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#202124] border-gray-700 max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-normal">Search any image with Google Lens</DialogTitle>
        </DialogHeader>
        
        <div className="p-6 space-y-6">
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

          <div className="text-center">
            <div className="inline-flex items-center justify-center">
              <div className="border-t border-gray-600 w-full"></div>
              <span className="text-gray-400 px-4">OR</span>
              <div className="border-t border-gray-600 w-full"></div>
            </div>
          </div>

          <form onSubmit={handleUrlSubmit} className="space-y-2">
            <input
              type="text"
              placeholder="Paste image link"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2 bg-[#202124] border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageSearchModal;