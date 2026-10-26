import React from "react";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StructuredData } from "@/components/StructuredData";
import { ServiceAreasClient } from "./ServiceAreasClient";
import { businessInfo } from "@/config/businessInfo";
import { Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Areas | Whitefield, Hoodi & Bengaluru Facility Support",
  description:
    "Confirmed facility services coverage across Hoodi, Garudachar Palya, Whitefield, and greater Bengaluru. 24/7 emergency coordination with Smart Facility Services.",
  alternates: {
    canonical: "/service-areas",
  },
};

export default function ServiceAreasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-8 sm:space-y-12">
      <StructuredData
        type="BreadcrumbList"
        breadcrumbs={[
          { name: "Home", item: businessInfo.siteUrl },
          { name: "Service Areas", item: `${businessInfo.siteUrl}/service-areas` },
        ]}
      />

      <Breadcrumb items={[{ label: "Service Areas" }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Geographic Coverage
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-forest-950 text-xs font-bold border border-emerald-300">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>24/7 Emergency Support</span>
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight">
          Service Areas in Bengaluru
        </h1>
        <p className="text-xs sm:text-base text-gray-700 leading-relaxed font-normal">
          Smart Facility Services provides 24/7 responsive operational maintenance support for apartment associations, gated residential layouts, and commercial properties across Hoodi, Garudachar Palya, Whitefield, and the East Bengaluru urban corridor.
        </p>
      </div>

      {/* Interactive Client Component with Map Modal & Tabs */}
      <ServiceAreasClient />
    </div>
  );
}
