"use client";

import React from "react";
import { businessInfo, getPhoneLink, getWhatsAppLink, getEmailLink } from "@/config/businessInfo";
import { Phone, MessageCircle, Mail } from "lucide-react";

export const StickyMobileContactBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-200/80 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] md:hidden py-2.5 px-4 safe-area-pb">
      <div className="grid grid-cols-3 gap-2">
        {/* Call Now */}
        <a
          href={getPhoneLink()}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-forest-800 text-white font-semibold text-xs shadow-xs active:scale-95 transition-all"
          aria-label={`Call Smart Facility Services at ${businessInfo.primaryPhoneDisplay}`}
        >
          <Phone className="w-4 h-4 mb-0.5 text-emerald-300" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp */}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-xs active:scale-95 transition-all"
          aria-label="Chat with Smart Facility Services on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 mb-0.5 text-white" />
          <span>WhatsApp</span>
        </a>

        {/* Email */}
        <a
          href={getEmailLink()}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-slate-100 text-forest-950 border border-slate-300 font-semibold text-xs active:scale-95 transition-all"
          aria-label={`Send email to ${businessInfo.email}`}
        >
          <Mail className="w-4 h-4 mb-0.5 text-forest-800" />
          <span>Email Us</span>
        </a>
      </div>
    </div>
  );
};
