"use client";

import React, { useState } from "react";
import { businessInfo, getPhoneLink, getWhatsAppLink } from "@/config/businessInfo";
import {
  MapPin,
  ExternalLink,
  Phone,
  MessageCircle,
  Radio,
  Cpu,
  QrCode,
  ShieldCheck,
  Clock,
  Compass,
} from "lucide-react";

interface MapTab {
  id: string;
  name: string;
  badge: string;
  query: string;
  description: string;
  landmarks: string[];
  dispatchTime: string;
  mapEmbedUrl: string;
}

const mapTabs: MapTab[] = [
  {
    id: "hoodi",
    name: "Hoodi Hub",
    badge: "Core Service Hub",
    query: "Hoodi, Bengaluru, Karnataka",
    description:
      "Rapid dispatch unit stationed near Hoodi Circle covering Ayyappa Nagar, Kodigehalli, and ITPL Main Road residential societies and commercial facilities.",
    landmarks: ["Hoodi Circle", "ITPL Main Road", "Ayyappa Nagar", "Kodigehalli"],
    dispatchTime: "< 25 Mins Dispatch",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Hoodi%20Circle%2C%20Bengaluru%2C%20Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "garudachar-palya",
    name: "Garudachar Palya Hub",
    badge: "Active Operations",
    query: "Garudachar Palya, Bengaluru, Karnataka",
    description:
      "Operational team handling residential layouts, commercial complexes, and industrial estates along the Mahadevapura-Garudachar Palya corridor.",
    landmarks: ["Mahadevapura", "Industrial Area", "Decathlon Junction", "Garudacharpalya Metro"],
    dispatchTime: "< 30 Mins Dispatch",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Garudachar%20Palya%2C%20Bengaluru%2C%20Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "whitefield",
    name: "Whitefield Hub",
    badge: "Primary Hub",
    query: "Whitefield, Bengaluru, Karnataka",
    description:
      "Comprehensive facility teams managing gated communities, IT parks, high-rise apartment associations, and commercial towers across Whitefield.",
    landmarks: ["ITPL Corridor", "Hope Farm Junction", "EPIP Zone", "Channasandra"],
    dispatchTime: "< 25 Mins Dispatch",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Whitefield%2C%20Bengaluru%2C%20Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "bengaluru-metro",
    name: "Bengaluru Metro",
    badge: "City-Wide Coverage",
    query: "Bengaluru, Karnataka, India",
    description:
      "Extended coverage throughout East Bengaluru and adjacent corridors for managing committees seeking structured facility operations.",
    landmarks: ["KR Puram", "Marathahalli", "Varthur", "Brookefield", "Bellandur"],
    dispatchTime: "24/7 Operations",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Bengaluru%2C%20Karnataka&t=&z=11&ie=UTF8&iwloc=&output=embed",
  },
];

const techPillars = [
  {
    icon: Radio,
    title: "GPS-Tracked Dispatch",
    desc: "Mobile technician vans routed via live traffic navigation for under-30-minute arrival.",
  },
  {
    icon: QrCode,
    title: "Digital QR Patrols",
    desc: "Housekeeping and security scan on-site QR checkpoints across apartment blocks.",
  },
  {
    icon: Cpu,
    title: "IoT Sensor Alerts",
    desc: "Telemetry monitoring for STP effluent levels, pump pressures, and tank capacities.",
  },
  {
    icon: ShieldCheck,
    title: "Cloud Maintenance Logs",
    desc: "Daily checklists signed digitally and shared directly with society RWA committees.",
  },
];

interface InteractiveMapSectionProps {
  onOpenLocationModal?: (locName: string) => void;
}

export const InteractiveMapSection: React.FC<InteractiveMapSectionProps> = ({
  onOpenLocationModal,
}) => {
  const [selectedTab, setSelectedTab] = useState<MapTab>(mapTabs[0]);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    selectedTab.query
  )}`;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-forest-800 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-emerald-600" />
          <span>Interactive Location &amp; Technology Map</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-forest-950 tracking-tight">
          Live Operational Corridors &amp; Coverage
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Touch any hub to explore our active response zones across Hoodi, Garudachar Palya, Whitefield, and Bengaluru.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {mapTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
              selectedTab.id === tab.id
                ? "bg-forest-900 text-white border-forest-950 shadow-md scale-102"
                : "bg-white text-gray-700 border-gray-200 hover:bg-emerald-50 hover:border-emerald-300"
            }`}
          >
            <MapPin
              className={`w-3.5 h-3.5 ${
                selectedTab.id === tab.id ? "text-brandPink-300" : "text-emerald-600"
              }`}
            />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Map & Technology Interactive Grid */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Interactive Live Embedded Map (7 cols) */}
        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[300px] bg-slate-100 border-b lg:border-b-0 lg:border-r border-gray-200">
          <iframe
            key={selectedTab.id}
            title={`Map for ${selectedTab.name}`}
            src={selectedTab.mapEmbedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Floating Radar Status Pill */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-emerald-200 flex items-center gap-2 text-xs font-bold text-forest-950">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span>{selectedTab.dispatchTime}</span>
          </div>

          {/* External Map Touch Action */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 bg-forest-900/90 hover:bg-forest-950 text-white px-3 py-1.5 rounded-xl shadow-lg text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs hover:scale-105 transition-all"
          >
            <span>Touch to View on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
          </a>
        </div>

        {/* Right: Hub Details & Technology Features (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-b from-white to-slate-50/50">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                {selectedTab.badge}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-full">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>24/7 Operations</span>
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-forest-950">
                {selectedTab.name}
              </h3>
              <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                {selectedTab.query}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {selectedTab.description}
            </p>

            {/* Landmarks */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                Key Localities Covered:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedTab.landmarks.map((landmark, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-100 text-gray-800 px-2.5 py-1 rounded-lg font-medium border border-gray-200"
                  >
                    {landmark}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Call / WhatsApp Buttons */}
          <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-2.5">
            <a
              href={getPhoneLink()}
              className="py-2.5 px-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-1.5 text-center"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span>Call Hub</span>
            </a>

            <a
              href={getWhatsAppLink(
                `Hello Smart Facility Services, I would like to inquire about facility services in ${selectedTab.name}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-1.5 text-center"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Hub</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4 Technology Infrastructure Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        {techPillars.map((tp, idx) => {
          const Icon = tp.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:border-emerald-500 hover:shadow-md transition-all space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-forest-800 flex items-center justify-center group-hover:bg-forest-800 group-hover:text-emerald-300 transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-gray-900">{tp.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{tp.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
