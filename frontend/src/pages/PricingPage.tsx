import React, { useEffect, useState } from 'react';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { PricingSection } from '../components/home/PricingSection';
import { AppointmentCTA } from '../components/home/AppointmentCTA';
import { api } from '../services/api';
import { PricingPlan } from '../types';
import { clinicConfig } from '../config/clinic';
import { AlertCircle, Check, HelpCircle, FileText } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getPricing().then((data) => {
      setPricing(data);
      setLoading(false);
    });
  }, []);

  const treatmentTable = [
    { treatment: 'Comprehensive Initial Dental Consultation & Scan', cost: '₹999', note: 'Includes intraoral camera diagnostic tour' },
    { treatment: 'Tooth-Colored Composite Resin Filling (Per Tooth)', cost: '₹1,499 – ₹2,499', note: 'Depending on cavity depth and surface count' },
    { treatment: 'Ultrasonic Scaling & Airflow Stain Polishing', cost: '₹1,499 – ₹2,200', note: 'Full mouth tartar & calculus prophylaxis' },
    { treatment: 'Single-Sitting Rotary Root Canal Therapy', cost: '₹3,999 – ₹5,500', note: 'Micro-endodontic rotary files with electronic apex locator' },
    { treatment: 'Metal-Free High Translucent Zirconia Crown', cost: '₹7,500 – ₹12,000', note: 'CAD/CAM milled with up to 10-year warranty' },
    { treatment: 'Single Titanium Dental Implant (Surgery & Abutment)', cost: '₹24,999 – ₹38,000', note: 'Grade-4 titanium fixture with 3D CBCT guided planning' },
    { treatment: 'In-Chair Laser LED Teeth Whitening Session', cost: '₹5,499 – ₹7,999', note: '45-minute clinic session with desensitizing formula' },
    { treatment: 'Invisible Clear Aligners (Full Treatment Course)', cost: '₹45,000 – ₹1,20,000', note: 'Customized digital biomechanical planning trays' },
  ];

  return (
    <div>
      <PageHero
        badge="Honest Healthcare Value"
        title="Simple, Transparent & Fair"
        highlightedText="Pricing."
        description="We believe in complete pricing transparency before any dental procedure commences. Explore indicative package fees and individual treatment estimates below."
        breadcrumbs={[{ label: 'Pricing & Packages' }]}
        ctaButton={
          <Button to="/book-appointment" variant="primary" withArrow>
            Book ₹999 Consultation
          </Button>
        }
      />

      {/* Package Pricing Cards */}
      <PricingSection pricing={pricing} />

      {/* Detailed Treatment Price Breakdown Table */}
      <section className="py-16 md:py-24 bg-clinic-bg border-b border-clinic-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-skyblue uppercase tracking-wider bg-skyblue-light px-3 py-1 rounded-full">
              Itemized Indicative Costs
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-navy tracking-tight">
              Individual Treatment Price Guide
            </h2>
            <p className="text-sm text-clinic-muted max-w-xl mx-auto">
              Indicative fees for our most common restorative, surgical, and cosmetic procedures in Pune.
            </p>
          </div>

          <div className="bg-white rounded-card overflow-hidden border border-clinic-border shadow-subtle">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#E0F2FE] text-[#0284C7] text-xs uppercase tracking-wider border-b border-[#BAE6FD]">
                    <th className="py-4 px-6 font-bold">Treatment / Procedure</th>
                    <th className="py-4 px-6 font-bold">Indicative Cost (₹)</th>
                    <th className="py-4 px-6 font-bold hidden sm:table-cell">Clinical Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-clinic-border text-xs sm:text-sm">
                  {treatmentTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-clinic-warm/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-navy">
                        {row.treatment}
                        <span className="block sm:hidden text-[11px] text-clinic-muted font-normal mt-0.5">
                          {row.note}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-skyblue whitespace-nowrap">
                        {row.cost}
                      </td>
                      <td className="py-4 px-6 text-clinic-muted hidden sm:table-cell text-xs">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing Disclaimer */}
          <div className="p-6 bg-white rounded-brand border border-clinic-border flex items-start gap-3 shadow-subtle">
            <AlertCircle className="w-5 h-5 text-skyblue flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-clinic-muted">
              <strong className="text-navy block font-semibold">Important Medical Notice:</strong>
              <p>{clinicConfig.disclaimers.pricing}</p>
            </div>
          </div>

        </div>
      </section>

      <AppointmentCTA />
    </div>
  );
};
