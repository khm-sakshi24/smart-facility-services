/**
 * Smart Facility Services - Centralized Business Configuration
 *
 * Official verified business details:
 * Phone: 9663846126 (+91 96638 46126)
 * Email: Supportsmartfacility26@gmail.com
 * WhatsApp: 919663846126
 * Tagline: Reliable Support. Every Day.
 * Service Areas: Hoodi, Garudachar Palya, Whitefield, Bengaluru, Karnataka, India
 * Timings: 24/7 Support Available
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
  timingsDisplay: string;
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
    landmarks?: string[];
    description: string;
  }[];
  workHighlights: {
    title: string;
    description: string;
    badge: string;
  }[];
  googleReviewUrl: string | null;
  siteUrl: string;
}

export const businessInfo: BusinessConfig = {
  name: "Smart Facility Services",
  tagline: "Reliable Support. Every Day.",
  heroHeadline: "A Smarter Way to Care for Your Property",
  heroSubheadline:
    "Smart Facility Services provides 24/7 dependable facility support and maintenance solutions for residential communities, apartments, commercial properties, and businesses in Bengaluru.",
  aboutIntro:
    "Smart Facility Services aims to provide dependable 24/7 facility management and maintenance support for apartments, residential communities, and businesses in Bengaluru. We focus on clear communication, disciplined operational routines, and building long-term relationships with our clients.",
  
  // Official Contact Details
  primaryPhone: "9663846126",
  primaryPhoneDisplay: "+91 96638 46126",
  whatsappNumber: "919663846126",
  email: "Supportsmartfacility26@gmail.com",
  logoUrl: "/images/logo.png",
  logoTransparentUrl: "/images/logo-transparent.png",
  timingsDisplay: "24/7 Support & Emergency Coordination",

  contact: {
    phone: "9663846126",
    phoneFormatted: "+91 96638 46126",
    whatsapp: "919663846126",
    email: "Supportsmartfacility26@gmail.com",
    businessHours: "24/7 Support Available | Routine Shifts: 8:00 AM - 7:00 PM",
  },
  
  additionalPhones: [],

  confirmedServiceAreas: [
    {
      neighborhood: "Whitefield",
      city: "Bengaluru",
      state: "Karnataka",
      postalCodes: ["560066"],
      landmarks: ["ITPL Corridor", "Hope Farm", "EPIP Zone", "Channasandra", "Kadugodi Road"],
      description: "Serving gated villa communities, premier apartment associations, tech parks, and commercial towers across Whitefield.",
    },
    {
      neighborhood: "Hoodi",
      city: "Bengaluru",
      state: "Karnataka",
      postalCodes: ["560048"],
      landmarks: ["Hoodi Circle", "ITPL Main Road", "Ayyappa Nagar", "Kodigehalli Main Road"],
      description: "Comprehensive daily facility management, MEP maintenance, and housekeeping for residential layouts and apartments in Hoodi.",
    },
    {
      neighborhood: "Garudachar Palya",
      city: "Bengaluru",
      state: "Karnataka",
      postalCodes: ["560048"],
      landmarks: ["Mahadevapura Corridor", "Industrial Estate", "Decathlon Junction"],
      description: "Dedicated maintenance, water treatment, and technical operations for residential complexes and commercial facilities in Garudachar Palya.",
    },
    {
      neighborhood: "Bengaluru (East & Adjacent Corridors)",
      city: "Bengaluru",
      state: "Karnataka",
      postalCodes: ["560066", "560048", "560037", "560036"],
      landmarks: ["KR Puram", "Marathahalli", "Varthur", "Kadugodi", "Brookefield"],
      description: "Extended coverage across East Bengaluru corridors for residential apartment associations and corporate campuses upon scheduled site evaluation.",
    },
  ],

  workHighlights: [
    {
      badge: "Standardized Upkeep",
      title: "Daily Digital Checklists & Audits",
      description: "Every facility receives daily inspection protocols, supervisor log sign-offs, and transparent task verification for common areas, lobbies, and pump rooms.",
    },
    {
      badge: "Asset Protection",
      title: "Preventive MEP & Pump Maintenance",
      description: "Scheduled preventive servicing for hydro-pneumatic pumps, water supply lines, DG backup panels, LT boards, and drainage systems to prevent unexpected downtime.",
    },
    {
      badge: "24/7 Availability",
      title: "24/7 Emergency Facility Response",
      description: "Round-the-clock coordination for critical breakdowns including main water line bursts, electrical power tripping, and STP/WTP overflow emergencies.",
    },
    {
      badge: "Regulatory Adherence",
      title: "Environmental & KSPCB Standards",
      description: "Strict adherence to wastewater treatment, microbial aeration, backwash logging, and municipal hygiene standards for STP, ETP, and water tank cleaning.",
    },
    {
      badge: "Accountability",
      title: "Single Operational Contact for RWAs",
      description: "One responsible coordinator for all on-site plumbing, electrical, cleaning, and handyman services, simplifying communication for managing committees.",
    },
    {
      badge: "Professional Team",
      title: "Uniformed & Trained On-Site Staff",
      description: "Disciplined, background-checked personnel equipped with protective gear, professional tools, and eco-friendly cleaning consumables.",
    },
  ],
  
  googleReviewUrl: null,
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://smart-facility-services.vercel.app"),
};

/**
 * Utility helper to generate official WhatsApp click-to-chat links
 */
export function getWhatsAppLink(prefilledMessage?: string): string {
  const msg = prefilledMessage || "Hello Smart Facility Services, I would like to know more about your 24/7 facility services.";
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
