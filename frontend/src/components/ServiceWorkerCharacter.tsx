"use client";

import React, { useState, useEffect, useRef } from "react";

interface ServiceWorkerCharacterProps {
  serviceSlug: string;
  isCardHovered?: boolean;
}

/**
 * ServiceWorkerCharacter:
 * Displays a professional, vector-styled animated facility technician.
 * 
 * Rules:
 * - Plays ONCE when the card enters the viewport.
 * - Replays ONCE on desktop hover.
 * - Stops in a natural resting position (no continuous looping).
 * - Adheres strictly to the company's brand colors (forest green & emerald).
 * - Clean corporate illustration style (no childish/cartoon aesthetics).
 * - Each service has its unique WORKER + EQUIPMENT + ACTION + SUCCESS RESULT.
 */
export const ServiceWorkerCharacter: React.FC<ServiceWorkerCharacterProps> = ({
  serviceSlug,
  isCardHovered = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [playCount, setPlayCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const prevHoverRef = useRef(false);

  // Viewport entrance detection via IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true);
            setPlayCount((prev) => prev + 1);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isInView]);

  // Replay once on desktop hover
  useEffect(() => {
    if (isCardHovered && !prevHoverRef.current && isInView) {
      setPlayCount((prev) => prev + 1);
    }
    prevHoverRef.current = isCardHovered;
  }, [isCardHovered, isInView]);

  const config = getServiceConfig(serviceSlug);
  if (!config) return null;

  return (
    <div
      ref={containerRef}
      className="w-full select-none"
      aria-label={`Smart Facility Services ${config.title}`}
    >
      {/* Top Header Label & Dynamic Success Badge */}
      <div className="flex items-center justify-between pb-1 px-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 truncate max-w-[65%]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
          <span className="truncate">{config.protocolLabel}</span>
        </span>
        <span
          key={`badge-${playCount}`}
          className="text-[10px] font-bold text-forest-900 bg-white/95 px-2 py-0.5 rounded-full border border-emerald-300 shadow-2xs flex items-center gap-1 shrink-0 transition-opacity duration-500"
          style={{
            animation: playCount > 0 ? "badgeRevealAnim 0.4s ease-out 1.3s both" : "none",
          }}
        >
          <svg className="w-3 h-3 text-emerald-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="truncate">{config.successBadge}</span>
        </span>
      </div>

      {/* Animation Stage Card */}
      <div className="w-full h-24 sm:h-28 relative rounded-xl bg-gradient-to-b from-white via-emerald-50/40 to-emerald-100/30 border border-emerald-200/60 overflow-hidden flex items-center justify-center">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#14532d_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

        {/* Dynamic Vector SVG Animation */}
        {renderSvgScene(serviceSlug, playCount)}

        {/* Replay Hint Pill (Desktop only) */}
        <div className="absolute bottom-1 right-2 hidden sm:flex items-center gap-1 text-[9px] font-semibold text-gray-500 bg-white/80 px-2 py-0.5 rounded-full border border-gray-200 pointer-events-none">
          <span>Hover to replay</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   Service Configuration Metadata
   ========================================================================= */
interface ServiceMeta {
  title: string;
  protocolLabel: string;
  successBadge: string;
}

function getServiceConfig(slug: string): ServiceMeta | null {
  switch (slug) {
    case "housekeeping":
      return {
        title: "Housekeeping and Cleaning",
        protocolLabel: "Daily Housekeeping Protocol",
        successBadge: "Pristine & Sanitized",
      };
    case "electrical-maintenance":
      return {
        title: "Electrical Maintenance",
        protocolLabel: "LT Panel & Load Inspection",
        successBadge: "Safe & Calibrated",
      };
    case "plumbing":
      return {
        title: "Plumbing Services",
        protocolLabel: "Pressure & Line Maintenance",
        successBadge: "Leak-Free Sealed",
      };
    case "hvac-maintenance":
      return {
        title: "HVAC Maintenance",
        protocolLabel: "Airflow & Chiller Upkeep",
        successBadge: "Optimized Airflow",
      };
    case "stp-etp-wtp-maintenance":
      return {
        title: "STP / ETP / WTP Operations",
        protocolLabel: "Effluent & Filtration Audit",
        successBadge: "KSPCB Compliant",
      };
    case "water-tank-cleaning":
      return {
        title: "Water Tank Cleaning",
        protocolLabel: "Multi-Stage Tank Disinfection",
        successBadge: "Potable & Sanitized",
      };
    case "security-staffing":
      return {
        title: "Security Staffing",
        protocolLabel: "Access Verification & Patrol",
        successBadge: "Verified & Secured",
      };
    case "general-maintenance":
      return {
        title: "General Maintenance",
        protocolLabel: "Multi-Craft Preventive Care",
        successBadge: "Precision Aligned",
      };
    case "consultancy-engineering":
      return {
        title: "Consultancy & Engineering",
        protocolLabel: "Technical Facility Audit",
        successBadge: "Audit Certified",
      };
    case "sewage-tank-cleaning":
      return {
        title: "Sewage Tank Deep Cleaning",
        protocolLabel: "Chamber De-Sludging Protocol",
        successBadge: "Gas-Free & Clear",
      };
    case "swimming-pool-maintenance":
      return {
        title: "Swimming Pool Maintenance",
        protocolLabel: "Water Chemistry & Filtration",
        successBadge: "pH Balanced & Pure",
      };
    case "swimming-pool-rework":
      return {
        title: "Swimming Pool Rework",
        protocolLabel: "Tile Grouting & Waterproofing",
        successBadge: "Restored & Sealed",
      };
    case "erection-commissioning-installation-maintenance":
      return {
        title: "Erection & Commissioning",
        protocolLabel: "Motor Alignment & Startup",
        successBadge: "Commissioned Ready",
      };
    default:
      return null;
  }
}

/* =========================================================================
   SVG Scene Dispatcher
   ========================================================================= */
function renderSvgScene(slug: string, playCount: number) {
  switch (slug) {
    case "housekeeping":
      return <HousekeepingScene playCount={playCount} />;
    case "electrical-maintenance":
      return <ElectricalScene playCount={playCount} />;
    case "plumbing":
      return <PlumbingScene playCount={playCount} />;
    case "hvac-maintenance":
      return <HvacScene playCount={playCount} />;
    case "stp-etp-wtp-maintenance":
      return <StpScene playCount={playCount} />;
    case "water-tank-cleaning":
      return <WaterTankScene playCount={playCount} />;
    case "security-staffing":
      return <SecurityScene playCount={playCount} />;
    case "general-maintenance":
      return <GeneralMaintenanceScene playCount={playCount} />;
    case "consultancy-engineering":
      return <ConsultancyScene playCount={playCount} />;
    case "sewage-tank-cleaning":
      return <SewageTankScene playCount={playCount} />;
    case "swimming-pool-maintenance":
      return <PoolMaintenanceScene playCount={playCount} />;
    case "swimming-pool-rework":
      return <PoolReworkScene playCount={playCount} />;
    case "erection-commissioning-installation-maintenance":
      return <CommissioningScene playCount={playCount} />;
    default:
      return null;
  }
}

/* =========================================================================
   1. HOUSEKEEPING (Approved Reference Style)
   ========================================================================= */
const HousekeepingScene: React.FC<{ playCount: number }> = ({ playCount }) => (
  <svg
    key={`svg-hk-${playCount}`}
    viewBox="0 0 320 120"
    className="w-full h-full max-h-28"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
  >
    <defs>
      <linearGradient id="hkGleam" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
        <stop offset="50%" stopColor="#34d399" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="hkSparkle" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="50%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <style>{`
        @keyframes hkMopSweep {
          0% { transform: rotate(0deg) translateX(0px); }
          25% { transform: rotate(-14deg) translateX(-18px); }
          60% { transform: rotate(14deg) translateX(18px); }
          85% { transform: rotate(-4deg) translateX(-4px); }
          100% { transform: rotate(0deg) translateX(0px); }
        }
        @keyframes hkArmGuide {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          60% { transform: rotate(8deg); }
          85% { transform: rotate(-2deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes hkFloorShine {
          0% { opacity: 0; transform: scaleX(0.2); }
          50% { opacity: 0.8; transform: scaleX(1); }
          100% { opacity: 0.4; transform: scaleX(1); }
        }
        @keyframes hkSparklePop {
          0% { opacity: 0; transform: scale(0) rotate(0deg); }
          60% { opacity: 1; transform: scale(1.25) rotate(45deg); }
          100% { opacity: 1; transform: scale(1) rotate(90deg); }
        }
        @keyframes badgeRevealAnim {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .hk-mop-anim { transform-origin: 195px 65px; animation: hkMopSweep 1.8s cubic-bezier(0.45, 0.05, 0.25, 0.95) forwards; }
        .hk-arm-anim { transform-origin: 185px 50px; animation: hkArmGuide 1.8s cubic-bezier(0.45, 0.05, 0.25, 0.95) forwards; }
        .hk-floor-gleam { transform-origin: 195px 105px; animation: hkFloorShine 1.8s ease-out forwards; }
        .hk-sparkle-1 { transform-origin: 145px 95px; animation: hkSparklePop 0.5s cubic-bezier(0.17, 0.89, 0.32, 1.25) 1.2s forwards; }
        .hk-sparkle-2 { transform-origin: 235px 90px; animation: hkSparklePop 0.5s cubic-bezier(0.17, 0.89, 0.32, 1.25) 1.4s forwards; }
        @media (prefers-reduced-motion: reduce) {
          .hk-mop-anim, .hk-arm-anim, .hk-floor-gleam, .hk-sparkle-1, .hk-sparkle-2 {
            animation: none !important; opacity: 1 !important; transform: none !important;
          }
        }
      `}</style>
    </defs>
    <g opacity="0.6">
      <line x1="30" y1="105" x2="290" y2="105" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="60" y1="105" x2="40" y2="118" stroke="#e2e8f0" strokeWidth="1.2" />
      <line x1="120" y1="105" x2="110" y2="118" stroke="#e2e8f0" strokeWidth="1.2" />
      <line x1="180" y1="105" x2="180" y2="118" stroke="#e2e8f0" strokeWidth="1.2" />
      <line x1="240" y1="105" x2="250" y2="118" stroke="#e2e8f0" strokeWidth="1.2" />
    </g>
    <ellipse cx="195" cy="105" rx="55" ry="4.5" fill="url(#hkGleam)" className={playCount > 0 ? "hk-floor-gleam" : "opacity-0"} />
    <g id="technician-body">
      <ellipse cx="185" cy="106" rx="14" ry="3" fill="#064e3b" fillOpacity="0.12" />
      <path d="M174 102H183V106H172C172 104 173 102 174 102Z" fill="#1e293b" />
      <path d="M187 102H196V106H185C185 104 186 102 187 102Z" fill="#1e293b" />
      <path d="M175 75L174 102H182L184 84L186 102H194L193 75H175Z" fill="#0f291e" />
      <rect x="174" y="73" width="20" height="2.5" rx="1" fill="#0a1d15" />
      <rect x="182.5" y="73" width="3" height="2.5" fill="#94a3b8" />
      <path d="M172 48L174 74H194L196 48C196 48 189 45 184 45C179 45 172 48 172 48Z" fill="#166534" />
      <path d="M180 45L184 51L188 45H180Z" fill="#14532d" />
      <path d="M184 51V72" stroke="#14532d" strokeWidth="1" strokeDasharray="2 2" />
      <rect x="176" y="52" width="4.5" height="5.5" rx="1" fill="#ffffff" />
      <rect x="177" y="53.5" width="2.5" height="1" fill="#16a34a" />
      <circle cx="178.2" cy="55.5" r="0.8" fill="#ec4899" />
      <path d="M174 70H194V72H174V70Z" fill="#22c55e" />
      <rect x="182" y="41" width="4" height="5" fill="#f5d0b5" />
      <circle cx="184" cy="37" r="7" fill="#f5d0b5" />
      <path d="M177 35C177 31 180 28 184 28C188 28 191 31 191 35H177Z" fill="#14532d" />
      <path d="M188 34H196C196 34 195 36 191 36H188V34Z" fill="#0f3e2e" />
      <circle cx="184" cy="31" r="1.2" fill="#22c55e" />
    </g>
    <g className={playCount > 0 ? "hk-arm-anim" : ""}>
      <path d="M173 50L186 63L189 61L176 48L173 50Z" fill="#15803d" />
      <circle cx="188" cy="62" r="2.5" fill="#f5d0b5" />
    </g>
    <g className={playCount > 0 ? "hk-mop-anim" : ""}>
      <line x1="187" y1="56" x2="201" y2="103" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="184" y1="46" x2="188" y2="60" stroke="#334155" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="186" cy="53" r="2.5" fill="#f5d0b5" />
      <rect x="198" y="100.5" width="6.5" height="4" rx="1.5" fill="#047857" />
      <rect x="188" y="103" width="26" height="3.5" rx="1.5" fill="#10b981" />
      <line x1="189" y1="106.5" x2="213" y2="106.5" stroke="#059669" strokeWidth="1" />
    </g>
    <g className={playCount > 0 ? "hk-sparkle-1" : "opacity-0"}>
      <path d="M145 90L146.5 94L150.5 95.5L146.5 97L145 101L143.5 97L139.5 95.5L143.5 94L145 90Z" fill="url(#hkSparkle)" />
      <circle cx="145" cy="95.5" r="1.2" fill="#ffffff" />
    </g>
    <g className={playCount > 0 ? "hk-sparkle-2" : "opacity-0"}>
      <path d="M235 85L236.2 88.5L239.5 89.8L236.2 91.1L235 94.5L233.8 91.1L230.5 89.8L233.8 88.5L235 85Z" fill="url(#hkSparkle)" />
      <circle cx="235" cy="89.8" r="1" fill="#ffffff" />
    </g>
  </svg>
);

/* =========================================================================
   2. ELECTRICAL MAINTENANCE
   Technician inspects electrical panel → probes switch → indicator turns safe green
   ========================================================================= */
const ElectricalScene: React.FC<{ playCount: number }> = ({ playCount }) => (
  <svg key={`svg-elec-${playCount}`} viewBox="0 0 320 120" className="w-full h-full max-h-28" fill="none">
    <defs>
      <style>{`
        @keyframes elecArmProbe {
          0% { transform: rotate(0deg); }
          30% { transform: rotate(-12deg) translateY(-2px); }
          65% { transform: rotate(-10deg) translateY(-2px); }
          100% { transform: rotate(0deg); }
        }
        @keyframes elecIndicatorLight {
          0% { fill: #f59e0b; }
          45% { fill: #f59e0b; }
          60% { fill: #10b981; filter: drop-shadow(0 0 3px #34d399); }
          100% { fill: #10b981; filter: drop-shadow(0 0 2px #34d399); }
        }
        @keyframes elecMeterScreen {
          0% { opacity: 0.5; }
          55% { opacity: 1; }
          100% { opacity: 1; }
        }
        .elec-arm { transform-origin: 195px 52px; animation: elecArmProbe 1.8s ease-in-out forwards; }
        .elec-led { animation: elecIndicatorLight 1.8s ease-out forwards; }
        .elec-screen { animation: elecMeterScreen 1.8s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .elec-arm, .elec-led, .elec-screen { animation: none !important; transform: none !important; }
        }
      `}</style>
    </defs>
    {/* Floor Baseline */}
    <line x1="30" y1="105" x2="290" y2="105" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
    
    {/* Industrial LT Control Panel Cabinet */}
    <rect x="90" y="32" width="62" height="73" rx="4" fill="#334155" stroke="#1e293b" strokeWidth="2" />
    <rect x="94" y="36" width="54" height="65" rx="2" fill="#1e293b" />
    {/* Panel Breakers & Rows */}
    <rect x="98" y="41" width="18" height="6" rx="1" fill="#475569" />
    <rect x="120" y="41" width="22" height="6" rx="1" fill="#0f172a" />
    {/* Digital Meter Screen (415V Balanced) */}
    <rect x="98" y="52" width="46" height="13" rx="1.5" fill="#064e3b" stroke="#047857" strokeWidth="1" />
    <text x="101" y="62" fontSize="7.5" fill="#34d399" fontFamily="monospace" fontWeight="bold" className="elec-screen">
      415V OK
    </text>
    {/* Status Indicator Lamps: Red, Amber, Green */}
    <circle cx="102" cy="73" r="2.5" fill="#64748b" />
    <circle cx="112" cy="73" r="2.5" fill="#64748b" />
    <circle cx="122" cy="73" r="3.2" className="elec-led" />
    {/* Safe Switch Toggle */}
    <rect x="98" y="82" width="16" height="12" rx="2" fill="#475569" />
    <line x1="106" y1="88" x2="111" y2="84" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

    {/* Electrician Technician in Uniform with Insulated Probe */}
    <ellipse cx="205" cy="106" rx="14" ry="3" fill="#064e3b" fillOpacity="0.12" />
    <path d="M194 102H203V106H192C192 104 193 102 194 102Z" fill="#1e293b" />
    <path d="M207 102H216V106H205C205 104 206 102 207 102Z" fill="#1e293b" />
    <path d="M195 75L194 102H202L204 84L206 102H214L213 75H195Z" fill="#0f291e" />
    <path d="M192 48L194 74H214L216 48C216 48 209 45 204 45C199 45 192 48 192 48Z" fill="#166534" />
    <path d="M200 45L204 51L208 45H200Z" fill="#14532d" />
    <rect x="196" y="52" width="4.5" height="5.5" rx="1" fill="#ffffff" />
    <rect x="197" y="53.5" width="2.5" height="1" fill="#16a34a" />
    <circle cx="204" cy="37" r="7" fill="#f5d0b5" />
    {/* Safety Helmet (Yellow/Orange with Green Visor) */}
    <path d="M197 35C197 30 200 27 204 27C208 27 211 30 211 35H197Z" fill="#f59e0b" />
    <path d="M196 34H213V36H196Z" fill="#d97706" />

    {/* Right Hand holding Insulated Multimeter Test Lead Probe */}
    <g className={playCount > 0 ? "elec-arm" : ""}>
      <path d="M194 50L174 60L172 58L192 47L194 50Z" fill="#15803d" />
      <circle cx="172" cy="59" r="2.5" fill="#f5d0b5" />
      {/* Insulated Testing Probe */}
      <line x1="171" y1="59" x2="148" y2="68" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      <line x1="148" y1="68" x2="142" y2="71" stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" />
    </g>
    {/* Left Arm at Rest */}
    <path d="M214 50L216 68L212 68L210 50Z" fill="#14532d" />
    <circle cx="214" cy="70" r="2.2" fill="#f5d0b5" />
  </svg>
);

/* =========================================================================
   3. PLUMBING
   Water pipe drip → plumber turns wrench → leak stops → pipe sealed
   ========================================================================= */
const PlumbingScene: React.FC<{ playCount: number }> = ({ playCount }) => (
  <svg key={`svg-plumb-${playCount}`} viewBox="0 0 320 120" className="w-full h-full max-h-28" fill="none">
    <defs>
      <style>{`
        @keyframes plumbWrenchTurn {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-18deg); }
          55% { transform: rotate(8deg); }
          80% { transform: rotate(-3deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes plumbWaterDrip {
          0% { opacity: 0.9; transform: translateY(0px) scale(1); }
          40% { opacity: 0.8; transform: translateY(8px) scale(0.9); }
          65% { opacity: 0; transform: translateY(14px) scale(0.2); }
          100% { opacity: 0; transform: translateY(14px) scale(0); }
        }
        @keyframes plumbSealGleam {
          0% { opacity: 0; transform: scale(0.4); }
          70% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.8; transform: scale(1); }
        }
        .plumb-wrench { transform-origin: 154px 62px; animation: plumbWrenchTurn 1.8s ease-in-out forwards; }
        .plumb-drip { animation: plumbWaterDrip 1.3s ease-in forwards; }
        .plumb-seal { transform-origin: 154px 62px; animation: plumbSealGleam 0.5s ease-out 1.2s forwards; }
        @media (prefers-reduced-motion: reduce) {
          .plumb-wrench, .plumb-drip, .plumb-seal { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </defs>
    <line x1="30" y1="105" x2="290" y2="105" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
    
    {/* Pipe Manifold System */}
    <rect x="70" y="58" width="85" height="10" rx="2" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
    <rect x="155" y="44" width="10" height="38" rx="2" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
    {/* Flange Coupling Joint */}
    <rect x="148" y="54" width="12" height="18" rx="2" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
    {/* Pressure Valve Handwheel */}
    <circle cx="100" cy="50" r="7" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
    <rect x="98" y="50" width="4" height="8" fill="#475569" />

    {/* Water Drip (Stops when tightened) */}
    <g className={playCount > 0 ? "plumb-drip" : ""}>
      <path d="M154 74C154 74 151 78 151 81C151 83 152.3 84.5 154 84.5C155.7 84.5 157 83 157 81C157 78 154 74 154 74Z" fill="#38bdf8" />
    </g>
    {/* Seal Sparkle Ring */}
    <circle cx="154" cy="63" r="5" fill="#34d399" fillOpacity="0.4" className={playCount > 0 ? "plumb-seal" : "opacity-0"} />

    {/* Plumber Technician */}
    <ellipse cx="215" cy="106" rx="14" ry="3" fill="#064e3b" fillOpacity="0.12" />
    <path d="M204 102H213V106H202C202 104 203 102 204 102Z" fill="#1e293b" />
    <path d="M217 102H226V106H215C215 104 216 102 217 102Z" fill="#1e293b" />
    <path d="M205 75L204 102H212L214 84L216 102H224L223 75H205Z" fill="#0f291e" />
    <path d="M202 48L204 74H224L226 48C226 48 219 45 214 45C209 45 202 48 202 48Z" fill="#166534" />
    {/* Tool Holster Belt */}
    <rect x="204" y="73" width="20" height="3" fill="#78350f" />
    <rect x="206" y="76" width="5" height="7" rx="1" fill="#92400e" />
    <circle cx="214" cy="37" r="7" fill="#f5d0b5" />
    <path d="M207 35C207 31 210 28 214 28C218 28 221 31 221 35H207Z" fill="#14532d" />
    <path d="M218 34H226V36H218Z" fill="#0f3e2e" />

    {/* Wrench and Arms */}
    <g className={playCount > 0 ? "plumb-wrench" : ""}>
      <path d="M203 50L180 58L178 55L201 47L203 50Z" fill="#15803d" />
      <circle cx="178" cy="57" r="2.5" fill="#f5d0b5" />
      {/* Heavy-duty Adjustable Pipe Wrench */}
      <line x1="180" y1="57" x2="154" y2="62" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
      <rect x="148" y="58" width="9" height="7" rx="1" fill="#dc2626" />
      <rect x="150" y="60" width="5" height="3" fill="#cbd5e1" />
    </g>
  </svg>
);

/* =========================================================================
   4. HVAC MAINTENANCE
   AC outdoor/indoor unit → fan spins → cool airflow waves emerge → safe status
   ========================================================================= */
const HvacScene: React.FC<{ playCount: number }> = ({ playCount }) => (
  <svg key={`svg-hvac-${playCount}`} viewBox="0 0 320 120" className="w-full h-full max-h-28" fill="none">
    <defs>
      <style>{`
        @keyframes hvacFanSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(720deg); }
        }
        @keyframes hvacAirflowFlow {
          0% { opacity: 0; transform: translateX(-10px) scaleX(0.4); }
          50% { opacity: 0.9; transform: translateX(0px) scaleX(1); }
          100% { opacity: 0.7; transform: translateX(4px) scaleX(1); }
        }
        @keyframes hvacCoolLed {
          0% { fill: #94a3b8; }
          40% { fill: #06b6d4; }
          100% { fill: #10b981; filter: drop-shadow(0 0 3px #10b981); }
        }
        .hvac-fan { transform-origin: 120px 65px; animation: hvacFanSpin 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .hvac-air { animation: hvacAirflowFlow 1.8s ease-out forwards; }
        .hvac-led { animation: hvacCoolLed 1.8s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .hvac-fan, .hvac-air, .hvac-led { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </defs>
    <line x1="30" y1="105" x2="290" y2="105" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
    
    {/* AC Condenser / Chiller Unit */}
    <rect x="85" y="42" width="70" height="58" rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
    <circle cx="120" cy="65" r="20" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
    {/* AC Fan Blades */}
    <g className={playCount > 0 ? "hvac-fan" : ""}>
      <circle cx="120" cy="65" r="4.5" fill="#334155" />
      <path d="M120 61C117 53 123 53 120 61Z" fill="#475569" />
      <path d="M124 65C132 62 132 68 124 65Z" fill="#475569" />
      <path d="M120 69C123 77 117 77 120 69Z" fill="#475569" />
      <path d="M116 65C108 68 108 62 116 65Z" fill="#475569" />
    </g>
    {/* Protective Grille Lines */}
    <line x1="100" y1="65" x2="140" y2="65" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="120" y1="45" x2="120" y2="85" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.5" />
    {/* Status LED */}
    <circle cx="147" cy="49" r="2.5" className="hvac-led" />

    {/* Cool Airflow Streamlines (Emerge and curve cleanly) */}
    <g className={playCount > 0 ? "hvac-air" : "opacity-0"}>
      <path d="M142 56C158 54 165 58 178 57" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      <path d="M144 65C160 65 168 67 182 66" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 2" />
      <path d="M142 74C158 76 165 72 178 73" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* HVAC Technician */}
    <ellipse cx="215" cy="106" rx="14" ry="3" fill="#064e3b" fillOpacity="0.12" />
    <path d="M204 102H213V106H202C202 104 203 102 204 102Z" fill="#1e293b" />
    <path d="M217 102H226V106H215C215 104 216 102 217 102Z" fill="#1e293b" />
    <path d="M205 75L204 102H212L214 84L216 102H224L223 75H205Z" fill="#0f291e" />
    <path d="M202 48L204 74H224L226 48C226 48 219 45 214 45C209 45 202 48 202 48Z" fill="#166534" />
    <circle cx="214" cy="37" r="7" fill="#f5d0b5" />
    <path d="M207 35C207 31 210 28 214 28C218 28 221 31 221 35H207Z" fill="#14532d" />
    <path d="M218 34H226V36H218Z" fill="#0f3e2e" />
    {/* Safety Goggles */}
    <rect x="212" y="35" width="7" height="3" rx="1" fill="#0284c7" fillOpacity="0.8" />
    {/* Holding Digital Temperature Gauge */}
    <path d="M203 50L186 58L184 55L201 47L203 50Z" fill="#15803d" />
    <rect x="180" y="54" width="7" height="12" rx="1.5" fill="#334155" />
    <rect x="181.5" y="56" width="4" height="4" fill="#38bdf8" />
  </svg>
);

/* =========================================================================
   5. STP / ETP / WTP OPERATIONS
   3-stage biological & filtration tanks → water purifies → KSPCB safe output
   ========================================================================= */
const StpScene: React.FC<{ playCount: number }> = ({ playCount }) => (
  <svg key={`svg-stp-${playCount}`} viewBox="0 0 320 120" className="w-full h-full max-h-28" fill="none">
    <defs>
      <style>{`
        @keyframes stpWaterFlow {
          0% { fill: #78716c; }
          45% { fill: #0284c7; }
          100% { fill: #06b6d4; }
        }
        @keyframes stpCleanGleam {
          0% { opacity: 0; transform: scale(0.3); }
          70% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.8; transform: scale(1); }
        }
        .stp-water { animation: stpWaterFlow 1.8s ease-in-out forwards; }
        .stp-gleam { transform-origin: 168px 75px; animation: stpCleanGleam 0.5s ease-out 1.2s forwards; }
        @media (prefers-reduced-motion: reduce) {
          .stp-water, .stp-gleam { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </defs>
    <line x1="30" y1="105" x2="290" y2="105" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
    
    {/* Tank 1: Inflow Aeration Chamber */}
    <rect x="75" y="50" width="34" height="50" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
    <rect x="78" y="66" width="28" height="31" fill="#78716c" fillOpacity="0.7" />
    {/* Interconnecting Pipe 1-2 */}
    <rect x="109" y="62" width="12" height="6" fill="#64748b" />
    {/* Tank 2: Media Filtration */}
    <rect x="121" y="46" width="34" height="54" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
    <rect x="124" y="60" width="28" height="37" fill="#0284c7" fillOpacity="0.8" />
    {/* Interconnecting Pipe 2-3 */}
    <rect x="155" y="62" width="12" height="6" fill="#64748b" />
    {/* Tank 3: Clear Treated Effluent Tank */}
    <rect x="167" y="50" width="34" height="50" rx="3" fill="#e2e8f0" stroke="#047857" strokeWidth="1.5" />
    <rect x="170" y="64" width="28" height="33" rx="1" className="stp-water" />
    {/* Clean Water Output Indicator */}
    <circle cx="184" cy="78" r="4" fill="#ffffff" fillOpacity="0.7" className={playCount > 0 ? "stp-gleam" : "opacity-0"} />

    {/* Plant Operator */}
    <ellipse cx="235" cy="106" rx="14" ry="3" fill="#064e3b" fillOpacity="0.12" />
    <path d="M224 102H233V106H222C222 104 223 102 224 102Z" fill="#1e293b" />
    <path d="M237 102H246V106H235C235 104 236 102 237 102Z" fill="#1e293b" />
    <path d="M225 75L224 102H232L234 84L236 102H244L243 75H225Z" fill="#0f291e" />
    <path d="M222 48L224 74H244L246 48C246 48 239 45 234 45C229 45 222 48 222 48Z" fill="#166534" />
    <circle cx="234" cy="37" r="7" fill="#f5d0b5" />
    <path d="M227 35C227 30 230 27 234 27C238 27 241 30 241 35H227Z" fill="#15803d" />
    <path d="M226 34H243V36H226Z" fill="#14532d" />
    {/* Operator holding digital testing sample flask */}
    <path d="M223 50L208 58L206 55L221 47L223 50Z" fill="#15803d" />
    <path d="M204 57L207 68H201L204 57Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
  </svg>
);

/* =========================================================================
   6. WATER TANK CLEANING
   Overhead/underground tank → pressure rinse nozzle cleans wall → sparkling pure water
   ========================================================================= */
const WaterTankScene: React.FC<{ playCount: number }> = ({ playCount }) => (
  <svg key={`svg-tank-${playCount}`} viewBox="0 0 320 120" className="w-full h-full max-h-28" fill="none">
    <defs>
      <style>{`
        @keyframes tankSprayJet {
          0% { opacity: 0; transform: scaleX(0.2); }
          30% { opacity: 0.9; transform: scaleX(1); }
          75% { opacity: 0.7; transform: scaleX(1); }
          100% { opacity: 0; transform: scaleX(0); }
        }
        @keyframes tankDirtFade {
          0% { opacity: 0.8; }
          60% { opacity: 0.2; }
          100% { opacity: 0; }
        }
        @keyframes tankCleanSparkle {
          0% { opacity: 0; transform: scale(0); }
          70% { opacity: 1; transform: scale(1.3); }
          100% { opacity: 1; transform: scale(1); }
        }
        .tank-spray { transform-origin: 165px 62px; animation: tankSprayJet 1.6s ease-out forwards; }
        .tank-dirt { animation: tankDirtFade 1.6s ease-out forwards; }
        .tank-sparkle { transform-origin: 110px 70px; animation: tankCleanSparkle 0.5s ease-out 1.2s forwards; }
        @media (prefers-reduced-motion: reduce) {
          .tank-spray, .tank-dirt, .tank-sparkle { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </defs>
    <line x1="30" y1="105" x2="290" y2="105" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
    
    {/* Large Cylindrical Clean Water Tank */}
    <rect x="75" y="38" width="85" height="65" rx="5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
    {/* Water Fill Level inside Tank */}
    <rect x="78" y="65" width="79" height="35" rx="2" fill="#38bdf8" fillOpacity="0.35" />
    <line x1="78" y1="65" x2="157" y2="65" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 2" />
    {/* Faint Dirt Marks (Disappear under pressure jet) */}
    <g className="tank-dirt">
      <line x1="90" y1="52" x2="100" y2="52" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
      <line x1="93" y1="56" x2="98" y2="56" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    {/* Water Sparkle */}
    <path
      d="M110 65L111.5 69L115.5 70.5L111.5 72L110 76L108.5 72L104.5 70.5L108.5 69L110 65Z"
      fill="#34d399"
      className={playCount > 0 ? "tank-sparkle" : "opacity-0"}
    />

    {/* High-Pressure Spray Jet Fan */}
    <polygon points="165,62 105,48 105,68" fill="#67e8f9" fillOpacity="0.5" className={playCount > 0 ? "tank-spray" : "opacity-0"} />

    {/* Sanitation Technician */}
    <ellipse cx="215" cy="106" rx="14" ry="3" fill="#064e3b" fillOpacity="0.12" />
    <path d="M204 102H213V106H202C202 104 203 102 204 102Z" fill="#1e293b" />
    <path d="M217 102H226V106H215C215 104 216 102 217 102Z" fill="#1e293b" />
    <path d="M205 75L204 102H212L214 84L216 102H224L223 75H205Z" fill="#0f291e" />
    <path d="M202 48L204 74H224L226 48C226 48 219 45 214 45C209 45 202 48 202 48Z" fill="#166534" />
    <circle cx="214" cy="37" r="7" fill="#f5d0b5" />
    <path d="M207 35C207 30 210 27 214 27C218 27 221 30 221 35H207Z" fill="#047857" />
    <path d="M206 34H223V36H206Z" fill="#065f46" />
    {/* Pressure Lance Wand */}
    <line x1="202" y1="58" x2="165" y2="62" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="163" y="60.5" width="4" height="3" fill="#0284c7" />
  </svg>
);

/* =========================================================================
   7. SECURITY STAFFING
   Guard at gate console → scan beam verifies → security shield badge pops
   ========================================================================= */
const SecurityScene: React.FC<{ playCount: number }> = ({ playCount }) => (
  <svg key={`svg-sec-${playCount}`} viewBox="0 0 320 120" className="w-full h-full max-h-28" fill="none">
    <defs>
      <style>{`
        @keyframes secScanBeam {
          0% { opacity: 0; transform: translateY(-8px); }
          40% { opacity: 0.9; transform: translateY(4px); }
          80% { opacity: 0.6; transform: translateY(0px); }
          100% { opacity: 0; transform: translateY(0px); }
        }
        @keyframes secShieldReveal {
          0% { opacity: 0; transform: scale(0.3); }
          70% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
        .sec-beam { animation: secScanBeam 1.5s ease-in-out forwards; }
        .sec-shield { transform-origin: 120px 60px; animation: secShieldReveal 0.6s ease-out 1.1s forwards; }
        @media (prefers-reduced-motion: reduce) {
          .sec-beam, .sec-shield { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </defs>
    <line x1="30" y1="105" x2="290" y2="105" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
    
    {/* Digital Gate Access Console Pedestal */}
    <rect x="105" y="55" width="30" height="48" rx="3" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
    <rect x="110" y="60" width="20" height="15" rx="1.5" fill="#0f172a" />
    {/* RFID Scanner Beam */}
    <line x1="110" y1="67" x2="130" y2="67" stroke="#10b981" strokeWidth="1.5" className={playCount > 0 ? "sec-beam" : "opacity-0"} />

    {/* Verification Security Shield Badge */}
    <g className={playCount > 0 ? "sec-shield" : "opacity-0"}>
      <path d="M120 50L129 54V64C129 70 120 74 120 74C120 74 111 70 111 64V54L120 50Z" fill="#10b981" />
      <path d="M116 62L119 65L124 59" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Uniformed Corporate Security Officer */}
    <ellipse cx="205" cy="106" rx="14" ry="3" fill="#064e3b" fillOpacity="0.12" />
    <path d="M194 102H203V106H192C192 104 193 102 194 102Z" fill="#0f172a" />
    <path d="M207 102H216V106H205C205 104 206 102 207 102Z" fill="#0f172a" />
    <path d="M195 75L194 102H202L204 84L206 102H214L213 75H195Z" fill="#091811" />
    {/* Smart Facility Services Security Blazer (Forest Green) */}
    <path d="M192 48L194 74H214L216 48C216 48 209 45 204 45C199 45 192 48 192 48Z" fill="#14532d" />
    {/* Gold Security Epaulettes */}
    <rect x="191" y="48" width="5" height="2" fill="#f59e0b" />
    <rect x="212" y="48" width="5" height="2" fill="#f59e0b" />
    <path d="M200 45L204 52L208 45H200Z" fill="#ffffff" />
    <polygon points="204,50 205.5,58 204,68 202.5,58" fill="#1e293b" />
    <circle cx="204" cy="37" r="7" fill="#f5d0b5" />
    {/* Security Officer Peaked Visor Cap */}
    <path d="M196 34C196 30 199 26 204 26C209 26 212 30 212 34H196Z" fill="#14532d" />
    <rect x="195" y="33" width="18" height="2" fill="#f59e0b" />
    <path d="M196 35H213V37H196Z" fill="#0f172a" />
  </svg>
);

/* =========================================================================
   8. GENERAL MAINTENANCE
   Technician with wrench aligns dual interlocking gears → precision balance
   ========================================================================= */
const GeneralMaintenanceScene: React.FC<{ playCount: number }> = ({ playCount }) => (
  <svg key={`svg-gen-${playCount}`} viewBox="0 0 320 120" className="w-full h-full max-h-28" fill="none">
    <defs>
      <style>{`
        @keyframes genGearMesh {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(45deg); }
          100% { transform: rotate(90deg); }
        }
        @keyframes genGearCounter {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(-45deg); }
          100% { transform: rotate(-90deg); }
        }
        @keyframes genAlignCheck {
          0% { opacity: 0; transform: scale(0.4); }
          70% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
        .gen-gear-1 { transform-origin: 110px 65px; animation: genGearMesh 1.8s ease-in-out forwards; }
        .gen-gear-2 { transform-origin: 136px 65px; animation: genGearCounter 1.8s ease-in-out forwards; }
        .gen-check { transform-origin: 123px 40px; animation: genAlignCheck 0.5s ease-out 1.2s forwards; }
        @media (prefers-reduced-motion: reduce) {
          .gen-gear-1, .gen-gear-2, .gen-check { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </defs>
    <line x1="30" y1="105" x2="290" y2="105" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
    
    {/* Mechanical Mounting Bracket */}
    <rect x="85" y="48" width="75" height="45" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
    
    {/* Interlocking Gear 1 */}
    <g className={playCount > 0 ? "gen-gear-1" : ""}>
      <circle cx="110" cy="65" r="14" fill="#64748b" stroke="#334155" strokeWidth="2" />
      <circle cx="110" cy="65" r="4.5" fill="#e2e8f0" />
      <rect x="108" y="48" width="4" height="34" rx="1" fill="#475569" />
      <rect x="93" y="63" width="34" height="4" rx="1" fill="#475569" />
    </g>

    {/* Interlocking Gear 2 */}
    <g className={playCount > 0 ? "gen-gear-2" : ""}>
      <circle cx="136" cy="65" r="12" fill="#475569" stroke="#1e293b" strokeWidth="2" />
      <circle cx="136" cy="65" r="3.5" fill="#e2e8f0" />
      <rect x="134" y="50" width="4" height="30" rx="1" fill="#64748b" />
      <rect x="121" y="63" width="30" height="4" rx="1" fill="#64748b" />
    </g>

    {/* Precision Alignment Indicator */}
    <g className={playCount > 0 ? "gen-check" : "opacity-0"}>
      <circle cx="123" cy="40" r="5" fill="#10b981" />
      <path d="M121 40L122.5 41.5L125.5 38.5" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
    </g>

    {/* Multi-Skilled Technician */}
    <ellipse cx="205" cy="106" rx="14" ry="3" fill="#064e3b" fillOpacity="0.12" />
    <path d="M194 102H203V106H192C192 104 193 102 194 102Z" fill="#1e293b" />
    <path d="M207 102H216V106H205C205 104 206 102 207 102Z" fill="#1e293b" />
    <path d="M195 75L194 102H202L204 84L206 102H214L213 75H195Z" fill="#0f291e" />
    <path d="M192 48L194 74H214L216 48C216 48 209 45 204 45C199 45 192 48 192 48Z" fill="#166534" />
    <circle cx="204" cy="37" r="7" fill="#f5d0b5" />
    <path d="M197 35C197 31 200 28 204 28C208 28 211 31 211 35H197Z" fill="#14532d" />
    <path d="M208 34H216V36H208Z" fill="#0f3e2e" />
    {/* Tool in Hand */}
    <line x1="192" y1="58" x2="152" y2="65" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="192" cy="58" r="2.5" fill="#f5d0b5" />
  </svg>
);

/* =========================================================================
   9. CONSULTANCY & ENGINEERING
   Engineer reviews schematic on clipboard/tablet → sequential checkmarks → audit approved
   ========================================================================= */
const ConsultancyScene: React.FC<{ playCount: number }> = ({ playCount }) => (
  <svg key={`svg-cons-${playCount}`} viewBox="0 0 320 120" className="w-full h-full max-h-28" fill="none">
    <defs>
      <style>{`
        @keyframes consRowCheck1 { 0% { opacity: 0; } 30% { opacity: 1; } 100% { opacity: 1; } }
        @keyframes consRowCheck2 { 0% { opacity: 0; } 60% { opacity: 1; } 100% { opacity: 1; } }
        @keyframes consRowCheck3 { 0% { opacity: 0; } 85% { opacity: 1; } 100% { opacity: 1; } }
        @keyframes consSealStamp {
          0% { opacity: 0; transform: scale(1.8) rotate(-15deg); }
          75% { opacity: 1; transform: scale(1) rotate(0deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .cons-c1 { animation: consRowCheck1 1.8s ease-out forwards; }
        .cons-c2 { animation: consRowCheck2 1.8s ease-out forwards; }
        .cons-c3 { animation: consRowCheck3 1.8s ease-out forwards; }
        .cons-seal { transform-origin: 160px 48px; animation: consSealStamp 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28) 1.2s forwards; }
        @media (prefers-reduced-motion: reduce) {
          .cons-c1, .cons-c2, .cons-c3, .cons-seal { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </defs>
    <line x1="30" y1="105" x2="290" y2="105" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
    
    {/* Architectural Blueprint Stand */}
    <rect x="85" y="35" width="75" height="58" rx="3" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
    {/* Blueprint Cad Grid Lines */}
    <line x1="90" y1="50" x2="155" y2="50" stroke="#bae6fd" strokeWidth="1" strokeDasharray="2 2" />
    <line x1="90" y1="65" x2="155" y2="65" stroke="#bae6fd" strokeWidth="1" strokeDasharray="2 2" />
    <line x1="90" y1="80" x2="155" y2="80" stroke="#bae6fd" strokeWidth="1" strokeDasharray="2 2" />
    {/* Checklist Rows with Sequential Checks */}
    <text x="92" y="47" fontSize="6.5" fill="#ffffff" fontFamily="sans-serif" fontWeight="bold">MEP Load</text>
    <path d="M145 44L147.5 46.5L152 42" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" className="cons-c1" />
    
    <text x="92" y="62" fontSize="6.5" fill="#ffffff" fontFamily="sans-serif" fontWeight="bold">Safety Audit</text>
    <path d="M145 59L147.5 61.5L152 57" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" className="cons-c2" />

    <text x="92" y="77" fontSize="6.5" fill="#ffffff" fontFamily="sans-serif" fontWeight="bold">Compliance</text>
    <path d="M145 74L147.5 76.5L152 72" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" className="cons-c3" />

    {/* Certified Seal Stamp */}
    <g className={playCount > 0 ? "cons-seal" : "opacity-0"}>
      <circle cx="160" cy="48" r="9" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M156 48L159 51L165 45" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Advisory Engineer */}
    <ellipse cx="215" cy="106" rx="14" ry="3" fill="#064e3b" fillOpacity="0.12" />
    <path d="M204 102H213V106H202C202 104 203 102 204 102Z" fill="#1e293b" />
    <path d="M217 102H226V106H215C215 104 216 102 217 102Z" fill="#1e293b" />
    <path d="M205 75L204 102H212L214 84L216 102H224L223 75H205Z" fill="#0f291e" />
    <path d="M202 48L204 74H224L226 48C226 48 219 45 214 45C209 45 202 48 202 48Z" fill="#166534" />
    <circle cx="214" cy="37" r="7" fill="#f5d0b5" />
    <path d="M207 35C207 31 210 28 214 28C218 28 221 31 221 35H207Z" fill="#14532d" />
    <path d="M218 34H226V36H218Z" fill="#0f3e2e" />
    {/* Tablet in Hands */}
    <rect x="188" y="52" width="16" height="22" rx="2" fill="#334155" stroke="#cbd5e1" strokeWidth="1" />
    <rect x="190" y="55" width="12" height="14" fill="#0284c7" />
  </svg>
);

/* =========================================================================
   10. SEWAGE TANK DEEP CLEANING
   PPE technician with suction hose cleans chamber → clear safe state
   ========================================================================= */
const SewageTankScene: React.FC<{ playCount: number }> = ({ playCount }) => (
  <svg key={`svg-sew-${playCount}`} viewBox="0 0 320 120" className="w-full h-full max-h-28" fill="none">
    <defs>
      <style>{`
        @keyframes sewSludgeRecede {
          0% { height: 28px; y: 72px; fill: #44403c; }
          60% { height: 12px; y: 88px; fill: #78716c; }
          100% { height: 3px; y: 97px; fill: #a8a29e; }
        }
        @keyframes sewSuctionPulse {
          0% { opacity: 0.3; }
          50% { opacity: 0.9; }
          100% { opacity: 0.5; }
        }
        @keyframes sewSafeLed {
          0% { fill: #ef4444; }
          70% { fill: #10b981; filter: drop-shadow(0 0 2px #34d399); }
          100% { fill: #10b981; filter: drop-shadow(0 0 3px #34d399); }
        }
        .sew-sludge { animation: sewSludgeRecede 1.8s ease-out forwards; }
        .sew-pulse { animation: sewSuctionPulse 0.6s infinite; }
        .sew-led { animation: sewSafeLed 1.8s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .sew-sludge, .sew-pulse, .sew-led { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </defs>
    <line x1="30" y1="105" x2="290" y2="105" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
    
    {/* Deep Sump Chamber Well */}
    <rect x="80" y="45" width="75" height="58" rx="3" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
    {/* Sludge level recedes cleanly into suction line */}
    <rect x="83" y="72" width="69" height="28" rx="1" className="sew-sludge" />
    {/* Gas Detector Safety LED */}
    <circle cx="90" cy="52" r="3" className="sew-led" />
    <text x="96" y="54" fontSize="6.5" fill="#475569" fontWeight="bold">GAS FREE</text>

    {/* Industrial Ribbed Suction Hose */}
    <path d="M190 65C165 60 145 70 135 88" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    <path d="M190 65C165 60 145 70 135 88" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" fill="none" className="sew-pulse" />

    {/* PPE-Equipped Specialized Technician */}
    <ellipse cx="215" cy="106" rx="14" ry="3" fill="#064e3b" fillOpacity="0.12" />
    <path d="M204 102H213V106H202C202 104 203 102 204 102Z" fill="#1e293b" />
    <path d="M217 102H226V106H215C215 104 216 102 217 102Z" fill="#1e293b" />
    <path d="M205 75L204 102H212L214 84L216 102H224L223 75H205Z" fill="#0f291e" />
    <path d="M202 48L204 74H224L226 48C226 48 219 45 214 45C209 45 202 48 202 48Z" fill="#166534" />
    {/* Respirator / Breathing Filter Mask */}
    <circle cx="214" cy="37" r="7" fill="#f5d0b5" />
    <rect x="210" y="36" width="8" height="5" rx="2" fill="#0f172a" />
    <circle cx="214" cy="38.5" r="1.5" fill="#94a3b8" />
    {/* Heavy Safety Helmet */}
    <path d="M207 34C207 29 210 26 214 26C218 26 221 29 221 34H207Z" fill="#f59e0b" />
    <path d="M206 33H223V35H206Z" fill="#d97706" />
  </svg>
);

/* =========================================================================
   11. SWIMMING POOL MAINTENANCE
   Skimmer net glides on water → gentle ripples → balanced pH & sparkle
   ========================================================================= */
const PoolMaintenanceScene: React.FC<{ playCount: number }> = ({ playCount }) => (
  <svg key={`svg-pool-m-${playCount}`} viewBox="0 0 320 120" className="w-full h-full max-h-28" fill="none">
    <defs>
      <style>{`
        @keyframes poolSkimSweep {
          0% { transform: rotate(0deg); }
          30% { transform: rotate(-8deg) translateX(-12px); }
          65% { transform: rotate(6deg) translateX(10px); }
          100% { transform: rotate(0deg); }
        }
        @keyframes poolRippleExpand {
          0% { r: 2px; opacity: 0.9; }
          60% { r: 16px; opacity: 0.4; }
          100% { r: 24px; opacity: 0; }
        }
        @keyframes poolSparklePop {
          0% { opacity: 0; transform: scale(0); }
          70% { opacity: 1; transform: scale(1.3); }
          100% { opacity: 1; transform: scale(1); }
        }
        .pool-skim { transform-origin: 195px 60px; animation: poolSkimSweep 1.8s ease-in-out forwards; }
        .pool-rip-1 { animation: poolRippleExpand 1.6s ease-out 0.4s forwards; }
        .pool-rip-2 { animation: poolRippleExpand 1.6s ease-out 0.8s forwards; }
        .pool-spark { transform-origin: 110px 75px; animation: poolSparklePop 0.5s ease-out 1.2s forwards; }
        @media (prefers-reduced-motion: reduce) {
          .pool-skim, .pool-rip-1, .pool-rip-2, .pool-spark { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </defs>
    <line x1="30" y1="105" x2="290" y2="105" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
    
    {/* Swimming Pool Basin Section */}
    <rect x="70" y="55" width="95" height="48" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
    <rect x="74" y="62" width="87" height="37" fill="#38bdf8" fillOpacity="0.8" />
    {/* Water Line Mosaic Border */}
    <rect x="74" y="57" width="87" height="5" fill="#bae6fd" />
    
    {/* Water Ripples */}
    <circle cx="120" cy="78" r="4" stroke="#ffffff" strokeWidth="1.2" fill="none" className={playCount > 0 ? "pool-rip-1" : "opacity-0"} />
    <circle cx="120" cy="78" r="8" stroke="#ffffff" strokeWidth="1" fill="none" className={playCount > 0 ? "pool-rip-2" : "opacity-0"} />

    {/* Sparkle */}
    <path
      d="M110 70L111.5 74L115.5 75.5L111.5 77L110 81L108.5 77L104.5 75.5L108.5 74L110 70Z"
      fill="#ffffff"
      className={playCount > 0 ? "pool-spark" : "opacity-0"}
    />

    {/* Pool Care Technician with Telescopic Skimmer Net */}
    <ellipse cx="215" cy="106" rx="14" ry="3" fill="#064e3b" fillOpacity="0.12" />
    <path d="M204 102H213V106H202C202 104 203 102 204 102Z" fill="#1e293b" />
    <path d="M217 102H226V106H215C215 104 216 102 217 102Z" fill="#1e293b" />
    <path d="M205 75L204 102H212L214 84L216 102H224L223 75H205Z" fill="#0f291e" />
    <path d="M202 48L204 74H224L226 48C226 48 219 45 214 45C209 45 202 48 202 48Z" fill="#166534" />
    <circle cx="214" cy="37" r="7" fill="#f5d0b5" />
    <path d="M207 35C207 31 210 28 214 28C218 28 221 31 221 35H207Z" fill="#14532d" />
    <path d="M218 34H226V36H218Z" fill="#0f3e2e" />

    {/* Telescopic Skimmer Pole & Deep Mesh Net */}
    <g className={playCount > 0 ? "pool-skim" : ""}>
      <line x1="205" y1="56" x2="135" y2="78" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
      {/* Skimmer Mesh Net */}
      <rect x="122" y="74" width="14" height="10" rx="2" fill="#06b6d4" fillOpacity="0.6" stroke="#0891b2" strokeWidth="1.5" />
    </g>
  </svg>
);

/* =========================================================================
   12. SWIMMING POOL REWORK
   Technician sets mosaic tiles → grout bead completes → pristine restored edge
   ========================================================================= */
const PoolReworkScene: React.FC<{ playCount: number }> = ({ playCount }) => (
  <svg key={`svg-pool-r-${playCount}`} viewBox="0 0 320 120" className="w-full h-full max-h-28" fill="none">
    <defs>
      <style>{`
        @keyframes tilePlaceAnim {
          0% { opacity: 0; transform: translateY(-8px); }
          50% { opacity: 1; transform: translateY(0px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        @keyframes groutLineSweep {
          0% { stroke-dashoffset: 60; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes tileSparkle {
          0% { opacity: 0; transform: scale(0); }
          70% { opacity: 1; transform: scale(1.3); }
          100% { opacity: 1; transform: scale(1); }
        }
        .tile-drop { animation: tilePlaceAnim 1.4s ease-out forwards; }
        .grout-line { stroke-dasharray: 60; animation: groutLineSweep 1.6s ease-out forwards; }
        .tile-spark { transform-origin: 135px 56px; animation: tileSparkle 0.5s ease-out 1.2s forwards; }
        @media (prefers-reduced-motion: reduce) {
          .tile-drop, .grout-line, .tile-spark { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </defs>
    <line x1="30" y1="105" x2="290" y2="105" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
    
    {/* Pool Coping & Tiled Wall Section */}
    <rect x="80" y="50" width="85" height="52" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
    {/* Base Mosaic Tiles */}
    <rect x="85" y="55" width="12" height="12" fill="#0284c7" stroke="#ffffff" strokeWidth="1" />
    <rect x="99" y="55" width="12" height="12" fill="#0ea5e9" stroke="#ffffff" strokeWidth="1" />
    <rect x="113" y="55" width="12" height="12" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
    {/* Newly Placed Tiles (Animate into position) */}
    <g className="tile-drop">
      <rect x="127" y="55" width="12" height="12" fill="#0284c7" stroke="#ffffff" strokeWidth="1" />
      <rect x="141" y="55" width="12" height="12" fill="#0ea5e9" stroke="#ffffff" strokeWidth="1" />
    </g>
    {/* Waterproof Grout Seal Line */}
    <line x1="84" y1="68" x2="154" y2="68" stroke="#34d399" strokeWidth="2" strokeLinecap="round" className="grout-line" />

    {/* Sparkle */}
    <path
      d="M135 50L136.5 54L140.5 55.5L136.5 57L135 61L133.5 57L129.5 55.5L133.5 54L135 50Z"
      fill="#34d399"
      className={playCount > 0 ? "tile-spark" : "opacity-0"}
    />

    {/* Renovation Mason / Craftsman */}
    <ellipse cx="215" cy="106" rx="14" ry="3" fill="#064e3b" fillOpacity="0.12" />
    <path d="M204 102H213V106H202C202 104 203 102 204 102Z" fill="#1e293b" />
    <path d="M217 102H226V106H215C215 104 216 102 217 102Z" fill="#1e293b" />
    <path d="M205 75L204 102H212L214 84L216 102H224L223 75H205Z" fill="#0f291e" />
    <path d="M202 48L204 74H224L226 48C226 48 219 45 214 45C209 45 202 48 202 48Z" fill="#166534" />
    <circle cx="214" cy="37" r="7" fill="#f5d0b5" />
    <path d="M207 35C207 31 210 28 214 28C218 28 221 31 221 35H207Z" fill="#14532d" />
    <path d="M218 34H226V36H218Z" fill="#0f3e2e" />
    {/* Trowel in Hand */}
    <path d="M203 52L178 64L176 60L201 49L203 52Z" fill="#15803d" />
    <polygon points="176,60 162,64 165,68 178,64" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
  </svg>
);

/* =========================================================================
   13. ERECTION, COMMISSIONING & INSTALLATION
   Engineer checks booster pump motor → shaft rotates → green operational indicator
   ========================================================================= */
const CommissioningScene: React.FC<{ playCount: number }> = ({ playCount }) => (
  <svg key={`svg-comm-${playCount}`} viewBox="0 0 320 120" className="w-full h-full max-h-28" fill="none">
    <defs>
      <style>{`
        @keyframes commMotorSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(720deg); }
        }
        @keyframes commStatusLed {
          0% { fill: #f59e0b; }
          50% { fill: #10b981; filter: drop-shadow(0 0 4px #34d399); }
          100% { fill: #10b981; filter: drop-shadow(0 0 2px #34d399); }
        }
        @keyframes commCheckPop {
          0% { opacity: 0; transform: scale(0.3); }
          70% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
        .comm-shaft { transform-origin: 140px 68px; animation: commMotorSpin 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .comm-led { animation: commStatusLed 1.8s ease-out forwards; }
        .comm-check { transform-origin: 104px 44px; animation: commCheckPop 0.5s ease-out 1.2s forwards; }
        @media (prefers-reduced-motion: reduce) {
          .comm-shaft, .comm-led, .comm-check { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </defs>
    <line x1="30" y1="105" x2="290" y2="105" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
    
    {/* Industrial Heavy Booster Pump & Motor Skid */}
    <rect x="75" y="88" width="95" height="15" rx="2" fill="#1e293b" />
    {/* Motor Body Housing */}
    <rect x="80" y="52" width="48" height="36" rx="4" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
    {/* Cooling Fins */}
    <line x1="88" y1="55" x2="88" y2="85" stroke="#475569" strokeWidth="2" />
    <line x1="96" y1="55" x2="96" y2="85" stroke="#475569" strokeWidth="2" />
    <line x1="104" y1="55" x2="104" y2="85" stroke="#475569" strokeWidth="2" />
    <line x1="112" y1="55" x2="112" y2="85" stroke="#475569" strokeWidth="2" />

    {/* Pump Impeller Volute Casing (Forest Green) */}
    <circle cx="140" cy="68" r="16" fill="#047857" stroke="#064e3b" strokeWidth="2" />
    <rect x="146" y="44" width="10" height="20" rx="1" fill="#047857" stroke="#064e3b" strokeWidth="1.5" />
    {/* Rotating Coupling Shaft */}
    <g className={playCount > 0 ? "comm-shaft" : ""}>
      <circle cx="140" cy="68" r="5" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
      <line x1="140" y1="63" x2="140" y2="73" stroke="#334155" strokeWidth="1.5" />
    </g>

    {/* Digital RPM / Health Status Indicator */}
    <circle cx="104" cy="44" r="3.5" className="comm-led" />
    <g className={playCount > 0 ? "comm-check" : "opacity-0"}>
      <circle cx="104" cy="44" r="5" fill="#10b981" />
      <path d="M102 44L103.5 45.5L106.5 42.5" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
    </g>

    {/* Commissioning Engineer */}
    <ellipse cx="215" cy="106" rx="14" ry="3" fill="#064e3b" fillOpacity="0.12" />
    <path d="M204 102H213V106H202C202 104 203 102 204 102Z" fill="#1e293b" />
    <path d="M217 102H226V106H215C215 104 216 102 217 102Z" fill="#1e293b" />
    <path d="M205 75L204 102H212L214 84L216 102H224L223 75H205Z" fill="#0f291e" />
    <path d="M202 48L204 74H224L226 48C226 48 219 45 214 45C209 45 202 48 202 48Z" fill="#166534" />
    <circle cx="214" cy="37" r="7" fill="#f5d0b5" />
    {/* White / Green Engineering Hardhat */}
    <path d="M207 34C207 29 210 26 214 26C218 26 221 29 221 34H207Z" fill="#f8fafc" />
    <path d="M206 33H223V35H206Z" fill="#16a34a" />
    {/* Digital Torque Tool in Hand */}
    <line x1="202" y1="58" x2="162" y2="65" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="160" y="63" width="5" height="5" rx="1" fill="#10b981" />
  </svg>
);
