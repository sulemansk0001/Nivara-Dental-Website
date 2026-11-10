import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxProps {
  images: { src: string; caption?: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-skyblue"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors focus:outline-none focus:ring-2 focus:ring-skyblue"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Image Container */}
        <div
          className="relative max-w-5xl max-h-[85vh] flex flex-col items-center select-none"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.img
            key={currentImage.src}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            src={currentImage.src}
            alt={currentImage.caption || "Dental treatment preview"}
            className="max-h-[75vh] w-auto max-w-full rounded-brand object-contain shadow-2xl"
          />
          {currentImage.caption && (
            <p className="mt-4 text-white/90 text-sm font-medium text-center max-w-xl">
              {currentImage.caption}
            </p>
          )}
          <span className="mt-2 text-xs text-white/50">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors focus:outline-none focus:ring-2 focus:ring-skyblue"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
