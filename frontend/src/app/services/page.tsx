"use client";

import React, { useState } from "react";
import { servicesCatalogue, ServiceDetail } from "@/config/servicesData";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceDetailModal } from "@/components/ServiceDetailModal";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StructuredData } from "@/components/StructuredData";
import { businessInfo, getPhoneLink, getWhatsAppLink } from "@/config/businessInfo";
import { Phone, MessageCircle } from "lucide-react";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <StructuredData
        type="BreadcrumbList"
        breadcrumbs={[
          { name: "Home", item: "https://smartfacilityservices.com" },
          { name: "Services", item: "https://smartfacilityservices.com/services" },
        ]}
      />

      <Breadcrumb items={[{ label: "Services Catalogue" }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Professional Facility Support
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight">
          Facility Services Catalogue
        </h1>
        <p className="text-base text-gray-700 leading-relaxed">
          Smart Facility Services provides maintenance solutions for residential communities, apartment complexes, commercial buildings, and offices in Hoodi, Garudachar Palya, Whitefield, and Bengaluru.
        </p>

        {/* Quick Contact Bar */}
        <div className="p-4 rounded-2xl bg-forest-50 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-700 text-center sm:text-left">
            Have questions about any service? Speak directly with our operations team.
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={getPhoneLink()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs shadow-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {businessInfo.primaryPhoneDisplay}</span>
            </a>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Services Grid (All 13 Services) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {servicesCatalogue.map((service) => (
          <ServiceCard
            key={service.slug}
            service={service}
            onOpenModal={(svc) => setSelectedService(svc)}
          />
        ))}
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
}
