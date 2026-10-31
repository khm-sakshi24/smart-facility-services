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
    default: "Smart Facility Services Bengaluru | Facility Management Whitefield, Hoodi & Mahadevapura",
    template: "%s | Smart Facility Services Bengaluru",
  },
  description:
    "Smart Facility Services Bengaluru provides premier facility management in Whitefield, facility maintenance services in Hoodi, and facility maintenance in Mahadevapura. 24/7 housekeeping, MEP, STP & pump upkeep.",
  keywords: [
    "Smart Facility Services Bengaluru",
    "Facility management Whitefield",
    "Facility maintenance services Hoodi",
    "Facility maintenance Mahadevapura",
    "facility management Bengaluru",
    "facility maintenance services in Bengaluru",
    "housekeeping services in Bengaluru",
    "electrical maintenance services in Whitefield",
    "plumbing services in Bengaluru",
    "STP ETP WTP operation and maintenance services",
    "water tank cleaning Bengaluru",
    "Garudachar Palya facility services",
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
    title: "Smart Facility Services Bengaluru | Facility Management Whitefield, Hoodi & Mahadevapura",
    description:
      "Premier facility management in Whitefield, facility maintenance services in Hoodi, and facility maintenance in Mahadevapura. 24/7 housekeeping, MEP, and pump upkeep.",
    siteName: businessInfo.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Facility Services Bengaluru | Facility Management Whitefield",
    description:
      "Premier facility management in Whitefield, facility maintenance services in Hoodi, and facility maintenance in Mahadevapura.",
    images: [`${businessInfo.siteUrl}/images/logo.png`],
  },
  alternates: {
    canonical: businessInfo.siteUrl,
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
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
