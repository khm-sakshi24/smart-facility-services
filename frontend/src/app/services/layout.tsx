import type { Metadata } from "next";
import { businessInfo } from "@/config/businessInfo";

export const metadata: Metadata = {
  title: "13 Facility Management & Property Maintenance Services | Smart Facility Services Bengaluru",
  description:
    "Explore our 13 specialized facility management disciplines across Bengaluru, Whitefield & Hoodi: Housekeeping, Electrical, Plumbing, HVAC, STP/WTP & Water Tank Cleaning.",
  alternates: {
    canonical: `${businessInfo.siteUrl}/services`,
  },
  openGraph: {
    title: "13 Facility Management & Maintenance Services | Smart Facility Services Bengaluru",
    description:
      "Comprehensive facility services across Hoodi, Whitefield, Mahadevapura & Bengaluru. 24/7 housekeeping, MEP, STP upkeep, and water tank cleaning.",
    url: `${businessInfo.siteUrl}/services`,
    siteName: businessInfo.name,
    type: "website",
    locale: "en_IN",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
