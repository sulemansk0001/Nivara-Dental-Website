import React, { useState } from 'react';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { clinicConfig } from '../config/clinic';
import { api } from '../services/api';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Send
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    requestedService: 'General Dentistry',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM – 1:00 PM)',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const servicesList = [
    'General Dentistry & Checkup',
    'Cosmetic Dentistry & Veneers',
    'Dental Implants',
    'Root Canal Treatment',
    'Orthodontics & Clear Aligners',
    'Pediatric Dentistry',
    'Teeth Whitening',
    'Dental Cleaning & Polishing',
    'Other Enquiry'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!formData.patientName || formData.patientName.trim().length < 2) {
      setErrorMsg('Please enter your full name (minimum 2 characters).');
      return;
    }

    const cleanPhone = formData.phone.replace(/[\s\-\(\)]/g, '');
    if (!/^(\+91|91|0)?[6-9]\d{9}$/.test(cleanPhone)) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!formData.message || formData.message.trim().length < 5) {
      setErrorMsg('Please write a short message or clinical question.');
      return;
    }

    setLoading(true);
    try {
      const result = await api.createEnquiry(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(result.message || 'Error sending enquiry.');
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error sending enquiry');
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/${clinicConfig.whatsappNumber}?text=${encodeURIComponent(
    clinicConfig.whatsappMessage
  )}`;

  return (
    <div>
      <PageHero
        badge="Get In Touch"
        title="We’re Here to Help"
        highlightedText="Your Smile."
        description="Have a question or looking to schedule a consultation? Contact our friendly dental team in Pune. We are happy to assist."
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <section className="py-16 md:py-24 bg-[#F0F9FF] border-b border-[#D6EAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
            
            {/* Left Column: Contact Info & Map (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#0284C7] uppercase tracking-wider bg-white border border-[#BAE6FD] px-3 py-1 rounded-full shadow-xs">
                  Clinic Information
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  Visit Nivara Dental Studio
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Located centrally in Pune, easily accessible from Pune Airport, Kalyani Nagar, Viman Nagar, and across the city.
                </p>
              </div>

              {/* Contact Details List */}
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-brand border border-[#D6EAF7] shadow-subtle hover:border-[#38BDF8] transition-all flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-[#252525]">Clinic Address</div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {clinicConfig.address.full}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-brand border border-[#D6EAF7] shadow-subtle hover:border-[#38BDF8] transition-all flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-[#252525]">Direct Telephone</div>
                    <a
                      href={`tel:${clinicConfig.phone}`}
                      className="text-xs font-semibold text-[#252525] hover:text-[#0284C7] transition-colors block"
                    >
                      {clinicConfig.phoneDisplay}
                    </a>
                    <span className="text-[11px] text-[#64748B]">Line open during operating hours</span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-brand border border-[#D6EAF7] shadow-subtle hover:border-[#38BDF8] transition-all flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-[#252525]">Email Support</div>
                    <a
                      href={`mailto:${clinicConfig.email}`}
                      className="text-xs font-semibold text-[#252525] hover:text-[#0284C7] transition-colors block"
                    >
                      {clinicConfig.email}
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-brand border border-[#D6EAF7] shadow-subtle hover:border-[#38BDF8] transition-all flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-[#252525]">Consultation Hours</div>
                    <div className="text-xs text-[#334155] font-medium">{clinicConfig.businessHours.weekday}</div>
                    <div className="text-[11px] text-[#0284C7] font-medium">{clinicConfig.businessHours.sunday}</div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Callout */}
              <div className="p-5 bg-white border border-[#25D366]/40 shadow-subtle rounded-brand flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-[#25D366] flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#252525]">Instant WhatsApp Support</div>
                    <div className="text-[11px] text-[#64748B]">Chat with our clinic coordinator</div>
                  </div>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#25D366] text-white rounded-md text-xs font-bold hover:bg-[#20ba59] transition-colors shadow-xs"
                >
                  Chat Now
                </a>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-card overflow-hidden border border-[#D6EAF7] shadow-subtle relative h-60 bg-gray-100">
                <iframe
                  title="Nivara Dental Studio Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04362706399!2d73.792928!3d18.524616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

            </div>

            {/* Right Column: Contact & Enquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-card bg-white border border-[#D6EAF7] shadow-elevated">
                
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-navy">
                      Enquiry Received!
                    </h3>
                    <p className="text-xs sm:text-sm text-clinic-muted max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Nivara Dental Studio. Our patient care coordinator will review your request and get in touch with you at <strong className="text-navy">{formData.phone}</strong> shortly.
                    </p>
                    <div className="pt-4">
                      <Button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            patientName: '',
                            phone: '',
                            email: '',
                            requestedService: 'General Dentistry',
                            preferredDate: '',
                            preferredTime: 'Morning (10:00 AM – 1:00 PM)',
                            message: '',
                          });
                        }}
                        variant="outline"
                      >
                        Send Another Enquiry
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="font-heading text-2xl font-extrabold text-navy">
                        Send a Direct Enquiry
                      </h3>
                      <p className="text-xs sm:text-sm text-clinic-muted mt-1">
                        Fill out the form below and our dental team will respond within 24 business hours.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-brand text-xs text-red-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#252525] block">
                          Full Name <span className="text-[#0284C7]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Aditya Deshpande"
                          value={formData.patientName}
                          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-brand border border-[#D6EAF7] bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] text-[#252525]"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#252525] block">
                          Mobile Number <span className="text-[#0284C7]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-brand border border-[#D6EAF7] bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] text-[#252525]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#252525] block">
                          Email Address <span className="text-[#0284C7]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-brand border border-[#D6EAF7] bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] text-[#252525]"
                        />
                      </div>

                      {/* Service Required */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#252525] block">
                          Service Required
                        </label>
                        <select
                          value={formData.requestedService}
                          onChange={(e) => setFormData({ ...formData, requestedService: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-brand border border-[#D6EAF7] bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] text-[#252525]"
                        >
                          {servicesList.map((srv, idx) => (
                            <option key={idx} value={srv}>{srv}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Preferred Date */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#252525] block">
                          Preferred Appointment Date
                        </label>
                        <input
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-brand border border-[#D6EAF7] bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] text-[#252525]"
                        />
                      </div>

                      {/* Preferred Time */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#252525] block">
                          Preferred Time Window
                        </label>
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-brand border border-[#D6EAF7] bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] text-[#252525]"
                        >
                          <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                          <option value="Afternoon (4:00 PM – 6:00 PM)">Afternoon (4:00 PM – 6:00 PM)</option>
                          <option value="Evening (6:00 PM – 8:00 PM)">Evening (6:00 PM – 8:00 PM)</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#252525] block">
                        Message / Clinical Symptoms <span className="text-[#0284C7]">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Please describe any symptoms, preferred doctors, or questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-brand border border-[#D6EAF7] bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] text-[#252525] resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      size="md"
                      isLoading={loading}
                    >
                      Submit Enquiry
                    </Button>

                    <p className="text-[11px] text-clinic-muted text-center">
                      We protect your contact confidentiality. No spam or third-party sharing.
                    </p>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
