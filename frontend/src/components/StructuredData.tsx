import React from "react";
import { businessInfo } from "@/config/businessInfo";

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
      "@type": "HomeAndConstructionBusiness",
      name: businessInfo.name,
      description: businessInfo.heroSubheadline,
      url: businessInfo.siteUrl,
      logo: `${businessInfo.siteUrl}/images/logo.png`,
      image: `${businessInfo.siteUrl}/images/logo.png`,
      telephone: `+91${businessInfo.primaryPhone}`,
      email: businessInfo.email,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: `+91${businessInfo.primaryPhone}`,
        email: businessInfo.email,
        areaServed: "IN",
        availableLanguage: ["English", "Kannada", "Hindi"],
      },
      areaServed: businessInfo.confirmedServiceAreas.map((area) => ({
        "@type": "AdministrativeArea",
        name: `${area.neighborhood}, ${area.city}, Karnataka`,
      })),
      slogan: businessInfo.tagline,
      priceRange: "₹₹",
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
      },
      areaServed: businessInfo.confirmedServiceAreas.map((area) => ({
        "@type": "AdministrativeArea",
        name: area.neighborhood,
      })),
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
