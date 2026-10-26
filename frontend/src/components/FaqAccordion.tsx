"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Do you provide 24/7 support for registered apartment communities?",
    answer:
      "Yes. While routine maintenance shifts operate from 8:00 AM to 7:00 PM, we provide 24/7 emergency coordination for registered residential societies and commercial facilities to address critical water pump failures, main electrical panel issues, or STP overflows.",
  },
  {
    question: "What is included under General Maintenance?",
    answer:
      "General Maintenance covers routine property inspections, minor repairs, common area lighting replacement, hardware fixes, plumbing valve checks, and ongoing coordination of physical facility upkeep according to the agreed property scope.",
  },
  {
    question: "How is daily supervisory oversight conducted?",
    answer:
      "Operational supervisors conduct scheduled site audits using digital task checklists. Supervisors review daily logbooks, verify pump operating parameters, inspect common corridors, and sign off on technician execution.",
  },
  {
    question: "How do you handle STP, ETP, and WTP environmental compliance?",
    answer:
      "Our water treatment personnel maintain daily testing logs (pH, dissolved oxygen, MLSS), schedule chemical dosing, carry out systematic sand and carbon filter backwashing, and ensure treated water output complies with applicable environmental and KSPCB standards.",
  },
  {
    question: "How do you coordinate with Apartment Management Committees (RWAs)?",
    answer:
      "We provide a single operational point of contact for the committee, submitting transparent monthly maintenance logs, coordinating preventive schedules in advance, and attending committee reviews to resolve property maintenance queries.",
  },
  {
    question: "How quickly can you arrange a physical property inspection?",
    answer:
      "For properties in Hoodi, Garudachar Palya, and Whitefield, an operational supervisor can typically conduct an on-site physical walk-through within 24 to 48 business hours after direct phone or WhatsApp contact.",
  },
  {
    question: "Which areas in Bengaluru do you actively cover?",
    answer:
      "Our primary confirmed service hubs are Hoodi, Garudachar Palya, and Whitefield. We also support apartment complexes and commercial campuses across the wider East Bengaluru urban corridor upon scheduled technical review.",
  },
];

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xs p-6 sm:p-10 space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Got Questions?
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          Everything apartment associations and property managers need to know about our operations.
        </p>
      </div>

      <div className="space-y-3 max-w-3xl mx-auto pt-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-emerald-500/80 bg-emerald-50/30 shadow-xs"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-gray-900 cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className={`w-4 h-4 shrink-0 ${isOpen ? "text-emerald-600" : "text-gray-400"}`} />
                  <span>{faq.question}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 text-gray-500 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-emerald-600" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-emerald-100/60 animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
