"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { businessInfo, getPhoneLink, getWhatsAppLink } from "@/config/businessInfo";
import { Menu, X, Phone, Mail, MessageCircle, Clock } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCallPopped, setIsCallPopped] = useState(false);
  const callPopoverRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Clean, consistent English navigation links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About Us" },
    { href: "/service-areas", label: "Service Areas" },
    { href: "/#reviews", label: "Reviews" },
    { href: "/contact", label: "Contact Us" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  // Close popover on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        callPopoverRef.current &&
        !callPopoverRef.current.contains(event.target as Node)
      ) {
        setIsCallPopped(false);
      }
    };
    if (isCallPopped) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCallPopped]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs transition-all">
      {/* Top Micro-Bar: Desktop Only */}
      <div className="hidden sm:flex bg-forest-950 text-emerald-100 text-xs py-1.5 px-4 sm:px-8 justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="truncate">
            Serving Hoodi, Garudachar Palya, Whitefield &amp; Bengaluru •{" "}
            <strong>24/7 Support</strong>
          </span>
        </div>
        <div className="flex items-center space-x-5 shrink-0">
          <a
            href={`mailto:${businessInfo.email}`}
            className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white font-medium transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px]">{businessInfo.email}</span>
          </a>
          <a
            href={getPhoneLink()}
            className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white font-medium transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>{businessInfo.primaryPhoneDisplay}</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24 lg:h-28">
          {/* Brand Logo & Name: Made Big, Crisp & High-Impact */}
          <Link href="/" className="flex items-center space-x-3 sm:space-x-4 group min-w-0 py-2">
            <div className="w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full overflow-hidden bg-white shadow-xl border-2 sm:border-3 border-emerald-600/60 group-hover:scale-105 group-hover:shadow-emerald-300/40 transition-all duration-300 flex items-center justify-center p-0.5 shrink-0 ring-2 sm:ring-4 ring-emerald-500/20">
              <Image
                src="/images/logo.png"
                alt="Smart Facility Services Company Logo"
                width={80}
                height={80}
                priority
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="min-w-0 truncate">
              <div className="font-black text-lg sm:text-2xl lg:text-[26px] tracking-tight text-forest-950 flex items-center space-x-1.5 truncate leading-tight">
                <span className="truncate">{businessInfo.name}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-brandPink-500 shrink-0 shadow-xs"></span>
              </div>
              <p className="text-[11px] sm:text-xs lg:text-sm text-emerald-800 font-extrabold tracking-wide uppercase truncate">
                {businessInfo.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links (Clean English) */}
          <nav className="hidden lg:flex items-center space-x-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive(link.href)
                    ? "text-forest-950 bg-emerald-100/70 border border-emerald-300/80 shadow-xs"
                    : "text-gray-700 hover:text-forest-900 hover:bg-emerald-50/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section: Mobile Compact Animated Call Button + Hamburger / Desktop Full Call */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0" ref={callPopoverRef}>
            {/* Desktop Full Call Button */}
            <a
              href={getPhoneLink()}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-forest-800 to-emerald-700 hover:from-forest-900 hover:to-emerald-800 text-white px-5 py-3 rounded-xl font-extrabold text-sm shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>Call Us: {businessInfo.primaryPhoneDisplay}</span>
            </a>

            {/* Mobile Animated Compact Call Button: Directly dials with spring animation on touch! */}
            <div className="relative sm:hidden">
              <a
                href={getPhoneLink()}
                aria-label={`Call Smart Facility Services at ${businessInfo.primaryPhoneDisplay}`}
                className="w-11 h-11 rounded-full bg-forest-800 hover:bg-forest-900 active:bg-emerald-700 text-white flex items-center justify-center shadow-lg border-2 border-emerald-400/60 transition-transform duration-200 active:scale-125 relative"
                title={`Call Us: ${businessInfo.primaryPhoneDisplay}`}
              >
                <Phone className="w-5 h-5 text-emerald-300" />
                <span className="sr-only">Call Us</span>
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></span>
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border border-white"></span>
              </a>
            </div>

            {/* Mobile Hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-forest-950 hover:bg-emerald-50 active:scale-95 transition-transform focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-2 shadow-xl">
          {/* Large Logo & Brand Identity in Mobile Drawer */}
          <div className="flex items-center space-x-3.5 pb-3 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white shadow-lg border-2 border-emerald-600/60 p-0.5 shrink-0 ring-2 ring-emerald-500/25">
              <Image
                src="/images/logo.png"
                alt="Smart Facility Services Logo"
                width={64}
                height={64}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="font-black text-lg text-forest-950 block leading-tight">
                {businessInfo.name}
              </span>
              <p className="text-xs text-emerald-800 font-extrabold uppercase tracking-wide">
                {businessInfo.tagline}
              </p>
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-bold ${
                isActive(link.href)
                  ? "bg-emerald-50 text-forest-900 border border-emerald-200"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Quick Contact in Mobile Drawer */}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <a
              href={getPhoneLink()}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-forest-800 text-white font-extrabold text-xs shadow-md active:scale-95 transition-transform"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>Call Us: {businessInfo.primaryPhoneDisplay}</span>
            </a>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-md active:scale-95 transition-transform"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us (Official)</span>
            </a>

            <div className="flex items-center justify-center pt-2 text-xs text-gray-500 gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>24/7 Support &amp; Emergency Coordination</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
