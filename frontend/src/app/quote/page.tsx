"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { servicesCatalogue } from "@/config/servicesData";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  Send,
  Loader2,
} from "lucide-react";

export default function QuotePage() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service");
  const preselectedLocation = searchParams.get("location");

  const [contactName, setContactName] = useState("");
  const [associationName, setAssociationName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState(preselectedLocation || "");
  const [propertyType, setPropertyType] = useState("Apartment Association");
  const [units, setUnits] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      const match = servicesCatalogue.find((s) => s.slug === preselectedService);
      if (match && !selectedServices.includes(match.title)) {
        setSelectedServices([match.title]);
      }
    }
    if (preselectedLocation) {
      setLocation(preselectedLocation);
    }
  }, [preselectedService, preselectedLocation]);

  const toggleService = (title: string) => {
    setSelectedServices((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    );
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!contactName.trim()) {
      errs.contactName = "Contact person's name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      errs.email = "Please enter a valid email address.";
    }

    const phoneClean = phone.replace(/[^0-9]/g, "");
    if (!phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (phoneClean.length < 10) {
      errs.phone = "Please enter a valid 10-digit mobile number.";
    }

    if (!location.trim()) {
      errs.location = "Property location is required.";
    }

    if (selectedServices.length === 0) {
      errs.services = "Please select at least one required service.";
    }

    if (!consent) {
      errs.consent = "You must consent to privacy notice to submit an enquiry.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;
    if (isSubmitting) return; // duplicate protection

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactName,
          associationName,
          email,
          phone,
          location,
          propertyType,
          units,
          services: selectedServices,
          preferredStartDate: preferredDate,
          notes,
          consent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setSubmittedRef(data.referenceNumber);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed.";
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyReference = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ label: "Request a Quote" }]} />

      {/* Success View */}
      {submittedRef ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-300 shadow-xl space-y-6 text-center animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Enquiry Confirmed
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Quotation Request Received!
            </h1>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              Thank you, <strong>{contactName}</strong>. Your facility requirements have been safely registered. Our operations team will review your specifications and schedule a site evaluation.
            </p>
          </div>

          {/* Reference Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 max-w-md mx-auto flex items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-[11px] font-semibold text-gray-500 uppercase block">
                Unique Enquiry Reference
              </span>
              <span className="text-lg font-mono font-bold text-forest-950">
                {submittedRef}
              </span>
            </div>
            <button
              onClick={copyReference}
              className="p-2.5 rounded-xl bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 shadow-2xs transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Copy Reference"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <div className="pt-4 text-xs text-gray-500 max-w-md mx-auto space-y-1">
            <p>• Save this reference for future communication or tracking.</p>
            <p>• No generic pricing is generated—an authorized staff proposal follows inspection.</p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                setSubmittedRef(null);
                setSelectedServices([]);
                setContactName("");
                setEmail("");
                setPhone("");
                setNotes("");
              }}
              className="px-6 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-sm transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        /* Form View */
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200 shadow-sm space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Quotation Request
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-950 tracking-tight">
              Request a Tailored Facility Quotation
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              Complete the details below to receive a transparent commercial proposal tailored to your property. Mandatory fields are marked with an asterisk (<span className="text-rose-500">*</span>).
            </p>
          </div>

          {serverError && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
              <div>
                <strong>Submission Error:</strong> {serverError}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* Section 1: Contact Info */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
                1. Contact Person &amp; Organization
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Contact Person's Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 ${
                      errors.contactName ? "border-rose-400 bg-rose-50/40" : "border-gray-300"
                    }`}
                  />
                  {errors.contactName && (
                    <p className="text-xs text-rose-600 mt-1">{errors.contactName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Apartment Association / Company Name
                  </label>
                  <input
                    type="text"
                    value={associationName}
                    onChange={(e) => setAssociationName(e.target.value)}
                    placeholder="e.g. Green Valley AOA / Tech Park Ltd"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com or society@gmail.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 ${
                      errors.email ? "border-rose-400 bg-rose-50/40" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number (10 digits) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    maxLength={14}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 ${
                      errors.phone ? "border-rose-400 bg-rose-50/40" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Property Details */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
                2. Property Location &amp; Scope
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Property Location <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Whitefield / Hoodi / Garudachar Palya"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 ${
                      errors.location ? "border-rose-400 bg-rose-50/40" : "border-gray-300"
                    }`}
                  />
                  {errors.location && (
                    <p className="text-xs text-rose-600 mt-1">{errors.location}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 bg-white"
                  >
                    <option value="Apartment Association">Apartment Association / High-Rise</option>
                    <option value="Gated Villa Community">Gated Villa Community</option>
                    <option value="Commercial Tech Park">Commercial Tech Park / IT Building</option>
                    <option value="Corporate Office">Corporate Office Space</option>
                    <option value="Hospitality / Institution">Hospitality / Institutional Facility</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Approx. Units / Sq. Ft.
                  </label>
                  <input
                    type="text"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    placeholder="e.g. 180 Flats or 75,000 sq ft"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Services Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <h2 className="text-base font-bold text-gray-900">
                  3. Select Required Services <span className="text-rose-500">*</span>
                </h2>
                <span className="text-xs text-gray-500">
                  {selectedServices.length} selected
                </span>
              </div>
              {errors.services && (
                <p className="text-xs text-rose-600">{errors.services}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {servicesCatalogue.map((s) => {
                  const isChecked = selectedServices.includes(s.title);
                  return (
                    <label
                      key={s.slug}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-start gap-2.5 cursor-pointer transition-all ${
                        isChecked
                          ? "bg-emerald-50 border-emerald-500 text-forest-950 font-semibold shadow-2xs"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleService(s.title)}
                        className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{s.title}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Section 4: Schedule & Notes */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
                4. Schedule &amp; Additional Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Preferred Start Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Specific Issues or Existing Equipment Notes
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. STP capacity 150 KLD, need daily pump room check..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  I consent to having Smart Facility Services store and process the submitted property information to conduct a site review and provide an official quotation proposal. <span className="text-rose-500">*</span>
                </span>
              </label>
              {errors.consent && (
                <p className="text-xs text-rose-600 mt-1">{errors.consent}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm shadow hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-brandPink-300" />
                    <span>Submit Quotation Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
