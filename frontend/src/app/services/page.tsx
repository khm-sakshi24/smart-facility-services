"use client";

import React, { useState, useMemo } from "react";
import { servicesCatalogue, ServiceDetail } from "@/config/servicesData";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceDetailModal } from "@/components/ServiceDetailModal";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StructuredData } from "@/components/StructuredData";
import { businessInfo, getPhoneLink, getWhatsAppLink, getEmailLink } from "@/config/businessInfo";
import { Phone, MessageCircle, Mail, Search, Clock, Sparkles } from "lucide-react";

const categories = [
  "All Services",
  "Core Facility Operations",
  "Technical & Electrical",
  "Water & Environmental",
  "Specialized Maintenance",
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = useMemo(() => {
    return servicesCatalogue.filter((s) => {
      const matchesCategory =
        selectedCategory === "All Services" || s.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.scopeOfWork.some((task) => task.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-12">
      <StructuredData
        type="BreadcrumbList"
        breadcrumbs={[
          { name: "Home", item: businessInfo.siteUrl },
          { name: "Services", item: `${businessInfo.siteUrl}/services` },
        ]}
      />

      <Breadcrumb items={[{ label: "Services Catalogue" }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Professional Facility Support
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-forest-950 text-xs font-bold border border-emerald-300">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>24/7 Support Available</span>
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight">
          Facility Services Catalogue
        </h1>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
          Smart Facility Services provides 24/7 maintenance solutions for residential communities, apartment complexes, commercial buildings, and offices in Hoodi, Garudachar Palya, Whitefield, and Bengaluru.
        </p>

        {/* Quick Contact Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-forest-50 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
            Have questions about any service? Speak directly with our operations team.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
            <a
              href={getPhoneLink()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs shadow-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span>Call {businessInfo.primaryPhoneDisplay}</span>
            </a>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Filter & Live Search Toolbar */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g., pump, pool, cleaning, STP)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs text-gray-500 font-medium text-right sm:text-left">
            Showing <strong>{filteredServices.length}</strong> of <strong>{servicesCatalogue.length}</strong> services
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? "bg-forest-800 text-white border-forest-900 shadow-xs"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-emerald-50 hover:border-emerald-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid (Filtered Results) */}
      {filteredServices.length === 0 ? (
        <div className="p-12 text-center bg-gray-50 rounded-3xl border border-gray-200 space-y-3">
          <p className="text-base font-bold text-gray-800">No services matched "{searchQuery}"</p>
          <p className="text-xs text-gray-500">
            Try searching for "pump", "housekeeping", "electrical", or select "All Services".
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Services");
            }}
            className="text-xs font-bold text-emerald-700 underline underline-offset-4"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              onOpenModal={(svc) => setSelectedService(svc)}
            />
          ))}
        </div>
      )}

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
}
