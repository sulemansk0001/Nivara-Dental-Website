import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PricingPage } from './pages/PricingPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ContactPage } from './pages/ContactPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { FAQsPage } from './pages/FAQsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route path="case-studies/:id" element={<CaseStudyDetailPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="book-appointment" element={<BookAppointmentPage />} />
          <Route path="faqs" element={<FAQsPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
