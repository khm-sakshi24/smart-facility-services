/**
 * Smart Facility Services - Centralized Business Configuration
 *
 * Configured with verified contact details:
 * Contact Person: Aruna
 * Phone: 7406122135 (+91 74061 22135)
 * Email: arunasa@gmail.com
 * Tagline: Reliable Facility Support. Every Day.
 * Service Areas: Hoodi, Garudachar Palya, Whitefield, Bengaluru
 *
 * To add or change contact numbers in the future, simply update the fields below.
 */

export interface BusinessConfig {
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  aboutIntro: string;
  contactPerson: string;
  primaryPhone: string;
  primaryPhoneDisplay: string;
  whatsappNumber: string;
  email: string;
  contact: {
    personName: string;
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
  tagline: "Reliable Facility Support. Every Day.",
  heroHeadline: "A Smarter Way to Care for Your Property",
  heroSubheadline:
    "Smart Facility Services provides facility support and maintenance solutions for residential communities, apartments, commercial properties and businesses in Bengaluru.",
  aboutIntro:
    "Smart Facility Services aims to provide dependable facility management and maintenance support for apartments, residential communities and businesses in Bengaluru. We focus on clear communication, service quality and building long-term relationships with our clients.",
  
  // Contact details provided by the business owner
  contactPerson: "Aruna",
  primaryPhone: "7406122135",
  primaryPhoneDisplay: "+91 74061 22135",
  whatsappNumber: "917406122135",
  email: "arunasa@gmail.com",

  contact: {
    personName: "Aruna",
    phone: "7406122135",
    phoneFormatted: "+91 74061 22135",
    whatsapp: "917406122135",
    email: "arunasa@gmail.com",
    businessHours: "Monday to Saturday, 8:00 AM - 7:00 PM",
  },
  
  // Easily add additional staff or emergency contact numbers here in the future
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
      neighborhood: "Bengaluru (East & Adjacent Regions)",
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
  const msg = prefilledMessage || "Hello Smart Facility Services, I would like to know more about your facility management and maintenance services.";
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
