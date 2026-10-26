/**
 * Smart Facility Services - Centralized Business Configuration
 *
 * Rules:
 * - Do not invent phone numbers, email addresses, street addresses, registration numbers,
 *   GST numbers, certifications, qualifications, customer names, testimonials, or pricing.
 * - Confirmed items are displayed publicly.
 * - Items pending verification remain null / undefined and are hidden from production pages.
 */

export interface BusinessConfig {
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  confirmedServiceAreas: {
    neighborhood: string;
    city: string;
    state: string;
    postalCodes?: string[];
    description: string;
  }[];
  contact: {
    // Only populated when verified by business
    phone: string | null;
    email: string | null;
    address: string | null;
    businessHours: string | null;
    googleMapsEmbedUrl: string | null;
  };
  legal: {
    gstNumber: string | null;
    companyRegistration: string | null;
    securityStaffingLicensingNote: string;
  };
  siteUrl: string;
}

export const businessInfo: BusinessConfig = {
  name: "Smart Facility Services",
  tagline: "Reliable Support. Every Day.",
  heroHeadline: "A Smarter Way to Care for Your Property",
  heroSubheadline:
    "Professional facility operations, preventive maintenance, and technical services tailored for residential communities, commercial facilities, and property managers in Bengaluru.",
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
      neighborhood: "Bengaluru (East & Adjacent Regions)",
      city: "Bengaluru",
      state: "Karnataka",
      postalCodes: ["560066", "560048", "560037", "560036"],
      description: "Extended coverage across Bengaluru urban region upon enquiry review and scheduled site evaluation.",
    },
  ],
  contact: {
    // Left null until verified by business owner - forms use quote workflow
    phone: null,
    email: null,
    address: null,
    businessHours: null,
    googleMapsEmbedUrl: null,
  },
  legal: {
    gstNumber: null,
    companyRegistration: null,
    securityStaffingLicensingNote:
      "Security staffing services are subject to state regulatory compliance under the Private Security Agencies (Regulation) Act (PSARA). Full compliance verification is conducted prior to operational deployment.",
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://smartfacilityservices.com",
};
