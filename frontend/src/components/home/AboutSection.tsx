import React from 'react';
import { Button } from '../common/Button';
import { motion } from 'framer-motion';
import { HeartHandshake, Cpu, Smile, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const points = [
    {
      icon: HeartHandshake,
      title: 'Patient-Centred Approach',
      desc: 'Transparent conversations, zero rushed appointments, and custom treatment plans mapped to your lifestyle and budget.',
    },
    {
      icon: Cpu,
      title: 'Advanced Dental Technology',
      desc: 'Digital low-dose radiographs (RVG), motorized rotary endodontics, and intraoral cameras for precise chairside diagnostics.',
    },
    {
      icon: Smile,
      title: 'Comfortable Treatment Experience',
      desc: 'Ergonomic treatment chairs, calming ambient atmosphere, and gentle anesthesia techniques to eliminate dental anxiety.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-clinic-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Image of Modern Dental Clinic Interior (Image reveals from left) */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-card overflow-hidden shadow-elevated border border-clinic-border group">
              <img
                src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=1000"
                alt="Modern, sterile treatment operatory and consultation room at Nivara Dental Studio Pune"
                className="w-full h-[420px] sm:h-[480px] object-cover transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-30" />

              {/* Floating Pill on image */}
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md px-4 py-3 rounded-brand border border-white/40 shadow-premium max-w-xs transition-transform duration-200 group-hover:translate-y-[-2px]">
                <div className="flex items-center gap-2 text-skyblue font-bold text-xs">
                  <CheckCircle className="w-4 h-4 fill-skyblue text-white" />
                  <span>Pune Clinical Facility</span>
                </div>
                <p className="text-[11px] text-clinic-muted mt-0.5">
                  Designed for soothing relaxation and clinical sterility.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Heading, Paragraph & Sequential Points */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-skyblue-light border border-skyblue/20 rounded-full text-skyblue text-xs font-semibold uppercase tracking-wider"
            >
              About Nivara Dental Studio
            </motion.div>

            {/* Heading Fades Upward */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="font-heading text-3xl sm:text-4xl font-extrabold text-navy leading-tight tracking-tight"
            >
              Your Trusted Partner in{' '}
              <span className="text-skyblue">Complete Dental Care.</span>
            </motion.h2>

            {/* Paragraph Appears After Heading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
              className="text-base text-clinic-muted leading-relaxed"
            >
              At Nivara Dental Studio, we believe every patient deserves personalised dental care. Our approach combines modern technology, professional expertise and a comfortable environment to make every visit a positive experience.
            </motion.p>

            {/* Three Points Appear Sequentially */}
            <div className="space-y-4 pt-2">
              {points.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: 0.35 + idx * 0.1, ease: "easeOut" }}
                    className="flex items-start gap-3.5 group p-2 rounded-lg hover:bg-clinic-bg/70 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-skyblue-light border border-skyblue/20 flex items-center justify-center text-skyblue flex-shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-navy group-hover:text-skyblue transition-colors">
                        {pt.title}
                      </h3>
                      <p className="text-xs text-clinic-muted leading-relaxed mt-0.5">
                        {pt.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.65, ease: "easeOut" }}
              className="pt-4 flex items-center gap-4"
            >
              <Button to="/about" variant="primary" withArrow>
                Learn More About Us
              </Button>
              <Button to="/doctors" variant="outline">
                Meet Our Specialists
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
