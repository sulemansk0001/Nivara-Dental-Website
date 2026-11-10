import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { BeforeAfterSlider } from '../components/common/BeforeAfterSlider';
import { AppointmentCTA } from '../components/home/AppointmentCTA';
import { api } from '../services/api';
import { CaseStudy } from '../types';
import { CheckCircle2, User, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export const CaseStudyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [allCases, setAllCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getCaseStudies().then((list) => {
      setAllCases(list);
      const found = list.find((c) => c.id === id);
      setCaseStudy(found || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="py-32 text-center text-clinic-muted">Loading case study details...</div>;
  }

  if (!caseStudy) {
    return (
      <div className="py-32 text-center space-y-4">
        <h2 className="font-heading text-2xl font-bold text-navy">Case Study Not Found</h2>
        <Button to="/case-studies" variant="primary">Back to Case Studies</Button>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        badge={caseStudy.treatment}
        title={caseStudy.title}
        description={`Clinical case breakdown treated by ${caseStudy.doctor} at Nivara Dental Studio Pune.`}
        breadcrumbs={[
          { label: 'Case Studies', to: '/case-studies' },
          { label: caseStudy.title }
        ]}
        ctaButton={
          <Button
            to={`/book-appointment?service=${encodeURIComponent(caseStudy.treatment)}`}
            variant="primary"
            withArrow
          >
            Consult On This Treatment
          </Button>
        }
      />

      <section className="py-16 md:py-24 bg-white border-b border-clinic-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left 8 Cols: Interactive Slider and Detailed Walkthrough */}
            <div className="lg:col-span-8 space-y-10">
              <div>
                <BeforeAfterSlider
                  beforeImage={caseStudy.beforeImage}
                  afterImage={caseStudy.afterImage}
                  beforeLabel="INITIAL CONDITION"
                  afterLabel="FINAL OUTCOME"
                  aspectRatio="aspect-[16/10]"
                />
                <p className="mt-2 text-xs text-clinic-muted text-center">
                  Drag the center divider horizontally to evaluate smile aesthetics and alignment.
                </p>
              </div>

              {/* Case Narrative */}
              <div className="space-y-4">
                <h2 className="font-heading text-2xl font-extrabold text-navy">
                  Clinical Diagnosis & Treatment Plan
                </h2>
                <p className="text-sm sm:text-base text-clinic-muted leading-relaxed">
                  {caseStudy.description}
                </p>
              </div>

              {/* Patient Feedback */}
              <div className="p-6 bg-clinic-warm rounded-card border border-skyblue/20 space-y-2">
                <div className="text-xs font-bold text-skyblue uppercase tracking-wider">
                  Patient Perspective
                </div>
                <blockquote className="font-heading text-lg font-bold text-navy italic">
                  "{caseStudy.quote}"
                </blockquote>
              </div>
            </div>

            {/* Right 4 Cols: Metrics & Booking Action */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-gradient-to-b from-[#F0F9FF] to-white text-[#252525] rounded-card shadow-elevated border-2 border-[#BAE6FD] space-y-5">
                <h3 className="font-heading text-lg font-bold text-[#252525]">
                  Case Summary
                </h3>

                <div className="space-y-3 text-xs text-[#64748B]">
                  <div className="flex justify-between pb-2 border-b border-[#D6EAF7]">
                    <span>Procedure</span>
                    <span className="font-bold text-[#0284C7]">{caseStudy.treatment}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#D6EAF7]">
                    <span>Specialist</span>
                    <span className="font-semibold text-[#252525]">{caseStudy.doctor}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#D6EAF7]">
                    <span>Duration</span>
                    <span className="font-semibold text-[#252525]">{caseStudy.duration}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-xs font-bold text-[#252525] uppercase tracking-wider mb-2">
                    Key Outcomes:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {caseStudy.keyMetrics.map((km, idx) => (
                      <div key={idx} className="p-2.5 bg-white rounded-brand border border-[#D6EAF7] text-center shadow-xs">
                        <div className="font-bold text-base text-skyblue">{km.value}</div>
                        <div className="text-[10px] text-[#64748B] mt-0.5">{km.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  to={`/book-appointment?service=${encodeURIComponent(caseStudy.treatment)}`}
                  variant="primary"
                  className="w-full"
                  size="md"
                  withArrow
                >
                  Schedule Your Consultation
                </Button>
              </div>

              {/* Other Case Studies */}
              <div className="p-6 bg-clinic-bg rounded-card border border-clinic-border space-y-3">
                <h4 className="font-heading text-sm font-bold text-navy">Other Transformations</h4>
                <div className="space-y-2">
                  {allCases.filter(c => c.id !== caseStudy.id).map(c => (
                    <Link
                      key={c.id}
                      to={`/case-studies/${c.id}`}
                      className="p-3 rounded-brand bg-white border border-clinic-border/60 hover:border-skyblue/40 flex items-center justify-between text-xs font-semibold text-navy hover:text-skyblue transition-colors"
                    >
                      <span className="truncate">{c.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 ml-2" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <AppointmentCTA />
    </div>
  );
};
