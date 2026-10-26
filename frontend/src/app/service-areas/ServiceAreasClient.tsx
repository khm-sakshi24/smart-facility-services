"use client";

import React, { useState } from "react";
import { businessInfo, getPhoneLink, getWhatsAppLink } from "@/config/businessInfo";
import { ServiceAreaChecker } from "@/components/ServiceAreaChecker";
import { InteractiveMapSection } from "@/components/InteractiveMapSection";
import { LocationMapModal } from "@/components/LocationMapModal";
import {
  MapPin,
  CheckCircle2,
  Phone,
  MessageCircle,
  HelpCircle,
  Clock,
  ExternalLink,
  Navigation,
} from "lucide-react";

export const ServiceAreasClient: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Interactive Map & Technology Section */}
      <InteractiveMapSection
        onOpenLocationModal={(loc) => setSelectedLocation(loc)}
      />

      {/* Confirmed Hubs Detailed Cards */}
      <div className="space-y-6">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Dedicated Locality Hubs
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
            Explore Area Operations &amp; Touch to View Map
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Touch any map icon to open its live GPS map location and response details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {businessInfo.confirmedServiceAreas.map((area, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs hover:border-emerald-500 hover:shadow-lg transition-all duration-300 space-y-5 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedLocation(area.neighborhood)}
                    className="w-12 h-12 rounded-2xl bg-forest-50 text-forest-800 flex items-center justify-center group-hover:bg-forest-800 group-hover:text-emerald-300 transition-colors shadow-2xs cursor-pointer active:scale-95"
                    title={`Touch to view ${area.neighborhood} on map`}
                  >
                    <MapPin className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLocation(area.neighborhood)}
                    className="text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1 transition-colors"
                  >
                    <span>Touch for Map</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                  </button>
                </div>

                <div>
                  <h3
                    onClick={() => setSelectedLocation(area.neighborhood)}
                    className="text-2xl font-bold text-gray-900 group-hover:text-forest-900 transition-colors cursor-pointer"
                  >
                    {area.neighborhood}
                  </h3>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                    {area.city}, {area.state}{" "}
                    {area.postalCodes && `• PIN: ${area.postalCodes.join(", ")}`}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {area.description}
                </p>

                {area.landmarks && area.landmarks.length > 0 && (
                  <div className="pt-3 border-t border-gray-100 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                      Key Corridors &amp; Landmarks:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {area.landmarks.map((landmark, lIdx) => (
                        <span
                          key={lIdx}
                          className="text-xs bg-slate-100 text-gray-700 px-2.5 py-1 rounded-md font-medium"
                        >
                          {landmark}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-2">
                <button
                  type="button"
                  onClick={() => setSelectedLocation(area.neighborhood)}
                  className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-forest-950 font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-200 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Show in Map &amp; Tech Dispatch</span>
                </button>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <a
                    href={getPhoneLink()}
                    className="text-xs font-bold text-forest-800 hover:text-forest-950 inline-flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Call {businessInfo.primaryPhoneDisplay}</span>
                  </a>

                  <a
                    href={getWhatsAppLink(
                      `Hello Smart Facility Services, I would like to inquire about services in ${area.neighborhood}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors inline-flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Locality Checker */}
      <ServiceAreaChecker />

      {/* Our Operational Standards in the Region */}
      <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-gray-200 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-white px-3 py-1 rounded-full border border-emerald-200">
            Field Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
            How We Manage Properties in Your Neighborhood
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            We provide disciplined operational routines, routine supervision, and rapid technical coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          {businessInfo.workHighlights.map((hl, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
              <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">
                {hl.badge}
              </div>
              <h3 className="font-bold text-sm text-gray-900">{hl.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{hl.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Service Area FAQs */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-forest-800" />
          <span>Service Area FAQs</span>
        </h2>
        <div className="space-y-4 text-sm text-gray-700">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-1.5">
            <h3 className="font-bold text-gray-900">
              Is my property eligible if it is outside Hoodi or Whitefield?
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Yes. While Whitefield, Hoodi, and Garudachar Palya are our core operational hubs, we support residential layouts and commercial properties across Bengaluru based on property scale and schedule feasibility. Contact Smart Facility Services at {businessInfo.primaryPhoneDisplay} to confirm site availability.
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-1.5">
            <h3 className="font-bold text-gray-900">
              How quickly can an operations supervisor visit our property?
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              For properties within Hoodi, Garudachar Palya, and Whitefield, physical site inspections can typically be scheduled within 24 to 48 business hours following direct phone or WhatsApp contact.
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-1.5">
            <h3 className="font-bold text-gray-900">
              Do you offer 24/7 emergency response for critical breakdowns?
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Yes. For registered residential apartment communities and commercial clients, we coordinate emergency breakdown assistance for critical water pumps, main electrical tripping, and STP/WTP issues 24 hours a day, 7 days a week.
            </p>
          </div>
        </div>
      </div>

      {/* Location Map Modal */}
      <LocationMapModal
        locationName={selectedLocation}
        onClose={() => setSelectedLocation(null)}
      />
    </div>
  );
};
