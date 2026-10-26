import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StructuredData } from "@/components/StructuredData";
import { ServiceAreaChecker } from "@/components/ServiceAreaChecker";
import { businessInfo } from "@/config/businessInfo";
import { MapPin, CheckCircle2, ArrowRight, Building, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Areas | Whitefield, Hoodi & Bengaluru Facility Support",
  description:
    "Confirmed facility services coverage across Whitefield, Hoodi, Garudachar Palya, and greater Bengaluru. Verify coverage for your apartment association or commercial property.",
  alternates: {
    canonical: "/service-areas",
  },
};

export default function ServiceAreasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
      <StructuredData
        type="BreadcrumbList"
        breadcrumbs={[
          { name: "Home", item: "https://smartfacilityservices.com" },
          { name: "Service Areas", item: "https://smartfacilityservices.com/service-areas" },
        ]}
      />

      <Breadcrumb items={[{ label: "Service Areas" }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Geographic Coverage
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight">
          Service Areas in Bengaluru
        </h1>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Smart Facility Services concentrates its daily operational response across East Bengaluru’s prime residential and tech corridors, ensuring prompt site visits and reliable technician attendance.
        </p>
      </div>

      {/* Confirmed Hubs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {businessInfo.confirmedServiceAreas.map((area, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs hover:border-emerald-500 transition-all space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center group-hover:bg-forest-800 group-hover:text-white transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Confirmed Coverage
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-forest-900 transition-colors">
                {area.neighborhood}
              </h2>
              <p className="text-xs text-gray-400 font-medium">
                {area.city}, {area.state}
                {area.postalCodes && ` • PIN: ${area.postalCodes.join(", ")}`}
              </p>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {area.description}
            </p>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-forest-800 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Dedicated site inspections available
              </span>
              <Link
                href={`/quote?location=${encodeURIComponent(area.neighborhood)}`}
                className="text-xs font-bold text-forest-800 hover:text-forest-950 underline flex items-center gap-1"
              >
                <span>Request Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Locality Checker Component */}
      <ServiceAreaChecker />

      {/* FAQs on Coverage */}
      <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-gray-200 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-forest-800" />
          <span>Service Area FAQs</span>
        </h2>
        <div className="space-y-4 text-sm text-gray-700">
          <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-1.5">
            <h3 className="font-bold text-gray-900">
              Is my property eligible if it is outside Hoodi or Whitefield?
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Yes. While Whitefield, Hoodi, and Garudachar Palya are our core operational hubs, we support residential layouts and commercial facilities across Bengaluru based on property scale and schedule feasibility. Submit your details through the quote form to initiate a site review.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-1.5">
            <h3 className="font-bold text-gray-900">
              How quickly can an operations supervisor visit our property?
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              For properties within confirmed zones (Whitefield, Hoodi, Garudachar Palya), initial physical site visits can typically be coordinated within 24 to 48 business hours following enquiry review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
