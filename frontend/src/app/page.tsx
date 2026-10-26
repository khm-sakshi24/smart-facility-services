"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";
import { businessInfo, getPhoneLink, getWhatsAppLink, getEmailLink } from "@/config/businessInfo";
import { servicesCatalogue, ServiceDetail } from "@/config/servicesData";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceAreaChecker } from "@/components/ServiceAreaChecker";
import { ServiceDetailModal } from "@/components/ServiceDetailModal";
import { CustomerReviewSection } from "@/components/CustomerReviewSection";
import { UrgentSupportBanner } from "@/components/UrgentSupportBanner";
import { RequirementBuilder } from "@/components/RequirementBuilder";
import { FaqAccordion } from "@/components/FaqAccordion";
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
  Bot,
  Clock,
  Layers,
  Building2,
  Check,
  ExternalLink,
  Navigation,
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

  // 5 Work Process steps
  const workProcessSteps = [
    {
      num: "1",
      title: "Discover Required Service",
      desc: "Explore our 13 facility disciplines or ask the Smart Assistant to pinpoint your building's exact maintenance needs.",
      icon: Search,
    },
    {
      num: "2",
      title: "Contact Operations Team",
      desc: "Connect 24/7 via direct phone call, WhatsApp chat, or email to share your property profile.",
      icon: Phone,
    },
    {
      num: "3",
      title: "Property & Scope Review",
      desc: "Our supervisor assesses your residential or commercial property, unit count, and schedules a physical inspection if needed.",
      icon: MessageSquare,
    },
    {
      num: "4",
      title: "Confirm Terms & Schedule",
      desc: "We discuss transparent terms, technician shift schedules, and agreed operational checklists with your committee.",
      icon: CalendarCheck,
    },
    {
      num: "5",
      title: "Begin Work & Routine Delivery",
      desc: "Deployment begins promptly with trained personnel adhering to structured daily checklists and supervisor audits.",
      icon: Wrench,
    },
  ];

  return (
    <div className="space-y-14 sm:space-y-24 pb-20">
      {/* 1. Mobile-Optimized Hero Section with Clean Spacing & Clickable Location Badges */}
      <section className="relative pt-6 sm:pt-16 pb-12 sm:pb-20 overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-white">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[340px] bg-emerald-200/25 blur-3xl rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">
            {/* Desktop-Only Company Logo Badge (Hidden on mobile to save vertical space) */}
            <div className="hidden sm:flex justify-center mb-2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white shadow-xl border-4 border-emerald-600/30 p-1 hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/logo.png"
                  alt="Smart Facility Services Official Logo"
                  width={96}
                  height={96}
                  priority
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Tagline & 24/7 Timings Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900 text-white text-xs font-semibold shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-brandPink-400 animate-pulse"></span>
                <span>{businessInfo.tagline}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-forest-950 text-xs font-bold border border-emerald-300">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                <span>24/7 Support Available</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-forest-950 tracking-tight leading-[1.2] sm:leading-[1.15]">
              {businessInfo.heroHeadline}
            </h1>

            {/* Supporting Text */}
            <p className="text-xs sm:text-base text-gray-700 leading-relaxed font-normal max-w-2xl mx-auto px-1">
              {businessInfo.heroSubheadline}
            </p>

            {/* Touch-Friendly Location Badges with Live Map Action */}
            <div className="pt-1 space-y-1.5">
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider hidden sm:inline mr-1">
                  Active Zones:
                </span>
                {["Hoodi", "Garudachar Palya", "Whitefield", "Bengaluru"].map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setSelectedLocation(loc)}
                    className="inline-flex items-center gap-1 text-forest-900 bg-white hover:bg-emerald-50 active:scale-95 px-2.5 py-1 rounded-lg border border-emerald-200/90 text-xs font-bold shadow-2xs transition-all hover:border-emerald-500 group"
                    title={`Touch to view ${loc} on live map`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 group-hover:text-emerald-700 animate-bounce-subtle" />
                    <span>{loc}</span>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-emerald-700 font-medium">
                📍 Touch any location above to view on interactive map &amp; dispatch times
              </p>
            </div>

            {/* Mobile-Optimized Action Buttons (Grid on mobile, flex on desktop) */}
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
                  <span>WhatsApp Us</span>
                </a>
              </div>

              {/* Mobile Explore Services Link */}
              <div className="sm:hidden pt-2.5">
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
                  <span>Call Us ({businessInfo.primaryPhoneDisplay})</span>
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

      {/* 2. Urgent Support Callout Banner (24/7 Emergency Assistance) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UrgentSupportBanner />
      </section>

      {/* 3. Interactive 1-Click WhatsApp Property Requirement Builder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RequirementBuilder />
      </section>

      {/* 4. Complete Services Catalogue with Category Filtering Tabs */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Facility Services Catalogue
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              13 Professional Facility Disciplines
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
              From daily housekeeping and MEP engineering to KSPCB-compliant water plants and swimming pool upkeep.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-forest-800 hover:text-forest-950 group shrink-0"
          >
            <span>View Catalogue Page</span>
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
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? "bg-forest-800 text-white border-forest-900 shadow-sm"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-emerald-50 hover:border-emerald-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              onOpenModal={(svc) => setSelectedService(svc)}
            />
          ))}
        </div>
      </section>

      {/* 5. Detailed Our Work & Quality Standards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Our Work Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
            How We Maintain Property Quality
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Disciplined daily protocols, preventive schedules, and dedicated coordination designed for apartment societies and commercial buildings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {businessInfo.workHighlights.map((highlight, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:border-emerald-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                  {highlight.badge}
                </span>
                <span className="text-xs font-mono text-gray-400 font-bold">
                  0{idx + 1}
                </span>
              </div>
              <h3 className="font-bold text-base text-gray-900 leading-snug">
                {highlight.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Interactive Live Location & Technology Map Section */}
      <InteractiveMapSection
        onOpenLocationModal={(loc) => setSelectedLocation(loc)}
      />

      {/* 7. Comprehensive Location Coverage & Landmarks Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Local Operations Hubs
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
            Confirmed Service Areas &amp; Corridors
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Touch any locality card to open its interactive map and verified dispatch times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {businessInfo.confirmedServiceAreas.map((area, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedLocation(area.neighborhood)}
                    className="w-10 h-10 rounded-xl bg-forest-800 text-emerald-300 flex items-center justify-center font-bold hover:bg-forest-900 hover:scale-105 active:scale-95 transition-all shadow-xs"
                    title="Touch to show on map"
                  >
                    <MapPin className="w-5 h-5 text-emerald-300" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLocation(area.neighborhood)}
                    className="text-[11px] font-bold text-forest-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1 transition-colors"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-3 h-3 text-emerald-600" />
                  </button>
                </div>

                <div>
                  <h3
                    onClick={() => setSelectedLocation(area.neighborhood)}
                    className="font-bold text-lg text-forest-950 cursor-pointer hover:text-emerald-700 transition-colors"
                  >
                    {area.neighborhood}
                  </h3>
                  <span className="text-xs text-emerald-700 font-medium block">
                    {area.city}, {area.state}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {area.description}
                </p>

                {area.landmarks && area.landmarks.length > 0 && (
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                      Key Corridors &amp; Hubs:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {area.landmarks.map((landmark, lIdx) => (
                        <span
                          key={lIdx}
                          className="text-[10px] bg-slate-100 text-gray-700 px-2 py-0.5 rounded-md"
                        >
                          {landmark}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => setSelectedLocation(area.neighborhood)}
                  className="w-full py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-forest-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-emerald-200"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Show Map &amp; Tech Details</span>
                </button>

                <a
                  href={getWhatsAppLink(
                    `Hello Smart Facility Services, I would like to inquire about services in ${area.neighborhood}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Live Locality PIN/Neighborhood Checker */}
        <ServiceAreaChecker />
      </section>

      {/* 8. Why Choose Us Section */}
      <section className="bg-slate-50 py-14 sm:py-20 border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-100/70 px-3 py-1 rounded-full">
              Why Partner With Us?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Operational Advantages for RWAs &amp; Managers
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We focus on dependable operational routines, clear scope definitions, and responsive communication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessInfo.workHighlights.slice(0, 5).map((principle, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs hover:border-emerald-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center font-bold text-sm">
                  0{index + 1}
                </div>
                <h3 className="font-bold text-base text-gray-900">{principle.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Our Work Process (5 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Simple 5-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            How We Work With You
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            A straightforward process that creates confidence and transparency from initial contact to daily execution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {workProcessSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-forest-800 text-emerald-300 text-xs font-bold flex items-center justify-center">
                      {step.num}
                    </span>
                    <Icon className="w-5 h-5 text-forest-700" />
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

      {/* 10. Frequently Asked Questions Accordion */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Everything you need to know about Smart Facility Services routines, service scopes, and operational contracts.
          </p>
        </div>

        <FaqAccordion />
      </section>

      {/* 11. Customer Feedback & Review Rating Section */}
      <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CustomerReviewSection />
      </section>

      {/* 12. Direct Contact Callout Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-forest-950 via-forest-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 relative overflow-hidden border border-emerald-800">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Clock className="w-3.5 h-3.5" />
              <span>Available 24/7 for Emergency Support</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Discuss Facility Maintenance?
            </h2>
            <p className="text-xs sm:text-base text-emerald-100 leading-relaxed font-normal">
              We welcome apartment management committees, facility managers, and business owners in Hoodi, Garudachar Palya, Whitefield, and Bengaluru to connect with our operations team.
            </p>

            {/* Direct Contact Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href={getPhoneLink()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-forest-950 font-bold text-sm shadow hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-forest-800" />
                <span>Call Now: {businessInfo.primaryPhoneDisplay}</span>
              </a>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-sm shadow transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={getEmailLink()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-sm border border-emerald-500/40 transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-emerald-300" />
                <span>Send an Email</span>
              </a>
            </div>

            <p className="text-xs text-emerald-300 pt-2 font-medium">
              Email: {businessInfo.email} • Hoodi, Whitefield &amp; Bengaluru
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
