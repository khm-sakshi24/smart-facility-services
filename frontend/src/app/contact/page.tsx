import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StructuredData } from "@/components/StructuredData";
import { businessInfo } from "@/config/businessInfo";
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Site Assessment | Smart Facility Services",
  description:
    "Contact Smart Facility Services for facility management in Whitefield, Hoodi, Garudachar Palya, and Bengaluru. Request a physical site inspection and operational proposal.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <StructuredData
        type="BreadcrumbList"
        breadcrumbs={[
          { name: "Home", item: "https://smartfacilityservices.com" },
          { name: "Contact", item: "https://smartfacilityservices.com/contact" },
        ]}
      />

      <Breadcrumb items={[{ label: "Contact Us" }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight">
          Contact Operations &amp; Site Assessment
        </h1>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          We welcome apartment management committees, facility managers, and business owners to discuss technical requirements or coordinate a property evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Communication Channels & Confirmed Hubs */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
              Operational Channels
            </h2>

            {/* Quote Request Primary Workflow */}
            <div className="p-5 rounded-xl bg-forest-50/70 border border-forest-100 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800 block">
                Primary Inquiry Method
              </span>
              <h3 className="font-bold text-base text-forest-950">
                Official Quotation &amp; Inspection Request
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                For prompt dispatch of a technical supervisor, submit your building details via our quote workflow to obtain a tracked enquiry reference.
              </p>
              <div className="pt-2">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-forest-800 hover:bg-forest-900 px-4 py-2 rounded-lg shadow-2xs transition-colors"
                >
                  <span>Go to Quotation Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Verified Contact Details (Only if configured) */}
            {businessInfo.contact.phone && (
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <Phone className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-gray-900">Phone Support</strong>
                  <span>{businessInfo.contact.phone}</span>
                </div>
              </div>
            )}

            {businessInfo.contact.email && (
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <Mail className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-gray-900">Email Operations</strong>
                  <span>{businessInfo.contact.email}</span>
                </div>
              </div>
            )}

            {businessInfo.contact.businessHours && (
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <Clock className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-gray-900">Operational Hours</strong>
                  <span>{businessInfo.contact.businessHours}</span>
                </div>
              </div>
            )}

            {/* Confirmed Service Locations */}
            <div className="pt-2 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                Confirmed Service Regions
              </span>
              <ul className="space-y-2 text-sm text-gray-700">
                {businessInfo.confirmedServiceAreas.map((area, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>{area.neighborhood}</strong>, {area.city}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Quick Inquiry Card */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-gray-200 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-forest-800 text-white flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Schedule a Technical Walkthrough
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every facility has unique pumping lines, water chemistry, power loads, and floor areas. We conduct thorough on-site physical walk-throughs to assess current operating conditions before presenting commercial terms.
            </p>
            <div className="p-4 rounded-xl bg-white border border-gray-200 text-xs text-gray-600 space-y-2">
              <div className="font-semibold text-gray-900">What happens after you contact us?</div>
              <ol className="list-decimal pl-4 space-y-1">
                <li>We review your property layout and scope requirements.</li>
                <li>A technician or operations lead schedules a physical walk-through.</li>
                <li>An itemized quotation with clear deliverables is delivered.</li>
              </ol>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <Link
              href="/quote"
              className="w-full py-3.5 px-6 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow transition-all"
            >
              <span>Submit Request for Site Walkthrough</span>
              <ArrowRight className="w-4 h-4 text-brandPink-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
