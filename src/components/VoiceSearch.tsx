import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X } from 'lucide-react';

interface VoiceSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceSearch = ({ isOpen, onClose }: VoiceSearchProps) => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const transcriptText = event.results[current][0].transcript;
          setTranscript(transcriptText);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognition);
      }
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen && recognition) {
      recognition.start();
    }
  }, [isOpen, recognition]);

  // New useEffect for handling redirection
  useEffect(() => {
    let redirectTimeout: NodeJS.Timeout;

    if (transcript) {
      redirectTimeout = setTimeout(() => {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(transcript)}`;
        onClose();
      }, 5000);
    }

    return () => {
      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }
    };
  }, [transcript, onClose]);

  const handleClose = () => {
    if (recognition) {
      recognition.stop();
    }
    setTranscript('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#202124] z-50 flex items-center justify-center"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-full"
          >
            <X className="w-6 h-6 text-gray-300" />
          </button>

          <div className="w-full max-w-3xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-300 text-xl"
              >
                {transcript ? transcript : "Listening..."}
              </motion.span>

              <div className="relative">
                {isListening && (
                  <motion.div
                    className="absolute inset-0 bg-white rounded-full"
                    initial={{ scale: 1 }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                <motion.div
                  className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                    isListening ? 'bg-red-500' : 'bg-white'
                  }`}
                >
                  <Mic 
                    className={`w-8 h-8 ${isListening ? 'text-white' : 'text-red-500'}`} 
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceSearch;