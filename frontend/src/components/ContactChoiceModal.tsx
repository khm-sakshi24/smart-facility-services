"use client";

import React, { useEffect } from "react";
import { useContactModal } from "./ContactModalContext";
import { businessInfo, getPhoneLink, getWhatsAppLink } from "@/config/businessInfo";
import {
  Phone,
  MessageCircle,
  X,
  ShieldCheck,
  User,
  Clock,
  ArrowRight,
  Headphones,
} from "lucide-react";

export const ContactChoiceModal: React.FC = () => {
  const { isOpen, mode, serviceName, prefilledMessage, closeModal } = useContactModal();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const isCall = mode === "call";

  // Build tailored WhatsApp message
  const defaultMsg = serviceName
    ? `Hello Smart Facility Services, I would like to inquire about ${serviceName}.`
    : "Hello Smart Facility Services, I would like to know more about your facility services.";
  const activeMsg = prefilledMessage || defaultMsg;

  // Contact line 1: Primary
  const primaryPhone = businessInfo.primaryPhone;
  const primaryDisplay = businessInfo.primaryPhoneDisplay;
  const primaryActionHref = isCall
    ? getPhoneLink(primaryPhone)
    : getWhatsAppLink(activeMsg, businessInfo.whatsappNumber);

  // Contact line 2: Gowda
  const secondaryPhone = businessInfo.secondaryPhone;
  const secondaryDisplay = businessInfo.secondaryPhoneDisplay;
  const secondaryName = businessInfo.secondaryContactName;
  const secondaryActionHref = isCall
    ? getPhoneLink(secondaryPhone)
    : getWhatsAppLink(activeMsg, secondaryPhone);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden transform transition-all duration-200 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="relative bg-gradient-to-r from-forest-950 via-forest-900 to-emerald-950 text-white p-5 sm:p-6 pb-6">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
              {isCall ? (
                <Phone className="w-6 h-6 text-emerald-300 animate-pulse" />
              ) : (
                <MessageCircle className="w-6 h-6 text-emerald-300" />
              )}
            </div>
            <div className="pr-8">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30 inline-block mb-1">
                Direct Contact Lines
              </span>
              <h2 id="contact-modal-title" className="text-xl sm:text-2xl font-black text-white leading-tight">
                {isCall ? "Select a Helpline to Call" : "Connect on WhatsApp"}
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-emerald-100/90 mt-2.5 leading-relaxed">
            {serviceName ? (
              <>
                Inquiring about <strong className="text-white">{serviceName}</strong>. Choose which line you would like to reach:
              </>
            ) : (
              "Both phone lines connect directly with our active facility operations team in Bengaluru."
            )}
          </p>
        </div>

        {/* Both Contact Options */}
        <div className="p-4 sm:p-6 space-y-3.5 bg-slate-50/50 max-h-[75vh] overflow-y-auto">
          {/* Option 1: Primary Central Helpline */}
          <a
            href={primaryActionHref}
            target={isCall ? undefined : "_blank"}
            rel={isCall ? undefined : "noopener noreferrer"}
            className="block p-4 sm:p-5 rounded-2xl bg-white border-2 border-emerald-200/80 hover:border-emerald-600 shadow-xs hover:shadow-md active:scale-98 transition-all group cursor-pointer"
            onClick={closeModal}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center shrink-0 text-forest-800 group-hover:bg-forest-800 group-hover:text-emerald-300 transition-colors">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-xs font-bold text-gray-900 group-hover:text-forest-900 transition-colors">
                      Central Operations Helpline
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Primary Line
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl font-extrabold text-forest-950 group-hover:text-emerald-700 transition-colors">
                    {primaryDisplay}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    <span>24/7 Rapid Response, Billing &amp; General Inquiries</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-forest-800 flex items-center gap-1.5">
                {isCall ? (
                  <>
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Click to Call Primary</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Click to WhatsApp Main Office</span>
                  </>
                )}
              </span>
              <span className="w-7 h-7 rounded-full bg-forest-800 group-hover:bg-emerald-600 text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </a>

          {/* Option 2: Gowda (Operations & Site Lead) */}
          <a
            href={secondaryActionHref}
            target={isCall ? undefined : "_blank"}
            rel={isCall ? undefined : "noopener noreferrer"}
            className="block p-4 sm:p-5 rounded-2xl bg-white border-2 border-emerald-200/80 hover:border-emerald-600 shadow-xs hover:shadow-md active:scale-98 transition-all group cursor-pointer"
            onClick={closeModal}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-xs font-bold text-gray-900 group-hover:text-forest-900 transition-colors">
                      {secondaryName}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-forest-100 text-forest-900 border border-forest-300">
                      Operations &amp; Site Lead
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl font-extrabold text-forest-950 group-hover:text-emerald-700 transition-colors">
                    {secondaryDisplay}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Direct Technical Oversight, Site Visits &amp; Supervisor Coordination</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-forest-800 flex items-center gap-1.5">
                {isCall ? (
                  <>
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Click to Call Gowda</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Click to WhatsApp Gowda</span>
                  </>
                )}
              </span>
              <span className="w-7 h-7 rounded-full bg-forest-800 group-hover:bg-emerald-600 text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </a>
        </div>

        {/* Footer info badge */}
        <div className="p-3 bg-gray-100/80 border-t border-gray-200 text-center">
          <p className="text-[11px] text-gray-600 font-medium">
            Smart Facility Services • Serving Hoodi, Whitefield, Mahadevapura &amp; Bengaluru
          </p>
        </div>
      </div>
    </div>
  );
};
