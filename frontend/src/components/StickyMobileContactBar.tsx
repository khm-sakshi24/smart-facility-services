"use client";

import React from "react";
import { businessInfo, getPhoneLink, getWhatsAppLink, getEmailLink } from "@/config/businessInfo";
import { Phone, MessageCircle, Mail } from "lucide-react";

export const StickyMobileContactBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:hidden py-2 px-3 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Now */}
        <a
          href={getPhoneLink()}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs shadow-xs active:scale-95 transition-transform"
          aria-label={`Call Smart Facility Services at ${businessInfo.primaryPhoneDisplay}`}
        >
          <Phone className="w-3.5 h-3.5 text-emerald-300" />
          <span>Call</span>
        </a>

        {/* WhatsApp */}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs active:scale-95 transition-transform"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5 text-white" />
          <span>WhatsApp</span>
        </a>

        {/* Email */}
        <a
          href={getEmailLink()}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-forest-950 border border-slate-300 font-bold text-xs active:scale-95 transition-transform"
          aria-label={`Send email to ${businessInfo.email}`}
        >
          <Mail className="w-3.5 h-3.5 text-forest-800" />
          <span>Email</span>
        </a>
      </div>
    </div>
  );
};
