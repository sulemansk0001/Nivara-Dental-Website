import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, PhoneCall } from 'lucide-react';
import { Button } from '../common/Button';

export interface FAQItem {
  question: string;
  answer: string;
}

export const defaultFAQs: FAQItem[] = [
  {
    question: "Do I need an appointment before visiting?",
    answer: "While we do accommodate walk-in dental emergencies whenever possible, scheduling an appointment in advance is strongly recommended to minimize waiting time and ensure dedicated time with your required specialist."
  },
  {
    question: "How often should I visit a dentist?",
    answer: "For most healthy adults and children, a preventive check-up and professional dental cleaning every 6 months is ideal. Patients undergoing active periodontal therapy, aligners, or implant maintenance may require visits every 3 to 4 months."
  },
  {
    question: "Are dental treatments painful?",
    answer: "Modern dentistry prioritizes patient comfort. At Nivara Dental Studio, we use modern topical numbing gels, ultra-fine needles, and profound local anesthetic techniques. For treatments like root canals and implant placements, patients typically report feeling gentle pressure rather than pain."
  },
  {
    question: "Do you provide dental care for children?",
    answer: "Yes, we treat children of all ages. Our pediatric dental approach utilizes gentle communicative techniques, preventive fluoride therapies, cavity sealants, and early orthodontic evaluations in a welcoming, stress-free environment."
  },
  {
    question: "How much does a dental consultation cost?",
    answer: "Our basic comprehensive consultation starts at ₹999, which includes an in-depth clinical dental examination, full digital intraoral scan, and a detailed treatment roadmap. Follow-up reviews within 30 days are often included with diagnostic packages."
  },
  {
    question: "What should I bring to my first appointment?",
    answer: "Please bring a government photo ID (Aadhaar or driving license), any existing dental X-rays or OPGs taken in the past 12 months, and a list of current systemic medications or chronic health conditions (such as diabetes, hypertension, or blood thinners)."
  },
  {
    question: "How can I book an appointment?",
    answer: "You can book directly through our online booking portal on this website, call our clinic desk at +91 98765 43210, or send us a WhatsApp message. Our patient coordinator will confirm your preferred time slot promptly."
  }
];

export const FAQSection: React.FC<{ items?: FAQItem[] }> = ({ items = defaultFAQs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-[#F0F9FF] border-b border-[#D6EAF7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#BAE6FD] rounded-full text-[#0284C7] text-xs font-semibold uppercase tracking-wider shadow-xs">
            Clear Answers
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
            Frequently Asked <span className="text-skyblue">Questions.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-xl mx-auto">
            Got questions about your upcoming dental appointment, treatments, or safety? Here are answers to common patient questions.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3.5">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] rounded-brand border border-[#D6EAF7] overflow-hidden shadow-subtle hover:border-[#38BDF8] transition-colors duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-[#252525] hover:text-[#0284C7] transition-colors">
                    {item.question}
                  </span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                    isOpen ? 'bg-[#38BDF8] text-white shadow-xs' : 'bg-[#E0F2FE] text-[#0284C7]'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#D6EAF7]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 bg-white rounded-card border border-clinic-border shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-skyblue-light text-skyblue border border-skyblue/20 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-navy">Have a specific dental question?</div>
              <div className="text-xs text-clinic-muted">Our friendly clinical coordinator is happy to help you.</div>
            </div>
          </div>
          <Button to="/contact" variant="primary" size="sm">
            Speak With Us
          </Button>
        </div>

      </div>
    </section>
  );
};
