import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { AppointmentCTA } from '../components/home/AppointmentCTA';
import { api } from '../services/api';
import { Service } from '../types';
import { ArrowRight, CheckCircle2, Stethoscope, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <PageHero
        badge="Our Dental Specialties"
        title="Complete Oral Healthcare"
        highlightedText="Under One Roof."
        description="Explore our full spectrum of preventive, restorative, and aesthetic dental treatments designed to preserve your natural smile using gentle, evidence-based dentistry in Pune."
        breadcrumbs={[{ label: 'Dental Services' }]}
        ctaButton={
          <Button to="/book-appointment" variant="primary" withArrow>
            Book Dental Consultation
          </Button>
        }
      />

      <section className="py-16 md:py-24 bg-white border-b border-clinic-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((srv, idx) => (
              <motion.div
                key={srv.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-white rounded-card overflow-hidden border border-clinic-border shadow-subtle hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Service Photo */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={srv.image}
                      alt={srv.serviceName}
                      className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                    
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-navy shadow-sm">
                      Starting {srv.indicativePrice}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-2.5">
                    <h3 className="font-heading text-lg font-bold text-navy group-hover:text-skyblue transition-colors">
                      <Link to={`/services/${srv.slug}`}>
                        {srv.serviceName}
                      </Link>
                    </h3>

                    <p className="text-xs text-clinic-muted leading-relaxed line-clamp-3">
                      {srv.shortDescription}
                    </p>

                    <div className="pt-2 space-y-1.5">
                      {srv.benefits.slice(0, 2).map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-1.5 text-[11px] text-navy font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-skyblue flex-shrink-0" />
                          <span className="truncate">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer action */}
                <div className="p-5 pt-0 border-t border-clinic-border/60 mt-4 flex items-center justify-between text-xs font-semibold">
                  <Link
                    to={`/services/${srv.slug}`}
                    className="inline-flex items-center gap-1 text-skyblue hover:text-skyblue-hover group-hover:gap-1.5 transition-all"
                  >
                    <span>View Treatment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to={`/book-appointment?service=${encodeURIComponent(srv.serviceName)}`}
                    className="text-clinic-muted hover:text-navy text-[11px]"
                  >
                    Book
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <AppointmentCTA />
    </div>
  );
};
