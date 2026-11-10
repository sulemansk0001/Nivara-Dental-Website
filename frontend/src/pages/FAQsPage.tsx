import React, { useState } from 'react';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { AppointmentCTA } from '../components/home/AppointmentCTA';
import { FAQSection, defaultFAQs, FAQItem } from '../components/home/FAQSection';
import { Search } from 'lucide-react';

export const FAQsPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const extendedFAQs: FAQItem[] = [
    ...defaultFAQs,
    {
      question: "Do you offer emergency dental appointments?",
      answer: "Yes, we prioritize acute dental emergencies, including severe toothaches, avulsed (knocked-out) teeth, traumatic fractures, and uncontrollable gum bleeding during operating hours."
    },
    {
      question: "What sterilization protocols do you follow?",
      answer: "We adhere to international CDC and NABH sterilization standards utilizing Class-B vacuum autoclaves, biological spore indicators, sealed sterile pouches opened directly in front of the patient, and medical-grade surface disinfection between every appointment."
    },
    {
      question: "Can I pay with credit cards, UPI, or EMI?",
      answer: "Yes, we accept all major debit cards, credit cards, Google Pay, PhonePe, Paytm, and offer zero-cost 0% EMI financing options for comprehensive treatments such as dental implants and clear aligners."
    },
    {
      question: "What is the difference between silver fillings and composite fillings?",
      answer: "Composite fillings are biocompatible resin materials shaded to match your exact natural enamel, requiring less tooth structure removal. Silver amalgam fillings contain mercury alloys, cause dark tooth discoloration, and are no longer our material of choice."
    }
  ];

  const filtered = extendedFAQs.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHero
        badge="Got Questions?"
        title="Frequently Asked"
        highlightedText="Dental Questions."
        description="Find clear, trustworthy answers regarding dental procedures, consultation fees, pain management, children's dentistry, and clinic hygiene protocols."
        breadcrumbs={[{ label: 'FAQs' }]}
      />

      <section className="py-12 bg-white border-b border-[#D6EAF7]">
        <div className="max-w-xl mx-auto px-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#64748B] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by keyword (e.g. pain, cost, children, implants)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-xs bg-[#F0F9FF] border border-[#D6EAF7] rounded-full focus:outline-none focus:ring-2 focus:ring-[#38BDF8] text-[#252525] placeholder:text-[#94A3B8] shadow-subtle"
            />
          </div>
        </div>
      </section>

      <FAQSection items={filtered} />

      <AppointmentCTA />
    </div>
  );
};
