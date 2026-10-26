import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StructuredData } from "@/components/StructuredData";
import {
  businessInfo,
  getPhoneLink,
  getWhatsAppLink,
} from "@/config/businessInfo";
import {
  Phone,
  MessageSquare,
  Search,
  CalendarCheck,
  CheckCircle2,
  Wrench,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Work Process | Smart Facility Services",
  description:
    "Explore our straightforward 5-step facility management work process: from initial contact and requirement discussion to site inspection, clear terms, and execution.",
  alternates: {
    canonical: "/process",
  },
};

export default function ProcessPage() {
  const steps = [
    {
      num: "01",
      title: "Contact Smart Facility Services",
      desc: "Reach out via phone call, WhatsApp, or email. Speak directly with our operations team to share your initial property maintenance inquiry.",
      icon: Phone,
      deliverable: "Immediate direct communication with our operations coordinator.",
    },
    {
      num: "02",
      title: "Explain Property Requirements",
      desc: "Share your residential society or commercial facility details, unit count, common area facilities, and specific pain points.",
      icon: MessageSquare,
      deliverable: "Clear property scope definition and service catalog matching.",
    },
    {
      num: "03",
      title: "Arrange Site Inspection",
      desc: "When needed, an experienced operational supervisor visits your property to inspect pump rooms, water treatment tanks, electrical panels, or common grounds.",
      icon: Search,
      deliverable: "On-site condition evaluation and technical review.",
    },
    {
      num: "04",
      title: "Discuss Scope & Terms",
      desc: "We discuss transparent, realistic service terms and tailored schedules directly with your managing committee or property team.",
      icon: CalendarCheck,
      deliverable: "Agreed operational roadmap and transparent scope terms.",
    },
    {
      num: "05",
      title: "Begin Work",
      desc: "Operations commence promptly once terms are confirmed, deploying trained technicians and maintaining consistent daily maintenance standards.",
      icon: Wrench,
      deliverable: "Regular execution, on-ground supervision, and reliable daily support.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <StructuredData
        type="BreadcrumbList"
        breadcrumbs={[
          { name: "Home", item: businessInfo.siteUrl },
          { name: "Work Process", item: `${businessInfo.siteUrl}/process` },
        ]}
      />

      <Breadcrumb items={[{ label: "Our Work Process" }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Straightforward &amp; Transparent
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight">
          How We Work With You
        </h1>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          A simple, transparent process creates confidence. Here is how Smart Facility Services partners with apartment associations and commercial facilities from the first call to daily operations.
        </p>
      </div>

      {/* 5-Step Process Timeline */}
      <div className="space-y-6">
        {steps.map((step, idx) => {
          const IconC = step.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-emerald-300 transition-all"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-forest-800 text-emerald-300 flex items-center justify-center font-black text-xl shrink-0 shadow-xs">
                  {step.num}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <IconC className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      {step.title}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                    {step.desc}
                  </p>
                  <p className="text-xs text-forest-800 font-medium pt-1">
                    <span className="text-gray-400">Key Output: </span>
                    {step.deliverable}
                  </p>
                </div>
              </div>

              <div className="shrink-0 self-start md:self-center">
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                  Step {idx + 1} of 5
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="bg-forest-900 text-white p-8 sm:p-12 rounded-3xl text-center space-y-5 border border-emerald-800">
        <h3 className="text-2xl sm:text-3xl font-extrabold">
          Ready to Start Step 1?
        </h3>
        <p className="text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
          Contact Smart Facility Services directly by phone or WhatsApp to discuss your property maintenance needs today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href={getPhoneLink()}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-forest-950 font-bold text-sm shadow hover:bg-gray-100 transition-colors w-full sm:w-auto"
          >
            <Phone className="w-4 h-4 text-forest-800" />
            <span>Call Now: {businessInfo.contact.phoneFormatted}</span>
          </a>
          <a
            href={getWhatsAppLink("Hello Smart Facility Services, I would like to discuss Step 1 of your facility services work process.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-sm shadow transition-colors w-full sm:w-auto"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
    </div>
  );
}
