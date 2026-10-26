import React from "react";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { businessInfo } from "@/config/businessInfo";
import { AlertCircle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Smart Facility Services",
  description:
    "Privacy Policy draft detailing information collection, usage, and data retention for Smart Facility Services quotation and operational inquiries.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />

      {/* Review Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Draft Document for Business &amp; Legal Review:</strong>
          <span>
            This privacy policy is a structured draft prepared for {businessInfo.name}. It describes our standard operational handling of customer quotation data. Final review by designated legal advisors is recommended prior to commercial execution.
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-950 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-500">
          Last updated: October 2026 • Policy Version 1.0 (Draft)
        </p>
      </div>

      <div className="prose prose-sm max-w-none text-gray-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-gray-900">1. Information We Collect</h2>
          <p>
            When you submit a quotation request, site inspection inquiry, or contact form on our website, we collect:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Contact details: Name, email address, and mobile phone number.</li>
            <li>Property information: Apartment association or company name, property location, property category, and approximate units/area.</li>
            <li>Operational requirements: Required service disciplines (e.g. housekeeping, STP operation, electrical maintenance), preferred start dates, and specific notes.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-gray-900">2. Purpose of Data Collection</h2>
          <p>
            We collect and process this data strictly to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Evaluate service feasibility in your requested location (Whitefield, Hoodi, Garudachar Palya, or greater Bengaluru).</li>
            <li>Schedule physical site walkthroughs and inspection visits with authorized personnel.</li>
            <li>Prepare, calculate, and deliver tailored commercial quotations and scope documents.</li>
            <li>Communicate operational updates regarding your submitted enquiry.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-gray-900">3. Data Sharing &amp; Protection</h2>
          <p>
            We treat your inquiry information as confidential:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>We do not sell, rent, or publicly display customer inquiries to third parties or other customers.</li>
            <li>Inquiries are accessible solely to authorized operations, engineering, and managerial staff.</li>
            <li>Data is stored in secure database environments with role-based access authorization.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-gray-900">4. Data Retention</h2>
          <p>
            Quotation inquiry records are retained for administrative auditing, service history, and follow-up communication as necessary for ongoing association proposals. Outdated or canceled inquiries may be archived or removed in accordance with operational data management guidelines.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-gray-900">5. Assistance &amp; Inquiries</h2>
          <p>
            If you wish to update or withdraw submitted property inquiry information, please reference your unique Enquiry Reference Number (e.g. <code>SFS-YYYYMMDD-XXXX</code>) when communicating with our team through the contact channels on this website.
          </p>
        </section>
      </div>
    </div>
  );
}
