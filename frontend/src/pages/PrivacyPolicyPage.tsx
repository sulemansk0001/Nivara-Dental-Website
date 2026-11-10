import React from 'react';
import { PageHero } from '../components/common/PageHero';
import { clinicConfig } from '../config/clinic';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div>
      <PageHero
        badge="Legal & Compliance"
        title="Privacy Policy & Patient"
        highlightedText="Data Protection."
        description="How Nivara Dental Studio collects, protects, and handles your digital contact information and clinical consultation data."
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <section className="py-16 md:py-24 bg-white border-b border-clinic-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-clinic-muted leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">1. Introduction</h2>
            <p>
              At Nivara Dental Studio ("we", "our", or "the Clinic"), operating in Pune, Maharashtra, we respect your personal privacy and are committed to maintaining the confidentiality of your personal, medical, and contact information.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">2. Information We Collect</h2>
            <p>
              When you use our website or schedule an appointment online, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Patient contact information: Full Name, Phone Number, and Email Address.</li>
              <li>Appointment preferences: Requested doctor, treatment category, preferred dates and times.</li>
              <li>Clinical notes: Symptoms or remarks submitted willingly via our enquiry and booking forms.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">3. How Your Information is Used</h2>
            <p>
              Your data is strictly utilized for clinic administration and appointment coordination:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contacting you via telephone or WhatsApp to confirm your scheduled appointment slot.</li>
              <li>Preparing relevant clinical consultation charts before your arrival at our clinic.</li>
              <li>Addressing customer inquiries and treatment pricing guidance.</li>
              <li>We never sell, rent, or distribute patient contact details to commercial advertising brokers.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">4. Data Security</h2>
            <p>
              We implement industry-standard electronic safeguards, restricted administrative access controls, and secure socket layer encryption to protect patient submissions against unauthorized access or tampering.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">5. Contact Our Privacy Officer</h2>
            <p>
              If you have any questions regarding your data or wish to update or delete your enquiry information, please contact:
              <br />
              <strong className="text-navy">{clinicConfig.brandName}</strong>
              <br />
              {clinicConfig.address.full}
              <br />
              Email: {clinicConfig.email} | Phone: {clinicConfig.phoneDisplay}
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};
