import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { BeforeAfterSlider } from '../components/common/BeforeAfterSlider';
import { AppointmentCTA } from '../components/home/AppointmentCTA';
import { api } from '../services/api';
import { CaseStudy } from '../types';
import { ArrowRight, Sparkles, User, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const CaseStudiesPage: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getCaseStudies().then((data) => {
      setCaseStudies(data);
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics & Braces'];

  const filtered = selectedFilter === 'All'
    ? caseStudies
    : caseStudies.filter((cs) => cs.treatment === selectedFilter);

  return (
    <div>
      <PageHero
        badge="Clinical Transformations"
        title="Real Smile Makeovers &"
        highlightedText="Case Studies."
        description="Browse documented smile transformations achieved through precision porcelain veneers, computer-guided dental implants, and clear aligners at Nivara Dental Studio Pune."
        breadcrumbs={[{ label: 'Case Studies' }]}
        ctaButton={
          <Button to="/book-appointment" variant="primary" withArrow>
            Consult Our Dentists
          </Button>
        }
      />

      <section className="py-16 md:py-24 bg-[#F0F9FF] border-b border-[#D6EAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 select-none ${
                  selectedFilter === cat
                    ? 'bg-[#38BDF8] text-white shadow-sm'
                    : 'bg-white text-[#252525] hover:bg-[#E0F2FE] border border-[#D6EAF7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Case Studies Grid with Before/After Sliders */}
          <div className="space-y-16">
            {filtered.map((cs, idx) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-section p-6 sm:p-10 border border-[#D6EAF7] shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left: Interactive Before/After Slider (7 cols) */}
                <div className="lg:col-span-7">
                  <BeforeAfterSlider
                    beforeImage={cs.beforeImage}
                    afterImage={cs.afterImage}
                    beforeLabel="BEFORE"
                    afterLabel="AFTER"
                    aspectRatio="aspect-[4/3] sm:aspect-[16/10]"
                  />
                  <div className="mt-2 text-[11px] text-[#64748B] text-center flex items-center justify-center gap-1.5">
                    <span>↔ Drag divider with mouse or touch to see transformation</span>
                  </div>
                </div>

                {/* Right: Info (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-bold text-[#0284C7] uppercase tracking-wider bg-[#F0F9FF] border border-[#BAE6FD] px-3 py-1 rounded-full">
                    {cs.treatment}
                  </span>

                  <h3 className="font-heading text-2xl font-extrabold text-[#252525]">
                    {cs.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-[#64748B]">
                    <span>Lead Surgeon: <strong className="text-[#252525]">{cs.doctor}</strong></span>
                    <span>•</span>
                    <span>{cs.duration}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {cs.description}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-2.5 pt-2">
                    {cs.keyMetrics.map((km, kIdx) => (
                      <div key={kIdx} className="p-2.5 bg-[#F0F9FF] rounded-brand border border-[#D6EAF7] text-center">
                        <div className="font-heading font-extrabold text-sm text-[#252525]">{km.value}</div>
                        <div className="text-[10px] text-[#64748B] mt-0.5">{km.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="p-3.5 bg-[#F0F9FF] rounded-brand border-l-4 border-[#38BDF8] text-xs text-[#252525] italic">
                    "{cs.quote}"
                  </div>

                  <div className="pt-2 flex items-center gap-4">
                    <Button to={`/case-studies/${cs.id}`} variant="primary" size="sm" withArrow>
                      Read Full Case Details
                    </Button>
                    <Link
                      to={`/book-appointment?service=${encodeURIComponent(cs.treatment)}`}
                      className="text-xs font-bold text-[#252525] hover:text-[#0284C7] transition-colors"
                    >
                      Book Similar →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="text-[11px] text-[#64748B] text-center italic">
            *Demonstration clinical records. Individual treatment outcomes depend on personal biological factors, oral hygiene compliance, and bone quality.
          </p>

        </div>
      </section>

      <AppointmentCTA />
    </div>
  );
};
