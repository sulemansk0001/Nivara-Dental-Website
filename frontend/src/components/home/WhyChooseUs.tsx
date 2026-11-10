import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0); // First active by default

  const reasons = [
    {
      num: '01',
      title: 'Experienced Dental Team',
      desc: 'Our MDS certified specialists bring over 10 years of clinical expertise across restorative dentistry, implantology, and orthodontics.',
      detail: 'Every consultation is performed directly by post-graduate specialists who focus on tooth-preserving protocols and transparent diagnostics.'
    },
    {
      num: '02',
      title: 'Modern Technology',
      desc: 'Precision digital imaging, intraoral scanners, and motorized rotary tools ensure accurate diagnosis and minimally invasive procedures.',
      detail: 'Our chairside digital radiography ensures up to 90% lower radiation exposure while providing immediate high-resolution scans on display monitors.'
    },
    {
      num: '03',
      title: 'Comfortable Environment',
      desc: 'From ergonomic dental chairs to soothing ambient music, we have designed every corner to eliminate the traditional anxiety of dental visits.',
      detail: 'We utilize topical numbing gels prior to any injection to guarantee painless local anesthesia and a stress-free appointment.'
    },
    {
      num: '04',
      title: 'Personalised Treatment Plans',
      desc: 'No generic packages. We create customized treatment sequences taking your dental health goals, schedule, and budget into account.',
      detail: 'We discuss every clinical option with you transparently, giving you control over treatment phases and pacing.'
    },
    {
      num: '05',
      title: 'Transparent Communication',
      desc: 'We explain diagnoses on high-definition screens with complete clarity on costs before beginning any clinical intervention.',
      detail: 'Fixed treatment estimates and itemized receipts mean zero unexpected bills or sudden procedure additions.'
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F0F9FF] border-b border-[#D6EAF7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Photograph of Indian Dentist (Reveals from Left) */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-card overflow-hidden shadow-elevated border border-[#D6EAF7] bg-white group">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000"
                alt="Dr. Rohit Patil, implantologist and restorative dentist at Nivara Dental Studio Pune"
                className="w-full h-[480px] sm:h-[540px] object-cover object-top transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-40" />

              {/* Clinic Quality Pill */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md rounded-brand border border-[#D6EAF7] shadow-premium">
                <div className="text-xs font-bold text-[#252525] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                  <span>Ethical, Evidence-Based Dentistry</span>
                </div>
                <div className="text-[11px] text-[#64748B] mt-1">
                  Trusted by families across Kalyani Nagar, Viman Nagar & Pune.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Expandable Cards (Enters from Right) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#BAE6FD] rounded-full text-[#0284C7] text-xs font-semibold uppercase tracking-wider shadow-xs"
            >
              Patient Advantage
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight leading-tight"
            >
              Why Patients Choose <span className="text-skyblue">Nivara Dental Studio.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-[#64748B] leading-relaxed"
            >
              We combine clinical expertise, modern facilities and personalised attention to make every dental visit reassuring and comfortable.
            </motion.p>

            {/* 5 Interactive Expandable Advantage Cards */}
            <div className="space-y-3 pt-2">
              {reasons.map((item, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <div
                    key={idx}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isActive}
                    onClick={() => setActiveIdx(isActive ? null : idx)}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveIdx(isActive ? null : idx);
                      }
                    }}
                    style={{
                      transition: 'all 350ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    className={`rounded-brand border p-4 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] ${
                      isActive
                        ? 'bg-[#FFFFFF] border-[#38BDF8] shadow-spotlight scale-[1.01] z-10'
                        : 'bg-[#FFFFFF] border-[#D6EAF7] shadow-subtle hover:border-[#38BDF8] hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`font-heading font-extrabold text-sm px-2.5 py-1 rounded-md flex-shrink-0 transition-colors duration-200 ${
                          isActive
                            ? 'bg-[#38BDF8] text-white shadow-xs'
                            : 'bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]'
                        }`}
                      >
                        {item.num}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3
                            className={`text-sm sm:text-base font-bold transition-colors duration-200 ${
                              isActive ? 'text-[#0284C7]' : 'text-[#252525]'
                            }`}
                          >
                            {item.title}
                          </h3>
                          <ChevronRight
                            className={`w-4 h-4 text-[#64748B] transition-transform duration-250 ${
                              isActive ? 'rotate-90 text-[#0284C7]' : ''
                            }`}
                          />
                        </div>
                        <p className="text-xs text-[#64748B] leading-relaxed mt-1">
                          {item.desc}
                        </p>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden mt-2 pt-2 border-t border-[#D6EAF7]"
                            >
                              <p className="text-xs text-[#334155] font-medium leading-relaxed bg-[#F0F9FF] p-2.5 rounded-md border border-[#BAE6FD]">
                                {item.detail}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: 0.5 }}
              className="pt-2"
            >
              <Button to="/book-appointment" variant="primary" withArrow>
                Schedule Your Consultation
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
