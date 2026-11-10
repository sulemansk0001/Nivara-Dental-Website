import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { Button } from '../common/Button';
import { CaseStudy } from '../../types';

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ caseStudies }) => {
  const [selectedCaseId, setSelectedCaseId] = useState(caseStudies[0]?.id || 'cs-1');
  const activeCase = caseStudies.find(c => c.id === selectedCaseId) || caseStudies[0];

  if (!activeCase) return null;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-clinic-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-skyblue-light border border-skyblue/20 rounded-full text-skyblue text-xs font-semibold uppercase tracking-wider">
              Clinical Case Studies
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Real Smiles. <span className="text-skyblue">Thoughtful Transformations.</span>
            </h2>
            <p className="text-sm sm:text-base text-clinic-muted leading-relaxed">
              Explore documented clinical transformations showing the difference precision dentistry makes. Hover or tap to compare before and after conditions.
            </p>
          </div>
          <div>
            <Button to="/case-studies" variant="outline" withArrow>
              View All Case Studies
            </Button>
          </div>
        </div>

        {/* Treatment Category Switcher Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {caseStudies.map((cs) => {
            const isSelected = cs.id === selectedCaseId;
            return (
              <button
                key={cs.id}
                onClick={() => setSelectedCaseId(cs.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 select-none ${
                  isSelected
                    ? 'bg-skyblue text-white shadow-sm'
                    : 'bg-clinic-bg text-clinic-text hover:bg-skyblue-light border border-clinic-border'
                }`}
              >
                {cs.treatment}
              </button>
            );
          })}
        </div>

        {/* Featured Case Study Interactive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-clinic-bg rounded-card p-6 sm:p-10 border border-clinic-border shadow-subtle">
          
          {/* Left: Interactive Before/After Hover/Tap Comparison (7 cols) */}
          <div className="lg:col-span-7">
            <BeforeAfterSlider
              beforeImage={activeCase.beforeImage}
              afterImage={activeCase.afterImage}
              beforeLabel="BEFORE TREATMENT"
              afterLabel="FINAL SMILE"
              aspectRatio="aspect-[4/3] sm:aspect-[16/10]"
            />
            <div className="mt-2 text-[11px] text-clinic-muted text-center flex items-center justify-center gap-1.5">
              <span>↔ Hover cursor or tap to compare smile transformation (no dragging required)</span>
            </div>
          </div>

          {/* Right: Case Study Info & Metrics (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs font-bold text-skyblue uppercase tracking-wider bg-skyblue-light px-2.5 py-1 rounded-md border border-skyblue/20">
                {activeCase.treatment}
              </span>
              <h3 className="font-heading text-2xl font-extrabold text-navy mt-3 leading-snug">
                {activeCase.title}
              </h3>
              <p className="text-xs text-navy font-semibold mt-1">
                Treated by: <span className="text-skyblue">{activeCase.doctor}</span> • {activeCase.duration}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-clinic-muted leading-relaxed">
              {activeCase.description}
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {activeCase.keyMetrics.map((km, idx) => (
                <div key={idx} className="p-3 bg-white rounded-brand border border-clinic-border text-center">
                  <div className="font-heading font-extrabold text-sm sm:text-base text-navy">
                    {km.value}
                  </div>
                  <div className="text-[10px] text-clinic-muted mt-0.5">
                    {km.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Patient Quote */}
            <div className="p-4 bg-white/80 rounded-brand border-l-4 border-skyblue text-xs text-navy italic shadow-xs">
              "{activeCase.quote}"
            </div>

            {/* Action */}
            <div className="pt-2 flex items-center gap-4">
              <Button to={`/case-studies/${activeCase.id}`} variant="primary" withArrow>
                View Full Case Details
              </Button>
              <Link
                to="/book-appointment"
                className="text-xs font-bold text-navy hover:text-skyblue transition-colors"
              >
                Discuss Similar Case →
              </Link>
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-[11px] text-clinic-muted text-center italic">
          *Demonstration clinical photographs. Results can vary based on individual biological and dental health factors.
        </p>

      </div>
    </section>
  );
};
