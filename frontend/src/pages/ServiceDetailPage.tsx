import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { FAQSection } from '../components/home/FAQSection';
import { AppointmentCTA } from '../components/home/AppointmentCTA';
import { api } from '../services/api';
import { Service } from '../types';
import {
  CheckCircle2,
  Calendar,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { clinicConfig } from '../config/clinic';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;

    api.getServices().then((list) => {
      setAllServices(list);
      const found = list.find((s) => s.slug === slug);
      setService(found || null);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center text-clinic-muted">
        Loading service details...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="py-32 text-center space-y-4">
        <h2 className="font-heading text-2xl font-bold text-navy">Service Not Found</h2>
        <p className="text-clinic-muted">The requested dental service could not be located.</p>
        <Button to="/services" variant="primary">
          Back to Dental Services
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        badge="Dental Service Details"
        title={service.serviceName}
        highlightedText="Treatment."
        description={service.tagline || service.shortDescription}
        breadcrumbs={[
          { label: 'Services', to: '/services' },
          { label: service.serviceName },
        ]}
        ctaButton={
          <Button
            to={`/book-appointment?service=${encodeURIComponent(service.serviceName)}`}
            variant="primary"
            withArrow
          >
            Book {service.serviceName}
          </Button>
        }
      />

      <section className="py-16 md:py-24 bg-white border-b border-clinic-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
            
            {/* Left 8 Columns: Clinical Overview & Benefits */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Featured Treatment Banner Image */}
              <div className="rounded-card overflow-hidden shadow-elevated border border-clinic-border">
                <img
                  src={service.image}
                  alt={service.serviceName}
                  className="w-full h-[380px] sm:h-[460px] object-cover"
                />
              </div>

              {/* Treatment Overview */}
              <div className="space-y-4">
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
                  Treatment Overview & Clinical Approach
                </h2>
                <p className="text-sm sm:text-base text-clinic-muted leading-relaxed">
                  {service.overview}
                </p>
              </div>

              {/* Key Benefits */}
              <div className="p-8 bg-clinic-bg rounded-card border border-clinic-border space-y-5">
                <h3 className="font-heading text-xl font-bold text-navy flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-skyblue" />
                  Key Clinical Benefits & Advantages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-skyblue flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-clinic-text font-medium leading-relaxed">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who Is This Treatment Suitable For? */}
              <div className="space-y-4">
                <h3 className="font-heading text-xl font-bold text-navy">
                  Who Is This Treatment Suitable For?
                </h3>
                <div className="space-y-3">
                  {service.suitableFor.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white rounded-brand border border-clinic-border shadow-subtle flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-skyblue-light text-skyblue font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-clinic-text leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h3 className="font-heading text-xl font-bold text-navy">
                    Common Questions About {service.serviceName}
                  </h3>
                  <div className="space-y-3">
                    {service.faqs.map((faq, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-5 bg-clinic-warm/50 rounded-brand border border-clinic-border space-y-2"
                      >
                        <h4 className="font-heading text-sm font-bold text-navy">
                          {faq.question}
                        </h4>
                        <p className="text-xs sm:text-sm text-clinic-muted leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right 4 Columns: Booking Card & Other Services */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Quick Booking Box */}
              <div className="p-6 bg-gradient-to-b from-[#F0F9FF] to-white text-[#252525] rounded-card shadow-elevated border-2 border-[#BAE6FD] space-y-5 sticky top-24">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#0284C7] tracking-wider bg-white border border-[#BAE6FD] px-2.5 py-1 rounded-md shadow-xs">
                    Consultation & Procedure
                  </span>
                  <h3 className="font-heading text-2xl font-extrabold text-[#252525] mt-3">
                    Book {service.serviceName}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Meet with our MDS specialist for an initial diagnosis and customized clinical plan.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-brand border border-[#D6EAF7] shadow-xs">
                  <div className="text-[11px] text-[#64748B]">Indicative Pricing:</div>
                  <div className="font-heading text-2xl font-bold text-skyblue mt-0.5">
                    Starting from {service.indicativePrice}
                  </div>
                  <div className="text-[10px] text-[#64748B] mt-1">
                    *Exact estimate provided after digital examination.
                  </div>
                </div>

                <Button
                  to={`/book-appointment?service=${encodeURIComponent(service.serviceName)}`}
                  variant="primary"
                  className="w-full"
                  size="md"
                  withArrow
                >
                  Schedule Appointment
                </Button>

                <div className="pt-2 text-center">
                  <a
                    href={`https://wa.me/${clinicConfig.whatsappNumber}?text=${encodeURIComponent(
                      `Hello Nivara Dental Studio! I would like to enquire about ${service.serviceName}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#666666] hover:text-skyblue transition-colors font-medium underline"
                  >
                    Quick WhatsApp Enquiry →
                  </a>
                </div>
              </div>

              {/* Other Services Navigation List */}
              <div className="p-6 bg-clinic-bg rounded-card border border-clinic-border space-y-4">
                <h4 className="font-heading text-base font-bold text-navy">
                  Explore Other Treatments
                </h4>
                <div className="space-y-2">
                  {allServices
                    .filter((s) => s.slug !== service.slug)
                    .map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="p-2.5 rounded-brand bg-white border border-clinic-border/60 hover:border-skyblue/40 flex items-center justify-between text-xs font-semibold text-navy hover:text-skyblue transition-colors"
                      >
                        <span>{s.serviceName}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
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
