export type Language = "en" | "kn";

export interface Translations {
  nav: {
    home: string;
    services: string;
    about: string;
    process: string;
    serviceAreas: string;
    quote: string;
    contact: string;
    adminLogin: string;
  };
  hero: {
    tagline: string;
    headline: string;
    subheadline: string;
    requestQuoteCta: string;
    exploreServicesCta: string;
    callAssistance: string;
  };
  sections: {
    featuredServices: string;
    featuredServicesSub: string;
    whyChooseUs: string;
    whyChooseUsSub: string;
    workProcess: string;
    workProcessSub: string;
    serviceCoverage: string;
    serviceCoverageSub: string;
    readyToElevate: string;
    readyToElevateSub: string;
  };
  forms: {
    fullName: string;
    associationName: string;
    email: string;
    phone: string;
    location: string;
    propertyType: string;
    units: string;
    servicesRequired: string;
    preferredDate: string;
    notes: string;
    consent: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    errorMessage: string;
  };
  common: {
    confirmedBadge: string;
    proposedBadge: string;
    learnMore: string;
    checkArea: string;
    openAssistant: string;
    viewQr: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About Us",
      process: "Work Process",
      serviceAreas: "Service Areas",
      quote: "Request a Quote",
      contact: "Contact",
      adminLogin: "Staff Portal",
    },
    hero: {
      tagline: "Reliable Support. Every Day.",
      headline: "A Smarter Way to Care for Your Property",
      subheadline:
        "Comprehensive facility management, electro-mechanical upkeep, and environmental operations for apartment communities and commercial facilities in Bengaluru.",
      requestQuoteCta: "Request a Quote",
      exploreServicesCta: "Explore Services",
      callAssistance: "Ask Assistant",
    },
    sections: {
      featuredServices: "Our Facility Services",
      featuredServicesSub: "Specialized maintenance and operations designed for reliability and safety.",
      whyChooseUs: "Why Smart Facility Services",
      whyChooseUsSub: "Our disciplined approach delivers transparent communication and dependable building upkeep.",
      workProcess: "Our Work Process",
      workProcessSub: "A proposed, systematic 7-stage workflow from requirement evaluation to ongoing monitoring.",
      serviceCoverage: "Confirmed Service Areas",
      serviceCoverageSub: "Direct operations in Hoodi, Garudachar Palya, Whitefield, and greater Bengaluru.",
      readyToElevate: "Ready to Upgrade Your Facility Maintenance?",
      readyToElevateSub: "Connect with our team to arrange a site evaluation and receive a tailored quotation.",
    },
    forms: {
      fullName: "Full Name",
      associationName: "Apartment Association / Company Name",
      email: "Email Address",
      phone: "Phone Number (10 digits)",
      location: "Property Location (e.g., Whitefield, Hoodi)",
      propertyType: "Property Type",
      units: "Approximate Number of Units / Area",
      servicesRequired: "Services Required",
      preferredDate: "Preferred Start Date",
      notes: "Specific Requirements or Notes",
      consent: "I consent to having Smart Facility Services store my submitted details to provide a quotation.",
      submit: "Submit Quotation Request",
      submitting: "Submitting Enquiry...",
      successTitle: "Enquiry Submitted Successfully",
      successMessage: "Thank you for reaching out. Your enquiry has been safely received. Our operations team will review your requirements and coordinate a site evaluation.",
      errorTitle: "Submission Error",
      errorMessage: "Could not submit your quotation enquiry. Please verify the required fields and try again.",
    },
    common: {
      confirmedBadge: "Available Service",
      proposedBadge: "Proposed Service",
      learnMore: "Learn More",
      checkArea: "Check Service Area",
      openAssistant: "Smart Assistant",
      viewQr: "Inspect QR Record",
    },
  },
  kn: {
    nav: {
      home: "ಮುಖಪುಟ",
      services: "ಸೇವೆಗಳು",
      about: "ನಮ್ಮ ಬಗ್ಗೆ",
      process: "ಕಾರ್ಯ ವಿಧಾನ",
      serviceAreas: "ಸೇವಾ ವಲಯಗಳು",
      quote: "ದರಪಟ್ಟಿ ವಿನಂತಿ",
      contact: "ಸಂಪರ್ಕಿಸಿ",
      adminLogin: "ಸಿಬ್ಬಂದಿ ಪೋರ್ಟಲ್",
    },
    hero: {
      tagline: "ವಿಶ್ವಾಸಾರ್ಹ ಸೇವೆ. ಪ್ರತಿ ದಿನವೂ.",
      headline: "ನಿಮ್ಮ ಆಸ್ತಿಯ ನಿರ್ವಹಣೆಗೆ ಸ್ಮಾರ್ಟ್ ವಿಧಾನ",
      subheadline:
        "ಬೆಂಗಳೂರಿನ ಅಪಾರ್ಟ್ಮೆಂಟ್ ಸಂಘಗಳು ಮತ್ತು ವಾಣಿಜ್ಯ ಸಂಸ್ಥೆಗಳಿಗಾಗಿ ಸಮಗ್ರ ಸೌಲಭ್ಯ ನಿರ್ವಹಣೆ ಮತ್ತು ತಾಂತ್ರಿಕ ಸೇವೆಗಳು.",
      requestQuoteCta: "ದರಪಟ್ಟಿ ಪಡೆಯಿರಿ",
      exploreServicesCta: "ಸೇವೆಗಳನ್ನು ನೋಡಿ",
      callAssistance: "ಸ್ಮಾರ್ಟ್ ಸಹಾಯಕ",
    },
    sections: {
      featuredServices: "ನಮ್ಮ ಸೌಲಭ್ಯ ಸೇವೆಗಳು",
      featuredServicesSub: "ವಿಶ್ವಾಸಾರ್ಹತೆ ಮತ್ತು ಸುರಕ್ಷತೆಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ವಿಶೇಷ ನಿರ್ವಹಣೆ.",
      whyChooseUs: "ಸ್ಮಾರ್ಟ್ ಫೆಸಿಲಿಟಿ ಸರ್ವಿಸಸ್ ಏಕೆ?",
      whyChooseUsSub: "ಶಿಸ್ತುಬದ್ಧ ಕಾರ್ಯವಿಧಾನ ಮತ್ತು ಪಾರದರ್ಶಕ ಸಂವಹನದೊಂದಿಗೆ ಗುಣಮಟ್ಟದ ನಿರ್ವಹಣೆ.",
      workProcess: "ನಮ್ಮ ಕಾರ್ಯ ವಿಧಾನ",
      workProcessSub: "ಅಗತ್ಯತೆಗಳ ಪರಿಶೀಲನೆಯಿಂದ ಪೂರ್ಣಗೊಳ್ಳುವವರೆಗಿನ ಕ್ರಮಬದ್ಧ 7-ಹಂತಗಳ ಕಾರ್ಯವಿಧಾನ.",
      serviceCoverage: "ದೃಢೀಕೃತ ಸೇವಾ ಪ್ರದೇಶಗಳು",
      serviceCoverageSub: "ಹೂಡಿ, ಗರುಡಾಚಾರ್ ಪಾಳ್ಯ, ವೈಟ್‌ಫೀಲ್ಡ್ ಮತ್ತು ಬೆಂಗಳೂರಿನಾದ್ಯಂತ ಸೇವೆ.",
      readyToElevate: "ನಿಮ್ಮ ಆಸ್ತಿಯ ನಿರ್ವಹಣೆಯನ್ನು ಉತ್ತಮಗೊಳಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
      readyToElevateSub: "ಸೈಟ್ ಪರಿಶೀಲನೆ ಮತ್ತು ನಿಖರ ದರಪಟ್ಟಿಗಾಗಿ ಇಂದೇ ನಮ್ಮ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    },
    forms: {
      fullName: "ಪೂರ್ಣ ಹೆಸರು",
      associationName: "ಅಪಾರ್ಟ್ಮೆಂಟ್ ಸಂಘ / ಸಂಸ್ಥೆಯ ಹೆಸರು",
      email: "ಇಮೇಲ್ ವಿಳಾಸ",
      phone: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
      location: "ಆಸ್ತಿಯ ಸ್ಥಳ (ಉದಾ: ವೈಟ್‌ಫೀಲ್ಡ್, ಹೂಡಿ)",
      propertyType: "ಆಸ್ತಿಯ ಪ್ರಕಾರ",
      units: "ಅಂದಾಜು ಫ್ಲಾಟ್‌ಗಳು / ವಿಸ್ತೀರ್ಣ",
      servicesRequired: "ಅಗತ್ಯವಿರುವ ಸೇವೆಗಳು",
      preferredDate: "ಪ್ರಾರಂಭಿಸುವ ದಿನಾಂಕ",
      notes: "ಹೆಚ್ಚುವರಿ ವಿವರಗಳು",
      consent: "ದರಪಟ್ಟಿ ನೀಡಲು ನನ್ನ ವಿವರಗಳನ್ನು ಬಳಸಲು ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ.",
      submit: "ದರಪಟ್ಟಿ ವಿನಂತಿ ಸಲ್ಲಿಸಿ",
      submitting: "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...",
      successTitle: "ವಿನಂತಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಕೆಯಾಗಿದೆ",
      successMessage: "ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ವಿನಂತಿಯನ್ನು ಸ್ವೀಕರಿಸಲಾಗಿದೆ. ನಮ್ಮ ತಂಡವು ಶೀಘ್ರದಲ್ಲೇ ಪರಿಶೀಲಿಸಿ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಲಿದೆ.",
      errorTitle: "ದೋಷ ಸಂಭವಿಸಿದೆ",
      errorMessage: "ವಿನಂತಿ ಸಲ್ಲಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ವಿವರಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ ಮರುಪ್ರಯತ್ನಿಸಿ.",
    },
    common: {
      confirmedBadge: "ಲಭ್ಯವಿರುವ ಸೇವೆ",
      proposedBadge: "ಪ್ರಸ್ತಾವಿತ ಸೇವೆ",
      learnMore: "ಹೆಚ್ಚಿನ ವಿವರ",
      checkArea: "ಸೇವಾ ಪ್ರದೇಶ ಪರೀಕ್ಷಿಸಿ",
      openAssistant: "ಸ್ಮಾರ್ಟ್ ಸಹಾಯಕ",
      viewQr: "QR ವಿವರ ನೋಡಿ",
    },
  },
};
