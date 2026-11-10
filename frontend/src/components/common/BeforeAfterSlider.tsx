import React, { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  aspectRatio?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  className = "",
  aspectRatio = "aspect-[4/3]"
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth hover movement without dragging
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  }, []);

  // Click or Tap to toggle between Before and After views
  const handleToggleClick = useCallback(() => {
    setSliderPosition((prev) => (prev > 50 ? 15 : 85));
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Reset smoothly to 50%
    setSliderPosition(50);
  }, []);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Before and after dental treatment comparison"
      tabIndex={0}
      onClick={handleToggleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggleClick();
        }
      }}
      className={`relative select-none overflow-hidden rounded-card bg-gray-100 shadow-premium border border-clinic-border cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-skyblue ${aspectRatio} ${className}`}
    >
      {/* After Image (Background layer) */}
      <img
        src={afterImage}
        alt="After Treatment Result"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        loading="lazy"
      />
      
      {/* After Badge */}
      <div className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-white/90 text-[#252525] text-[10px] font-bold tracking-wider rounded-md backdrop-blur-sm pointer-events-none border border-white/60 shadow-xs">
        {afterLabel}
      </div>

      {/* Before Image (Clipped Overlay layer) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none transition-[width] duration-150 ease-out"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before Treatment Condition"
          className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
          style={{
            width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
            height: '100%'
          }}
          loading="lazy"
        />
      </div>

      {/* Before Badge */}
      <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-skyblue/90 text-white text-[10px] font-bold tracking-wider rounded-md backdrop-blur-sm pointer-events-none border border-white/20">
        {beforeLabel}
      </div>

      {/* Interactive Divider Line */}
      <div
        className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_12px_rgba(56,169,232,0.6)] pointer-events-none transition-[left] duration-150 ease-out"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Center Grip Handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-skyblue shadow-elevated border-2 border-skyblue flex items-center justify-center pointer-events-none transition-transform duration-200 group-hover:scale-110">
          <svg className="w-4 h-4 text-skyblue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 3 12 9 6" />
          </svg>
        </div>
      </div>
    </div>
  );
};
