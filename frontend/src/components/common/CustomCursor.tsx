import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isClickable, setIsClickable] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Exact tip position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Responsive, crisp tracking with no trailing lag or sluggishness
  const springConfig = { damping: 32, stiffness: 500, mass: 0.15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad)
    const fineQuery = window.matchMedia('(pointer: fine)');
    setIsTouchDevice(!fineQuery.matches);

    const handlePointerMatch = (e: MediaQueryListEvent) => {
      setIsTouchDevice(!e.matches);
    };
    fineQuery.addEventListener('change', handlePointerMatch);

    // Respect reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionMatch = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionMatch);

    if (!fineQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        // Detect text inputs / editable fields to let native I-beam take over
        const isInput = Boolean(
          target.closest('input, textarea, select, [contenteditable="true"]')
        );
        setIsTextInput(isInput);

        // Detect clickable elements
        const clickableParent = target.closest(
          'a, button, [role="button"], input[type="submit"], input[type="button"], [data-cursor], .cursor-pointer'
        );
        setIsClickable(Boolean(clickableParent));

        const customBadge = clickableParent?.getAttribute('data-cursor');
        setCursorText(customBadge || null);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      fineQuery.removeEventListener('change', handlePointerMatch);
      motionQuery.removeEventListener('change', handleMotionMatch);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  // Hide on touch devices, when mouse is outside window, or over text inputs
  if (isTouchDevice || !isVisible || isTextInput) {
    return null;
  }

  const currentX = prefersReducedMotion ? mouseX : smoothX;
  const currentY = prefersReducedMotion ? mouseY : smoothY;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform"
      style={{
        x: currentX,
        y: currentY,
      }}
      aria-hidden="true"
    >
      <div className="relative">
        {/* Sleek modern arrow pointer with sharp tip at (0, 0) */}
        <motion.div
          animate={{
            scale: isClicking ? 0.9 : isClickable ? 1.15 : 1,
            rotate: isClicking ? -4 : 0,
          }}
          transition={{ duration: 0.12, ease: 'easeOut' }}
          className="relative filter drop-shadow-[0_2px_4px_rgba(14,165,233,0.35)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            {/* White outer outline for maximum contrast against dark or light backgrounds */}
            <path
              d="M3 2.5L9.5 20.5L12.8 13.8L19.5 10.5L3 2.5Z"
              fill="#FFFFFF"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Primary Sky Blue body (#38BDF8) */}
            <path
              d="M3 2.5L9.5 20.5L12.8 13.8L19.5 10.5L3 2.5Z"
              fill="#38BDF8"
              stroke="#0EA5E9"
              strokeWidth="0.75"
              strokeLinejoin="round"
            />
            {/* Subtle inner highlight near tip */}
            <path
              d="M4.5 5L8.5 14L10 11L14 9.5L4.5 5Z"
              fill="#7DD3FC"
              opacity="0.6"
            />
          </svg>
        </motion.div>

        {/* Optional contextual badge for interactive cards (e.g. "View", "Explore") */}
        {cursorText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 12, y: 10 }}
            animate={{ opacity: 1, scale: 1, x: 16, y: 12 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-0 left-0 bg-[#38BDF8] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap border border-white/80 select-none pointer-events-none"
          >
            {cursorText}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
