import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, FileText, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ValueCard {
  id: string;
  icon: React.ElementType;
  title: string;
  tag: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

export const CoreValues: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Keyboard accessibility: Escape closes pinned / active card
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveId(null);
        setPinnedId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const values: ValueCard[] = [
    {
      id: 'val-1',
      icon: Heart,
      title: 'Patient-Centred Comfort',
      tag: 'Empathy & Care',
      shortDesc: 'Your comfort, safety and peace of mind remain at the centre of every appointment.',
      fullDesc: 'We design every step of your appointment around zero-judgement consultations, unhurried time with our specialists, and profound topical numbing to ensure treatments are relaxed and gentle.',
      features: [
        'Zero-anxiety consultation environment',
        'Individual treatment roadmaps at your pace',
        'Dedicated post-procedure follow-up care'
      ],
      ctaText: 'Meet Our Doctors',
      ctaLink: '/doctors'
    },
    {
      id: 'val-2',
      icon: Sparkles,
      title: 'Clinical Excellence',
      tag: 'Modern Science',
      shortDesc: 'Evidence-based treatment protocols led by experienced post-graduate MDS dental specialists.',
      fullDesc: 'Every procedure adheres to peer-reviewed international dental protocols, ensuring conservative tooth preservation, long-lasting restorations, and predictable treatment outcomes.',
      features: [
        'Post-graduate MDS specialized surgeons',
        'Conservative tooth-saving techniques',
        'International material certifications'
      ],
      ctaText: 'View Case Studies',
      ctaLink: '/case-studies'
    },
    {
      id: 'val-3',
      icon: FileText,
      title: 'Complete Transparency',
      tag: 'Ethical Dentistry',
      shortDesc: 'Clear treatment discussions and upfront pricing with no hidden charges or pressured decisions.',
      fullDesc: 'We explain all diagnoses and therapeutic options openly using chairside intraoral cameras, helping you make informed, confident choices about your oral health with fixed pricing.',
      features: [
        'Transparent price guide before treatment starts',
        'Chairside digital camera visual tour',
        'Zero unnecessary procedural recommendations'
      ],
      ctaText: 'Explore Pricing',
      ctaLink: '/pricing'
    },
    {
      id: 'val-4',
      icon: Activity,
      title: 'Long-Term Oral Wellness',
      tag: 'Lifelong Health',
      shortDesc: 'Preventive dental maintenance and patient guidance for healthy smiles that endure.',
      fullDesc: 'We focus on long-term prevention rather than reactive fixes, equipping families with evidence-backed hygiene regimens and regular check-ups to avoid complex dental issues.',
      features: [
        'Comprehensive 6-month preventive checkups',
        'Personalized oral hygiene guidance',
        'Family-wide care across all generations'
      ],
      ctaText: 'Book Consultation',
      ctaLink: '/book-appointment'
    },
  ];

  const handleCardClick = (id: string) => {
    if (pinnedId === id) {
      // Toggle off
      setPinnedId(null);
      setActiveId(null);
    } else {
      setPinnedId(id);
      setActiveId(id);
    }
  };

  const handleMouseEnter = (id: string) => {
    if (isDesktop && !pinnedId) {
      setActiveId(id);
    }
  };

  const handleMouseLeaveSection = () => {
    if (isDesktop && !pinnedId) {
      setActiveId(null);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F0F9FF] border-b border-[#D6EAF7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#BAE6FD] rounded-full text-[#0284C7] text-xs font-semibold uppercase tracking-wider shadow-xs">
            Our Guiding Philosophy
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
            What Makes Our Approach Different?
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            Every clinical decision we make is anchored in four core commitments to our patients and the Pune community.
          </p>
        </motion.div>

        {/* Interactive Expandable Cards Row (matching reference video interaction) */}
        <div
          onMouseLeave={handleMouseLeaveSection}
          className="flex flex-col lg:flex-row items-stretch gap-4 sm:gap-5 min-h-[440px]"
        >
          {values.map((val) => {
            const Icon = val.icon;
            const isActive = activeId === val.id;
            const isAnyActive = activeId !== null;

            return (
              <div
                key={val.id}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                onClick={() => handleCardClick(val.id)}
                onMouseEnter={() => handleMouseEnter(val.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(val.id);
                  }
                }}
                style={{
                  transition: 'flex 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 450ms ease, box-shadow 450ms ease, border-color 350ms ease',
                }}
                className={`rounded-card p-6 sm:p-7 border flex flex-col justify-between cursor-pointer select-none relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] ${
                  isActive
                    ? 'lg:flex-[2.4] bg-[#FFFFFF] border-[#38BDF8] shadow-spotlight z-20 scale-[1.01]'
                    : isAnyActive
                    ? 'lg:flex-[0.85] bg-[#FFFFFF] border-[#D6EAF7] shadow-subtle z-10 opacity-75 scale-[0.985] hover:opacity-95 hover:border-[#38BDF8]'
                    : 'lg:flex-1 bg-[#FFFFFF] border-[#D6EAF7] shadow-subtle hover:border-[#38BDF8] hover:shadow-md'
                }`}
              >
                {/* Top: Icon & Tag */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-[#38BDF8] text-white shadow-md scale-110'
                          : 'bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full transition-colors duration-200 ${
                        isActive
                          ? 'bg-[#38BDF8] text-white'
                          : 'bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]'
                      }`}
                    >
                      {val.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-heading text-lg sm:text-xl font-bold transition-colors duration-200 leading-snug ${
                      isActive ? 'text-[#0284C7]' : 'text-[#252525]'
                    }`}
                  >
                    {val.title}
                  </h3>

                  {/* Short description (always visible) */}
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mt-2">
                    {val.shortDesc}
                  </p>

                  {/* Expanded Content (visible when card is active) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden mt-4 pt-4 border-t border-[#D6EAF7] space-y-3.5"
                      >
                        <p className="text-xs sm:text-sm text-[#334155] font-medium leading-relaxed">
                          {val.fullDesc}
                        </p>

                        <div className="space-y-2 pt-1">
                          {val.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 text-xs text-[#64748B]">
                              <CheckCircle2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom: Action / State hint */}
                <div className="mt-6 pt-4 border-t border-[#D6EAF7] flex items-center justify-between text-xs font-semibold">
                  {isActive ? (
                    <div className="flex items-center justify-between w-full">
                      <Link
                        to={val.ctaLink}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-[#0284C7] hover:text-[#0369A1] font-bold group"
                      >
                        <span>{val.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                      <span className="text-[10px] text-[#94A3B8] font-normal">
                        Click to close
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full text-[#64748B] hover:text-[#0284C7] transition-colors">
                      <span className="text-[11px] font-medium">Explore Details</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Helpful interaction guidance for users */}
        <div className="mt-4 text-center">
          <span className="text-[11px] text-[#64748B]">
            Hover over any pillar to view detailed commitments • Click or tap to pin open
          </span>
        </div>

      </div>
    </section>
  );
};
