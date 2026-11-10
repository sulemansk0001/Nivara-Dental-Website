import React, { useEffect, useState } from 'react';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { AppointmentCTA } from '../components/home/AppointmentCTA';
import { api } from '../services/api';
import { Doctor } from '../types';
import {
  Award,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Languages,
  Clock,
  Sparkles
} from 'lucide-react';

export const DoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getDoctors().then((docs) => {
      setDoctors(docs);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <PageHero
        badge="Our Experienced Dental Team"
        title="Meet Our Specialized"
        highlightedText="Dental Surgeons."
        description="Our clinical team comprises post-graduate MDS dental specialists, certified implantologists, and accredited clear aligner providers dedicated to gentle, predictable patient outcomes."
        breadcrumbs={[{ label: 'Our Doctors' }]}
        ctaButton={
          <Button to="/book-appointment" variant="primary" withArrow>
            Book With a Specialist
          </Button>
        }
      />

      <section className="py-16 md:py-24 bg-[#F0F9FF] border-b border-[#D6EAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {doctors.map((doc, idx) => (
            <div
              key={doc.id}
              id={doc.id}
              className={`rounded-section p-6 sm:p-10 border border-[#D6EAF7] bg-white shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center hover:border-[#38BDF8] transition-all duration-300 ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Doctor Photo (4 cols) */}
              <div className="lg:col-span-4">
                <div className="relative rounded-card overflow-hidden shadow-subtle border border-[#D6EAF7] bg-white group">
                  <img
                    src={doc.profileImage}
                    alt={doc.name}
                    className="w-full h-[380px] sm:h-[420px] object-cover object-top transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-[#252525] text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-white/60">
                    <Award className="w-3.5 h-3.5 text-skyblue" />
                    <span>{doc.experience}</span>
                  </div>
                  {doc.regNo && (
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold text-navy shadow-sm">
                      Reg. No: {doc.regNo}
                    </div>
                  )}
                </div>
              </div>

              {/* Doctor Details (8 cols) */}
              <div className="lg:col-span-8 space-y-5">
                <div>
                  <span className="text-xs font-bold text-[#0284C7] uppercase tracking-wider bg-[#F0F9FF] border border-[#BAE6FD] px-3 py-1 rounded-full">
                    {doc.specialisation}
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#252525] mt-3 flex items-center gap-2">
                    {doc.name}
                    <CheckCircle2 className="w-6 h-6 text-[#38BDF8]" />
                  </h2>
                  <p className="text-sm font-semibold text-[#64748B] mt-1">
                    {doc.qualification}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  {doc.description}
                </p>

                {/* Academic Qualifications & Highlights */}
                {doc.education && doc.education.length > 0 && (
                  <div className="pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#252525] flex items-center gap-1.5 mb-2">
                      <GraduationCap className="w-4 h-4 text-[#0284C7]" />
                      <span>Education & Clinical Fellowships</span>
                    </h3>
                    <ul className="space-y-1.5 text-xs text-[#64748B]">
                      {doc.education.map((edu, eIdx) => (
                        <li key={eIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                          <span>{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Practical Details: Days, Languages, Fee */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#D6EAF7]">
                  <div className="p-3 bg-[#F0F9FF] rounded-brand border border-[#D6EAF7]">
                    <div className="text-[10px] uppercase font-bold text-[#64748B] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0284C7]" /> Days Available
                    </div>
                    <div className="text-xs font-bold text-[#252525] mt-1">
                      {doc.daysAvailable.join(', ')}
                    </div>
                  </div>

                  <div className="p-3 bg-[#F0F9FF] rounded-brand border border-[#D6EAF7]">
                    <div className="text-[10px] uppercase font-bold text-[#64748B] flex items-center gap-1">
                      <Languages className="w-3.5 h-3.5 text-[#0284C7]" /> Languages
                    </div>
                    <div className="text-xs font-bold text-[#252525] mt-1">
                      {doc.languages ? doc.languages.join(', ') : 'English, Hindi, Marathi'}
                    </div>
                  </div>

                  <div className="p-3 bg-[#F0F9FF] rounded-brand border border-[#D6EAF7]">
                    <div className="text-[10px] uppercase font-bold text-[#64748B] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" /> Consultation
                    </div>
                    <div className="text-xs font-bold text-[#0284C7] mt-1">
                      Starting at {doc.consultationFee}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <Button
                    to={`/book-appointment?doctor=${encodeURIComponent(doc.name)}`}
                    variant="primary"
                    withArrow
                  >
                    Book Consultation with {doc.name.split(' ')[1]}
                  </Button>
                  <Button
                    to={`/contact?doctor=${encodeURIComponent(doc.name)}`}
                    variant="outline"
                  >
                    Leave an Enquiry
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AppointmentCTA />
    </div>
  );
};
