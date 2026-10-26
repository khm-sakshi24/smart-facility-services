"use client";

import React, { useState } from "react";
import { businessInfo, getWhatsAppLink, getPhoneLink } from "@/config/businessInfo";
import {
  Building2,
  MapPin,
  CheckSquare,
  Square,
  MessageCircle,
  Phone,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const propertyTypes = [
  "Residential Apartment Society (RWA)",
  "Gated Villa Community",
  "Commercial Office / Tech Park",
  "Commercial Complex / Layout",
];

const locations = [
  "Hoodi",
  "Garudachar Palya",
  "Whitefield",
  "Bengaluru (Other Corridor)",
];

const availableServices = [
  "General Maintenance",
  "Housekeeping & Cleaning",
  "Electrical Maintenance",
  "Plumbing Services",
  "STP, ETP & WTP Operations",
  "Water Tank Cleaning",
  "Sewage Tank Cleaning",
  "Swimming Pool Maintenance",
  "HVAC Maintenance",
  "Security Staffing",
];

export const RequirementBuilder: React.FC = () => {
  const [propertyType, setPropertyType] = useState(propertyTypes[0]);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "General Maintenance",
    "Housekeeping & Cleaning",
  ]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const generateWhatsAppMessage = () => {
    const servicesText = selectedServices.length > 0 ? selectedServices.join(", ") : "General facility upkeep";
    return `Hello Smart Facility Services,\n\nI manage a ${propertyType} located in ${selectedLocation}.\n\nWe are looking for facility maintenance support for:\n• ${servicesText.replace(/, /g, "\n• ")}\n\nPlease let us know your availability for a property discussion.`;
  };

  return (
    <div className="bg-white rounded-3xl border border-emerald-100 shadow-lg p-6 sm:p-10 space-y-8 relative overflow-hidden">
      <div className="space-y-3 text-center sm:text-left max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Interactive 30-Second Checklist</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
          Build Your Property Maintenance Checklist
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
          Select your property type, neighborhood, and services to generate an instant 1-click WhatsApp message for our operations team.
        </p>
      </div>

      <div className="space-y-6">
        {/* Step 1: Property Type */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>1. Select Property Type</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {propertyTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setPropertyType(type)}
                className={`p-3 rounded-xl text-xs sm:text-sm font-semibold text-left transition-all border ${
                  propertyType === type
                    ? "bg-emerald-50 text-forest-950 border-emerald-500 shadow-xs"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Location */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>2. Select Neighborhood</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {locations.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setSelectedLocation(loc)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-all border ${
                  selectedLocation === loc
                    ? "bg-forest-800 text-white border-forest-900 shadow-xs"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Required Services Multiselect */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-emerald-600" />
            <span>3. Choose Required Services ({selectedServices.length} selected)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {availableServices.map((service) => {
              const isSelected = selectedServices.includes(service);
              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  className={`p-3 rounded-xl text-xs font-semibold text-left flex items-center gap-2.5 transition-all border ${
                    isSelected
                      ? "bg-emerald-50 text-forest-950 border-emerald-500 font-bold"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected && <span className="text-[10px] leading-none">✓</span>}
                  </span>
                  <span className="truncate">{service}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-gray-500 text-center sm:text-left">
          <span>We respond 24/7 with operational availability and scheduled site review options.</span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <a
            href={getWhatsAppLink(generateWhatsAppMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Checklist on WhatsApp</span>
          </a>

          <a
            href={getPhoneLink()}
            className="px-5 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-300" />
            <span>Call Operations ({businessInfo.primaryPhoneDisplay})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
