"use client";

import React from "react";
import Link from "next/link";
import { businessInfo } from "@/config/businessInfo";
import { ShieldCheck, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-950 text-gray-300 border-t border-forest-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center text-white border border-emerald-500/30">
                <ShieldCheck className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight">
                  {businessInfo.name}
                </span>
                <p className="text-xs text-emerald-400 font-medium">
                  {businessInfo.tagline}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Professional facility support and maintenance for residential communities, apartment associations, and commercial facilities across Bengaluru.
            </p>
            <div className="pt-2">
              <Link
                href="/quote"
                className="inline-flex items-center space-x-2 text-sm font-semibold text-emerald-300 hover:text-white group"
              >
                <span>Submit an operational enquiry</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-forest-800 pb-2">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services" className="hover:text-emerald-300 transition-colors">
                  Services Catalogue
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-emerald-300 transition-colors">
                  Our Work Process
                </Link>
              </li>
              <li>
                <Link href="/service-areas" className="hover:text-emerald-300 transition-colors">
                  Service Coverage
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-300 transition-colors">
                  About Us &amp; Standards
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-emerald-300 transition-colors">
                  Request a Quotation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-300 transition-colors">
                  Contact &amp; Site Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Confirmed Service Hubs */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-forest-800 pb-2">
              Confirmed Service Hubs
            </h3>
            <ul className="space-y-2.5 text-sm">
              {businessInfo.confirmedServiceAreas.map((area) => (
                <li key={area.neighborhood} className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-gray-200">{area.neighborhood}</span>
                    <span className="text-xs text-gray-400 block">{area.city}, Karnataka</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Verification & Transparency */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-forest-800 pb-2">
              Transparency &amp; Trust
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              We operate strictly on confirmed site assessments and association-approved proposals. Pricing is customized after technical evaluation.
            </p>
            <div className="p-3 rounded-lg bg-forest-900/60 border border-forest-800 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Service Area Scope</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Unconfirmed regional requests are subject to logistical feasibility review before commitment.
              </p>
            </div>
            <div className="text-xs text-gray-400">
              <Link href="/privacy-policy" className="hover:text-emerald-300 underline mr-3">
                Privacy Policy
              </Link>
              <Link href="/admin/login" className="hover:text-emerald-300 underline">
                Staff Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Legal & Regulatory Bar */}
        <div className="mt-12 pt-8 border-t border-forest-900 text-xs text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {businessInfo.name}. All rights reserved.</p>
          <p className="text-[11px] text-center md:text-right max-w-xl text-gray-400">
            {businessInfo.legal.securityStaffingLicensingNote}
          </p>
        </div>
      </div>
    </footer>
  );
};
