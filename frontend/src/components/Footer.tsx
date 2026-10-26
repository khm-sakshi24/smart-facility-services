"use client";

import React from "react";
import Link from "next/link";
import { businessInfo, getPhoneLink, getWhatsAppLink, getEmailLink } from "@/config/businessInfo";
import { servicesCatalogue } from "@/config/servicesData";
import { ShieldCheck, MapPin, Phone, MessageCircle, Mail, User } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-950 text-gray-300 border-t border-forest-900 pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center text-white border border-emerald-500/30">
                <ShieldCheck className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight">
                  {businessInfo.name}
                </span>
                <p className="text-xs text-emerald-400 font-medium">
                  {businessInfo.tagline}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {businessInfo.aboutIntro}
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-forest-800 pb-2">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-300 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/service-areas" className="hover:text-emerald-300 transition-colors">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Main Services Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-forest-800 pb-2">
              Facility Services
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {servicesCatalogue.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-emerald-300 transition-colors text-gray-300"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-emerald-400 font-semibold hover:underline">
                  + View All 13 Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-forest-800 pb-2">
              Contact Us Directly
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-gray-200 font-medium">Contact: {businessInfo.contactPerson}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={getPhoneLink()}
                  className="text-gray-200 hover:text-emerald-300 transition-colors font-semibold"
                >
                  {businessInfo.primaryPhoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-emerald-300 transition-colors"
                >
                  WhatsApp Chat
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={getEmailLink()}
                  className="text-gray-200 hover:text-emerald-300 transition-colors break-all"
                >
                  {businessInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-gray-300">
                  Hoodi, Garudachar Palya, Whitefield, Bengaluru
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="mt-12 pt-8 border-t border-forest-900 text-xs text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {businessInfo.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-emerald-300 underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-emerald-300 underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
