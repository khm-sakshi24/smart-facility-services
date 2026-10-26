export type Language = "en" | "kn";

export interface Translations {
  nav: {
    home: string;
    services: string;
    about: string;
    serviceAreas: string;
    contact: string;
  };
  hero: {
    tagline: string;
    headline: string;
    subheadline: string;
    callUs: string;
    whatsappUs: string;
    exploreServices: string;
  };
  sections: {
    servicesHeading: string;
    servicesSubheading: string;
    whyChooseUs: string;
    whyChooseUsSub: string;
    workProcess: string;
    workProcessSub: string;
    serviceCoverage: string;
    serviceCoverageSub: string;
    contactCtaHeading: string;
    contactCtaSubheading: string;
  };
  contactActions: {
    callNow: string;
    chatWhatsapp: string;
    sendEmail: string;
    contactUs: string;
    learnMore: string;
    viewService: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About Us",
      serviceAreas: "Service Areas",
      contact: "Contact Us",
    },
    hero: {
      tagline: "Reliable Facility Support. Every Day.",
      headline: "A Smarter Way to Care for Your Property",
      subheadline:
        "Smart Facility Services provides facility support and maintenance solutions for residential communities, apartments, commercial properties and businesses in Bengaluru.",
      callUs: "Call Us",
      whatsappUs: "WhatsApp Us",
      exploreServices: "Explore Our Services",
    },
    sections: {
      servicesHeading: "Our Facility Services",
      servicesSubheading: "Comprehensive maintenance, operations, and technical support for properties across Bengaluru.",
      whyChooseUs: "Why Choose Us?",
      whyChooseUsSub: "Our core service principles ensure transparent communication and reliable building upkeep.",
      workProcess: "Our Work Process",
      workProcessSub: "A simple 5-step approach from initial contact to agreed maintenance execution.",
      serviceCoverage: "Service Areas in Bengaluru",
      serviceCoverageSub: "Direct operations in Hoodi, Garudachar Palya, Whitefield, and Bengaluru.",
      contactCtaHeading: "Looking for Reliable Facility Support?",
      contactCtaSubheading: "Get in touch with Smart Facility Services to discuss your property's facility management and maintenance needs.",
    },
    contactActions: {
      callNow: "Call Now",
      chatWhatsapp: "Chat on WhatsApp",
      sendEmail: "Send an Email",
      contactUs: "Contact Us",
      learnMore: "Learn More",
      viewService: "View Service",
    },
  },
  kn: {
    nav: {
      home: "ಮುಖಪುಟ",
      services: "ಸೇವೆಗಳು",
      about: "ನಮ್ಮ ಬಗ್ಗೆ",
      serviceAreas: "ಸೇವಾ ವಲಯಗಳು",
      contact: "ಸಂಪರ್ಕಿಸಿ",
    },
    hero: {
      tagline: "ವಿಶ್ವಾಸಾರ್ಹ ಸೌಲಭ್ಯ ಬೆಂಬಲ. ಪ್ರತಿ ದಿನವೂ.",
      headline: "ನಿಮ್ಮ ಆಸ್ತಿಯ ನಿರ್ವಹಣೆಗೆ ಸ್ಮಾರ್ಟ್ ವಿಧಾನ",
      subheadline:
        "ಬೆಂಗಳೂರಿನ ಅಪಾರ್ಟ್ಮೆಂಟ್ ಸಂಘಗಳು, ವಸತಿ ಸಮುದಾಯಗಳು ಮತ್ತು ವಾಣಿಜ್ಯ ಸಂಸ್ಥೆಗಳಿಗಾಗಿ ವಿಶ್ವಾಸಾರ್ಹ ಸೌಲಭ್ಯ ನಿರ್ವಹಣೆ ಮತ್ತು ತಾಂತ್ರಿಕ ಸೇವೆಗಳು.",
      callUs: "ಕರೆ ಮಾಡಿ",
      whatsappUs: "WhatsApp ಮಾಡಿ",
      exploreServices: "ನಮ್ಮ ಸೇವೆಗಳನ್ನು ನೋಡಿ",
    },
    sections: {
      servicesHeading: "ನಮ್ಮ ಸೌಲಭ್ಯ ಸೇವೆಗಳು",
      servicesSubheading: "ವಿಶ್ವಾಸಾರ್ಹತೆ ಮತ್ತು ಗುಣಮಟ್ಟಕ್ಕಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಸಮಗ್ರ ನಿರ್ವಹಣೆ.",
      whyChooseUs: "ನಮ್ಮನ್ನೇ ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು?",
      whyChooseUsSub: "ಪಾರದರ್ಶಕ ಸಂವಹನ ಮತ್ತು ಗುಣಮಟ್ಟದ ನಿರ್ವಹಣಾ ತತ್ವಗಳು.",
      workProcess: "ನಮ್ಮ ಕಾರ್ಯ ವಿಧಾನ",
      workProcessSub: "ಸಂಪರ್ಕದಿಂದ ನಿರ್ವಹಣೆಯವರೆಗೆ ಸರಳ 5-ಹಂತಗಳ ಕಾರ್ಯವಿಧಾನ.",
      serviceCoverage: "ದೃಢೀಕೃತ ಸೇವಾ ಪ್ರದೇಶಗಳು",
      serviceCoverageSub: "ಹೂಡಿ, ಗರುಡಾಚಾರ್ ಪಾಳ್ಯ, ವೈಟ್‌ಫೀಲ್ಡ್ ಮತ್ತು ಬೆಂಗಳೂರಿನಾದ್ಯಂತ ಸೇವೆ.",
      contactCtaHeading: "ವಿಶ್ವಾಸಾರ್ಹ ಸೌಲಭ್ಯ ಬೆಂಬಲ ಬೇಕೇ?",
      contactCtaSubheading: "ನಿಮ್ಮ ಆಸ್ತಿಯ ನಿರ್ವಹಣಾ ಅಗತ್ಯಗಳನ್ನು ಚರ್ಚಿಸಲು ಸ್ಮಾರ್ಟ್ ಫೆಸಿಲಿಟಿ ಸರ್ವಿಸಸ್ ಅನ್ನು ಇಂದೇ ಸಂಪರ್ಕಿಸಿ.",
    },
    contactActions: {
      callNow: "ಈಗಲೇ ಕರೆ ಮಾಡಿ",
      chatWhatsapp: "WhatsApp ನಲ್ಲಿ ಚಾಟ್ ಮಾಡಿ",
      sendEmail: "ಇಮೇಲ್ ಕಳುಹಿಸಿ",
      contactUs: "ಸಂಪರ್ಕಿಸಿ",
      learnMore: "ಹೆಚ್ಚಿನ ವಿವರ",
      viewService: "ಸೇವೆ ವೀಕ್ಷಿಸಿ",
    },
  },
};
