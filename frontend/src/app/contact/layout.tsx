import type { Metadata } from "next";
import { businessInfo } from "@/config/businessInfo";

export const metadata: Metadata = {
  title: "Contact Operations | Smart Facility Services Bengaluru (24/7 Support)",
  description:
    "Contact Smart Facility Services for residential & commercial property maintenance in Bengaluru, Whitefield, Hoodi & Mahadevapura. Call +91 96638 46126 or WhatsApp.",
  alternates: {
    canonical: `${businessInfo.siteUrl}/contact`,
  },
  openGraph: {
    title: "Contact Operations | Smart Facility Services Bengaluru",
    description:
      "Connect with our 24/7 operations team for facility maintenance in Whitefield, Hoodi & Bengaluru. Phone: +91 96638 46126 or +91 97410 48836.",
    url: `${businessInfo.siteUrl}/contact`,
    siteName: businessInfo.name,
    type: "website",
    locale: "en_IN",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
