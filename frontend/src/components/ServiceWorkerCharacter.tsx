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
 * - Currently implements ONLY "housekeeping" per instructions.
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
      { threshold: 0.3 }
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

  // Only render the Housekeeping character for now
  if (serviceSlug !== "housekeeping") {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="w-full select-none"
      aria-label="Smart Facility Services Housekeeping Professional Technician"
    >
      <div className="flex items-center justify-between pb-1 px-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          Standardized Daily Housekeeping Protocol
        </span>
        <span
          key={`badge-${playCount}`}
          className="text-[10px] font-bold text-forest-900 bg-white/95 px-2 py-0.5 rounded-full border border-emerald-300 shadow-2xs flex items-center gap-1 transition-opacity duration-500"
          style={{
            animation: playCount > 0 ? "hkBadgeReveal 0.4s ease-out 1.4s both" : "none",
          }}
        >
          <svg className="w-3 h-3 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>Pristine &amp; Sanitized</span>
        </span>
      </div>

      <div className="w-full h-24 sm:h-28 relative rounded-xl bg-gradient-to-b from-white via-emerald-50/40 to-emerald-100/30 border border-emerald-200/60 overflow-hidden flex items-center justify-center">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#14532d_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

        {/* Vector SVG Animation */}
        <svg
          key={`svg-hk-${playCount}`}
          viewBox="0 0 320 120"
          className="w-full h-full max-h-28"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Floor Gleam Gradient */}
            <linearGradient id="hkGleam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="50%" stopColor="#34d399" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>

            {/* Sparkle Gradient */}
            <linearGradient id="hkSparkle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            {/* Inline Keyframe Styles for Housekeeping */}
            <style>{`
              @keyframes hkMopSweep {
                0% {
                  transform: rotate(0deg) translateX(0px);
                }
                25% {
                  transform: rotate(-14deg) translateX(-18px);
                }
                60% {
                  transform: rotate(14deg) translateX(18px);
                }
                85% {
                  transform: rotate(-4deg) translateX(-4px);
                }
                100% {
                  transform: rotate(0deg) translateX(0px);
                }
              }

              @keyframes hkArmGuide {
                0% {
                  transform: rotate(0deg);
                }
                25% {
                  transform: rotate(-8deg);
                }
                60% {
                  transform: rotate(8deg);
                }
                85% {
                  transform: rotate(-2deg);
                }
                100% {
                  transform: rotate(0deg);
                }
              }

              @keyframes hkFloorShine {
                0% {
                  opacity: 0;
                  transform: scaleX(0.2);
                }
                50% {
                  opacity: 0.8;
                  transform: scaleX(1);
                }
                85% {
                  opacity: 0.6;
                  transform: scaleX(1);
                }
                100% {
                  opacity: 0.4;
                  transform: scaleX(1);
                }
              }

              @keyframes hkSparklePop {
                0% {
                  opacity: 0;
                  transform: scale(0) rotate(0deg);
                }
                60% {
                  opacity: 1;
                  transform: scale(1.25) rotate(45deg);
                }
                100% {
                  opacity: 1;
                  transform: scale(1) rotate(90deg);
                }
              }

              @keyframes hkBadgeReveal {
                0% {
                  opacity: 0;
                  transform: translateY(4px);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              .hk-mop-anim {
                transform-origin: 195px 65px;
                animation: hkMopSweep 1.8s cubic-bezier(0.45, 0.05, 0.25, 0.95) forwards;
              }

              .hk-arm-anim {
                transform-origin: 185px 50px;
                animation: hkArmGuide 1.8s cubic-bezier(0.45, 0.05, 0.25, 0.95) forwards;
              }

              .hk-floor-gleam {
                transform-origin: 195px 105px;
                animation: hkFloorShine 1.8s ease-out forwards;
              }

              .hk-sparkle-1 {
                transform-origin: 145px 95px;
                animation: hkSparklePop 0.5s cubic-bezier(0.17, 0.89, 0.32, 1.25) 1.2s forwards;
              }

              .hk-sparkle-2 {
                transform-origin: 235px 90px;
                animation: hkSparklePop 0.5s cubic-bezier(0.17, 0.89, 0.32, 1.25) 1.4s forwards;
              }

              .hk-sparkle-3 {
                transform-origin: 180px 85px;
                animation: hkSparklePop 0.4s cubic-bezier(0.17, 0.89, 0.32, 1.25) 1.55s forwards;
              }

              @media (prefers-reduced-motion: reduce) {
                .hk-mop-anim,
                .hk-arm-anim,
                .hk-floor-gleam,
                .hk-sparkle-1,
                .hk-sparkle-2,
                .hk-sparkle-3 {
                  animation: none !important;
                  opacity: 1 !important;
                  transform: none !important;
                }
              }
            `}</style>
          </defs>

          {/* 1. Polished Tile Floor Baseline & Perspective Lines */}
          <g opacity="0.6">
            <line x1="30" y1="105" x2="290" y2="105" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="60" y1="105" x2="40" y2="118" stroke="#e2e8f0" strokeWidth="1.2" />
            <line x1="120" y1="105" x2="110" y2="118" stroke="#e2e8f0" strokeWidth="1.2" />
            <line x1="180" y1="105" x2="180" y2="118" stroke="#e2e8f0" strokeWidth="1.2" />
            <line x1="240" y1="105" x2="250" y2="118" stroke="#e2e8f0" strokeWidth="1.2" />
          </g>

          {/* 2. Dynamic Clean-Floor Gleam Line behind Mop Path */}
          <ellipse
            cx="195"
            y="105"
            rx="55"
            ry="4.5"
            fill="url(#hkGleam)"
            className={playCount > 0 ? "hk-floor-gleam" : "opacity-0"}
          />

          {/* 3. Professional Facility Worker Character */}
          <g id="technician-body">
            {/* Shadow under worker's feet */}
            <ellipse cx="185" cy="106" rx="14" ry="3" fill="#064e3b" fillOpacity="0.12" />

            {/* Work Shoes (Dark charcoal safety boots) */}
            <path d="M174 102H183V106H172C172 104 173 102 174 102Z" fill="#1e293b" />
            <path d="M187 102H196V106H185C185 104 186 102 187 102Z" fill="#1e293b" />

            {/* Dark Tailored Uniform Trousers (Professional Forest Charcoal) */}
            <path
              d="M175 75L174 102H182L184 84L186 102H194L193 75H175Z"
              fill="#0f291e"
            />
            {/* Belt */}
            <rect x="174" y="73" width="20" height="2.5" rx="1" fill="#0a1d15" />
            <rect x="182.5" y="73" width="3" height="2.5" fill="#94a3b8" />

            {/* Smart Facility Services Company Uniform Shirt (Forest Green) */}
            <path
              d="M172 48L174 74H194L196 48C196 48 189 45 184 45C179 45 172 48 172 48Z"
              fill="#166534"
            />
            {/* Professional Collar */}
            <path d="M180 45L184 51L188 45H180Z" fill="#14532d" />
            <path d="M184 51V72" stroke="#14532d" strokeWidth="1" strokeDasharray="2 2" />

            {/* Company Safety Badge & Identity Patch on Left Chest */}
            <rect x="176" y="52" width="4.5" height="5.5" rx="1" fill="#ffffff" />
            <rect x="177" y="53.5" width="2.5" height="1" fill="#16a34a" />
            <circle cx="178.2" cy="55.5" r="0.8" fill="#ec4899" />

            {/* High-Visibility Emerald Trim Stripe on Waist */}
            <path d="M174 70H194V72H174V70Z" fill="#22c55e" />

            {/* Worker Head & Professional Cap */}
            {/* Neck */}
            <rect x="182" y="41" width="4" height="5" fill="#f5d0b5" />
            {/* Face/Head Silhouette */}
            <circle cx="184" cy="37" r="7" fill="#f5d0b5" />
            {/* Professional Cap (Forest Green Company Cap) */}
            <path
              d="M177 35C177 31 180 28 184 28C188 28 191 31 191 35H177Z"
              fill="#14532d"
            />
            {/* Cap Visor pointing forward */}
            <path d="M188 34H196C196 34 195 36 191 36H188V34Z" fill="#0f3e2e" />
            <circle cx="184" cy="31" r="1.2" fill="#22c55e" />
          </g>

          {/* 4. Animated Arms & Mop Group */}
          <g className={playCount > 0 ? "hk-arm-anim" : ""}>
            {/* Left Arm / Shoulder reaching toward Mop */}
            <path
              d="M173 50L186 63L189 61L176 48L173 50Z"
              fill="#15803d"
            />
            {/* Left Hand */}
            <circle cx="188" cy="62" r="2.5" fill="#f5d0b5" />
          </g>

          {/* Mop System (Pole, Head, Microfiber Pad, Right Hand) */}
          <g className={playCount > 0 ? "hk-mop-anim" : ""}>
            {/* Aluminum Ergonomic Mop Handle */}
            <line
              x1="187"
              y1="56"
              x2="201"
              y2="103"
              stroke="#94a3b8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Dark Rubber Ergonomic Grip at Top */}
            <line
              x1="184"
              y1="46"
              x2="188"
              y2="60"
              stroke="#334155"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Right Hand gripping the upper handle */}
            <circle cx="186" cy="53" r="2.5" fill="#f5d0b5" />

            {/* Mop Swivel Head Joint (Forest Green) */}
            <rect
              x="198"
              y="100.5"
              width="6.5"
              height="4"
              rx="1.5"
              fill="#047857"
            />

            {/* High-Performance Microfiber Mop Pad (Emerald Green) */}
            <rect
              x="188"
              y="103"
              width="26"
              height="3.5"
              rx="1.5"
              fill="#10b981"
            />
            {/* Cleaning Pad Base */}
            <line x1="189" y1="106.5" x2="213" y2="106.5" stroke="#059669" strokeWidth="1" />
          </g>

          {/* 5. Clean Floor Sparkles (Appear sequentially after mop passes) */}
          {/* Sparkle 1: Left clean zone */}
          <g className={playCount > 0 ? "hk-sparkle-1" : "opacity-0"}>
            <path
              d="M145 90L146.5 94L150.5 95.5L146.5 97L145 101L143.5 97L139.5 95.5L143.5 94L145 90Z"
              fill="url(#hkSparkle)"
            />
            <circle cx="145" cy="95.5" r="1.2" fill="#ffffff" />
          </g>

          {/* Sparkle 2: Right clean zone */}
          <g className={playCount > 0 ? "hk-sparkle-2" : "opacity-0"}>
            <path
              d="M235 85L236.2 88.5L239.5 89.8L236.2 91.1L235 94.5L233.8 91.1L230.5 89.8L233.8 88.5L235 85Z"
              fill="url(#hkSparkle)"
            />
            <circle cx="235" cy="89.8" r="1" fill="#ffffff" />
          </g>

          {/* Sparkle 3: Subtle central gleam */}
          <g className={playCount > 0 ? "hk-sparkle-3" : "opacity-0"}>
            <path
              d="M180 82L180.8 84.5L183.5 85.2L180.8 86L180 88.5L179.2 86L176.5 85.2L179.2 84.5L180 82Z"
              fill="#34d399"
            />
          </g>
        </svg>

        {/* Replay Hint Pill (Subtle desktop hint) */}
        <div className="absolute bottom-1 right-2 hidden sm:flex items-center gap-1 text-[9px] font-semibold text-gray-600 bg-white/80 px-2 py-0.5 rounded-full border border-gray-200 pointer-events-none">
          <span>Hover card to replay</span>
        </div>
      </div>
    </div>
  );
};
