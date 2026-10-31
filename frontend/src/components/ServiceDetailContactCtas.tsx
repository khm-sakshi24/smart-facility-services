"use client";

import React from "react";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { businessInfo, getPhoneLink, getWhatsAppLink, getEmailLink } from "@/config/businessInfo";
import { useContactModal } from "./ContactModalContext";

interface Props {
  serviceTitle: string;
  variant?: "hero" | "bottom";
}

export const ServiceDetailContactCtas: React.FC<Props> = ({ serviceTitle, variant = "hero" }) => {
  const { openCallModal, openWhatsAppModal } = useContactModal();

  if (variant === "bottom") {
    return (
      <div className="flex flex-wrap items-center gap-3 shrink-0">
        <a
          href={getPhoneLink()}
          onClick={(e) => {
            e.preventDefault();
            openCallModal(serviceTitle);
          }}
          className="px-5 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-forest-950 font-bold text-xs sm:text-sm shadow flex items-center gap-1.5 transition-colors cursor-pointer"
          title={`Call Smart Facility Services about ${serviceTitle}`}
        >
          <Phone className="w-4 h-4 text-forest-800" />
          <span>Call Now</span>
        </a>
        <a
          href={getWhatsAppLink(`Hello Smart Facility Services, I would like to know more about ${serviceTitle}.`)}
          onClick={(e) => {
            e.preventDefault();
            openWhatsAppModal(`Hello Smart Facility Services, I would like to know more about ${serviceTitle}.`, serviceTitle);
          }}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow flex items-center gap-1.5 transition-colors cursor-pointer"
          title={`Inquire about ${serviceTitle} on WhatsApp`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Us</span>
        </a>
        <a
          href={getEmailLink(`Enquiry about ${serviceTitle}`)}
          className="px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs sm:text-sm border border-emerald-500/40 shadow flex items-center gap-1.5 transition-colors"
          title={`Email Smart Facility Services about ${serviceTitle}`}
        >
          <Mail className="w-4 h-4 text-emerald-300" />
          <span>Email Us</span>
        </a>
      </div>
    );
  }

  return (
    <div className="pt-2 flex flex-wrap items-center gap-3">
      <a
        href={getPhoneLink()}
        onClick={(e) => {
          e.preventDefault();
          openCallModal(serviceTitle);
        }}
        className="px-6 py-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm shadow hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
        title={`Call Smart Facility Services about ${serviceTitle}`}
      >
        <Phone className="w-4 h-4 text-emerald-300" />
        <span>Call Now ({businessInfo.primaryPhoneDisplay})</span>
      </a>

      <a
        href={getWhatsAppLink(`Hello Smart Facility Services, I would like to inquire about ${serviceTitle}.`)}
        onClick={(e) => {
          e.preventDefault();
          openWhatsAppModal(`Hello Smart Facility Services, I would like to inquire about ${serviceTitle}.`, serviceTitle);
        }}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
        title={`Inquire about ${serviceTitle} on WhatsApp`}
      >
        <MessageCircle className="w-4 h-4" />
        <span>Chat on WhatsApp</span>
      </a>

      <a
        href={getEmailLink(`Enquiry about ${serviceTitle}`)}
        className="px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-forest-950 font-bold text-sm border border-gray-200 shadow-2xs hover:border-forest-600 transition-all flex items-center gap-2"
        title={`Email Smart Facility Services about ${serviceTitle}`}
      >
        <Mail className="w-4 h-4 text-forest-700" />
        <span>Email Us</span>
      </a>
    </div>
  );
};
