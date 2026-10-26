"use client";

import React from "react";
import Link from "next/link";
import { ServiceDetail } from "@/config/servicesData";
import { getWhatsAppLink } from "@/config/businessInfo";
import {
  Sparkles,
  Zap,
  Wrench,
  Fan,
  Shield,
  Hammer,
  Cpu,
  Droplets,
  Trash2,
  LifeBuoy,
  Layers,
  Settings,
  ArrowRight,
  CheckCircle,
  Clock,
  MessageCircle,
} from "lucide-react";

interface ServiceCardProps {
  service: ServiceDetail;
  onOpenModal?: (service: ServiceDetail) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Zap,
  Wrench,
  Fan,
  Shield,
  Hammer,
  Cpu,
  Droplets,
  Trash2,
  LifeBuoy,
  Layers,
  Settings,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onOpenModal }) => {
  const IconComponent = iconMap[service.iconName] || Settings;

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 hover:border-emerald-500/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden">
      <div className="p-6">
        {/* Top Category and Status Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-forest-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
            {service.category}
          </span>
          {service.status === "active" ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-full">
              <Clock className="w-3 h-3 text-amber-600" />
              Proposed
            </span>
          )}
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-4 mb-3">
          <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800 shrink-0 group-hover:scale-105 group-hover:bg-forest-800 group-hover:text-white transition-all duration-300">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-forest-900 transition-colors leading-snug">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {service.shortDescription}
        </p>

        {/* Scope snippet */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Key Scope:
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            {service.scopeOfWork.slice(0, 2).map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between gap-3">
        {onOpenModal ? (
          <button
            onClick={() => onOpenModal(service)}
            className="text-xs font-semibold text-forest-800 hover:text-forest-950 inline-flex items-center gap-1 group/link cursor-pointer"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </button>
        ) : (
          <Link
            href={`/services/${service.slug}`}
            className="text-xs font-semibold text-forest-800 hover:text-forest-950 inline-flex items-center gap-1 group/link"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        )}

        <a
          href={getWhatsAppLink(`Hello Smart Facility Services, I would like to inquire about ${service.title}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors inline-flex items-center gap-1.5"
          title="Inquire on WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Contact Us</span>
        </a>
      </div>
    </div>
  );
};
