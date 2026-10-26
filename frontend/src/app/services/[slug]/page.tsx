import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { servicesCatalogue, ServiceDetail } from "@/config/servicesData";
import { businessInfo, getPhoneLink, getWhatsAppLink, getEmailLink } from "@/config/businessInfo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StructuredData } from "@/components/StructuredData";
import {
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Layers,
  ChevronRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Mail,
} from "lucide-react";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return servicesCatalogue.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = servicesCatalogue.find((s) => s.slug === params.slug);
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | Smart Facility Services Bengaluru`,
    description: service.shortDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} in Bengaluru`,
      description: service.shortDescription,
      url: `https://smartfacilityservices.com/services/${service.slug}`,
    },
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = servicesCatalogue.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const relatedServices = servicesCatalogue
    .filter((s) => s.slug !== service.slug && s.category === service.category)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <StructuredData
        type="Service"
        serviceData={{
          name: service.title,
          description: service.fullDescription,
          url: `https://smartfacilityservices.com/services/${service.slug}`,
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        breadcrumbs={[
          { name: "Home", item: "https://smartfacilityservices.com" },
          { name: "Services", item: "https://smartfacilityservices.com/services" },
          { name: service.title, item: `https://smartfacilityservices.com/services/${service.slug}` },
        ]}
      />

      <Breadcrumb
        items={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      {/* Main Hero Header */}
      <div className="bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 p-6 sm:p-12 rounded-3xl border border-emerald-100 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-white border border-emerald-200 px-3 py-1 rounded-full shadow-2xs">
            {service.category}
          </span>
          {service.status === "active" ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Active Service
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              Proposed Service Catalogue
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight">
          {service.title}
        </h1>

        <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
          {service.fullDescription}
        </p>

        {service.complianceNotes && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">Statutory &amp; Regulatory Note:</strong>
              <span>{service.complianceNotes}</span>
            </div>
          </div>
        )}

        {/* Direct Contact CTAs */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href={getPhoneLink()}
            className="px-6 py-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm shadow hover:shadow-md transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-300" />
            <span>Call Now ({businessInfo.primaryPhoneDisplay})</span>
          </a>

          <a
            href={getWhatsAppLink(`Hello Smart Facility Services, I would like to inquire about ${service.title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow hover:shadow-md transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm border border-gray-300 transition-colors"
          >
            Contact Operations
          </Link>
        </div>
      </div>

      {/* Typical Use Cases & Scope of Work */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Typical Use Cases */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/90 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-forest-800" />
            <span>Typical Applications &amp; Properties</span>
          </h2>
          <p className="text-xs text-gray-500">
            Common property profiles across Hoodi, Garudachar Palya, Whitefield, and Bengaluru:
          </p>
          <ul className="space-y-3 pt-2">
            {service.typicalUseCases.map((useCase, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scope of Work */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Scope of Maintenance</h2>
            <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              Tailored on Site
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Work tailored according to property scale and committee agreements:
          </p>
          <ul className="space-y-3 pt-2">
            {service.scopeOfWork.map((scope, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="w-5 h-5 rounded-full bg-forest-50 text-forest-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{scope}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-slate-50 p-6 sm:p-10 rounded-2xl border border-gray-200 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">
          Value &amp; Operational Benefits
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {service.benefits.map((benefit, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-forest-700 shrink-0 mt-1" />
              <span className="text-xs sm:text-sm text-gray-800 font-medium">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-forest-800" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 space-y-2">
                <h3 className="font-bold text-sm sm:text-base text-gray-900">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Contact Callout */}
      <div className="bg-forest-900 text-white p-8 sm:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800">
        <div>
          <h3 className="text-2xl font-bold">Interested in {service.title}?</h3>
          <p className="text-sm text-emerald-200 mt-1">
            Contact Smart Facility Services at <strong>{businessInfo.primaryPhoneDisplay}</strong> or <strong>{businessInfo.email}</strong> to discuss property requirements.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={getPhoneLink()}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-forest-950 font-bold text-xs sm:text-sm shadow flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-4 h-4 text-forest-800" />
            <span>Call Now</span>
          </a>
          <a
            href={getWhatsAppLink(`Hello Smart Facility Services, I would like to know more about ${service.title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow flex items-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>
          <a
            href={getEmailLink(`Enquiry about ${service.title}`)}
            className="px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs sm:text-sm border border-emerald-500/40 shadow flex items-center gap-1.5 transition-colors"
          >
            <Mail className="w-4 h-4 text-emerald-300" />
            <span>Email Us</span>
          </a>
        </div>
      </div>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Related {service.category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="p-5 rounded-xl bg-white border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all group"
              >
                <h3 className="font-bold text-sm text-gray-900 group-hover:text-forest-800 flex items-center justify-between mb-2">
                  <span>{rel.title}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">{rel.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
