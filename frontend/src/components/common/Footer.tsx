import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { clinicConfig } from '../../config/clinic';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  ArrowRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const whatsappUrl = `https://wa.me/${clinicConfig.whatsappNumber}?text=${encodeURIComponent(
    clinicConfig.whatsappMessage
  )}`;

  return (
    <footer className="bg-[#F0F9FF] text-[#252525] pt-12 pb-8 border-t border-[#D6EAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-8 border-b border-[#D6EAF7]">
          
          {/* COLUMN 1 — BRAND (5 cols on md/lg) */}
          <div className="md:col-span-5 space-y-4">
            <Logo />
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-sm">
              Nivara Dental Studio is a modern, patient-centered dental clinic in Pune. We deliver ethical, high-quality oral healthcare with compassionate attention and gentle techniques.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={clinicConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white border border-[#D6EAF7] flex items-center justify-center text-[#64748B] hover:text-white hover:bg-[#38BDF8] hover:border-[#38BDF8] transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={clinicConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white border border-[#D6EAF7] flex items-center justify-center text-[#64748B] hover:text-white hover:bg-[#38BDF8] hover:border-[#38BDF8] transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={clinicConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white border border-[#D6EAF7] flex items-center justify-center text-[#64748B] hover:text-white hover:bg-[#38BDF8] hover:border-[#38BDF8] transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href={clinicConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white border border-[#D6EAF7] flex items-center justify-center text-[#64748B] hover:text-white hover:bg-[#38BDF8] hover:border-[#38BDF8] transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* COLUMN 2 — QUICK LINKS (3 cols on md/lg) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[#252525] font-heading font-bold text-xs uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-[#0284C7] hover:text-[#0369A1] transition-colors flex items-center gap-1 group">
                  <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#0284C7] hover:text-[#0369A1] transition-colors flex items-center gap-1 group">
                  <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-[#0284C7] hover:text-[#0369A1] transition-colors flex items-center gap-1 group">
                  <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>Doctors</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#0284C7] hover:text-[#0369A1] transition-colors flex items-center gap-1 group">
                  <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-[#0284C7] hover:text-[#0369A1] transition-colors flex items-center gap-1 group">
                  <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>Pricing & Packages</span>
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-[#0284C7] hover:text-[#0369A1] transition-colors flex items-center gap-1 group">
                  <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>Case Studies</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-[#0284C7] hover:text-[#0369A1] transition-colors flex items-center gap-1 group">
                  <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>Blog & Insights</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#0284C7] hover:text-[#0369A1] transition-colors flex items-center gap-1 group">
                  <span className="text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 — CONTACT (4 cols on md/lg) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[#252525] font-heading font-bold text-xs uppercase tracking-wider">
              Clinic Contact
            </h4>
            <div className="space-y-2.5 text-xs text-[#64748B]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0284C7] flex-shrink-0 mt-0.5" />
                <span className="text-[#252525]">{clinicConfig.address.full}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0284C7] flex-shrink-0" />
                <a href={`tel:${clinicConfig.phone}`} className="text-[#0284C7] hover:text-[#0369A1] transition-colors font-medium">
                  {clinicConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0284C7] flex-shrink-0" />
                <a href={`mailto:${clinicConfig.email}`} className="text-[#0284C7] hover:text-[#0369A1] transition-colors font-medium">
                  {clinicConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:text-[#20ba59] transition-colors font-medium"
                >
                  WhatsApp: +91 98765 43210
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/book-appointment"
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#38BDF8] text-white px-3.5 py-2 rounded-brand hover:bg-[#0EA5E9] transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-6 text-xs text-[#64748B] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} {clinicConfig.brandName}. All rights reserved. Pune, Maharashtra.
          </p>
          <div className="flex items-center gap-5 text-[11px]">
            <Link to="/privacy-policy" className="text-[#64748B] hover:text-[#0284C7] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-[#64748B] hover:text-[#0284C7] transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/admin" className="text-[#94A3B8] hover:text-[#0284C7] transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
