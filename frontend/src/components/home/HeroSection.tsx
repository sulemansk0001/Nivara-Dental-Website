import React, { useRef, useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Star, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';
import { clinicConfig } from '../../config/clinic';

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Parallax motion values for desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const backgroundParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  const backgroundParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);
  const badgeParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [14, -14]);
  const badgeParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [14, -14]);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && window.matchMedia('(pointer: fine)').matches);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDesktop || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const pills = ["Services", "Technologies", "Equipment", "Painless Care", "Doctors"];

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[620px] lg:min-h-[720px] flex items-center overflow-hidden border-b border-[#D6EAF7] bg-[#0c1a2d]"
    >
      {/* 1. Full-Width Background Photograph with reveal and gentle parallax */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          x: isDesktop ? backgroundParallaxX : 0,
          y: isDesktop ? backgroundParallaxY : 0,
        }}
        className="absolute inset-0 z-0 pointer-events-none will-change-transform"
      >
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=85&w=2000"
          alt="Confident healthy smile at Nivara Dental Studio"
          className="w-full h-full object-cover object-[center_30%] lg:object-[68%_25%]"
          loading="eager"
        />
        {/* Neutral dark gradient overlay for optimal text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1a2d]/95 via-[#0c1a2d]/80 to-[#0c1a2d]/40 lg:from-[#0c1a2d]/90 lg:via-[#0c1a2d]/65 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0c1a2d]/90 to-transparent" />
      </motion.div>

      {/* 2. Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Badges, Copy & CTAs (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-medium shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-skyblue" />
              <span>We invite you to experience thoughtful, pain-free dental care.</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-1"
            >
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight drop-shadow-sm">
                Smile Brightly. <br />
                <span className="text-skyblue">Smile Confidently.</span>
              </h1>
            </motion.div>

            {/* Translucent Pill Tags (matching reference screenshot) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              {pills.map((pill, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-xs text-white/90 font-medium transition-colors duration-200 shadow-xs"
                >
                  {pill}
                </span>
              ))}
            </motion.div>

            {/* Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.4 }}
              className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl drop-shadow-xs"
            >
              Exceptional dental care from a team who truly cares — because your smile deserves precision, comfort, and compassion at our boutique dental studio in Pune.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.48 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <Button to="/book-appointment" variant="primary" size="lg" withArrow>
                Book Appointment
              </Button>
              <Button to="/services" variant="white" size="lg">
                Explore Services
              </Button>
            </motion.div>

            {/* Trust Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="pt-4 flex flex-wrap items-center gap-6 text-xs text-gray-300 border-t border-white/10"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-skyblue" />
                <span>Hospital-Grade Sterilization</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-skyblue" />
                <span>Zero-Pain Local Anesthesia</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-skyblue" />
                <span>MDS Specialized Dentists</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Floating Frosted Rating Card (4 cols, matching reference screenshot) */}
          <div className="lg:col-span-4 flex lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{
                x: isDesktop ? badgeParallaxX : 0,
                y: isDesktop ? badgeParallaxY : 0,
              }}
              className="w-full max-w-xs bg-slate-900/60 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-elevated text-white space-y-4 hover:border-skyblue/50 transition-colors duration-300"
            >
              <div className="flex items-baseline justify-between">
                <div className="font-heading font-extrabold text-4xl text-white tracking-tight flex items-center gap-2">
                  <span>4.9</span>
                  <div className="flex items-center gap-0.5 text-skyblue">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-skyblue text-skyblue" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1 border-t border-white/10">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white/30 object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                    alt="Patient review avatar"
                  />
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white/30 object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
                    alt="Patient review avatar"
                  />
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white/30 object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120"
                    alt="Patient review avatar"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">5,000+ Patients</div>
                  <div className="text-[11px] text-gray-300">Treated with smile satisfaction</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
