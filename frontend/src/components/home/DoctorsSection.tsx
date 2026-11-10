import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, CheckCircle2, ArrowRight, Languages } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorsSectionProps {
  doctors: Doctor[];
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ doctors }) => {
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
    <section className="py-16 md:py-24 bg-white border-b border-[#D6EAF7] overflow-hidden">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E0F2FE] border border-[#BAE6FD] rounded-full text-[#0284C7] text-xs font-semibold uppercase tracking-wider shadow-xs">
              Clinical Leadership
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
              Meet Our Experienced <span className="text-skyblue">Dental Team.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              Our specialists hold post-graduate MDS degrees, clinical fellowships, and a shared commitment to gentle, communicative patient care in Pune.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <Button to="/doctors" variant="outline" withArrow>
              View Full Team Profiles
            </Button>
          </motion.div>
        </div>

        {/* Interactive Expandable Doctors Row */}
        <div
          onMouseLeave={handleMouseLeaveSection}
          className="flex flex-col lg:flex-row items-stretch gap-5 min-h-[480px]"
        >
          {doctors.map((doc) => {
            const isActive = activeId === doc.id;
            const isAnyActive = activeId !== null;

            return (
              <div
                key={doc.id}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                onClick={() => handleCardClick(doc.id)}
                onMouseEnter={() => handleMouseEnter(doc.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(doc.id);
                  }
                }}
                style={{
                  transition: 'flex 550ms cubic-bezier(0.22, 1, 0.36, 1), transform 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 450ms ease, box-shadow 450ms ease, border-color 350ms ease',
                }}
                className={`rounded-card overflow-hidden border flex flex-col justify-between cursor-pointer select-none relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] ${
                  isActive
                    ? 'lg:flex-[1.9] bg-[#FFFFFF] border-[#38BDF8] shadow-spotlight z-20 scale-[1.01]'
                    : isAnyActive
                    ? 'lg:flex-[0.85] bg-[#FFFFFF] border-[#D6EAF7] shadow-subtle z-10 opacity-75 scale-[0.985] hover:opacity-100 hover:border-[#38BDF8]'
                    : 'lg:flex-1 bg-[#FFFFFF] border-[#D6EAF7] shadow-subtle hover:border-[#38BDF8] hover:shadow-md'
                }`}
              >
                <div>
                  {/* Portrait photo */}
                  <div
                    className={`relative overflow-hidden bg-gray-100 transition-all duration-500 ease-out ${
                      isActive ? 'h-64 sm:h-72' : 'h-56 sm:h-60'
                    }`}
                  >
                    <img
                      src={doc.profileImage}
                      alt={doc.name}
                      className={`w-full h-full object-cover object-top transform transition-transform duration-700 ease-out ${
                        isActive ? 'scale-105' : 'scale-100'
                      }`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />

                    {/* Experience Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#252525] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-white/60">
                      <Award className="w-3.5 h-3.5 text-skyblue" />
                      <span>{doc.experience}</span>
                    </div>

                    {/* Specialisation Pill */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded text-[11px] font-bold text-skyblue shadow-sm">
                      {doc.specialisation}
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="p-5 sm:p-6 space-y-2">
                    <h3
                      className={`font-heading text-lg sm:text-xl font-bold transition-colors duration-200 flex items-center gap-1.5 ${
                        isActive ? 'text-skyblue' : 'text-navy'
                      }`}
                    >
                      <span>{doc.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-skyblue" />
                    </h3>

                    <p className="text-xs text-clinic-muted font-medium">
                      {doc.qualification}
                    </p>

                    <p className="text-xs text-clinic-muted leading-relaxed line-clamp-2 mt-1">
                      {doc.description}
                    </p>

                    {/* Expanded details */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden pt-3 border-t border-clinic-border/60 space-y-2.5"
                        >
                          <div className="flex items-center gap-1.5 text-xs text-navy">
                            <Calendar className="w-3.5 h-3.5 text-skyblue" />
                            <span>Available: {doc.daysAvailable.join(', ')}</span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-clinic-muted">
                            <Languages className="w-3.5 h-3.5 text-skyblue" />
                            <span>{doc.languages ? doc.languages.join(', ') : 'English, Hindi, Marathi'}</span>
                          </div>

                          <div className="p-2.5 rounded-md bg-skyblue-light text-navy text-xs font-semibold">
                            Consultation fee starting at {doc.consultationFee}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Card footer */}
                <div className="p-5 pt-0 border-t border-clinic-border/60 mt-3 flex items-center justify-between text-xs font-semibold">
                  {isActive ? (
                    <div className="flex items-center justify-between w-full pt-3">
                      <Link
                        to={`/doctors#${doc.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-skyblue hover:text-skyblue-hover font-bold"
                      >
                        <span>Full Bio</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to={`/book-appointment?doctor=${encodeURIComponent(doc.name)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 rounded-md bg-skyblue text-white text-[11px] font-semibold hover:bg-skyblue-hover transition-colors"
                      >
                        Book Consultation
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full pt-3 text-clinic-muted hover:text-skyblue transition-colors">
                      <span className="text-[11px] font-medium">Inspect profile</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Guidance note */}
        <div className="mt-4 text-center">
          <span className="text-[11px] text-clinic-muted">
            Hover or tap any specialist to review qualifications and consultation hours
          </span>
        </div>

      </div>
    </section>
  );
};
