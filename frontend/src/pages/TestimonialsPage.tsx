import React, { useEffect, useState } from 'react';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { AppointmentCTA } from '../components/home/AppointmentCTA';
import { api } from '../services/api';
import { Testimonial } from '../types';
import { Star, CheckCircle, Quote, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getTestimonials().then((data) => {
      setTestimonials(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <PageHero
        badge="Patient Experiences"
        title="Real Stories of Comfort &"
        highlightedText="Confidence."
        description="Read how our gentle approach, transparent communication, and evidence-based treatments have transformed dental experiences for patients across Pune."
        breadcrumbs={[{ label: 'Testimonials' }]}
        ctaButton={
          <Button to="/book-appointment" variant="primary" withArrow>
            Book Your Consultation
          </Button>
        }
      />

      <section className="py-16 md:py-24 bg-[#F0F9FF] border-b border-[#D6EAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="bg-white rounded-section p-8 border border-[#D6EAF7] shadow-elevated hover:border-[#38BDF8] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Stars & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-skyblue text-skyblue" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      Verified Patient
                    </span>
                  </div>

                  {/* Review Text */}
                  <blockquote className="font-heading text-base sm:text-lg font-bold text-[#252525] leading-snug">
                    "{t.review}"
                  </blockquote>
                </div>

                {/* Author Info */}
                <div className="pt-6 mt-6 border-t border-[#D6EAF7] flex items-center gap-3.5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-skyblue shadow-sm"
                  />
                  <div>
                    <div className="font-heading font-extrabold text-sm text-[#252525]">
                      {t.name}
                    </div>
                    <div className="text-xs text-[#64748B] font-medium">
                      {t.location} • <span className="text-[#0284C7] font-semibold">{t.treatment}</span>
                    </div>
                    <div className="text-[10px] text-[#94A3B8] mt-0.5">
                      Visited {t.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-[11px] text-[#64748B] text-center italic">
            *Demonstration patient testimonials recorded for Nivara Dental Studio Pune.
          </p>

        </div>
      </section>

      <AppointmentCTA />
    </div>
  );
};
