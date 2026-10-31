"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceDetail } from "@/config/servicesData";
import { getWhatsAppLink, getPhoneLink } from "@/config/businessInfo";
import { ServiceWorkerCharacter } from "@/components/ServiceWorkerCharacter";
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
  Phone,
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
  const [isCardHovered, setIsCardHovered] = useState(false);
  const IconComponent = iconMap[service.iconName] || Settings;

  return (
    <div
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className="bg-white rounded-2xl border border-gray-200/90 hover:border-emerald-500/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
    >
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
          <Link
            href={`/services/${service.slug}`}
            className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800 shrink-0 group-hover:scale-105 group-hover:bg-forest-800 group-hover:text-white transition-all duration-300"
            title={`View ${service.title} details`}
          >
            <IconComponent className="w-6 h-6" />
          </Link>
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-forest-900 transition-colors leading-snug">
              <Link
                href={`/services/${service.slug}`}
                className="hover:text-emerald-700 hover:underline transition-colors"
                title={`Learn more about ${service.title}`}
              >
                {service.title}
              </Link>
            </h3>
          </div>
        </div>

        {/* Animated Service Character Showcase (All 13 Professional Disciplines) */}
        <div className="mb-4 pt-1">
          <ServiceWorkerCharacter
            serviceSlug={service.slug}
            isCardHovered={isCardHovered}
          />
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
      <div className="px-5 py-3.5 bg-gray-50/90 border-t border-gray-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link
            href={`/services/${service.slug}`}
            className="text-xs font-bold text-forest-800 hover:text-forest-950 inline-flex items-center gap-1 group/link hover:-translate-y-0.25 transition-transform"
            title={`Explore full scope of ${service.title}`}
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
          {onOpenModal && (
            <button
              onClick={() => onOpenModal(service)}
              className="text-[11px] text-gray-500 hover:text-emerald-700 underline underline-offset-2 hidden sm:inline cursor-pointer"
              title="Quick modal preview"
            >
              (Preview)
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href={getPhoneLink()}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-900 text-white shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all inline-flex items-center gap-1.5"
            title={`Call Smart Facility Services about ${service.title}`}
          >
            <Phone className="w-3.5 h-3.5 text-emerald-300 anim-phone-wiggle" />
            <span>Call</span>
          </a>

          <a
            href={getWhatsAppLink(`Hello Smart Facility Services, I would like to inquire about ${service.title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all inline-flex items-center gap-1.5"
            title={`Inquire about ${service.title} on WhatsApp`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
