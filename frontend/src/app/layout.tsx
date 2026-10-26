import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageContext";
import { SmartAssistant } from "@/components/SmartAssistant";
import { StructuredData } from "@/components/StructuredData";
import { businessInfo } from "@/config/businessInfo";

export const metadata: Metadata = {
  metadataBase: new URL(businessInfo.siteUrl),
  title: {
    default: "Smart Facility Services | Reliable Facility Management in Bengaluru",
    template: "%s | Smart Facility Services",
  },
  description:
    "Professional facility services, STP, ETP & WTP operation, electrical & plumbing upkeep, and building maintenance for apartment associations and commercial properties in Whitefield, Hoodi, Garudachar Palya & Bengaluru.",
  keywords: [
    "facility management Bengaluru",
    "facility management services in Whitefield",
    "housekeeping services in Bengaluru",
    "building maintenance services in Whitefield",
    "electrical and plumbing maintenance in Bengaluru",
    "STP ETP WTP operation and maintenance",
    "swimming pool maintenance Bengaluru",
    "Hoodi facility services",
  ],
  authors: [{ name: businessInfo.name }],
  creator: businessInfo.name,
  publisher: businessInfo.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: businessInfo.siteUrl,
    title: "Smart Facility Services | Reliable Facility Management in Bengaluru",
    description:
      "Reliable Support. Every Day. Comprehensive facility operations, MEP maintenance, and environmental plants for residential and commercial properties in Bengaluru.",
    siteName: businessInfo.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Facility Services | Facility Management Bengaluru",
    description:
      "Reliable Support. Every Day. Operations & maintenance for apartment communities in Whitefield, Hoodi & Bengaluru.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col font-sans selection:bg-emerald-200 selection:text-forest-950">
        <LanguageProvider>
          <StructuredData type="LocalBusiness" />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <SmartAssistant />
        </LanguageProvider>
      </body>
    </html>
  );
}
