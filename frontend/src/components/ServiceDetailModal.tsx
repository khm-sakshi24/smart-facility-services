"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ServiceDetail } from "@/config/servicesData";
import { getPhoneLink, getWhatsAppLink, businessInfo } from "@/config/businessInfo";
import { X, CheckCircle, Phone, MessageCircle, ArrowRight, ShieldAlert, Layers } from "lucide-react";

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (service) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-service-title"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-6 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Close service modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-8">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {service.category}
            </span>
            {service.status === "active" ? (
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Active Service
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                Proposed Catalogue
              </span>
            )}
          </div>
          <h3 id="modal-service-title" className="text-2xl font-extrabold text-forest-950">
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 leading-relaxed">
          {service.fullDescription}
        </p>

        {service.complianceNotes && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>{service.complianceNotes}</span>
          </div>
        )}

        {/* Typical Applications */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-forest-800" />
            <span>Typical Applications</span>
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
            {service.typicalUseCases.map((uc, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{uc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scope of Work */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Scope of Work Overview
          </h4>
          <ul className="space-y-1.5 text-xs text-gray-600">
            {service.scopeOfWork.map((scope, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-bold text-emerald-700">•</span>
                <span>{scope}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Direct Contact CTAs in Modal */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-500 text-center sm:text-left">
            Contact <strong>{businessInfo.contactPerson}</strong>: {businessInfo.primaryPhoneDisplay}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={getPhoneLink()}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs shadow transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>
            <a
              href={getWhatsAppLink(`Hello Smart Facility Services, I would like to inquire about ${service.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
