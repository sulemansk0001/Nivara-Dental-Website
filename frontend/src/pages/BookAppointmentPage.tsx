import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { api } from '../services/api';
import { clinicConfig } from '../config/clinic';
import { AppointmentFormData, Doctor } from '../types';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Stethoscope,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Sparkles
} from 'lucide-react';

export const BookAppointmentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preSelectedService = searchParams.get('service') || searchParams.get('package') || '';
  const preSelectedDoctor = searchParams.get('doctor') || '';

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [formData, setFormData] = useState<AppointmentFormData>({
    patientName: '',
    phone: '',
    email: '',
    doctor: preSelectedDoctor || 'Any Available Specialist',
    treatment: preSelectedService ? decodeURIComponent(preSelectedService) : 'General Dentistry',
    appointmentDate: '',
    appointmentTime: '11:00 AM',
    additionalNotes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<{
    id: string;
    patientName: string;
    doctor: string;
    treatment: string;
    appointmentDate: string;
    appointmentTime: string;
  } | null>(null);

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getDoctors().then((docs) => setDoctors(docs));
  }, []);

  const timeSlots = [
    '10:00 AM',
    '10:45 AM',
    '11:30 AM',
    '12:15 PM',
    '04:00 PM',
    '04:45 PM',
    '05:30 PM',
    '06:15 PM',
    '07:00 PM',
    '07:30 PM',
  ];

  const treatments = [
    'General Dentistry & Checkup',
    'Cosmetic Dentistry & Veneers',
    'Dental Implants',
    'Root Canal Treatment',
    'Orthodontics & Clear Aligners',
    'Pediatric Dentistry',
    'Teeth Whitening',
    'Dental Cleaning & Polishing',
  ];

  // Minimum date is today
  const todayStr = new Date().toISOString().split('T')[0];

  const handleBooking = async (e: React.FormEvent) => {
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

    if (!formData.appointmentDate) {
      setErrorMsg('Please select your preferred appointment date.');
      return;
    }

    if (!formData.appointmentTime) {
      setErrorMsg('Please select a preferred appointment time slot.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.createAppointment(formData);
      if (response.success && response.appointment) {
        setSubmittedBooking({
          id: response.appointment.id,
          patientName: formData.patientName,
          doctor: formData.doctor,
          treatment: formData.treatment,
          appointmentDate: formData.appointmentDate,
          appointmentTime: formData.appointmentTime,
        });
      } else {
        setErrorMsg(response.message || 'Unable to schedule appointment. Please try again.');
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error booking appointment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHero
        badge="Instant Online Scheduling"
        title="Schedule Your Dental Consultation with"
        highlightedText="Confidence."
        description="Book your visit at Nivara Dental Studio in Pune. Dedicated 1-on-1 consultations with MDS specialists, digital imaging, and sterile care."
        breadcrumbs={[{ label: 'Book Appointment' }]}
      />

      <section className="py-16 md:py-24 bg-[#F0F9FF] border-b border-[#D6EAF7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {submittedBooking ? (
            /* Confirmation Screen */
            <div className="p-8 sm:p-14 bg-white rounded-section border border-[#D6EAF7] shadow-elevated text-center space-y-6 max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#0284C7] uppercase tracking-wider bg-[#F0F9FF] border border-[#BAE6FD] px-3 py-1 rounded-full shadow-xs">
                  Request Registered
                </span>
                <h2 className="font-heading text-3xl font-extrabold text-[#252525] mt-3">
                  Appointment Request Submitted!
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] mt-2">
                  Booking Reference ID: <strong className="text-[#252525]">{submittedBooking.id}</strong>
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-6 bg-[#F0F9FF] rounded-card border border-[#D6EAF7] text-left space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between pb-2 border-b border-[#D6EAF7]">
                  <span className="text-[#64748B]">Patient Name:</span>
                  <span className="font-bold text-[#252525]">{submittedBooking.patientName}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#D6EAF7]">
                  <span className="text-[#64748B]">Specialist:</span>
                  <span className="font-bold text-[#252525]">{submittedBooking.doctor}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#D6EAF7]">
                  <span className="text-[#64748B]">Treatment:</span>
                  <span className="font-bold text-[#0284C7]">{submittedBooking.treatment}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#D6EAF7]">
                  <span className="text-[#64748B]">Preferred Date:</span>
                  <span className="font-bold text-[#252525]">{submittedBooking.appointmentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Time Slot:</span>
                  <span className="font-bold text-[#252525]">{submittedBooking.appointmentTime}</span>
                </div>
              </div>

              <div className="p-4 bg-[#F0F9FF] border border-[#BAE6FD] rounded-brand text-xs text-[#252525] leading-relaxed text-left flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#0284C7] flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Please Note:</strong> Your appointment request is currently marked as <span className="text-[#0284C7] font-bold uppercase">Pending</span>. Our clinic desk will contact you via phone or WhatsApp shortly to verify clinical details and confirm your slot.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-4">
                <Button to="/" variant="secondary">
                  Return to Home
                </Button>
                <Button
                  onClick={() => {
                    setSubmittedBooking(null);
                    setFormData({
                      patientName: '',
                      phone: '',
                      email: '',
                      doctor: 'Any Available Specialist',
                      treatment: 'General Dentistry',
                      appointmentDate: '',
                      appointmentTime: '11:00 AM',
                      additionalNotes: '',
                    });
                  }}
                  variant="outline"
                >
                  Book Another Appointment
                </Button>
              </div>
            </div>
          ) : (
            /* Booking Form Card */
            <div className="bg-white rounded-section p-8 sm:p-12 border border-[#D6EAF7] shadow-elevated">
              
              <div className="max-w-2xl mb-8 space-y-2">
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#252525]">
                  Dental Appointment Registration
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Please complete the form below. Our reception team will reserve your time slot and send a confirmation message.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-brand text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleBooking} className="space-y-6">
                
                {/* 1. Patient Contact Info */}
                <div className="space-y-4">
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#252525] flex items-center gap-2 pb-2 border-b border-[#D6EAF7]">
                    <User className="w-4 h-4 text-[#0284C7]" />
                    <span>1. Patient Information</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#252525] block">
                        Patient Full Name <span className="text-[#0284C7]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Patil"
                        value={formData.patientName}
                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-brand border border-[#D6EAF7] bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] text-[#252525]"
                      />
                    </div>

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

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#252525] block">
                        Email Address <span className="text-[#0284C7]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-brand border border-[#D6EAF7] bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] text-[#252525]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Doctor & Treatment Preference */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#252525] flex items-center gap-2 pb-2 border-b border-[#D6EAF7]">
                    <Stethoscope className="w-4 h-4 text-[#0284C7]" />
                    <span>2. Doctor & Treatment Details</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#252525] block">
                        Preferred Dental Specialist
                      </label>
                      <select
                        value={formData.doctor}
                        onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-brand border border-[#D6EAF7] bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] text-[#252525]"
                      >
                        <option value="Any Available Specialist">Any Available Specialist</option>
                        {doctors.map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name} ({d.specialisation})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#252525] block">
                        Required Treatment <span className="text-[#0284C7]">*</span>
                      </label>
                      <select
                        value={formData.treatment}
                        onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-brand border border-[#D6EAF7] bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] text-[#252525]"
                      >
                        {treatments.map((t, idx) => (
                          <option key={idx} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Date & Time Selection */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#252525] flex items-center gap-2 pb-2 border-b border-[#D6EAF7]">
                    <Calendar className="w-4 h-4 text-[#0284C7]" />
                    <span>3. Appointment Date & Time Slot</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#252525] block">
                        Preferred Date <span className="text-[#0284C7]">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        min={todayStr}
                        value={formData.appointmentDate}
                        onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-brand border border-[#D6EAF7] bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] text-[#252525]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#252525] block">
                        Time Slot Selection <span className="text-[#0284C7]">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {timeSlots.map((slot) => {
                          const isSelected = formData.appointmentTime === slot;
                          return (
                            <button
                              type="button"
                              key={slot}
                              onClick={() => setFormData({ ...formData, appointmentTime: slot })}
                              className={`py-2 px-2 text-xs font-medium rounded-brand border transition-all text-center select-none ${
                                isSelected
                                  ? 'bg-[#38BDF8] text-white border-[#38BDF8] font-bold shadow-sm'
                                  : 'bg-white text-[#252525] border-[#D6EAF7] hover:border-[#38BDF8]'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Additional Symptoms / Notes */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-[#252525] block">
                    Additional Notes or Chief Symptoms (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Sensitivity to cold water, previous root canal history, dental anxiety..."
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-brand border border-[#D6EAF7] bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] text-[#252525] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    size="lg"
                    isLoading={loading}
                    withArrow
                  >
                    Confirm & Schedule Appointment
                  </Button>
                </div>

                {/* Assurance */}
                <div className="pt-2 flex items-center justify-center gap-6 text-[11px] text-clinic-muted">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-skyblue" /> Confidential Data
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-skyblue" /> No Waiting Time
                  </span>
                  <span className="flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5 text-skyblue" /> Instant SMS / Email Receipt
                  </span>
                </div>

              </form>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};
