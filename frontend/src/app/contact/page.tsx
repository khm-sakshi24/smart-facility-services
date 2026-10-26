"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StructuredData } from "@/components/StructuredData";
import {
  businessInfo,
  getPhoneLink,
  getWhatsAppLink,
  getEmailLink,
} from "@/config/businessInfo";
import { servicesCatalogue } from "@/config/servicesData";
import {
  Phone,
  MessageCircle,
  Mail,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Send,
  Loader2,
  Building2,
  User,
  ShieldCheck,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    location: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in your name, phone number, and message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit your message. Please try again or call us directly.");
      }

      setSubmittedRef(data.referenceNumber || "SFS-RECORDED");
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        location: "",
        message: "",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred. Please contact us via WhatsApp or Phone.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <StructuredData
        type="BreadcrumbList"
        breadcrumbs={[
          { name: "Home", item: businessInfo.siteUrl },
          { name: "Contact Us", item: `${businessInfo.siteUrl}/contact` },
        ]}
      />

      <Breadcrumb items={[{ label: "Contact Us" }]} />

      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Direct Facility Communication
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight">
          Contact Smart Facility Services
        </h1>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Reach out directly to discuss your residential society, apartment association, or commercial facility maintenance requirements. We are ready to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Contact Details & Operations (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-forest-100 p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-forest-950 border-b border-gray-100 pb-3">
              Direct Contact Information
            </h2>

            {/* Contact Person */}
            {businessInfo.contact.personName && (
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest-800 text-white flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-forest-700 tracking-wider block">
                    Contact Person
                  </span>
                  <span className="text-lg font-bold text-forest-950">
                    {businessInfo.contact.personName}
                  </span>
                  <span className="text-xs text-gray-600 block mt-0.5">
                    Facility Operations &amp; Client Support
                  </span>
                </div>
              </div>
            )}

            {/* Direct Channels */}
            <div className="space-y-4">
              {/* Phone */}
              {businessInfo.contact.phone && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center shrink-0 text-forest-800">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-gray-500 font-medium block">Phone Call</span>
                    <a
                      href={getPhoneLink()}
                      className="text-base font-bold text-forest-900 hover:text-emerald-700 transition-colors"
                    >
                      {businessInfo.contact.phoneFormatted || businessInfo.contact.phone}
                    </a>
                    <div className="mt-1">
                      <a
                        href={getPhoneLink()}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                      >
                        <span>Call directly</span>
                        <span>&rarr;</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* WhatsApp */}
              {businessInfo.contact.whatsapp && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-gray-500 font-medium block">WhatsApp Chat</span>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-forest-900 hover:text-emerald-700 transition-colors"
                    >
                      {businessInfo.contact.phoneFormatted || businessInfo.contact.phone}
                    </a>
                    <div className="mt-1">
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                      >
                        <span>Open WhatsApp chat</span>
                        <span>&rarr;</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Email */}
              {businessInfo.contact.email && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center shrink-0 text-forest-800">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-gray-500 font-medium block">Email Support</span>
                    <a
                      href={getEmailLink()}
                      className="text-sm sm:text-base font-bold text-forest-900 hover:text-emerald-700 transition-colors break-all"
                    >
                      {businessInfo.contact.email}
                    </a>
                  </div>
                </div>
              )}

              {/* Business Hours */}
              {businessInfo.contact.businessHours && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 text-gray-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-gray-500 font-medium block">Communication Hours</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {businessInfo.contact.businessHours}
                    </span>
                    <span className="text-xs text-gray-500 block">
                      Emergency response coordination for registered facilities.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Service Hubs */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800 block">
                Primary Service Hubs (Bengaluru)
              </span>
              <ul className="space-y-2 text-sm text-gray-700">
                {businessInfo.confirmedServiceAreas.map((area, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong className="text-forest-950">{area.neighborhood}</strong>, {area.city}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick WhatsApp Action Box */}
          <div className="bg-gradient-to-br from-emerald-800 to-forest-900 text-white rounded-3xl p-6 shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-emerald-300" />
              </div>
              <h3 className="font-bold text-lg text-white">Prefer WhatsApp?</h3>
            </div>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Send us a quick WhatsApp text with your building name and required services for the quickest response.
            </p>
            <a
              href={getWhatsAppLink("Hello Aruna, I would like to discuss facility services with Smart Facility Services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white hover:bg-emerald-50 text-forest-950 font-bold text-sm shadow transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Column: Direct Message Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-forest-100 p-6 sm:p-10 shadow-xs space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-forest-950">Send Us a Direct Message</h2>
            <p className="text-sm text-gray-600 mt-1">
              Fill in your details below and Aruna from Smart Facility Services will get back to you promptly.
            </p>
          </div>

          {submittedRef ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in">
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-forest-950">Message Sent Successfully!</h3>
              <p className="text-sm text-gray-700 max-w-md mx-auto leading-relaxed">
                Thank you for contacting Smart Facility Services. We have received your details and will call or message you shortly.
              </p>
              <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-gray-700 inline-block">
                Reference ID: <strong className="text-forest-900 font-mono text-sm">{submittedRef}</strong>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSubmittedRef(null)}
                  className="text-xs font-bold text-forest-800 hover:text-forest-950 underline underline-offset-4"
                >
                  Send another inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Phone / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Property Location / Area
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Hoodi / Whitefield"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Service Interested In
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900 bg-white"
                >
                  <option value="">Select a service (or General Inquiry)</option>
                  {servicesCatalogue.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Message / Property Requirements *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your apartment society, building type, or specific maintenance needs..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900 resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm shadow flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-emerald-300" />
                      <span>Send Message to Aruna</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Your contact details are kept strictly private and used only to respond to your inquiry.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
