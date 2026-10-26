"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LanguageContext";
import { businessInfo, getPhoneLink } from "@/config/businessInfo";
import { Menu, X, Phone, Globe, Star, Mail } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/about", label: t.nav.about },
    { href: "/service-areas", label: t.nav.serviceAreas },
    { href: "/#reviews", label: "Customer Reviews" },
    { href: "/contact", label: t.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs transition-all">
      {/* Top Micro-Bar with direct contact & language toggle */}
      <div className="bg-forest-950 text-emerald-100 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="truncate">Serving Hoodi, Garudachar Palya, Whitefield &amp; Bengaluru • <strong>24/7 Support</strong></span>
        </div>
        <div className="flex items-center space-x-4 shrink-0">
          <a
            href={`mailto:${businessInfo.email}`}
            className="hidden md:inline-flex items-center gap-1.5 text-emerald-300 hover:text-white font-medium transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px]">{businessInfo.email}</span>
          </a>
          <a
            href={getPhoneLink()}
            className="hidden sm:inline-flex items-center gap-1.5 text-emerald-300 hover:text-white font-medium transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>{businessInfo.primaryPhoneDisplay}</span>
          </a>
          <button
            onClick={() => setLanguage(language === "en" ? "kn" : "en")}
            className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-emerald-900/70 hover:bg-emerald-800 text-white text-xs transition-colors"
            title="Toggle English / ಕನ್ನಡ"
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-brandPink-300" />
            <span className="font-medium">{language === "en" ? "ಕನ್ನಡ" : "English"}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-md border-2 border-emerald-600/40 group-hover:scale-105 transition-transform flex items-center justify-center p-0.5">
              <Image
                src="/images/logo.png"
                alt="Smart Facility Services Company Logo"
                width={48}
                height={48}
                priority
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl tracking-tight text-forest-950 flex items-center space-x-1.5">
                <span>{businessInfo.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brandPink-500"></span>
              </div>
              <p className="text-[11px] sm:text-xs text-emerald-800 font-medium tracking-wide">
                {businessInfo.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? "text-forest-900 bg-emerald-50 border border-emerald-200/60 font-bold"
                    : "text-gray-700 hover:text-forest-800 hover:bg-emerald-50/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Call Us Button & Mobile Hamburger */}
          <div className="flex items-center space-x-3">
            <a
              href={getPhoneLink()}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-forest-800 to-emerald-700 hover:from-forest-900 hover:to-emerald-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>Call Us: {businessInfo.primaryPhoneDisplay}</span>
            </a>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-forest-950 hover:bg-emerald-50 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-base font-semibold ${
                isActive(link.href)
                  ? "bg-emerald-50 text-forest-900 font-bold border border-emerald-200"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <a
              href={getPhoneLink()}
              className="w-full py-3 px-4 rounded-xl bg-forest-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>Call Us Now: {businessInfo.primaryPhoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
