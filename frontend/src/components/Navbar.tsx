"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LanguageContext";
import { businessInfo } from "@/config/businessInfo";
import { Menu, X, ShieldCheck, ChevronRight, Globe } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/process", label: t.nav.process },
    { href: "/service-areas", label: t.nav.serviceAreas },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all">
      {/* Top micro-bar with service areas and language toggle */}
      <div className="bg-forest-950 text-emerald-100 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Serving Hoodi, Garudachar Palya, Whitefield &amp; Bengaluru</span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setLanguage(language === "en" ? "kn" : "en")}
            className="flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-900/60 hover:bg-emerald-800 text-white text-xs transition-colors"
            title="Toggle English / ಕನ್ನಡ"
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-brandPink-300" />
            <span className="font-medium">{language === "en" ? "ಕನ್ನಡ" : "English"}</span>
          </button>
          <Link
            href="/admin/login"
            className="text-emerald-300 hover:text-white transition-colors text-xs font-medium hidden sm:inline"
          >
            {t.nav.adminLogin}
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-forest-800 to-forest-950 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform border border-emerald-600/30">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="font-bold text-xl tracking-tight text-forest-950 flex items-center space-x-1.5">
                <span>{businessInfo.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brandPink-500"></span>
              </div>
              <p className="text-xs text-emerald-800 font-medium tracking-wide">
                {businessInfo.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "text-forest-900 bg-emerald-50 border border-emerald-200 shadow-xs"
                      : "text-gray-700 hover:text-forest-800 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Request a Quote CTA button */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/quote"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-forest-800 hover:bg-forest-900 shadow-sm hover:shadow transition-all border border-emerald-700/50 group"
            >
              <span>{t.nav.quote}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-brandPink-300" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-gray-700 hover:text-forest-900 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-forest-600"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium ${
                  active
                    ? "text-forest-900 bg-emerald-50 font-semibold"
                    : "text-gray-700 hover:text-forest-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <Link
              href="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 px-5 py-3 rounded-lg text-base font-semibold text-white bg-forest-800 hover:bg-forest-900 shadow"
            >
              <span>{t.nav.quote}</span>
              <ChevronRight className="w-4 h-4 text-brandPink-300" />
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-2 text-sm text-gray-600 hover:text-forest-800"
            >
              {t.nav.adminLogin}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
