import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
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

      {/* Header with Big Prominent Logo */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden bg-white shadow-2xl border-4 sm:border-[5px] border-emerald-600/70 p-1 shrink-0 ring-8 ring-emerald-500/15 hover:scale-105 transition-all duration-300">
          <Image
            src="/images/logo.png"
            alt="Smart Facility Services Company Logo"
            width={160}
            height={160}
            priority
            className="w-full h-full object-cover rounded-full"
          />
        </div>
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
      </div>

      {/* Interactive Client Component with Map Modal & Tabs */}
      <ServiceAreasClient />
    </div>
  );
}
