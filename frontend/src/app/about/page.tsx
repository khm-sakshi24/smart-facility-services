import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StructuredData } from "@/components/StructuredData";
import { businessInfo } from "@/config/businessInfo";
import { ShieldCheck, Target, Eye, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Smart Facility Services Bengaluru",
  description:
    "Learn about Smart Facility Services, our disciplined property care philosophy, and our commitment to dependable facility operations in Whitefield, Hoodi and Bengaluru.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
      <StructuredData
        type="BreadcrumbList"
        breadcrumbs={[
          { name: "Home", item: "https://smartfacilityservices.com" },
          { name: "About Us", item: "https://smartfacilityservices.com/about" },
        ]}
      />

      <Breadcrumb items={[{ label: "About Us" }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Company Overview
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight">
          About Smart Facility Services
        </h1>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          {businessInfo.heroSubheadline}
        </p>
      </div>

      {/* Mission & Philosophy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            To provide transparent, dependable, and systematically documented facility support that preserves property value, ensures resident safety, and lifts the administrative burden from apartment management committees and property executives.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Property Care Philosophy</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            We believe that prevention is vastly superior to breakdown repair. By standardizing daily logs across sewage treatment plants, pump headers, electrical boards, and common areas, we identify small anomalies before they evolve into costly disruptions.
          </p>
        </div>
      </div>

      {/* Core Standards */}
      <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-gray-200 space-y-8">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Our Commitment to Service Quality
          </h2>
          <p className="text-sm text-gray-600">
            Every operational engagement is governed by transparent standards:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 text-forest-800 font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Verified Site Audits</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              We never pitch blind estimates. Each quotation is rooted in physical equipment inspection and agreed scope checklists.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 text-forest-800 font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Disciplined Logbooks</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Daily pump runtime logs, chlorine levels, filter backwashes, and panel temperatures are maintained transparently for association review.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 text-forest-800 font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Regulatory Diligence</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Environmental compliance with KSPCB discharge standards and adherence to safety protocols for confined spaces and high voltage.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-forest-900 text-white p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800">
        <div>
          <h3 className="text-2xl font-bold">Have a property in Whitefield or Hoodi?</h3>
          <p className="text-sm text-emerald-200 mt-1">
            Let us inspect your facility and prepare a structured maintenance plan.
          </p>
        </div>
        <Link
          href="/quote"
          className="px-6 py-3 rounded-xl bg-white hover:bg-gray-100 text-forest-950 font-bold text-sm shadow shrink-0 flex items-center gap-2"
        >
          <span>Request a Quote</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
