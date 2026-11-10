import React, { useState } from 'react';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { Lightbox } from '../components/common/Lightbox';
import { clinicConfig } from '../config/clinic';
import {
  Target,
  Eye,
  HeartHandshake,
  Cpu,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
  CheckCircle2,
  Maximize2,
  Calendar,
  Phone,
  Clock,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AboutPage: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeApproachIdx, setActiveApproachIdx] = useState<number | null>(null);
  const [activeWhyIdx, setActiveWhyIdx] = useState<number | null>(null);

  const facilityImages = [
    {
      title: "Modern Treatment Rooms",
      caption: "Ergonomic dental operatories equipped with ambient natural lighting, gentle motorized chairs, and low-dose digital diagnostic imaging for comfortable, precise clinical procedures.",
      src: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=1200",
      tag: "Treatment Bay"
    },
    {
      title: "Dental Examination Facilities",
      caption: "High-definition intraoral camera systems and chairside display monitors enabling real-time visual explanations and collaborative diagnostic reviews with every patient.",
      src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200",
      tag: "Diagnostics"
    },
    {
      title: "Sterilisation and Hygiene Practices",
      caption: "Hospital-grade multi-stage sterilization suite with Class-B vacuum autoclave cycles, chemical indicator pouches, and biological spore monitoring for uncompromising patient safety.",
      src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200",
      tag: "Sterilization Bay"
    },
    {
      title: "Patient Waiting Area",
      caption: "Calming, noise-insulated reception lounge featuring ergonomic seating, ambient soothing lighting, and complimentary refreshments designed to reduce dental apprehension.",
      src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
      tag: "Reception Lounge"
    },
    {
      title: "Consultation Space",
      caption: "Dedicated, private consultation room for unhurried, private discussions where treatment roadmaps, visual simulations, and all your questions are addressed transparently.",
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
      tag: "Consultation Suite"
    }
  ];

  const approachBlocks = [
    {
      icon: HeartHandshake,
      title: "Patient-Centred Care",
      description: "We take time to understand individual concerns and treatment expectations.",
      detail: "Consultations are never rushed. We prioritize patient dignity, listen attentively to past experiences, and formulate care plans that respect your pace.",
      highlight: "Unhurried, attentive appointments"
    },
    {
      icon: Cpu,
      title: "Modern Dental Practices",
      description: "We focus on contemporary equipment and appropriate treatment methods.",
      detail: "State-of-the-art digital radiography, intraoral high-def scanning, and precision rotary instruments ensure conservative, minimally invasive care.",
      highlight: "Digital diagnostics & precision"
    },
    {
      icon: MessageSquare,
      title: "Clear Communication",
      description: "We explain treatment options and help patients understand their dental care journey.",
      detail: "You receive visual explanations of dental findings on chairside monitors along with fixed, itemized pricing before treatment begins.",
      highlight: "Transparent choices & roadmaps"
    },
    {
      icon: ShieldCheck,
      title: "Long-Term Oral Health",
      description: "We encourage preventive care and regular dental consultations.",
      detail: "Our biological philosophy centers on natural tooth preservation and proactive oral hygiene regimens for lifelong health.",
      highlight: "Conservative tooth preservation"
    }
  ];

  const whyChooseNivara = [
    {
      title: "Patient-Friendly Environment",
      description: "A calming, warm, and pressure-free atmosphere designed from the ground up to eliminate dental anxiety and ensure comfort throughout your visit.",
      detail: "Noise-dampened operatories, soothing ambient daylight, and welcoming reception lounge.",
      icon: Sparkles
    },
    {
      title: "Personalised Attention",
      description: "One-on-one time with dedicated dental doctors who listen attentively, examine thoroughly, and formulate treatments tailored to your lifestyle.",
      detail: "Customized appointment schedules and dedicated clinical coordinators.",
      icon: Users
    },
    {
      title: "Clear Treatment Discussions",
      description: "Transparent explanations regarding diagnoses, procedural steps, and costs with no hidden fees or rushed decisions.",
      detail: "Upfront printed and digital estimates with flexible payment options.",
      icon: MessageSquare
    },
    {
      title: "Modern Clinical Facilities",
      description: "Equipped with contemporary dental technology, digital diagnostic tools, and hospital-grade sterilization protocols for optimal outcomes.",
      detail: "Class-B vacuum autoclaves, biological monitoring, and zero-cross-contamination suites.",
      icon: Cpu
    },
    {
      title: "Family-Oriented Dental Care",
      description: "Comprehensive, compassionate dental services designed for all generations — from young children to working professionals and senior citizens.",
      detail: "Specialized pediatric protocols and gentle geriatric oral care.",
      icon: HeartHandshake
    }
  ];

  const openFacilityImage = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const scrollToApproach = () => {
    const el = document.getElementById('approach');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* 7.1 About Us Hero */}
      <PageHero
        badge="About Nivara Dental Studio"
        title="Thoughtful Dental Care."
        highlightedText="Healthier Smiles. Greater Confidence."
        description="At Nivara Dental Studio, we believe that a healthy smile begins with the right care, attention and guidance. Our approach combines modern dental practices with a patient-focused experience designed to make every visit comfortable and convenient."
        breadcrumbs={[{ label: 'About Us' }]}
        ctaButton={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={scrollToApproach}
              className="inline-flex items-center justify-center font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-skyblue focus:ring-offset-2 px-6 py-3 rounded-brand shadow-sm bg-skyblue hover:bg-skyblue-hover text-white hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] group"
            >
              <span>Explore Our Approach</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <Button to="/book-appointment" variant="outline">
              Book Appointment
            </Button>
          </div>
        }
      />

      {/* 7.2 Our Story */}
      <section className="py-16 md:py-24 bg-white border-b border-clinic-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Story Narrative (6 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-skyblue-light border border-skyblue/20 rounded-full text-skyblue text-xs font-semibold uppercase tracking-wider">
                Our Story
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-tight">
                A Dental Experience <span className="text-skyblue">Built Around You.</span>
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-clinic-muted leading-relaxed">
                <p>
                  Nivara Dental Studio was envisioned as a welcoming space where patients could access professional dental care in a comfortable and thoughtfully designed environment.
                </p>
                <p>
                  We believe dental visits should be built around understanding, transparency and individual needs. From routine check-ups to more specialised treatments, our focus is on helping patients make informed decisions about their oral health.
                </p>
                <p>
                  With an emphasis on modern facilities, careful treatment planning and patient communication, we aim to make every visit a more reassuring experience.
                </p>
              </div>

              {/* Key Trust Pillars */}
              <div className="pt-3 grid grid-cols-2 gap-4">
                <div className="p-4 bg-clinic-bg rounded-brand border border-clinic-border">
                  <div className="font-heading font-extrabold text-2xl text-navy">Pune Studio</div>
                  <div className="text-xs text-clinic-muted mt-1 font-medium">Centrally Located in Maharashtra</div>
                </div>
                <div className="p-4 bg-clinic-bg rounded-brand border border-clinic-border">
                  <div className="font-heading font-extrabold text-2xl text-skyblue">100% Focused</div>
                  <div className="text-xs text-clinic-muted mt-1 font-medium">On Patient Comfort & Health</div>
                </div>
              </div>
            </motion.div>

            {/* Story Visual (6 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              className="lg:col-span-6"
            >
              <div className="relative rounded-card overflow-hidden shadow-elevated border border-clinic-border group">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200"
                  alt="Modern clinical treatment room at Nivara Dental Studio Pune"
                  className="w-full h-[460px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-40 pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 p-4 bg-white/95 backdrop-blur-md rounded-brand border border-white/60 shadow-premium">
                  <div className="text-xs font-bold text-navy flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-skyblue" />
                    <span>Evidence-Based Clinical Dentistry</span>
                  </div>
                  <div className="text-[11px] text-clinic-muted mt-0.5">
                    Thoughtful, tooth-preserving treatments performed by qualified specialists.
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 7.3 & 7.4 Mission and Vision */}
      <section className="py-16 md:py-20 bg-clinic-bg border-b border-clinic-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 7.3 Mission */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white p-8 sm:p-10 rounded-card border border-clinic-border shadow-subtle hover:shadow-premium hover:-translate-y-1 hover:border-skyblue/50 transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-skyblue-light text-skyblue border border-skyblue/20 flex items-center justify-center mb-5 shadow-xs">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-skyblue uppercase tracking-wider mb-1">
                  Purpose & Commitment
                </div>
                <h3 className="font-heading text-2xl font-extrabold text-navy">
                  Our Mission
                </h3>
                <p className="text-sm sm:text-base text-clinic-muted leading-relaxed mt-3">
                  To make quality dental care more approachable through professional guidance, modern facilities and a commitment to patient comfort.
                </p>
              </div>
              <div className="pt-4 border-t border-clinic-border/60 flex items-center gap-2 text-xs font-semibold text-navy">
                <CheckCircle2 className="w-4 h-4 text-skyblue" />
                <span>Ethical, approachable care for every patient</span>
              </div>
            </motion.div>

            {/* 7.4 Vision */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white p-8 sm:p-10 rounded-card border border-clinic-border shadow-subtle hover:shadow-premium hover:-translate-y-1 hover:border-skyblue/50 transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-skyblue-light text-skyblue flex items-center justify-center mb-5 shadow-xs border border-skyblue/20">
                  <Eye className="w-6 h-6 text-skyblue" />
                </div>
                <div className="text-xs font-bold text-navy uppercase tracking-wider mb-1">
                  Long-Term Aspiration
                </div>
                <h3 className="font-heading text-2xl font-extrabold text-navy">
                  Our Vision
                </h3>
                <p className="text-sm sm:text-base text-clinic-muted leading-relaxed mt-3">
                  To build a trusted dental care destination where individuals and families feel informed, comfortable and confident about maintaining their oral health.
                </p>
              </div>
              <div className="pt-4 border-t border-clinic-border/60 flex items-center gap-2 text-xs font-semibold text-navy">
                <CheckCircle2 className="w-4 h-4 text-skyblue" />
                <span>Lifelong smiles rooted in confidence & trust</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 7.5 Our Approach to Dental Care (Interactive Expandable Spotlight Cards) */}
      <section id="approach" className="py-16 md:py-24 bg-[#F0F9FF] border-b border-[#D6EAF7] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#BAE6FD] rounded-full text-[#0284C7] text-xs font-semibold uppercase tracking-wider shadow-xs">
              Clinical Principles
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
              Our Approach to <span className="text-skyblue">Dental Care.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              Every procedure and consultation at Nivara Dental Studio follows four foundational pillars designed to respect your time, comfort, and wellbeing.
            </p>
          </div>

          <div
            onMouseLeave={() => setActiveApproachIdx(null)}
            className="flex flex-col lg:flex-row items-stretch gap-4 sm:gap-5 min-h-[420px]"
          >
            {approachBlocks.map((block, idx) => {
              const IconComp = block.icon;
              const isActive = activeApproachIdx === idx;
              const isAnyActive = activeApproachIdx !== null;

              return (
                <div
                  key={idx}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isActive}
                  onClick={() => setActiveApproachIdx(isActive ? null : idx)}
                  onMouseEnter={() => setActiveApproachIdx(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveApproachIdx(isActive ? null : idx);
                    }
                  }}
                  style={{
                    transition: 'flex 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms ease, box-shadow 400ms ease, border-color 300ms ease',
                  }}
                  className={`rounded-card p-6 border flex flex-col justify-between cursor-pointer select-none relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] ${
                    isActive
                      ? 'lg:flex-[2.4] bg-[#FFFFFF] border-[#38BDF8] shadow-spotlight z-20 scale-[1.01]'
                      : isAnyActive
                      ? 'lg:flex-[0.85] bg-[#FFFFFF] border-[#D6EAF7] shadow-subtle z-10 opacity-75 scale-[0.985] hover:opacity-100 hover:border-[#38BDF8]'
                      : 'lg:flex-1 bg-[#FFFFFF] border-[#D6EAF7] shadow-subtle hover:border-[#38BDF8] hover:shadow-md'
                  }`}
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 mb-4 ${
                        isActive
                          ? 'bg-[#38BDF8] text-white shadow-md scale-110'
                          : 'bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7]'
                      }`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h3
                      className={`font-heading text-lg font-bold transition-colors duration-200 ${
                        isActive ? 'text-[#0284C7]' : 'text-[#252525]'
                      }`}
                    >
                      {block.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mt-2">
                      {block.description}
                    </p>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden mt-3 pt-3 border-t border-[#D6EAF7]"
                        >
                          <p className="text-xs text-[#334155] font-medium leading-relaxed bg-[#F0F9FF] p-2.5 rounded-md border border-[#BAE6FD]">
                            {block.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#D6EAF7]">
                    <span className="text-[11px] font-semibold text-[#0284C7] bg-[#F0F9FF] px-2.5 py-1 rounded-md border border-[#BAE6FD] inline-block">
                      {block.highlight}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-center">
            <span className="text-[11px] text-[#64748B]">
              Hover or tap any principle to view clinical commitments
            </span>
          </div>

        </div>
      </section>

      {/* 7.6 Clinic Facilities (Interactive Photo Gallery with Lightbox) */}
      <section className="py-16 md:py-24 bg-clinic-bg border-b border-clinic-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-skyblue-light border border-skyblue/20 rounded-full text-skyblue text-xs font-semibold uppercase tracking-wider">
              Advanced Infrastructure
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Our Clinic <span className="text-skyblue">Facilities.</span>
            </h2>
            <p className="text-sm sm:text-base text-clinic-muted leading-relaxed">
              Step inside Nivara Dental Studio in Pune. Click any image to view in full-screen high resolution.
            </p>
          </div>

          {/* 5 Clinic Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilityImages.map((facility, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                onClick={() => openFacilityImage(idx)}
                className={`bg-white rounded-card overflow-hidden border border-clinic-border shadow-subtle hover:shadow-premium hover:-translate-y-1 hover:border-skyblue/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img
                      src={facility.src}
                      alt={facility.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-navy shadow-sm border border-white/60">
                      {facility.tag}
                    </div>
                    <div className="absolute inset-0 bg-skyblue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-2.5 rounded-full bg-white/90 text-navy shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Maximize2 className="w-5 h-5 text-skyblue" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="font-heading text-lg font-bold text-navy group-hover:text-skyblue transition-colors duration-200">
                      {facility.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-clinic-muted leading-relaxed">
                      {facility.caption}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex items-center justify-between text-[11px] font-bold text-skyblue">
                  <span>Click to enlarge view</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 7.7 Why Patients Choose Nivara (Interactive Expandable Cards) */}
      <section className="py-16 md:py-24 bg-white border-b border-clinic-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-skyblue-light border border-skyblue/20 rounded-full text-skyblue text-xs font-semibold uppercase tracking-wider">
              Patient Care Standards
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Why Patients Choose <span className="text-skyblue">Nivara Dental Studio.</span>
            </h2>
            <p className="text-sm sm:text-base text-clinic-muted leading-relaxed">
              We focus on thoughtful, ethical healthcare delivery designed to make every interaction reliable, unhurried, and comfortable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseNivara.map((item, idx) => {
              const IconComp = item.icon;
              const isActive = activeWhyIdx === idx;
              return (
                <div
                  key={idx}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isActive}
                  onClick={() => setActiveWhyIdx(isActive ? null : idx)}
                  onMouseEnter={() => setActiveWhyIdx(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveWhyIdx(isActive ? null : idx);
                    }
                  }}
                  style={{
                    transition: 'all 350ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className={`p-7 rounded-card border cursor-pointer select-none space-y-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-skyblue ${
                    isActive
                      ? 'bg-white border-skyblue shadow-spotlight scale-[1.01] z-10'
                      : 'bg-clinic-bg border-clinic-border shadow-subtle hover:border-skyblue/50 hover:bg-white hover:shadow-premium'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center shadow-xs transition-colors duration-200 ${
                      isActive
                        ? 'bg-skyblue text-white'
                        : 'bg-white border border-clinic-border text-navy'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3
                    className={`font-heading text-lg font-bold transition-colors duration-200 ${
                      isActive ? 'text-skyblue' : 'text-navy'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-clinic-muted leading-relaxed">
                    {item.description}
                  </p>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden pt-2 border-t border-clinic-border/60"
                      >
                        <p className="text-xs text-navy font-medium bg-skyblue-light/50 p-2 rounded-md border border-skyblue/20">
                          {item.detail}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7.8 About Us Dedicated CTA */}
      <section className="py-16 md:py-20 bg-[#E0F2FE] border-t border-[#BAE6FD] relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#BAE6FD]/50 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="space-y-4 max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#BAE6FD] rounded-full text-[#0284C7] text-xs font-semibold uppercase tracking-wider shadow-xs">
              Begin Your Care
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#252525] tracking-tight leading-tight">
              Your Smile Deserves <span className="text-[#0284C7]">Thoughtful Care.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Connect with Nivara Dental Studio to discuss your dental care needs and explore suitable treatment options in Pune.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="pt-2 flex flex-wrap items-center justify-center gap-4"
          >
            <Button to="/book-appointment" variant="primary" size="lg" withArrow>
              Book an Appointment
            </Button>
            <Button href={`tel:${clinicConfig.phone}`} variant="secondary" size="lg">
              <Phone className="w-4 h-4 mr-2 text-[#0284C7]" />
              <span>Call: {clinicConfig.phoneDisplay}</span>
            </Button>
          </motion.div>

          {/* Quick Info Badges */}
          <div className="pt-6 border-t border-[#BAE6FD] flex flex-wrap items-center justify-center gap-6 text-xs text-[#475569]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0284C7]" /> Mon – Sat: 10:00 AM – 8:00 PM
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0284C7]" /> Sunday: By Appointment
            </span>
            <span>•</span>
            <span className="text-[#252525] font-semibold">Pune, Maharashtra</span>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Facility Gallery */}
      <Lightbox
        isOpen={lightboxOpen}
        images={facilityImages.map(f => ({ src: f.src, caption: `${f.title} — ${f.caption}` }))}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % facilityImages.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + facilityImages.length) % facilityImages.length)}
      />
    </div>
  );
};
