"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, MapPin, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

interface AreaCheckResult {
  status: "confirmed" | "extended" | "unverified";
  title: string;
  message: string;
  badge: string;
}

const confirmedKeywords = ["whitefield", "560066", "hoodi", "560048", "garudachar palya", "garudacharpalya", "itpl"];
const extendedKeywords = ["mahadevapura", "kadugodi", "560067", "marathahalli", "560037", "kr puram", "k r puram", "560036", "bengaluru", "bangalore", "bellandur", "varthur", "sarjapur"];

export const ServiceAreaChecker: React.FC = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<AreaCheckResult | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toLowerCase();

    if (!cleanQuery) return;

    const isConfirmed = confirmedKeywords.some((k) => cleanQuery.includes(k));
    const isExtended = extendedKeywords.some((k) => cleanQuery.includes(k));

    if (isConfirmed) {
      setResult({
        status: "confirmed",
        badge: "Confirmed Active Hub",
        title: "Direct Operational Coverage",
        message: `Great news! "${query}" is within our primary operational coverage zone (Hoodi, Garudachar Palya & Whitefield corridors). Dedicated response and routine team deployments are fully active.`,
      });
    } else if (isExtended) {
      setResult({
        status: "extended",
        badge: "Extended Bengaluru Region",
        title: "Feasibility Review Available",
        message: `"${query}" is in our extended Bengaluru operational zone. We accommodate associations and commercial facilities here based on property scale and schedule feasibility.`,
      });
    } else {
      setResult({
        status: "unverified",
        badge: "Custom Evaluation Required",
        title: "Location Feasibility Enquiry",
        message: `We do not have confirmed daily operations permanently stationed in "${query}". However, we review special facility contracts across Bengaluru. Please submit an enquiry to confirm site feasibility.`,
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-forest-950 via-forest-900 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-emerald-800/40 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5" />
          <span>Locality Verification Tool</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Check Facility Service Coverage in Your Area
        </h3>
        <p className="text-sm text-emerald-100/90 leading-relaxed">
          Enter your residential neighborhood, apartment layout, or Bengaluru PIN code (e.g. <em>Whitefield, Hoodi, Garudachar Palya, 560066</em>) to verify operational availability.
        </p>

        {/* Input Form */}
        <form onSubmit={handleCheck} className="pt-2 flex flex-col sm:flex-row gap-2.5 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter neighborhood or PIN code..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-inner"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-sm shadow transition-colors shrink-0"
          >
            Check Coverage
          </button>
        </form>

        {/* Result Display */}
        {result && (
          <div
            className={`mt-6 text-left p-5 rounded-2xl border transition-all animate-in fade-in slide-in-from-top-2 ${
              result.status === "confirmed"
                ? "bg-emerald-900/40 border-emerald-500/50 text-white"
                : result.status === "extended"
                ? "bg-sky-950/50 border-sky-500/40 text-white"
                : "bg-amber-950/40 border-amber-500/40 text-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span
                className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  result.status === "confirmed"
                    ? "bg-emerald-400 text-forest-950"
                    : result.status === "extended"
                    ? "bg-sky-400 text-slate-950"
                    : "bg-amber-400 text-amber-950"
                }`}
              >
                {result.badge}
              </span>
              {result.status === "confirmed" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-400" />
              )}
            </div>
            <h4 className="font-bold text-base text-white mb-1">{result.title}</h4>
            <p className="text-xs text-gray-200 leading-relaxed mb-4">{result.message}</p>
            <Link
              href={`/contact?location=${encodeURIComponent(query)}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-white underline underline-offset-4"
            >
              <span>Contact Us to Discuss Services for this Location</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
