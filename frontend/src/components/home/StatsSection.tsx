import React from 'react';
import { Counter } from '../common/Counter';
import { motion } from 'framer-motion';

export const StatsSection: React.FC = () => {
  const metrics = [
    {
      value: 5000,
      suffix: '+',
      title: 'Patients Served',
      subtitle: 'Across Pune & Maharashtra',
    },
    {
      value: 10,
      suffix: '+',
      title: 'Years of Experience',
      subtitle: 'Dedicated oral healthcare',
    },
    {
      value: 3,
      suffix: '+',
      title: 'Experienced Dentists',
      subtitle: 'Post-graduate MDS specialists',
    },
    {
      value: 98,
      suffix: '%',
      title: 'Patient Satisfaction',
      subtitle: 'Based on post-visit feedback',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#E0F2FE] border-y border-[#BAE6FD] relative overflow-hidden">
      {/* Subtle decorative circles in soft sky-blue */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/40 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#BAE6FD] rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="space-y-2 p-6 rounded-card bg-[#FFFFFF] border border-[#D6EAF7] shadow-subtle hover:border-[#38BDF8] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0284C7] tracking-tight">
                <Counter end={m.value} suffix={m.suffix} />
              </div>
              <div className="text-sm sm:text-base font-bold text-[#252525] tracking-wide">
                {m.title}
              </div>
              <div className="text-xs text-[#64748B]">
                {m.subtitle}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Responsible sample data note */}
        <p className="mt-8 text-[11px] text-[#475569] text-center italic">
          *Demonstration clinical figures for Nivara Dental Studio. All individual treatment plans are customized after clinical examination.
        </p>
      </div>
    </section>
  );
};
