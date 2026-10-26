"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";
import { businessInfo, getPhoneLink, getWhatsAppLink, getEmailLink } from "@/config/businessInfo";
import { servicesCatalogue, ServiceDetail } from "@/config/servicesData";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceDetailModal } from "@/components/ServiceDetailModal";
import { CustomerReviewSection } from "@/components/CustomerReviewSection";
import { InteractiveMapSection } from "@/components/InteractiveMapSection";
import { LocationMapModal } from "@/components/LocationMapModal";
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  Mail,
  ArrowRight,
  MapPin,
  CalendarCheck,
  Wrench,
  Search,
  MessageSquare,
  Sparkles,
  Clock,
  Building2,
  Cpu,
  Layers,
  Check,
} from "lucide-react";

const categories = [
  "All Services",
  "Core Facility Operations",
  "Technical & Electrical",
  "Water & Environmental",
  "Specialized Maintenance",
];

export default function HomePage() {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All Services");

  const filteredServices = useMemo(() => {
    if (activeCategory === "All Services") {
      return servicesCatalogue;
    }
    return servicesCatalogue.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  // 4 Streamlined Work Process steps (Clean and executive)
  const workProcessSteps = [
    {
      num: "01",
      title: "Discover Required Service",
      desc: "Explore our 13 disciplines or speak with operations to pinpoint your property's specific maintenance scope.",
      icon: Search,
    },
    {
      num: "02",
      title: "Direct Operations Contact",
      desc: "Connect 24/7 via phone or WhatsApp to schedule a site review with our technical supervisor.",
      icon: Phone,
    },
    {
      num: "03",
      title: "Property & Scope Review",
      desc: "We assess unit count, pump rooms, electrical panels, and confirm transparent operational checklists.",
      icon: CalendarCheck,
    },
    {
      num: "04",
      title: "Routine Daily Delivery",
      desc: "Trained personnel deployed promptly with digital checklist sign-offs and routine supervisor audits.",
      icon: Wrench,
    },
  ];

  // 4 Core Operational Standards
  const coreStandards = [
    {
      badge: "Accountability",
      title: "Daily Digital Checklists & Audits",
      desc: "Every residential and commercial facility receives structured daily inspection logs, supervisor sign-offs, and transparent task verification.",
    },
    {
      badge: "Asset Protection",
      title: "Preventive MEP & Pump Care",
      desc: "Scheduled preventive servicing for hydro-pneumatic pumps, water supply networks, DG backup, and electrical panels to prevent unexpected downtime.",
    },
    {
      badge: "24/7 Availability",
      title: "24/7 Emergency Breakdown Line",
      desc: "Round-the-clock rapid coordination for critical incidents including main water pipe bursts, power tripping, and STP/WTP alarms.",
    },
    {
      badge: "Quality & Compliance",
      title: "Uniformed & Trained Staff",
      desc: "Disciplined, background-checked personnel equipped with professional gear, strict safety adherence, and KSPCB environmental standards.",
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-20 pb-20">
      {/* 1. Hero Section: Clean, Professional, Balanced Spacing */}
      <section className="relative pt-6 sm:pt-16 pb-10 sm:pb-16 overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-white border-b border-emerald-100/60">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-200/20 blur-3xl rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
            {/* Tagline & 24/7 Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900 text-white text-xs font-semibold shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-brandPink-400 animate-pulse"></span>
                <span>{businessInfo.tagline}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-forest-950 text-xs font-bold border border-emerald-300">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                <span>24/7 Support &amp; Emergency Response</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight leading-[1.2] sm:leading-[1.15]">
              {businessInfo.heroHeadline}
            </h1>

            {/* Supporting Text */}
            <p className="text-xs sm:text-base text-gray-700 leading-relaxed font-normal max-w-2xl mx-auto px-1">
              {businessInfo.heroSubheadline}
            </p>

            {/* Clickable Active Location Chips */}
            <div className="pt-1 space-y-1.5">
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden sm:inline mr-1">
                  Active Zones:
                </span>
                {["Hoodi", "Garudachar Palya", "Whitefield", "Bengaluru"].map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setSelectedLocation(loc)}
                    className="inline-flex items-center gap-1 text-forest-900 bg-white hover:bg-emerald-50 active:scale-95 px-2.5 py-1 rounded-lg border border-emerald-200 text-xs font-bold shadow-2xs transition-all hover:border-emerald-500 group"
                    title={`Touch to view ${loc} on live map`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
                    <span>{loc}</span>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-emerald-700 font-medium">
                📍 Touch any location above to view on live map &amp; dispatch times
              </p>
            </div>

            {/* Clean Hero Action Buttons */}
            <div className="pt-2">
              {/* Mobile 2-column layout */}
              <div className="sm:hidden grid grid-cols-2 gap-2.5 max-w-xs mx-auto">
                <a
                  href={getPhoneLink()}
                  className="py-3 px-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs shadow-md active:scale-95 transition-transform flex items-center justify-center gap-1.5 border border-emerald-700/60"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Call Us</span>
                </a>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md active:scale-95 transition-transform flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Mobile Explore Services Link */}
              <div className="sm:hidden pt-2">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-1 text-xs font-bold text-forest-800 hover:text-emerald-700 underline underline-offset-4 py-1"
                >
                  <span>Explore All 13 Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Desktop 3-Button Row */}
              <div className="hidden sm:flex items-center justify-center gap-3.5">
                <a
                  href={getPhoneLink()}
                  className="px-7 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 border border-emerald-700/60 group"
                >
                  <Phone className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                  <span>Call Us: {businessInfo.primaryPhoneDisplay}</span>
                </a>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>WhatsApp Us</span>
                </a>

                <Link
                  href="/services"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-forest-950 font-bold text-sm sm:text-base border border-gray-300 shadow-2xs hover:border-forest-600 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Explore 13 Services</span>
                  <ArrowRight className="w-4 h-4 text-forest-700" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Executive Quick Trust Bar (Clean corporate metrics) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-forest-800 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="font-extrabold text-sm sm:text-base text-forest-950">13 Disciplines</p>
              <p className="text-[11px] text-gray-500">Housekeeping, MEP &amp; Water</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 pt-3 sm:pt-2 sm:pl-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-forest-800 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="font-extrabold text-sm sm:text-base text-forest-950">&lt; 30-Min Dispatch</p>
              <p className="text-[11px] text-gray-500">Hoodi, Garudachar Palya, Whitefield</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 pt-3 sm:pt-2 sm:pl-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-forest-800 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="font-extrabold text-sm sm:text-base text-forest-950">24/7 Response</p>
              <p className="text-[11px] text-gray-500">Emergency breakdown coordination</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 pt-3 sm:pt-2 sm:pl-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-forest-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="font-extrabold text-sm sm:text-base text-forest-950">Strict Compliance</p>
              <p className="text-[11px] text-gray-500">KSPCB &amp; safety certified standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Complete Services Catalogue with Phone & WhatsApp Action on Every Card */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Services Catalogue
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
              13 Professional Facility Disciplines
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
              Tap Call or WhatsApp on any service card below for direct operational coordination.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-forest-800 hover:text-forest-950 group shrink-0"
          >
            <span>View Full Catalogue Page</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? "bg-forest-800 text-white border-forest-900 shadow-2xs"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-emerald-50 hover:border-emerald-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              onOpenModal={(svc) => setSelectedService(svc)}
            />
          ))}
        </div>
      </section>

      {/* 4. Interactive Live Location & Technology Map Section */}
      <InteractiveMapSection
        onOpenLocationModal={(loc) => setSelectedLocation(loc)}
      />

      {/* 5. Our Operational Excellence & Quality Standards (Consolidated) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Work Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
            How We Maintain Property Quality
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Disciplined daily protocols, preventive schedules, and dedicated coordination designed for RWAs and commercial buildings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coreStandards.map((std, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs hover:border-emerald-500 hover:shadow-md transition-all space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 inline-block">
                  {std.badge}
                </span>
                <h3 className="font-bold text-sm text-gray-900 leading-snug">
                  {std.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  {std.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Simple 4-Step Process (Clean and concise) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Straightforward Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            How We Work With You
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            A clear 4-step approach that ensures transparency from initial contact to daily execution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workProcessSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-forest-800 text-emerald-300 text-xs font-bold flex items-center justify-center">
                      {step.num}
                    </span>
                    <Icon className="w-4 h-4 text-forest-700" />
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Customer Feedback & Review Rating Section */}
      <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CustomerReviewSection />
      </section>

      {/* 8. Direct Executive Contact Callout Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-forest-950 via-forest-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-12 text-center space-y-5 relative overflow-hidden border border-emerald-800">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Clock className="w-3.5 h-3.5" />
              <span>Available 24/7 for Operations &amp; Emergency Support</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Discuss Facility Maintenance?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
              We welcome apartment management committees, facility managers, and business owners in Hoodi, Garudachar Palya, Whitefield, and Bengaluru to connect with our operations team.
            </p>

            {/* Direct Contact Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4">
              <a
                href={getPhoneLink()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-forest-950 font-bold text-xs sm:text-sm shadow hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-forest-800" />
                <span>Call Now: {businessInfo.primaryPhoneDisplay}</span>
              </a>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs sm:text-sm shadow transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-forest-950" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={getEmailLink()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs sm:text-sm border border-emerald-500/40 transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-emerald-300" />
                <span>Send an Email</span>
              </a>
            </div>

            <p className="text-xs text-emerald-300 pt-1 font-medium">
              Email: {businessInfo.email} • Hoodi, Garudachar Palya, Whitefield &amp; Bengaluru
            </p>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      {/* Location Map Modal (Opens when touching any location chip or button) */}
      <LocationMapModal
        locationName={selectedLocation}
        onClose={() => setSelectedLocation(null)}
      />
    </div>
  );
}
