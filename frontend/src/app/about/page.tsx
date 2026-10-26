import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StructuredData } from "@/components/StructuredData";
import { businessInfo, getPhoneLink, getWhatsAppLink, getEmailLink } from "@/config/businessInfo";
import { Target, Eye, CheckCircle2, Phone, MessageCircle, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Smart Facility Services Bengaluru",
  description:
    "Learn about Smart Facility Services, our dependable property care philosophy, and our commitment to facility management in Hoodi, Garudachar Palya, Whitefield, and Bengaluru.",
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
          { name: "Home", item: businessInfo.siteUrl },
          { name: "About Us", item: `${businessInfo.siteUrl}/about` },
        ]}
      />

      <Breadcrumb items={[{ label: "About Us" }]} />

      {/* Header with Company Logo */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white shadow-lg border-2 border-emerald-500/30 p-1 shrink-0">
          <Image
            src="/images/logo.png"
            alt="Smart Facility Services Company Logo"
            width={96}
            height={96}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Company Overview
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight">
            About Smart Facility Services
          </h1>
          <p className="text-xs sm:text-sm text-emerald-800 font-semibold tracking-wide">
            {businessInfo.tagline}
          </p>
        </div>
      </div>

      <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal max-w-4xl">
        {businessInfo.aboutIntro}
      </p>

      {/* Mission & Philosophy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            To deliver transparent, dependable, and systematically executed facility support that preserves property value, maintains resident hygiene and safety, and lifts administrative burdens from property managers and apartment management committees.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Property Care Philosophy</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            We focus on preventive maintenance and clear communication. By standardizing daily routines across water treatment plants, electrical boards, pumps, and common areas, we identify issues early and maintain smooth, uninterrupted property operations.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-gray-200 space-y-8">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Our Service Principles
          </h2>
          <p className="text-sm text-gray-600">
            Every client relationship is guided by transparent operational standards:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 text-forest-800 font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Clear Scope of Work</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Clear communication and agreed checklists so apartment associations always know what to expect.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 text-forest-800 font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Responsive Coordination</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Quick follow-up and one point of contact for multiple building maintenance disciplines.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 text-forest-800 font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Tailored Service Plans</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Flexible scheduling designed around your property's specific size, machinery, and requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Direct Contact Callout */}
      <div className="bg-forest-900 text-white p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800">
        <div>
          <h3 className="text-2xl font-bold">Connect With Our Team</h3>
          <p className="text-sm text-emerald-200 mt-1">
            Speak directly with Smart Facility Services at <strong>{businessInfo.primaryPhoneDisplay}</strong> or email <strong>{businessInfo.email}</strong>.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={getPhoneLink()}
            className="px-6 py-3 rounded-xl bg-white hover:bg-gray-100 text-forest-950 font-bold text-sm shadow flex items-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4 text-forest-800" />
            <span>Call Us</span>
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow flex items-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
          <a
            href={getEmailLink()}
            className="px-6 py-3 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-sm border border-emerald-500/40 shadow flex items-center gap-2 transition-colors"
          >
            <Mail className="w-4 h-4 text-emerald-300" />
            <span>Email Us</span>
          </a>
        </div>
      </div>
    </div>
  );
}
