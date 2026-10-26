import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StructuredData } from "@/components/StructuredData";
import {
  ClipboardList,
  Search,
  Building2,
  FileSpreadsheet,
  CalendarCheck,
  Wrench,
  CheckCheck,
  ArrowRight,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Work Process | Smart Facility Services",
  description:
    "Explore our proposed 7-stage facility management workflow, from initial enquiry and site inspection to quotation, execution, and quality follow-up.",
  alternates: {
    canonical: "/process",
  },
};

export default function ProcessPage() {
  const steps = [
    {
      num: "01",
      title: "Customer Submits an Enquiry",
      desc: "An apartment association member, property manager, or commercial owner submits basic requirements, property location, and desired services through our quotation form.",
      icon: ClipboardList,
      deliverable: "Digital enquiry reference generated and stored securely.",
    },
    {
      num: "02",
      title: "Team Reviews Requirements",
      desc: "Our operations coordinator reviews the building type, unit count, and technical scope to confirm operational feasibility and prepare initial technical questions.",
      icon: Search,
      deliverable: "Preliminary operational assessment and checklist.",
    },
    {
      num: "03",
      title: "Site Inspection Arranged",
      desc: "If required, an experienced technical supervisor visits the property to inspect pump rooms, water treatment plants, electrical boards, and common area layouts.",
      icon: Building2,
      deliverable: "Physical asset condition audit and scope documentation.",
    },
    {
      num: "04",
      title: "Quotation is Prepared",
      desc: "A transparent commercial proposal is generated with clear itemized scope, technician allocations, consumable options, and commercial terms.",
      icon: FileSpreadsheet,
      deliverable: "Formal quotation document for management committee review.",
    },
    {
      num: "05",
      title: "Work is Scheduled After Approval",
      desc: "Once the association or property owner approves the proposal, work orders are scheduled, staff are assigned, and site mobilization dates are locked in.",
      icon: CalendarCheck,
      deliverable: "Approved work order with dedicated team allocation.",
    },
    {
      num: "06",
      title: "Work is Completed & Documented",
      desc: "Maintenance and daily operations are carried out according to agreed checklists, with on-site logbooks and digital completion notes recorded.",
      icon: Wrench,
      deliverable: "Daily log entries, maintenance reports, and handover notes.",
    },
    {
      num: "07",
      title: "Follow-Up is Recorded",
      desc: "Routine follow-up reviews are conducted with association representatives to evaluate service satisfaction and address any adjustments.",
      icon: CheckCheck,
      deliverable: "Continuous quality records and periodic review sign-offs.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <StructuredData
        type="BreadcrumbList"
        breadcrumbs={[
          { name: "Home", item: "https://smartfacilityservices.com" },
          { name: "Our Work Process", item: "https://smartfacilityservices.com/process" },
        ]}
      />

      <Breadcrumb items={[{ label: "Our Work Process" }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Proposed Operational Framework
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight">
          Our Work Process
        </h1>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          We maintain quality through a disciplined, predictable operational workflow designed specifically for residential communities and commercial properties.
        </p>

        <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200/80 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Process Clarification:</strong> This 7-stage workflow represents our proposed operational standard. Specific timelines, inspection protocols, and review schedules are mutually adapted based on association agreements and individual property requirements.
          </div>
        </div>
      </div>

      {/* 7-Step Vertical Timeline */}
      <div className="space-y-6">
        {steps.map((step, idx) => {
          const IconC = step.icon;
          return (
            <div
              key={step.num}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/90 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-forest-50 border border-forest-100 text-forest-800 flex items-center justify-center font-black text-xl shrink-0">
                  {step.num}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <IconC className="w-4 h-4 text-emerald-600" />
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
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                  Stage {idx + 1} of 7
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="bg-forest-900 text-white p-8 sm:p-12 rounded-3xl text-center space-y-4 border border-emerald-800">
        <h3 className="text-2xl sm:text-3xl font-extrabold">
          Ready to Start Stage 01?
        </h3>
        <p className="text-sm text-emerald-100 max-w-xl mx-auto">
          Submit your property requirements to initiate a technical review and arrange a site inspection.
        </p>
        <div className="pt-2">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-forest-950 font-bold text-sm shadow hover:bg-gray-100 transition-colors"
          >
            <span>Submit Your Enquiry</span>
            <ArrowRight className="w-4 h-4 text-forest-800" />
          </Link>
        </div>
      </div>
    </div>
  );
}
