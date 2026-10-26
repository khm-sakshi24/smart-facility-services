"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  MapPin,
  CalendarCheck,
  Wrench,
  Search,
  MessageSquare,
  Sparkles,
  Bot,
  Star,
  CheckCircle,
} from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  // 5 Work Process steps aligned with prompt
  const workProcessSteps = [
    {
      num: "1",
      title: "Discover Required Service",
      desc: "Browse our 13 facility services or ask our Smart Assistant to find what your property needs.",
      icon: Search,
    },
    {
      num: "2",
      title: "Contact Smart Facility Services",
      desc: "Connect instantly via direct phone call, WhatsApp chat, or email to share your requirements.",
      icon: Phone,
    },
    {
      num: "3",
      title: "Discuss Property & Scope",
      desc: "Our operations coordinator discusses your property layout, unit count, and schedules a site evaluation if needed.",
      icon: MessageSquare,
    },
    {
      num: "4",
      title: "Confirm Terms & Availability",
      desc: "We confirm the clear operational scope, availability, and transparent terms with your managing team.",
      icon: CalendarCheck,
    },
    {
      num: "5",
      title: "Service Arranged & Delivered",
      desc: "Work begins promptly with trained personnel adhering to structured daily maintenance checklists.",
      icon: Wrench,
    },
  ];

  // 5 Why Choose Us principles
  const whyChooseUsPrinciples = [
    {
      title: "Clear Scope Communication",
      desc: "Transparent and upfront discussion of the exact maintenance tasks and service boundaries before work begins.",
    },
    {
      title: "Responsive Follow-Up",
      desc: "Fast, dependable communication and proactive follow-up for apartment associations and facility managers.",
    },
    {
      title: "Tailored Service Plans",
      desc: "Operational schedules customized specifically to your property size, equipment density, and community hours.",
    },
    {
      title: "Single Point of Contact",
      desc: "One dedicated coordinator for plumbing, electrical, cleaning, water treatment, and general upkeep.",
    },
    {
      title: "Reliable Coordination",
      desc: "Disciplined focus on on-time technician deployment and routine supervision across East Bengaluru.",
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. Hero Section with Actual Company Logo & Direct Contact CTAs */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-white">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[340px] bg-emerald-200/25 blur-3xl rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Company Logo Badge */}
            <div className="flex justify-center">
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

            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900 text-white text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-brandPink-400 animate-pulse"></span>
              <span>{businessInfo.tagline}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest-950 tracking-tight leading-[1.15]">
              {businessInfo.heroHeadline}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal max-w-2xl mx-auto">
              {businessInfo.heroSubheadline}
            </p>

            {/* Direct Action Buttons: Call Us, WhatsApp Us, Explore Services */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href={getPhoneLink()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 border border-emerald-700/60 group"
              >
                <Phone className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                <span>Call Us ({businessInfo.primaryPhoneDisplay})</span>
              </a>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>WhatsApp Us</span>
              </a>

              <Link
                href="/services"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-forest-950 font-bold text-sm sm:text-base border border-gray-300 shadow-2xs hover:border-forest-600 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-forest-700" />
              </Link>
            </div>

            {/* Confirmed Service Locations */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-y-2 gap-x-3 text-xs font-medium text-gray-600">
              <span className="text-gray-400">Confirmed Coverage:</span>
              <span className="inline-flex items-center gap-1 text-forest-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Hoodi
              </span>
              <span className="inline-flex items-center gap-1 text-forest-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Garudachar Palya
              </span>
              <span className="inline-flex items-center gap-1 text-forest-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Whitefield
              </span>
              <span className="inline-flex items-center gap-1 text-forest-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Bengaluru
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Services Highlights */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Key Capabilities
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Featured Facility Services
            </h2>
            <p className="text-sm text-gray-600 max-w-xl">
              From daily housekeeping and MEP upkeep to environmental plant operation and routine maintenance.
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

        {/* 6 Featured Service Cards */}
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

      {/* 3. Complete Service Catalogue Quick Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-gray-200 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-white border border-emerald-200 px-3 py-1 rounded-full">
              Full Spectrum Maintenance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
              Complete 13-Service Directory
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Explore our full range of services tailored for residential communities and commercial properties.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
            {servicesCatalogue.map((service, idx) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="p-3.5 bg-white rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-gray-800 group-hover:text-forest-900 truncate">
                    {service.title}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 shrink-0 ml-2" />
              </Link>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold text-forest-800 hover:text-forest-950 underline underline-offset-4"
            >
              <span>Browse detailed specifications for all services</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. About Smart Facility Services Section */}
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-sm shadow hover:shadow-md transition-all"
              >
                <span>Read Full Company Overview</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={getPhoneLink()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm border border-gray-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call Us: {businessInfo.primaryPhoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section className="bg-slate-50 py-16 sm:py-24 border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-100/70 px-3 py-1 rounded-full">
              Our Principles
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Why Partner With Us?
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We focus on dependable operational routines, clear scope definitions, and responsive communication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsPrinciples.map((principle, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs hover:border-emerald-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-3"
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

      {/* 6. Our Work Process (5 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Simple 5-Step Process
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            How We Work With You
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            A straightforward process that creates confidence and transparency from initial contact to daily execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {workProcessSteps.map((step) => {
            const IconComp = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-3 text-center sm:text-left flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all"
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

      {/* 7. Service Area Checker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceAreaChecker />
      </section>

      {/* 8. AI Service Assistant Feature Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 via-forest-900 to-forest-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-700/50 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold">
              <Bot className="w-4 h-4" />
              <span>Smart Facility Assistant</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Have Questions About Our Services?
            </h2>
            <p className="text-sm text-emerald-100 leading-relaxed">
              Ask our virtual assistant about General Maintenance, STP/WTP operations, swimming pool upkeep, plumbing, or service coverage. You will receive verified answers and direct WhatsApp/Phone options immediately.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 justify-center lg:justify-start">
              <span className="text-[11px] bg-white/10 px-3 py-1 rounded-full text-emerald-200">
                • General Maintenance
              </span>
              <span className="text-[11px] bg-white/10 px-3 py-1 rounded-full text-emerald-200">
                • Sewage Tank Cleaning
              </span>
              <span className="text-[11px] bg-white/10 px-3 py-1 rounded-full text-emerald-200">
                • Swimming Pool Upkeep
              </span>
            </div>
          </div>

          <div className="text-center shrink-0">
            <p className="text-xs text-emerald-200 mb-3">
              Look for the floating button at bottom right
            </p>
            <a
              href={getWhatsAppLink("Hello Smart Facility Services, I would like to ask a question about your facility services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-forest-950 font-bold text-sm shadow hover:bg-emerald-50 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Ask on WhatsApp Directly</span>
            </a>
          </div>
        </div>
      </section>

      {/* 9. Genuine Customer Reviews Section */}
      <section id="reviews" className="scroll-mt-24">
        <CustomerReviewSection />
      </section>

      {/* 10. Direct Contact Callout Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-forest-950 via-forest-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 relative overflow-hidden border border-emerald-800">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Discuss Facility Maintenance?
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              We welcome apartment management committees, facility managers, and business owners in Hoodi, Whitefield, and Bengaluru to connect with our operations team.
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
              Email: {businessInfo.email} • Location: Bengaluru, Karnataka
            </p>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
}
