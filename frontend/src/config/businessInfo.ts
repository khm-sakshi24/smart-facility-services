/**
 * Smart Facility Services - Centralized Business Configuration
 *
 * Official verified business details:
 * Phone: 9663846126 (+91 96638 46126)
 * Email: Supportsmartfacility26@gmail.com
 * WhatsApp: 919663846126
 * Tagline: Reliable Support. Every Day.
 * Service Areas: Hoodi, Garudachar Palya, Whitefield, Bengaluru, Karnataka, India
 *
 * To update contact details or service regions in the future, simply update this file.
 */

export interface BusinessConfig {
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  aboutIntro: string;
  contactPerson?: string;
  primaryPhone: string;
  primaryPhoneDisplay: string;
  whatsappNumber: string;
  email: string;
  logoUrl: string;
  logoTransparentUrl: string;
  contact: {
    personName?: string;
    phone: string;
    phoneFormatted: string;
    whatsapp: string;
    email: string;
    businessHours: string;
  };
  additionalPhones: { label: string; number: string; display: string }[];
  confirmedServiceAreas: {
    neighborhood: string;
    city: string;
    state: string;
    postalCodes?: string[];
    description: string;
  }[];
  googleReviewUrl: string | null;
  siteUrl: string;
}

export const businessInfo: BusinessConfig = {
  name: "Smart Facility Services",
  tagline: "Reliable Support. Every Day.",
  heroHeadline: "A Smarter Way to Care for Your Property",
  heroSubheadline:
    "Smart Facility Services provides facility support and maintenance solutions for residential communities, apartments, commercial properties and businesses in Bengaluru.",
  aboutIntro:
    "Smart Facility Services aims to provide dependable facility management and maintenance support for apartments, residential communities and businesses in Bengaluru. We focus on clear communication, service quality and building long-term relationships with our clients.",
  
  // Official Contact Details
  primaryPhone: "9663846126",
  primaryPhoneDisplay: "+91 96638 46126",
  whatsappNumber: "919663846126",
  email: "Supportsmartfacility26@gmail.com",
  logoUrl: "/images/logo.png",
  logoTransparentUrl: "/images/logo-transparent.png",

  contact: {
    phone: "9663846126",
    phoneFormatted: "+91 96638 46126",
    whatsapp: "919663846126",
    email: "Supportsmartfacility26@gmail.com",
    businessHours: "Monday to Saturday, 8:00 AM - 7:00 PM",
  },
  
  // Easily add additional contact numbers here in the future
  additionalPhones: [],

  confirmedServiceAreas: [
    {
      neighborhood: "Whitefield",
      city: "Bengaluru",
      state: "Karnataka",
      postalCodes: ["560066"],
      description: "Serving gated communities, commercial tech parks, and residential complexes across Whitefield.",
    },
    {
      neighborhood: "Hoodi",
      city: "Bengaluru",
      state: "Karnataka",
      postalCodes: ["560048"],
      description: "Comprehensive facility support for apartment associations and residential layouts in Hoodi.",
    },
    {
      neighborhood: "Garudachar Palya",
      city: "Bengaluru",
      state: "Karnataka",
      postalCodes: ["560048"],
      description: "Dedicated maintenance and technical services for industrial and residential premises in Garudachar Palya.",
    },
    {
      neighborhood: "Bengaluru (East & Adjacent Corridors)",
      city: "Bengaluru",
      state: "Karnataka",
      postalCodes: ["560066", "560048", "560037", "560036"],
      description: "Extended coverage across Bengaluru urban region upon discussion and scheduled site evaluation.",
    },
  ],
  
  googleReviewUrl: null, // Set when Google Business Profile is verified
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

/**
 * Utility helper to generate official WhatsApp click-to-chat links
 */
export function getWhatsAppLink(prefilledMessage?: string): string {
  const msg = prefilledMessage || "Hello Smart Facility Services, I would like to know more about your facility services.";
  return `https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

/**
 * Utility helper for click-to-call link
 */
export function getPhoneLink(): string {
  return `tel:+91${businessInfo.primaryPhone}`;
}

/**
 * Utility helper for click-to-email link
 */
export function getEmailLink(subject?: string): string {
  const sub = subject || "Enquiry About Facility Services";
  return `mailto:${businessInfo.email}?subject=${encodeURIComponent(sub)}`;
}
