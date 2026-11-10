import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Button } from './Button';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  ShieldCheck,
  Stethoscope,
  Clock,
  Tag,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { clinicConfig } from '../../config/clinic';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [moreDropdown, setMoreDropdown] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const location = useLocation();
  const moreRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setServicesDropdown(false);
    setMoreDropdown(false);
    setMobileServicesOpen(false);
    setMobileMoreOpen(false);
  }, [location.pathname]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreDropdown(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesDropdown(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesDropdown(false);
        setMoreDropdown(false);
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const servicesItems = [
    { label: 'General Dentistry', to: '/services/general-dentistry', desc: 'Cavity care, scans & checkups' },
    { label: 'Cosmetic Dentistry', to: '/services/cosmetic-dentistry', desc: 'Porcelain veneers & aesthetic bonding' },
    { label: 'Dental Implants', to: '/services/dental-implants', desc: 'Permanent titanium tooth roots' },
    { label: 'Root Canal Treatment', to: '/services/root-canal-treatment', desc: 'Gentle rotary pain relief' },
    { label: 'Orthodontics & Braces', to: '/services/orthodontics-braces', desc: 'Clear aligners & ceramic braces' },
    { label: 'Pediatric Dentistry', to: '/services/pediatric-dentistry', desc: 'Stress-free care for kids' },
    { label: 'Teeth Whitening', to: '/services/teeth-whitening', desc: 'In-chair LED brightening' },
    { label: 'Dental Cleaning', to: '/services/dental-cleaning', desc: 'Ultrasonic plaque & stain removal' },
  ];

  const moreItems = [
    {
      label: 'Pricing & Packages',
      to: '/pricing',
      desc: 'Transparent treatment costs & consultations',
      icon: Tag,
    },
    {
      label: 'Smile Case Studies',
      to: '/case-studies',
      desc: 'Interactive before & after smile transformations',
      icon: Sparkles,
    },
    {
      label: 'Dental Insights / Blog',
      to: '/blog',
      desc: 'Educational articles by our dental specialists',
      icon: BookOpen,
    },
  ];

  const isMoreActive = ['/pricing', '/case-studies', '/blog'].some((p) =>
    location.pathname.startsWith(p)
  );

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#F0F9FF] text-[#252525] text-xs py-2 px-4 border-b border-[#D6EAF7] hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#64748B]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
              NABH-Grade Sterilization & 100% Hygiene Protocols
            </span>
            <span className="flex items-center gap-1.5 text-[#64748B]">
              <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
              Mon–Sat: 10:00 AM – 8:00 PM | Pune, Maharashtra
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${clinicConfig.phone}`}
              className="flex items-center gap-1.5 text-[#252525] hover:text-skyblue transition-colors font-medium group"
            >
              <Phone className="w-3.5 h-3.5 text-skyblue transition-transform duration-200 group-hover:rotate-12" />
              Emergency Helpline: {clinicConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 bg-white/95 backdrop-blur-md ${
          scrolled
            ? 'shadow-subtle border-b border-[#D6EAF7] py-2.5'
            : 'border-b border-[#D6EAF7] py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Logo />

          {/* Center Navigation for Desktop */}
          <nav className="hidden lg:flex items-center gap-7">
            {/* 1. Home */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-[14px] font-medium transition-colors duration-200 relative py-1 ${
                  isActive ? 'text-[#0284C7] font-semibold' : 'text-[#334155] hover:text-[#0EA5E9]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Home
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#0284C7] rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>

            {/* 2. About Us */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-[14px] font-medium transition-colors duration-200 relative py-1 ${
                  isActive ? 'text-[#0284C7] font-semibold' : 'text-[#334155] hover:text-[#0EA5E9]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  About Us
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#0284C7] rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>

            {/* 3. Doctors */}
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                `text-[14px] font-medium transition-colors duration-200 relative py-1 ${
                  isActive ? 'text-[#0284C7] font-semibold' : 'text-[#334155] hover:text-[#0EA5E9]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Doctors
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#0284C7] rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>

            {/* 4. Services Dropdown */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `inline-flex items-center gap-1 text-[14px] font-medium transition-colors duration-200 py-1 ${
                    isActive || location.pathname.startsWith('/services')
                      ? 'text-[#0284C7] font-semibold'
                      : 'text-[#334155] hover:text-[#0EA5E9]'
                  }`
                }
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-250 ease-out ${
                    servicesDropdown ? 'rotate-180 text-[#0284C7]' : 'text-gray-400'
                  }`}
                />
              </NavLink>

              <AnimatePresence>
                {servicesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[520px]"
                  >
                    <div className="bg-white rounded-card shadow-elevated border border-[#D6EAF7] p-4 grid grid-cols-2 gap-2">
                      {servicesItems.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          onClick={() => setServicesDropdown(false)}
                          className="p-2.5 rounded-lg hover:bg-[#F0F9FF] transition-all duration-200 group flex items-start gap-2.5 hover:translate-x-0.5"
                        >
                          <div className="w-8 h-8 rounded-md bg-[#E0F2FE] flex items-center justify-center flex-shrink-0 text-[#0284C7] mt-0.5 group-hover:bg-[#38BDF8] group-hover:text-white transition-colors duration-200">
                            <Stethoscope className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-[#252525] group-hover:text-[#0284C7] transition-colors">
                              {sub.label}
                            </div>
                            <div className="text-[11px] text-[#64748B] leading-tight mt-0.5">
                              {sub.desc}
                            </div>
                          </div>
                        </Link>
                      ))}
                      <div className="col-span-2 pt-2 mt-1 border-t border-[#D6EAF7] flex items-center justify-between text-xs text-[#64748B] px-2">
                        <span>Looking for all clinical treatments?</span>
                        <Link
                          to="/services"
                          onClick={() => setServicesDropdown(false)}
                          className="text-[#0284C7] font-semibold hover:text-[#0369A1] hover:underline flex items-center gap-1 group"
                        >
                          <span>View All 8 Services</span>
                          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 5. More ▼ Dropdown (Pricing, Case Studies, Blog) */}
            <div
              ref={moreRef}
              className="relative"
              onMouseEnter={() => setMoreDropdown(true)}
              onMouseLeave={() => setMoreDropdown(false)}
            >
              <button
                type="button"
                onClick={() => setMoreDropdown(!moreDropdown)}
                aria-expanded={moreDropdown}
                className={`inline-flex items-center gap-1 text-[14px] font-medium transition-colors duration-200 py-1 focus:outline-none ${
                  isMoreActive || moreDropdown
                    ? 'text-[#0284C7] font-semibold'
                    : 'text-[#334155] hover:text-[#0EA5E9]'
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-250 ease-out ${
                    moreDropdown ? 'rotate-180 text-[#0284C7]' : 'text-gray-400'
                  }`}
                />
              </button>

              <AnimatePresence>
                {moreDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64"
                  >
                    <div className="bg-white rounded-card shadow-elevated border border-[#D6EAF7] p-2 space-y-1">
                      {moreItems.map((item) => {
                        const Icon = item.icon;
                        const isCurrent = location.pathname.startsWith(item.to);
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setMoreDropdown(false)}
                            className={`p-2.5 rounded-lg transition-all duration-200 group flex items-start gap-2.5 hover:bg-[#F0F9FF] hover:translate-x-0.5 ${
                              isCurrent ? 'bg-[#F0F9FF]' : ''
                            }`}
                          >
                            <div className="w-8 h-8 rounded-md bg-[#E0F2FE] flex items-center justify-center flex-shrink-0 text-[#0284C7] group-hover:bg-[#38BDF8] group-hover:text-white transition-colors duration-200 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-[#252525] group-hover:text-[#0284C7] transition-colors">
                                {item.label}
                              </div>
                              <div className="text-[10px] text-[#64748B] leading-tight mt-0.5">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 6. Contact */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-[14px] font-medium transition-colors duration-200 relative py-1 ${
                  isActive ? 'text-[#0284C7] font-semibold' : 'text-[#334155] hover:text-[#0EA5E9]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Contact
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#0284C7] rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          </nav>

          {/* Right Action: 7. Book Appointment CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Button to="/book-appointment" variant="primary" size="sm" withArrow>
              Book Appointment
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/book-appointment"
              className="sm:hidden text-xs bg-[#38BDF8] text-white font-medium px-3.5 py-1.5 rounded-md hover:bg-[#0EA5E9] transition-colors shadow-xs"
            >
              Book
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Mobile Menu"
              className="p-2 rounded-lg text-[#334155] hover:bg-[#F0F9FF] transition-colors focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:hidden fixed inset-x-0 top-[65px] bg-white border-b border-clinic-border shadow-elevated z-40 max-h-[calc(100vh-65px)] overflow-y-auto"
          >
            <div className="px-6 py-6 space-y-4">
              <div className="flex flex-col space-y-2">
                {/* Home */}
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `text-base font-medium py-2 transition-colors ${
                      isActive ? 'text-skyblue font-bold pl-2 border-l-2 border-skyblue' : 'text-navy'
                    }`
                  }
                >
                  Home
                </NavLink>

                {/* About Us */}
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `text-base font-medium py-2 transition-colors ${
                      isActive ? 'text-skyblue font-bold pl-2 border-l-2 border-skyblue' : 'text-navy'
                    }`
                  }
                >
                  About Us
                </NavLink>

                {/* Doctors */}
                <NavLink
                  to="/doctors"
                  className={({ isActive }) =>
                    `text-base font-medium py-2 transition-colors ${
                      isActive ? 'text-skyblue font-bold pl-2 border-l-2 border-skyblue' : 'text-navy'
                    }`
                  }
                >
                  Doctors
                </NavLink>

                {/* Services Collapsible on Mobile */}
                <div>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between py-2 text-base font-medium text-navy focus:outline-none"
                  >
                    <span>Services</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileServicesOpen ? 'rotate-180 text-skyblue' : 'text-gray-400'
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-3 py-1 space-y-1.5 border-l-2 border-clinic-border ml-2"
                      >
                        {servicesItems.map((s) => (
                          <Link
                            key={s.to}
                            to={s.to}
                            className="block text-xs py-1.5 text-clinic-muted hover:text-skyblue transition-colors font-medium"
                          >
                            {s.label}
                          </Link>
                        ))}
                        <Link
                          to="/services"
                          className="block text-xs py-1.5 text-skyblue font-bold"
                        >
                          View All Services →
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* More Collapsible on Mobile */}
                <div>
                  <button
                    onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                    className="w-full flex items-center justify-between py-2 text-base font-medium text-navy focus:outline-none"
                  >
                    <span>More</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileMoreOpen ? 'rotate-180 text-skyblue' : 'text-gray-400'
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileMoreOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-3 py-1 space-y-1.5 border-l-2 border-clinic-border ml-2"
                      >
                        {moreItems.map((m) => (
                          <Link
                            key={m.to}
                            to={m.to}
                            className="block text-xs py-1.5 text-clinic-muted hover:text-skyblue transition-colors font-medium"
                          >
                            {m.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Contact */}
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `text-base font-medium py-2 transition-colors ${
                      isActive ? 'text-skyblue font-bold pl-2 border-l-2 border-skyblue' : 'text-navy'
                    }`
                  }
                >
                  Contact
                </NavLink>
              </div>

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-clinic-border space-y-3">
                <Button to="/book-appointment" variant="primary" className="w-full" size="md">
                  Book an Appointment
                </Button>
                <a
                  href={`tel:${clinicConfig.phone}`}
                  className="flex items-center justify-center gap-2 py-2.5 text-xs text-navy font-medium rounded-brand bg-clinic-bg border border-clinic-border hover:bg-skyblue-light transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-skyblue" />
                  Call Clinic: {clinicConfig.phoneDisplay}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
