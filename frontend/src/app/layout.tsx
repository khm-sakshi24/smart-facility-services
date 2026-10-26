import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageContext";
import { StructuredData } from "@/components/StructuredData";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { WelcomeAnnouncement } from "@/components/WelcomeAnnouncement";
import { StickyMobileContactBar } from "@/components/StickyMobileContactBar";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { SmartAssistant } from "@/components/SmartAssistant";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { businessInfo } from "@/config/businessInfo";

export const metadata: Metadata = {
  metadataBase: new URL(businessInfo.siteUrl),
  title: {
    default: "Smart Facility Services | Reliable Facility Support in Bengaluru",
    template: "%s | Smart Facility Services",
  },
  description:
    "Smart Facility Services provides facility support and maintenance solutions for residential communities, apartments, commercial properties and businesses in Hoodi, Garudachar Palya, Whitefield, and Bengaluru.",
  keywords: [
    "facility management Bengaluru",
    "facility management services in Whitefield",
    "housekeeping services in Bengaluru",
    "general building maintenance Bengaluru",
    "general maintenance Bengaluru",
    "electrical maintenance services in Whitefield",
    "plumbing services in Bengaluru",
    "STP ETP WTP operation and maintenance services",
    "water tank cleaning Bengaluru",
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
    title: "Smart Facility Services | Reliable Facility Support in Bengaluru",
    description:
      "Reliable Facility Support. Every Day. Comprehensive facility operations, MEP maintenance, and building care for properties in Bengaluru.",
    siteName: businessInfo.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Facility Services | Facility Management Bengaluru",
    description:
      "Reliable Facility Support. Every Day. Maintenance support for apartment communities in Whitefield, Hoodi & Bengaluru.",
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
      <body className="min-h-screen flex flex-col font-sans selection:bg-emerald-200 selection:text-forest-950 pb-20 sm:pb-0">
        <ScrollProgressBar />
        <LanguageProvider>
          <StructuredData type="LocalBusiness" />
          <WelcomeAnnouncement />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <StickyMobileContactBar />
          <FloatingWhatsAppButton />
          <SmartAssistant />
          <ScrollToTopButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
