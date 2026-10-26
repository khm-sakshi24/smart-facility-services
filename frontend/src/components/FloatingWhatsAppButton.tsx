"use client";

import React from "react";
import { getWhatsAppLink } from "@/config/businessInfo";
import { MessageCircle } from "lucide-react";

export const FloatingWhatsAppButton: React.FC = () => {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-16 sm:bottom-6 left-3 sm:left-6 z-40 p-2.5 sm:p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white focus:outline-none focus:ring-4 focus:ring-emerald-300 group"
      aria-label="Contact Smart Facility Services on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pl-2 hidden sm:inline">
        WhatsApp Us
      </span>
    </a>
  );
};
