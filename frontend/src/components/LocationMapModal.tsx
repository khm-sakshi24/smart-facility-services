"use client";

import React from "react";
import { businessInfo, getPhoneLink, getWhatsAppLink } from "@/config/businessInfo";
import {
  MapPin,
  X,
  ExternalLink,
  Phone,
  MessageCircle,
  Clock,
  Radio,
  ShieldCheck,
  Navigation,
} from "lucide-react";

export interface LocationDetail {
  name: string;
  query: string;
  status: string;
  responseTime: string;
  landmarks: string[];
  techDetails: string;
  mapEmbedUrl: string;
}

const locationPresets: Record<string, LocationDetail> = {
  hoodi: {
    name: "Hoodi, Bengaluru",
    query: "Hoodi, Bengaluru, Karnataka",
    status: "Active Daily Hub • Rapid Response Zone",
    responseTime: "< 25 Mins Average Dispatch",
    landmarks: ["Hoodi Circle", "ITPL Main Road", "Ayyappa Nagar", "Kodigehalli Main Road"],
    techDetails: "GPS-tracked mobile technician vans stationed near Hoodi Circle with digital QR checkpoint patrol.",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Hoodi%20Circle%2C%20Bengaluru%2C%20Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
  "garudachar palya": {
    name: "Garudachar Palya, Bengaluru",
    query: "Garudachar Palya, Bengaluru, Karnataka",
    status: "Active Daily Hub • Industrial & Residential Corridor",
    responseTime: "< 30 Mins Average Dispatch",
    landmarks: ["Mahadevapura Corridor", "Industrial Estate", "Decathlon Junction", "Garudacharpalya Metro"],
    techDetails: "Dedicated MEP and water treatment supervisors stationed along the Mahadevapura-Garudachar Palya stretch.",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Garudachar%20Palya%2C%20Mahadevapura%2C%20Bengaluru%2C%20Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
  whitefield: {
    name: "Whitefield, Bengaluru",
    query: "Whitefield, Bengaluru, Karnataka",
    status: "Primary Hub • Premier Apartment & Tech Corridor",
    responseTime: "< 25 Mins Average Dispatch",
    landmarks: ["ITPL Corridor", "Hope Farm Junction", "EPIP Zone", "Channasandra", "Kadugodi Road"],
    techDetails: "Real-time IoT water and STP telemetry monitoring for large residential gated complexes and IT campuses.",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Whitefield%2C%20Bengaluru%2C%20Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
  bengaluru: {
    name: "Bengaluru Metro Operations",
    query: "Bengaluru, Karnataka, India",
    status: "Comprehensive City-Wide Facility Support",
    responseTime: "Scheduled & Emergency Shift Coordination",
    landmarks: ["East Bengaluru Hub", "KR Puram", "Marathahalli", "Varthur", "Brookefield"],
    techDetails: "Centralized operations dispatch coordinating 13 facility management disciplines across Bengaluru.",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Bengaluru%2C%20Karnataka&t=&z=11&ie=UTF8&iwloc=&output=embed",
  },
};

interface LocationMapModalProps {
  locationName: string | null;
  onClose: () => void;
}

export const LocationMapModal: React.FC<LocationMapModalProps> = ({ locationName, onClose }) => {
  if (!locationName) return null;

  const key = locationName.toLowerCase().trim();
  let details = locationPresets["bengaluru"];
  if (key.includes("hoodi")) details = locationPresets["hoodi"];
  else if (key.includes("garudachar")) details = locationPresets["garudachar palya"];
  else if (key.includes("whitefield")) details = locationPresets["whitefield"];
  else details = {
    name: `${locationName}, Bengaluru`,
    query: `${locationName}, Bengaluru, Karnataka`,
    status: "Active Facility Service Area",
    responseTime: "< 35 Mins Response Feasibility",
    landmarks: ["Bengaluru Urban Corridor"],
    techDetails: "Monitored via Smart Facility Services centralized dispatch and GPS logistics.",
    mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(locationName + ", Bengaluru, Karnataka")}&t=&z=13&ie=UTF8&iwloc=&output=embed`,
  };

  const googleMapsAppUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.query)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-forest-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Interactive Map for ${details.name}`}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-emerald-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-emerald-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-emerald-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/30">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-2">
                <span>{details.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </h3>
              <p className="text-[11px] text-emerald-200 font-medium">
                {details.status}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
            aria-label="Close Map Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Map View Frame */}
        <div className="relative w-full h-56 sm:h-72 bg-slate-100 overflow-hidden border-b border-gray-200">
          <iframe
            title={`Map of ${details.name}`}
            src={details.mapEmbedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Quick Floating Pill on Map */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-emerald-200 flex items-center gap-1.5 text-[11px] font-bold text-forest-950">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>{details.responseTime}</span>
          </div>

          <a
            href={googleMapsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 bg-forest-900/90 hover:bg-forest-950 text-white px-3 py-1.5 rounded-xl shadow-lg text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs transition-all hover:scale-105"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
          </a>
        </div>

        {/* Tech Details & Contact Area */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto">
          {/* Technology & Dispatch Details */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-forest-900">
              <Navigation className="w-4 h-4 text-emerald-600" />
              <span>Smart GPS Dispatch &amp; Operations Support</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              {details.techDetails}
            </p>
          </div>

          {/* Landmarks / Hubs */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
              Key Covered Hubs &amp; Corridors:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {details.landmarks.map((l, i) => (
                <span
                  key={i}
                  className="text-xs bg-slate-100 text-gray-800 px-2.5 py-1 rounded-lg font-medium border border-gray-200"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* Timings Note */}
          <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold bg-white p-2 rounded-xl border border-emerald-100">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>24/7 Emergency Support &amp; Daily Maintenance Routines</span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <a
              href={getPhoneLink()}
              className="py-3 px-4 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 text-center"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>Call Local Team</span>
            </a>

            <a
              href={getWhatsAppLink(`Hello Smart Facility Services, I would like to inquire about facility management services in ${details.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 text-center"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>WhatsApp Hub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
