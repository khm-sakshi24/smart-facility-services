"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { businessInfo, getPhoneLink, getWhatsAppLink, getEmailLink } from "@/config/businessInfo";
import { servicesCatalogue } from "@/config/servicesData";
import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-950 text-gray-300 border-t border-forest-900 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info with Big Prominent Logo */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white shadow-2xl border-3 border-emerald-400 p-0.5 shrink-0 ring-4 ring-emerald-400/25">
                <Image
                  src="/images/logo.png"
                  alt="Smart Facility Services Company Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-black text-2xl sm:text-3xl text-white tracking-tight block leading-tight">
                  {businessInfo.name}
                </span>
                <p className="text-xs sm:text-sm text-emerald-400 font-extrabold uppercase tracking-wide">
                  {businessInfo.tagline}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Smart Facility Services provides dependable facility management, MEP maintenance, and comprehensive building operations for residential societies, apartment associations, and commercial facilities in Bengaluru.
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
                  All 13 Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/service-areas" className="hover:text-emerald-300 transition-colors">
                  Service Areas (Hoodi, Whitefield)
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-emerald-300 transition-colors">
                  Our Work Process
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-emerald-300 transition-colors">
                  Client Reviews &amp; Ratings
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-300 transition-colors">
                  Contact Us Directly
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-forest-800 pb-2">
              Featured Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {servicesCatalogue.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-emerald-300 transition-colors flex items-center justify-between"
                  >
                    <span>{service.title}</span>
                    <span className="text-xs text-emerald-500/70">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Communication Channels */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-forest-800 pb-2">
              Direct Contact
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-gray-400 block">Phone Call</span>
                  <a
                    href={getPhoneLink()}
                    className="font-bold text-white hover:text-emerald-300 transition-colors"
                  >
                    {businessInfo.primaryPhoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-gray-400 block">WhatsApp Support</span>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-gray-400 block">Official Email</span>
                  <a
                    href={getEmailLink()}
                    className="font-bold text-white hover:text-emerald-300 transition-colors break-all text-xs sm:text-sm"
                  >
                    {businessInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-2">
                <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div className="text-xs text-gray-400">
                  <strong className="text-gray-200 block">Confirmed Service Corridors:</strong>
                  <span>Hoodi, Garudachar Palya, Whitefield &amp; Bengaluru, Karnataka</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-forest-900/80 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} {businessInfo.name}. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-emerald-400 transition-colors">
              Contact Operations
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
