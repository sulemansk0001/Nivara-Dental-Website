import React from 'react';
import { Button } from '../common/Button';
import { motion } from 'framer-motion';
import { Check, Sparkles, AlertCircle } from 'lucide-react';
import { PricingPlan } from '../../types';
import { clinicConfig } from '../../config/clinic';

interface PricingSectionProps {
  pricing: PricingPlan[];
}

export const PricingSection: React.FC<PricingSectionProps> = ({ pricing }) => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#D6EAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E0F2FE] border border-[#BAE6FD] rounded-full text-[#0284C7] text-xs font-semibold uppercase tracking-wider shadow-xs">
            Clear Healthcare Value
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
            Simple and Transparent <span className="text-skyblue">Dental Pricing.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            Explore indicative treatment prices and speak with our team for a personalised consultation. No hidden fees or unexpected charges.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricing.map((plan, idx) => {
            const isPopular = plan.popular;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`relative rounded-section p-8 flex flex-col justify-between transition-all duration-300 group ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#F0F9FF] to-white text-[#252525] shadow-elevated border-2 border-[#38BDF8] md:-translate-y-2 hover:-translate-y-3'
                    : 'bg-white text-[#252525] border border-[#D6EAF7] shadow-subtle hover:shadow-md hover:-translate-y-1 hover:border-[#38BDF8]'
                }`}
              >
                {/* Popular Ribbon */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-skyblue text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm flex items-center gap-1 group-hover:scale-105 transition-transform duration-200">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span>{plan.badge || 'Most Recommended'}</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl font-bold text-navy group-hover:text-skyblue transition-colors duration-200">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="text-xs mt-2 leading-relaxed text-clinic-muted">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mt-6 pb-6 border-b border-clinic-border/60">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-4xl font-extrabold tracking-tight transition-transform duration-200 group-hover:scale-[1.02] inline-block text-navy">
                        {plan.price}
                      </span>
                    </div>
                    <span className="text-[11px] block mt-1 font-medium text-clinic-muted">
                      {plan.billing}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="mt-6 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-navy">
                      Package Includes:
                    </div>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs">
                          <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-skyblue" />
                          <span className="text-clinic-muted">
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-8 pt-4">
                  <Button
                    to={plan.ctaLink}
                    variant={isPopular ? 'primary' : 'outline'}
                    className="w-full"
                    size="md"
                    withArrow
                  >
                    {plan.ctaText}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pricing Disclaimer Box */}
        <div className="mt-12 p-4 bg-clinic-bg rounded-brand border border-clinic-border flex items-start gap-3 max-w-3xl mx-auto">
          <AlertCircle className="w-5 h-5 text-skyblue flex-shrink-0 mt-0.5" />
          <p className="text-xs text-clinic-muted leading-relaxed">
            <strong className="text-navy">Pricing Disclaimer:</strong> {clinicConfig.disclaimers.pricing}
          </p>
        </div>

      </div>
    </section>
  );
};
