import React from 'react';
import { PageHero } from '../components/common/PageHero';
import { clinicConfig } from '../config/clinic';

export const TermsPage: React.FC = () => {
  return (
    <div>
      <PageHero
        badge="Terms of Service"
        title="Terms and Conditions of"
        highlightedText="Service."
        description="Please read the clinic terms governing appointments, consultations, cancellations, and treatment estimates."
        breadcrumbs={[{ label: 'Terms & Conditions' }]}
      />

      <section className="py-16 md:py-24 bg-white border-b border-clinic-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-clinic-muted leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">1. Medical & Clinical Disclaimer</h2>
            <p>
              Information published on this website, including articles, FAQs, service descriptions, and pricing tables, is intended exclusively for general educational and informational purposes. It does not replace professional in-person physical clinical examination, dental radiography, or diagnosis by a registered dental surgeon.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">2. Appointment Scheduling & Confirmation</h2>
            <p>
              Submitting an online appointment booking on this website constitutes a scheduling request. An appointment is officially confirmed only when our front-desk coordinator contacts the patient via phone, SMS, or WhatsApp and verifies clinical availability.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">3. Cancellation & Rescheduling Policy</h2>
            <p>
              We appreciate punctuality as our specialists allocate dedicated chairside operatory time per patient. If you must reschedule or cancel your visit, please provide at least 4 hours advance notice so that your slot can be reassigned to emergency walk-in patients.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">4. Treatment Estimates & Variations</h2>
            <p>
              All prices shown online (such as basic care starting at ₹999) are indicative starting estimates. Complex clinical scenarios requiring bone grafting, sinus lifts, multiple root canal canals, or specialized ceramic restorations will be quoted after direct clinical evaluation.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">5. Governing Law & Jurisdiction</h2>
            <p>
              These terms are governed by the laws of India. Any legal disputes arising out of clinical services or web portal usage are subject to the exclusive jurisdiction of the competent courts in Pune, Maharashtra.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};
