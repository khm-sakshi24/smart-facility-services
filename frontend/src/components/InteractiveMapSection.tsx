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
  X,
  ArrowRight,
  Sparkles,
  CheckCircle2,
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

interface TechPillar {
  icon: React.ElementType;
  title: string;
  shortDesc: string;
  badge: string;
  fullDesc: string;
  benefits: string[];
}

const techPillars: TechPillar[] = [
  {
    icon: Radio,
    title: "GPS-Tracked Dispatch",
    shortDesc: "Mobile technician vans routed via live traffic navigation for under-30-minute arrival.",
    badge: "Live Fleet Logistics",
    fullDesc:
      "Our operations command deploys GPS-tracked service vehicles stationed across Hoodi Circle, Garudachar Palya, and Whitefield. When an urgent breakdown is reported, the nearest available electrician, plumber, or STP technician is automatically assigned.",
    benefits: [
      "< 30-minute average emergency arrival time",
      "Real-time route optimization avoiding Bengaluru traffic bottlenecks",
      "Fully stocked spare parts vans on standby 24/7",
    ],
  },
  {
    icon: QrCode,
    title: "Digital QR Patrols",
    shortDesc: "Housekeeping and security scan on-site QR checkpoints across apartment blocks.",
    badge: "Verified On-Site Audits",
    fullDesc:
      "Unique tamper-proof QR tags are installed across key checkpoints in your property (lobbies, clubhouses, basement pump rooms, and terrace water tanks). Staff scan each QR code upon completing their checklists, generating a verifiable digital timestamp.",
    benefits: [
      "100% verified staff attendance & patrol checkpoints",
      "Prevents missed cleaning rounds in common corridors",
      "Instant supervisor escalation if a checkpoint is delayed",
    ],
  },
  {
    icon: Cpu,
    title: "IoT Sensor Alerts",
    shortDesc: "Telemetry monitoring for STP effluent levels, pump pressures, and tank capacities.",
    badge: "Predictive Equipment Health",
    fullDesc:
      "We utilize continuous telemetry monitoring for critical water and power infrastructure. Water tank levels, hydro-pneumatic water supply pressure, and STP/ETP aeration blower metrics are tracked to detect abnormalities before an outage occurs.",
    benefits: [
      "Early warning alarms before overhead tanks run dry",
      "Prevents dry-run pump burnouts & electrical panel trips",
      "Ensures treated water meets KSPCB discharge standards",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Cloud Maintenance Logs",
    shortDesc: "Daily checklists signed digitally and shared directly with society RWA committees.",
    badge: "100% RWA Transparency",
    fullDesc:
      "All daily shift handovers, chemical consumption logs (STP & pool chlorine), and diesel generator runtime logs are maintained in a secure cloud registry, eliminating messy paper logs and providing managing committees with complete operational clarity.",
    benefits: [
      "Transparent monthly maintenance & compliance reports",
      "Instant PDF and WhatsApp updates for RWA executives",
      "Auditable maintenance records for annual general meetings",
    ],
  },
];

interface InteractiveMapSectionProps {
  onOpenLocationModal?: (locName: string) => void;
}

export const InteractiveMapSection: React.FC<InteractiveMapSectionProps> = ({
  onOpenLocationModal,
}) => {
  const [selectedTab, setSelectedTab] = useState<MapTab>(mapTabs[0]);
  const [activeTech, setActiveTech] = useState<TechPillar | null>(null);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    selectedTab.query
  )}`;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
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
        {mapTabs.map((tab, idx) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 border hover:-translate-y-0.5 active:scale-95 ${
              selectedTab.id === tab.id
                ? "bg-forest-900 text-white border-forest-950 shadow-md scale-102"
                : "bg-white text-gray-700 border-gray-200 hover:bg-emerald-50 hover:border-emerald-300"
            }`}
          >
            <MapPin
              className={`w-3.5 h-3.5 ${
                selectedTab.id === tab.id ? "text-brandPink-300 anim-marker-pulse" : "text-emerald-600"
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
            className="absolute bottom-3 right-3 bg-forest-900/90 hover:bg-forest-950 text-white px-3 py-1.5 rounded-xl shadow-lg text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs hover:scale-105 active:scale-95 transition-all"
          >
            <span>Touch to View on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
          </a>
        </div>

        {/* Right: Hub Details & Contact (5 cols) */}
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
              className="py-2.5 px-3 rounded-xl bg-forest-800 hover:bg-forest-900 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-xs transition-transform flex items-center justify-center gap-1.5 text-center"
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
              className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-xs transition-transform flex items-center justify-center gap-1.5 text-center"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Hub</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4 Interactive Technology Infrastructure Cards: Touch to open details! */}
      <div className="space-y-2 pt-2">
        <p className="text-xs text-center text-emerald-800 font-bold">
          ⚡ Touch any technology card below to see how it protects your building:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techPillars.map((tp, idx) => {
            const Icon = tp.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTech(tp)}
                className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:border-emerald-500 hover:shadow-lg active:scale-95 transition-all space-y-3 text-left group cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-forest-800 flex items-center justify-center group-hover:bg-forest-800 group-hover:text-emerald-300 transition-colors shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-forest-950">
                      {tp.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 group-hover:text-forest-900 transition-colors">
                    {tp.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {tp.shortDesc}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-forest-900">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Technology Details Interactive Modal */}
      {activeTech && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveTech(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-emerald-200 animate-in zoom-in-95 duration-200 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveTech(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pr-8">
              <div className="w-12 h-12 rounded-2xl bg-forest-800 text-emerald-300 flex items-center justify-center shrink-0 shadow-md">
                <activeTech.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {activeTech.badge}
                </span>
                <h3 className="text-xl font-extrabold text-forest-950 mt-1">
                  {activeTech.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              {activeTech.fullDesc}
            </p>

            <div className="space-y-2 pt-2 border-t border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                Key Operational Benefits:
              </span>
              <ul className="space-y-2">
                {activeTech.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2.5">
              <a
                href={getPhoneLink()}
                className="py-2.5 px-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform text-center"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-300" />
                <span>Call Operations</span>
              </a>

              <a
                href={getWhatsAppLink(
                  `Hello Smart Facility Services, I would like to inquire about implementing ${activeTech.title} for my building.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform text-center"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
