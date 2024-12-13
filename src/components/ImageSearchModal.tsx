import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ImageSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImageSearchModal = ({ isOpen, onClose }: ImageSearchModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#303134] border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Search any image with Google Lens</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <div className="mb-4">
              <img src="/placeholder.svg" alt="Upload" className="w-12 h-12 mx-auto mb-2" />
              <p className="text-gray-400">Drag an image here or</p>
              <button className="text-blue-400 hover:underline">upload a file</button>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 mb-2">OR</p>
              <input
                type="text"
                placeholder="Paste image link"
                className="w-full px-4 py-2 bg-[#202124] border border-gray-700 rounded text-white"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageSearchModal;