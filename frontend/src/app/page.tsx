"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { businessInfo, getPhoneLink, getWhatsAppLink, getEmailLink } from "@/config/businessInfo";
import { servicesCatalogue, ServiceDetail } from "@/config/servicesData";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceAreaChecker } from "@/components/ServiceAreaChecker";
import { ServiceDetailModal } from "@/components/ServiceDetailModal";
import { CustomerReviewSection } from "@/components/CustomerReviewSection";
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  Mail,
  ArrowRight,
  User,
  MapPin,
  CalendarCheck,
  Wrench,
  Search,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  // 5 Work Process steps from Content Guide
  const workProcessSteps = [
    {
      num: "1",
      title: "Contact Smart Facility Services",
      desc: "Reach out via phone, WhatsApp, or email to discuss your property's maintenance needs.",
      icon: Phone,
    },
    {
      num: "2",
      title: "Explain Property Requirements",
      desc: "Share your building type, unit count, and the specific facilities that need upkeep.",
      icon: MessageSquare,
    },
    {
      num: "3",
      title: "Arrange Site Inspection",
      desc: "If needed, an operational supervisor inspects common equipment, pump rooms, or areas.",
      icon: Search,
    },
    {
      num: "4",
      title: "Discuss Scope & Terms",
      desc: "We discuss transparent service terms and tailored operational schedules with your committee.",
      icon: CalendarCheck,
    },
    {
      num: "5",
      title: "Begin Work",
      desc: "Operations commence promptly once the scope and agreed terms are finalized.",
      icon: Wrench,
    },
  ];

  // 5 Why Choose Us principles from Content Guide
  const whyChooseUsPrinciples = [
    {
      title: "Clear Scope Communication",
      desc: "Transparent and clear communication about the exact scope of maintenance work.",
    },
    {
      title: "Responsive Follow-Up",
      desc: "Fast, responsive communication and proactive follow-up for property managers.",
    },
    {
      title: "Tailored Service Plans",
      desc: "Maintenance and operational schedules tailored specifically to each property's scale.",
    },
    {
      title: "Single Point of Contact",
      desc: "One dedicated coordinator for multiple facility, plumbing, electrical, and cleaning needs.",
    },
    {
      title: "Reliable Coordination",
      desc: "Dedicated focus on reliable service delivery and timely technician coordination.",
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative pt-10 sm:pt-16 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-white">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-emerald-200/25 blur-3xl rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900 text-white text-xs font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brandPink-400"></span>
              <span>{t.hero.tagline}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest-950 tracking-tight leading-[1.15]">
              {t.hero.headline}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal max-w-2xl mx-auto">
              {t.hero.subheadline}
            </p>

            {/* Direct Action Buttons: Call Us, WhatsApp Us, Explore Services */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href={getPhoneLink()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-emerald-700/60 group"
              >
                <Phone className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                <span>{t.hero.callUs} ({businessInfo.primaryPhoneDisplay})</span>
              </a>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>{t.hero.whatsappUs}</span>
              </a>

              <Link
                href="/services"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-forest-950 font-bold text-sm sm:text-base border border-gray-300 shadow-2xs hover:border-forest-600 transition-all flex items-center justify-center gap-1.5"
              >
                <span>{t.hero.exploreServices}</span>
                <ArrowRight className="w-4 h-4 text-forest-700" />
              </Link>
            </div>

            {/* Contact Person Highlight */}
            <div className="pt-4 text-xs text-gray-600 font-medium">
              Primary Contact: <strong className="text-gray-900">{businessInfo.contactPerson}</strong> • Direct:{" "}
              <a href={getPhoneLink()} className="text-forest-800 hover:underline font-bold">
                {businessInfo.primaryPhoneDisplay}
              </a>
            </div>

            {/* Confirmed Service Locations */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-3 text-xs font-medium text-gray-600">
              <span className="text-gray-400">Serving Corridors:</span>
              <span className="inline-flex items-center gap-1 text-forest-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Hoodi
              </span>
              <span className="inline-flex items-center gap-1 text-forest-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Garudachar Palya
              </span>
              <span className="inline-flex items-center gap-1 text-forest-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Whitefield
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Service Highlights Grid */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Our Capabilities
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {t.sections.servicesHeading}
            </h2>
            <p className="text-sm text-gray-600 max-w-xl">
              {t.sections.servicesSubheading}
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-forest-800 hover:text-forest-950 group"
          >
            <span>View All 13 Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Featured Service Cards with direct contact action */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesCatalogue.slice(0, 6).map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              onOpenModal={(svc) => setSelectedService(svc)}
            />
          ))}
        </div>
      </section>

      {/* About Smart Facility Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-50/80 via-white to-slate-50 p-8 sm:p-14 rounded-3xl border border-emerald-100 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-white border border-emerald-200 px-3 py-1 rounded-full shadow-2xs">
              About Our Company
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 tracking-tight">
              About Smart Facility Services
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
              {businessInfo.aboutIntro}
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-sm shadow transition-colors"
              >
                <span>Read Full Company Overview</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={getPhoneLink()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm border border-gray-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call Aruna: {businessInfo.primaryPhoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-slate-50 py-16 sm:py-24 border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-100/70 px-3 py-1 rounded-full">
              Our Principles
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {t.sections.whyChooseUs}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.sections.whyChooseUsSub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsPrinciples.map((principle, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs hover:border-emerald-400 hover:shadow-md transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center font-bold text-sm">
                  0{index + 1}
                </div>
                <h3 className="font-bold text-base text-gray-900">{principle.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Work Process (5 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Simple 5-Step Process
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {t.sections.workProcess}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {t.sections.workProcessSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {workProcessSteps.map((step) => {
            const IconComp = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-3 text-center sm:text-left flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-forest-900 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    STEP {step.num}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-forest-50 text-forest-800 flex items-center justify-center">
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Service Area Checker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceAreaChecker />
      </section>

      {/* Direct Contact Callout Section (Near Bottom) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-forest-950 via-forest-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 relative overflow-hidden border border-emerald-800">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t.sections.contactCtaHeading}
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              {t.sections.contactCtaSubheading}
            </p>

            {/* Direct Contact Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
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

            <p className="text-xs text-emerald-300 pt-2">
              Contact Person: {businessInfo.contactPerson} ({businessInfo.email})
            </p>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Feedback Section */}
      <CustomerReviewSection />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
}
