"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { businessInfo } from "@/config/businessInfo";
import { servicesCatalogue } from "@/config/servicesData";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceAreaChecker } from "@/components/ServiceAreaChecker";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ClipboardList,
  Search,
  FileSpreadsheet,
  CalendarCheck,
  Wrench,
  CheckCheck,
  MapPin,
  Sparkles,
  Building2,
  Users,
} from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();

  const proposedProcessSteps = [
    {
      num: "01",
      title: "Enquiry Submission",
      desc: "Client submits requirements online or schedules an initial technical discussion.",
      icon: ClipboardList,
    },
    {
      num: "02",
      title: "Requirement Review",
      desc: "Our operations coordinator reviews property type, scope, and service frequency.",
      icon: Search,
    },
    {
      num: "03",
      title: "Site Evaluation",
      desc: "A physical site inspection is arranged to evaluate plant machinery and common areas.",
      icon: Building2,
    },
    {
      num: "04",
      title: "Tailored Quotation",
      desc: "Transparent scope and commercial estimate prepared for committee review.",
      icon: FileSpreadsheet,
    },
    {
      num: "05",
      title: "Schedule & Mobilization",
      desc: "Technicians, roster schedules, and consumables mobilized upon approval.",
      icon: CalendarCheck,
    },
    {
      num: "06",
      title: "Execution & Logging",
      desc: "Routine daily upkeep, preventive tasks, and on-site logbook maintenance.",
      icon: Wrench,
    },
    {
      num: "07",
      title: "Quality Review",
      desc: "Periodic review with apartment associations to maintain service standards.",
      icon: CheckCheck,
    },
  ];

  const whyChooseUsPoints = [
    {
      title: "Focused Local Operations",
      desc: "Concentrated operations in Whitefield, Hoodi, and Garudachar Palya ensure rapid mobilization and responsive team coordination.",
      icon: MapPin,
    },
    {
      title: "Disciplined Daily Protocols",
      desc: "Clear daily checklists and digital supervisor log tracking across pump rooms, STPs, corridors, and electrical panels.",
      icon: ClipboardList,
    },
    {
      title: "Comprehensive MEP & Environmental",
      desc: "Integrated capability spanning water treatment (STP/WTP), high-pressure plumbing, electrical panels, and housekeeping.",
      icon: Wrench,
    },
    {
      title: "Transparent Quotation Model",
      desc: "No fabricated flat rates. Every proposal is based on verified site assessments and documented scope agreed by association managers.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-white">
        {/* Subtle decorative background blur */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-200/25 blur-3xl rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 text-white text-xs font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brandPink-400"></span>
              <span>{t.hero.tagline}</span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest-950 tracking-tight leading-[1.15]">
              {t.hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal max-w-2xl mx-auto">
              {t.hero.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/quote"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-emerald-700/60 group"
              >
                <span>{t.hero.requestQuoteCta}</span>
                <ArrowRight className="w-4 h-4 text-brandPink-300 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-forest-950 font-bold text-sm sm:text-base border border-gray-300 shadow-xs hover:border-forest-600 transition-all flex items-center justify-center"
              >
                {t.hero.exploreServicesCta}
              </Link>
            </div>

            {/* Confirmed Location Highlights */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs font-medium text-gray-600">
              <span className="text-gray-400">Active Service Corridors:</span>
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

      {/* Featured Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Service Catalogue
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {t.sections.featuredServices}
            </h2>
            <p className="text-sm text-gray-600 max-w-xl">
              {t.sections.featuredServicesSub}
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-forest-800 hover:text-forest-950 group"
          >
            <span>View All 12 Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 primary featured service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesCatalogue.slice(0, 6).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-slate-50 py-16 sm:py-24 border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-100/70 px-3 py-1 rounded-full">
              Operational Standards
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {t.sections.whyChooseUs}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.sections.whyChooseUsSub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsPoints.map((point, index) => {
              const IconComp = point.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900">{point.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{point.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Service Area Checker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceAreaChecker />
      </section>

      {/* Our Work Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Transparent Workflow
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {t.sections.workProcess}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {t.sections.workProcessSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {proposedProcessSteps.slice(0, 4).map((step) => {
            const IconC = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-brandPink-500 bg-brandPink-50 px-2 py-0.5 rounded">
                    STAGE {step.num}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-forest-50 text-forest-800 flex items-center justify-center">
                    <IconC className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-bold text-base text-gray-900">{step.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/process"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-forest-800 hover:text-emerald-700 underline underline-offset-4"
          >
            <span>Read full 7-stage workflow details</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-900 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 relative overflow-hidden border border-emerald-800">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t.sections.readyToElevate}
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              {t.sections.readyToElevateSub}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quote"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-forest-950 font-bold text-sm shadow hover:bg-gray-100 transition-colors"
              >
                Request a Site Assessment
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-forest-950/70 hover:bg-forest-950 text-white font-bold text-sm border border-emerald-500/30 transition-colors"
              >
                Contact Operations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
