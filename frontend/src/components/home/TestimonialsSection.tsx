import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-[#F0F9FF] border-b border-[#D6EAF7] overflow-hidden">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#BAE6FD] rounded-full text-[#0284C7] text-xs font-semibold uppercase tracking-wider shadow-xs">
              Patient Experiences
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
              What Our Patients Say.
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              Experiences that reflect the care, attention and comfort we aim to provide across Pune families.
            </p>
          </motion.div>

          {/* Carousel Arrows with Hover Transitions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-[#D6EAF7] bg-white text-[#252525] hover:bg-[#38BDF8] hover:text-white hover:border-[#38BDF8] transition-all duration-200 flex items-center justify-center shadow-subtle hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#38BDF8] active:scale-95 group"
            >
              <ChevronLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border border-[#D6EAF7] bg-white text-[#252525] hover:bg-[#38BDF8] hover:text-white hover:border-[#38BDF8] transition-all duration-200 flex items-center justify-center shadow-subtle hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#38BDF8] active:scale-95 group"
            >
              <ChevronRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </div>

        {/* Active Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative bg-[#FFFFFF] rounded-section p-8 sm:p-12 border border-[#D6EAF7] shadow-subtle hover:shadow-md hover:border-[#38BDF8] transition-all duration-300"
        >
          <div className="absolute top-8 right-8 text-skyblue/15 hidden sm:block pointer-events-none">
            <Quote className="w-24 h-24" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-3xl space-y-6"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1.5">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-skyblue text-skyblue transition-transform hover:scale-110" />
                ))}
                <span className="ml-2 text-xs font-bold text-navy bg-skyblue-light px-2.5 py-0.5 rounded-full border border-skyblue/20">
                  Verified Patient
                </span>
              </div>

              {/* Review Text */}
              <blockquote className="font-heading text-xl sm:text-2xl font-bold text-navy leading-snug">
                "{current.review}"
              </blockquote>

              {/* Author & Treatment */}
              <div className="pt-2 flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-skyblue shadow-sm transition-transform duration-300 hover:scale-105"
                />
                <div>
                  <div className="font-heading font-extrabold text-base text-navy flex items-center gap-1.5">
                    {current.name}
                    <CheckCircle className="w-4 h-4 text-green-600 fill-green-100" />
                  </div>
                  <div className="text-xs text-clinic-muted font-medium">
                    {current.location} • <span className="text-skyblue font-semibold">{current.treatment}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    Visited {current.date}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="mt-8 pt-6 border-t border-clinic-border/80 flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-8 bg-skyblue' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Sample Disclaimer */}
        <p className="mt-6 text-[11px] text-clinic-muted text-center italic">
          *Demonstration patient feedback recorded for Nivara Dental Studio. All patient records conform to digital privacy standards.
        </p>

      </div>
    </section>
  );
};
