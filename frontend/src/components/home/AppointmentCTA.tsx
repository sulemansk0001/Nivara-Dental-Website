import React from 'react';
import { Button } from '../common/Button';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar, Phone, CheckCircle2 } from 'lucide-react';
import { clinicConfig } from '../../config/clinic';

export const AppointmentCTA: React.FC = () => {
  const whatsappUrl = `https://wa.me/${clinicConfig.whatsappNumber}?text=${encodeURIComponent(
    clinicConfig.whatsappMessage
  )}`;

  return (
    <section className="py-16 md:py-24 bg-[#E0F2FE] border-t border-[#BAE6FD] relative overflow-hidden">
      {/* Decorative backdrop elements in soft skyblue */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#BAE6FD]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white rounded-section p-8 sm:p-14 border border-[#D6EAF7] shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          
          {/* Content (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F0F9FF] border border-[#BAE6FD] rounded-full text-[#0284C7] text-xs font-semibold shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
              <span>Welcoming New Patients Across Pune</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#252525] tracking-tight leading-tight"
            >
              Ready for a Healthier, More <span className="text-[#0284C7]">Confident Smile?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl"
            >
              Take the first step towards better oral health. Schedule your consultation with Nivara Dental Studio in Pune. We ensure gentle care, zero waiting times, and transparent guidance.
            </motion.p>

            {/* Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.22 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#252525]"
            >
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                <span>Zero-judgement gentle consultations</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                <span>Digital diagnostics & intraoral photography</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                <span>Flexible evening & weekend time slots</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                <span>100% Autoclaved surgical instruments</span>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.28 }}
              className="pt-4 flex flex-wrap items-center gap-4"
            >
              <Button to="/book-appointment" variant="primary" size="lg" withArrow>
                Book Your Appointment
              </Button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-brand bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat With Us on WhatsApp</span>
              </a>
            </motion.div>
          </div>

          {/* Right Clinic Contact Card (4 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 bg-[#F0F9FF] rounded-card p-6 border border-[#BAE6FD] space-y-4 shadow-subtle hover:border-[#38BDF8] transition-colors"
          >
            <h3 className="text-sm font-bold text-[#252525] uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0284C7]" />
              <span>Clinic Consultation Hours</span>
            </h3>

            <div className="space-y-2.5 text-xs text-[#64748B]">
              <div className="flex justify-between pb-2 border-b border-[#D6EAF7]">
                <span>Monday – Saturday</span>
                <span className="font-semibold text-[#252525]">10:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#D6EAF7]">
                <span>Sunday</span>
                <span className="font-semibold text-[#0284C7]">By Prior Booking</span>
              </div>
              <div className="flex justify-between">
                <span>Location</span>
                <span className="font-semibold text-[#252525]">Pune, Maharashtra</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                href={`tel:${clinicConfig.phone}`}
                variant="secondary"
                size="sm"
                className="w-full"
              >
                <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Call Clinic: {clinicConfig.phoneDisplay}</span>
              </Button>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
