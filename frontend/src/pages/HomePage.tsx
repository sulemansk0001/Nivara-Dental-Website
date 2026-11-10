import React, { useEffect, useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustBar } from '../components/home/TrustBar';
import { AboutSection } from '../components/home/AboutSection';
import { CoreValues } from '../components/home/CoreValues';
import { ServicesSection } from '../components/home/ServicesSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { StatsSection } from '../components/home/StatsSection';
import { CaseStudiesSection } from '../components/home/CaseStudiesSection';
import { DoctorsSection } from '../components/home/DoctorsSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { BlogSection } from '../components/home/BlogSection';
import { PricingSection } from '../components/home/PricingSection';
import { FAQSection } from '../components/home/FAQSection';
import { AppointmentCTA } from '../components/home/AppointmentCTA';

import { api } from '../services/api';
import { Service, Doctor, CaseStudy, Testimonial, BlogPost, PricingPlan } from '../types';

export const HomePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const [srvs, docs, cases, tests, blgs, prc] = await Promise.all([
          api.getServices(),
          api.getDoctors(),
          api.getCaseStudies(),
          api.getTestimonials(),
          api.getBlogs(),
          api.getPricing(),
        ]);
        setServices(srvs);
        setDoctors(docs);
        setCaseStudies(cases);
        setTestimonials(tests);
        setBlogs(blgs);
        setPricing(prc);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <CoreValues />
      <ServicesSection services={services} />
      <WhyChooseUs />
      <StatsSection />
      <CaseStudiesSection caseStudies={caseStudies} />
      <DoctorsSection doctors={doctors} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogSection blogs={blogs} />
      <PricingSection pricing={pricing} />
      <FAQSection />
      <AppointmentCTA />
    </div>
  );
};
