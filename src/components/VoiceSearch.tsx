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
  const [recognition, setRecognition] = useState<any>(null);
  const [showInitialState, setShowInitialState] = useState(true);

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

        recognition.onresult = (event: any) => {
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
      // Show initial state for 1 second
      setShowInitialState(true);
      setTimeout(() => {
        setShowInitialState(false);
      }, 1000);
    }
  }, [isOpen, recognition]);

  // Redirection useEffect
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
            <X className="w-8 h-8 text-gray-300" />
          </button>

          <div className="w-full max-w-3xl mx-auto px-4">
            <div className="flex flex-col items-center justify-center space-y-12">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-300 text-3xl"
              >
                {transcript ? transcript : showInitialState ? "Speak now" : "Listening..."}
              </motion.span>

              <div className="relative">
                {isListening && !showInitialState && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={{ scale: 1 }}
                    animate={{ 
                      scale: [1, 1.4, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: '160px',
                      height: '160px',
                      left: '-20px',
                      top: '-20px'
                    }}
                  />
                )}
                <motion.div
                  className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center ${
                    showInitialState ? 'bg-white' : 'bg-red-500'
                  }`}
                >
                  <Mic 
                    className={`w-16 h-16 ${showInitialState ? 'text-red-500' : 'text-white'}`} 
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