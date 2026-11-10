import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { Service } from '../../types';

interface ServicesSectionProps {
  services: Service[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  const displayServices = services.slice(0, 5); // 5 primary services for optimal horizontal expansion
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

  // Keyboard accessibility
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

  const handleCardClick = (id: string) => {
    if (pinnedId === id) {
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
    <section className="py-16 md:py-24 bg-white border-b border-clinic-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-skyblue-light border border-skyblue/20 rounded-full text-skyblue text-xs font-semibold uppercase tracking-wider">
              Comprehensive Treatments
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Complete Dental Care <span className="text-skyblue">Under One Roof.</span>
            </h2>
            <p className="text-sm sm:text-base text-clinic-muted leading-relaxed">
              From routine preventive care to advanced implant surgery and cosmetic alignment, explore treatments tailored to your oral health.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <Button to="/services" variant="outline" withArrow>
              View All 8 Services
            </Button>
          </motion.div>
        </div>

        {/* Interactive Expandable Services Row (matching reference video interaction) */}
        <div
          onMouseLeave={handleMouseLeaveSection}
          className="flex flex-col lg:flex-row items-stretch gap-4 sm:gap-5 min-h-[500px]"
        >
          {displayServices.map((srv) => {
            const isActive = activeId === srv.slug;
            const isAnyActive = activeId !== null;

            return (
              <div
                key={srv.slug}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                onClick={() => handleCardClick(srv.slug)}
                onMouseEnter={() => handleMouseEnter(srv.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(srv.slug);
                  }
                }}
                style={{
                  transition: 'flex 550ms cubic-bezier(0.22, 1, 0.36, 1), transform 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 450ms ease, box-shadow 450ms ease, border-color 350ms ease',
                }}
                className={`rounded-card overflow-hidden border flex flex-col justify-between cursor-pointer select-none relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] ${
                  isActive
                    ? 'lg:flex-[2.6] bg-[#FFFFFF] border-[#38BDF8] shadow-spotlight z-20 scale-[1.01]'
                    : isAnyActive
                    ? 'lg:flex-[0.8] bg-[#FFFFFF] border-[#D6EAF7] shadow-subtle z-10 opacity-75 scale-[0.985] hover:opacity-100 hover:border-[#38BDF8]'
                    : 'lg:flex-1 bg-[#FFFFFF] border-[#D6EAF7] shadow-subtle hover:border-[#38BDF8] hover:shadow-md'
                }`}
              >
                <div>
                  {/* Service Photo Container with smooth zoom */}
                  <div
                    className={`relative overflow-hidden bg-gray-100 transition-all duration-500 ease-out ${
                      isActive ? 'h-56 sm:h-64' : 'h-48 sm:h-52'
                    }`}
                  >
                    <img
                      src={srv.image}
                      alt={srv.serviceName}
                      className={`w-full h-full object-cover object-center transform transition-transform duration-700 ease-out ${
                        isActive ? 'scale-105' : 'scale-100'
                      }`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

                    {/* Starting Price Pill */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-bold text-[#252525] shadow-sm border border-[#D6EAF7]">
                      Starting <span className="text-[#0284C7]">{srv.indicativePrice}</span>
                    </div>

                    {/* Top Right Arrow */}
                    <div
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'bg-[#38BDF8] text-white shadow-md' : 'bg-white/90 text-[#252525] border border-[#D6EAF7]'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 sm:p-6 space-y-2.5">
                    <h3
                      className={`font-heading text-lg sm:text-xl font-bold transition-colors duration-200 ${
                        isActive ? 'text-[#0284C7]' : 'text-[#252525]'
                      }`}
                    >
                      {srv.serviceName}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed line-clamp-2">
                      {srv.shortDescription}
                    </p>

                    {/* Expanded Content (Animated in active state) */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden pt-3 border-t border-[#D6EAF7] space-y-3"
                        >
                          <div className="flex items-center gap-1.5 text-xs text-[#252525] font-semibold">
                            <Clock className="w-3.5 h-3.5 text-[#0284C7]" />
                            <span>Clinical Focus: {srv.tagline || 'Painless & Tooth-Preserving'}</span>
                          </div>

                          <div className="space-y-1.5">
                            {srv.benefits.slice(0, 3).map((benefit, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-2 text-xs text-[#64748B]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-5 pt-0 border-t border-[#D6EAF7] mt-3 flex items-center justify-between text-xs font-semibold">
                  {isActive ? (
                    <div className="flex items-center justify-between w-full pt-3">
                      <Link
                        to={`/services/${srv.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-[#0284C7] hover:text-[#0369A1] font-bold group"
                      >
                        <span>Explore Treatment</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                      <Link
                        to={`/book-appointment?service=${encodeURIComponent(srv.serviceName)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 rounded-md bg-[#38BDF8] text-white text-[11px] font-semibold hover:bg-[#0EA5E9] transition-colors shadow-xs"
                      >
                        Book Slot
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full pt-3 text-[#64748B] hover:text-[#0284C7] transition-colors">
                      <span className="text-[11px] font-medium">Click to inspect</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Interaction Hint */}
        <div className="mt-4 text-center">
          <span className="text-[11px] text-clinic-muted">
            Hover over any treatment to view clinical details • Click or tap to pin open
          </span>
        </div>

      </div>
    </section>
  );
};
