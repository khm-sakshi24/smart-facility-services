import React from "react";
import { businessInfo } from "@/config/businessInfo";
import { servicesCatalogue } from "@/config/servicesData";

interface StructuredDataProps {
  type?: "LocalBusiness" | "Service" | "BreadcrumbList";
  serviceData?: {
    name: string;
    description: string;
    url: string;
  };
  breadcrumbs?: { name: string; item: string }[];
}

export const StructuredData: React.FC<StructuredDataProps> = ({
  type = "LocalBusiness",
  serviceData,
  breadcrumbs,
}) => {
  let schema: Record<string, unknown> = {};

  if (type === "LocalBusiness") {
    schema = {
      "@context": "https://schema.org",
      "@type": ["ProfessionalService", "HomeAndConstructionBusiness"],
      name: businessInfo.name,
      alternateName: "Smart Facility Services Bengaluru",
      description:
        "Smart Facility Services provides 24/7 facility management, MEP maintenance, housekeeping, STP/WTP operations, and building care in Bengaluru, Whitefield, Hoodi, Mahadevapura, and Garudachar Palya.",
      url: businessInfo.siteUrl,
      logo: `${businessInfo.siteUrl}/images/logo.png`,
      image: `${businessInfo.siteUrl}/images/logo.png`,
      telephone: `+91${businessInfo.primaryPhone}`,
      email: businessInfo.email,
      priceRange: "₹₹",
      slogan: businessInfo.tagline,
      // Service-Area Business definition (Physical address hidden per GBP guidelines)
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: `+91${businessInfo.primaryPhone}`,
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English", "Kannada", "Hindi"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+919741048836",
          contactType: "technical operations",
          areaServed: "IN",
          availableLanguage: ["English", "Kannada", "Hindi"],
        },
      ],
      areaServed: [
        {
          "@type": "AdministrativeArea",
          name: "Bengaluru, Karnataka, India",
        },
        {
          "@type": "AdministrativeArea",
          name: "Hoodi, Bengaluru, Karnataka",
        },
        {
          "@type": "AdministrativeArea",
          name: "Whitefield, Bengaluru, Karnataka",
        },
        {
          "@type": "AdministrativeArea",
          name: "Mahadevapura, Bengaluru, Karnataka",
        },
        {
          "@type": "AdministrativeArea",
          name: "Garudachar Palya, Bengaluru, Karnataka",
        },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      ],
      // Offer Catalog mapping all 13 services for Google Search crawling
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Facility Management & Property Maintenance Services",
        itemListElement: servicesCatalogue.map((service, index) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.shortDescription,
            url: `${businessInfo.siteUrl}/services/${service.slug}`,
          },
          position: index + 1,
        })),
      },
    };
  } else if (type === "Service" && serviceData) {
    schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: serviceData.name,
      description: serviceData.description,
      provider: {
        "@type": "LocalBusiness",
        name: businessInfo.name,
        url: businessInfo.siteUrl,
        telephone: `+91${businessInfo.primaryPhone}`,
        email: businessInfo.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Bengaluru" },
        { "@type": "AdministrativeArea", name: "Hoodi" },
        { "@type": "AdministrativeArea", name: "Whitefield" },
        { "@type": "AdministrativeArea", name: "Mahadevapura" },
        { "@type": "AdministrativeArea", name: "Garudachar Palya" },
      ],
      url: serviceData.url,
    };
  } else if (type === "BreadcrumbList" && breadcrumbs) {
    schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((bc, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: bc.name,
        item: bc.item,
      })),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
