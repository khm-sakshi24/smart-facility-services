"use client";

import React from "react";
import { businessInfo, getPhoneLink, getWhatsAppLink } from "@/config/businessInfo";
import { Phone, MessageCircle, AlertCircle, Clock, ShieldAlert } from "lucide-react";

export const UrgentSupportBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-xl relative overflow-hidden">
      {/* Background glow element */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>24/7 Facility Response &amp; Emergency Support</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Facing an Urgent Water Pump, STP, or Power Line Issue?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
            For critical breakdowns in apartments, gated societies, or commercial premises across Hoodi, Garudachar Palya, and Whitefield, call our operations line directly for immediate coordination.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <a
            href={getPhoneLink()}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-forest-950 font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-forest-800" />
            <span>Call 24/7: {businessInfo.primaryPhoneDisplay}</span>
          </a>

          <a
            href={getWhatsAppLink("Hello Smart Facility Services, I have an urgent facility maintenance inquiry for my property.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Emergency WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
