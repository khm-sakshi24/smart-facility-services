import React from "react";
import type { Metadata } from "next";
import { servicesCatalogue } from "@/config/servicesData";
import { ServiceCard } from "@/components/ServiceCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Facility Services Catalogue | Smart Facility Services Bengaluru",
  description:
    "Explore our complete facility management catalogue: Housekeeping, Electrical, Plumbing, HVAC, STP/WTP Maintenance, Swimming Pool care, and Sewage Tank Cleaning in Whitefield, Hoodi & Bengaluru.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  const categories = [
    "All",
    "Core Facility Operations",
    "Technical & Electrical",
    "Water & Environmental",
    "Specialized Maintenance",
  ] as const;

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
          Comprehensive operations, preventive maintenance, and plant machinery care tailored for apartment associations, residential societies, and commercial properties across Bengaluru.
        </p>
        <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-600 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>
            <strong>Transparency Notice:</strong> Services marked <em>Active</em> are currently available for immediate site assessment. Services marked <em>Proposed</em> are subject to business confirmation or statutory licensing readiness.
          </span>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesCatalogue.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  );
}
