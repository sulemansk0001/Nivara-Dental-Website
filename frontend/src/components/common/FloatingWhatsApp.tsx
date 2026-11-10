import React from 'react';
import { clinicConfig } from '../../config/clinic';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/${clinicConfig.whatsappNumber}?text=${encodeURIComponent(
    clinicConfig.whatsappMessage
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-2.5 bg-[#25D366] text-white rounded-full shadow-premium hover:shadow-elevated hover:bg-[#20ba59] transition-all duration-200 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="text-xs font-semibold tracking-wide hidden sm:inline">
        Chat on WhatsApp
      </span>
    </a>
  );
};
