"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  businessInfo,
  getPhoneLink,
  getWhatsAppLink,
  getEmailLink,
} from "@/config/businessInfo";
import { servicesCatalogue, ServiceDetail } from "@/config/servicesData";
import {
  MessageSquare,
  X,
  Send,
  Phone,
  MessageCircle,
  Mail,
  ChevronRight,
  Bot,
  User,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  serviceMatch?: ServiceDetail;
  suggestedQuestions?: string[];
  actionLinks?: {
    call?: boolean;
    whatsapp?: string; // prefilled message
    email?: string; // prefilled subject
    pageUrl?: string;
    pageLabel?: string;
  };
}

const suggestedInitialQuestions = [
  "What services do you provide?",
  "Tell me about General Maintenance.",
  "Do you provide plumbing services?",
  "What is HVAC maintenance?",
  "What is STP, ETP and WTP maintenance?",
  "Do you provide swimming pool maintenance?",
  "Do you provide sewage tank cleaning?",
  "Which areas do you serve?",
  "How can I contact your team?",
];

const welcomeMessage: ChatMessage = {
  id: "welcome",
  sender: "bot",
  text: "Hello! Welcome to Smart Facility Services. How can I help you with your facility maintenance needs today?",
  suggestedQuestions: suggestedInitialQuestions.slice(0, 4),
};

export const SmartAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Intelligent verified knowledge processor
  const processQuery = (rawQuery: string): ChatMessage => {
    const q = rawQuery.toLowerCase().trim();

    // 1. Pricing / Quote questions (STRICT RULE)
    if (
      q.includes("price") ||
      q.includes("cost") ||
      q.includes("rate") ||
      q.includes("charge") ||
      q.includes("quote") ||
      q.includes("quotation") ||
      q.includes("fee") ||
      q.includes("how much")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "Our team needs to understand your requirements before confirming applicable pricing. Because building layouts, equipment specifications, and service scopes vary, please contact us directly using the options below to discuss your property.",
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to discuss maintenance requirements and pricing for my property.",
          email: "Pricing and Scope Inquiry - Smart Facility Services",
        },
      };
    }

    // 2. Service Areas question
    if (
      q.includes("area") ||
      q.includes("location") ||
      q.includes("hoodi") ||
      q.includes("whitefield") ||
      q.includes("garudachar") ||
      q.includes("where do you serve") ||
      q.includes("bengaluru") ||
      q.includes("bangalore")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "We provide confirmed, daily facility support in Hoodi, Garudachar Palya, Whitefield, and across Bengaluru, Karnataka. We evaluate operations for apartment communities and commercial facilities throughout the Bengaluru urban area.",
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to check service availability for my location.",
          pageUrl: "/service-areas",
          pageLabel: "View All Service Areas",
        },
        suggestedQuestions: [
          "Tell me about General Maintenance.",
          "What services do you provide?",
          "How can I contact your team?",
        ],
      };
    }

    // 3. How to contact question
    if (
      q.includes("contact") ||
      q.includes("phone") ||
      q.includes("call") ||
      q.includes("whatsapp") ||
      q.includes("email") ||
      q.includes("number") ||
      q.includes("reach") ||
      q.includes("talk")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `You can reach Smart Facility Services directly by calling ${businessInfo.primaryPhoneDisplay}, messaging us on WhatsApp, or emailing ${businessInfo.email}. Our team is ready to discuss your property's maintenance needs.`,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to speak with your operations team.",
          email: "General Inquiry - Smart Facility Services",
          pageUrl: "/contact",
          pageLabel: "Open Contact Page",
        },
      };
    }

    // 4. What services do you provide? / Service catalog
    if (
      q.includes("what services") ||
      q.includes("all services") ||
      q.includes("service list") ||
      q.includes("catalogue") ||
      q.includes("services do you") ||
      q.includes("services provide")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "We offer comprehensive facility support across 13 core disciplines: Housekeeping & Cleaning, Electrical Maintenance, Plumbing, HVAC Maintenance, General Maintenance, STP/ETP/WTP Operations, Sewage Tank Cleaning, Swimming Pool Maintenance & Rework, Water Tank Cleaning, Security Staffing, Consultancy & Engineering, and Installation Maintenance.",
        actionLinks: {
          pageUrl: "/services",
          pageLabel: "Explore All 13 Services",
          whatsapp: "Hello Smart Facility Services, I would like to know more about your facility services catalogue.",
        },
        suggestedQuestions: [
          "Tell me about General Maintenance.",
          "Do you provide plumbing services?",
          "What is STP, ETP and WTP maintenance?",
        ],
      };
    }

    // 5. Match individual services
    // Check General Maintenance specifically (mandatory item)
    if (q.includes("general") || q.includes("routine maintenance") || q.includes("handyman") || q.includes("upkeep")) {
      const match = servicesCatalogue.find((s) => s.slug === "general-maintenance");
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "General Maintenance can include routine property upkeep, inspections, minor repairs, and coordination of maintenance tasks, depending on the agreed scope. Would you like to discuss your requirements with Smart Facility Services?",
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to know more about General Maintenance.",
          email: "Enquiry about General Maintenance",
          pageUrl: "/services/general-maintenance",
          pageLabel: "View General Maintenance Details",
        },
        suggestedQuestions: [
          "Do you provide plumbing services?",
          "What services do you provide?",
          "Which areas do you serve?",
        ],
      };
    }

    // Check Swimming pool
    if (q.includes("pool") || q.includes("swimming")) {
      const isRework = q.includes("rework") || q.includes("renovat") || q.includes("leak") || q.includes("tile");
      const match = servicesCatalogue.find((s) => s.slug === (isRework ? "swimming-pool-rework" : "swimming-pool-maintenance"));
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "Swimming pool maintenance can involve routine cleaning, water-quality checks, chemical-balance monitoring, and equipment inspections, depending on the service scope. Please contact Smart Facility Services to confirm availability and discuss your pool's requirements.",
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to know more about Swimming Pool Maintenance.",
          email: "Enquiry about Swimming Pool Maintenance",
          pageUrl: `/services/${match?.slug || "swimming-pool-maintenance"}`,
          pageLabel: "View Pool Maintenance Details",
        },
        suggestedQuestions: [
          "Do you provide sewage tank cleaning?",
          "What is STP, ETP and WTP maintenance?",
        ],
      };
    }

    // Check Sewage Tank Cleaning
    if (q.includes("sewage") || q.includes("septic") || q.includes("sludge") || q.includes("tank cleaning")) {
      const isWater = q.includes("water") || q.includes("drinking") || q.includes("sump");
      const slug = isWater ? "water-tank-cleaning" : "sewage-tank-cleaning";
      const match = servicesCatalogue.find((s) => s.slug === slug);
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: isWater
          ? "Our Water Tank Cleaning service provides systematic de-watering, high-pressure washing, sludge removal, and antibacterial treatment for overhead tanks and underground sumps."
          : "Sewage Tank Cleaning Work involves scheduled chamber de-silting, vacuum suctioning of settled solids, and clearing blockages safely in line with municipal hygiene standards.",
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: `Hello Smart Facility Services, I would like to know more about ${match?.title || "Tank Cleaning"}.`,
          email: `Enquiry about ${match?.title || "Tank Cleaning"}`,
          pageUrl: `/services/${slug}`,
          pageLabel: `View ${match?.title || "Cleaning"} Details`,
        },
        suggestedQuestions: [
          "What is STP, ETP and WTP maintenance?",
          "Which areas do you serve?",
        ],
      };
    }

    // Check STP / ETP / WTP
    if (q.includes("stp") || q.includes("etp") || q.includes("wtp") || q.includes("water treatment") || q.includes("effluent")) {
      const match = servicesCatalogue.find((s) => s.slug === "stp-etp-wtp-maintenance");
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "STP, ETP, and WTP Operation & Maintenance includes daily microbial monitoring, chemical dosing, backwashing sand and carbon filters, checking pump operations, and maintaining log sheets following environmental compliance standards.",
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to know more about STP, ETP and WTP Maintenance.",
          email: "Enquiry about STP, ETP and WTP Maintenance",
          pageUrl: "/services/stp-etp-wtp-maintenance",
          pageLabel: "View STP/ETP/WTP Details",
        },
        suggestedQuestions: [
          "Do you provide sewage tank cleaning?",
          "Tell me about General Maintenance.",
        ],
      };
    }

    // Check HVAC
    if (q.includes("hvac") || q.includes("ac") || q.includes("air condition") || q.includes("chiller") || q.includes("cooling")) {
      const match = servicesCatalogue.find((s) => s.slug === "hvac-maintenance");
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "HVAC and Air-Conditioning Maintenance covers routine filter cleaning, refrigerant pressure checks, electrical terminal inspection, thermostat calibration, and airflow maintenance for commercial and residential cooling systems.",
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to know more about HVAC Maintenance.",
          email: "Enquiry about HVAC and Air-Conditioning Maintenance",
          pageUrl: "/services/hvac-maintenance",
          pageLabel: "View HVAC Details",
        },
      };
    }

    // Check Plumbing
    if (q.includes("plumb") || q.includes("pipe") || q.includes("leak") || q.includes("drain") || q.includes("valve") || q.includes("pump")) {
      const match = servicesCatalogue.find((s) => s.slug === "plumbing");
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "Our Plumbing Services provide preventive pipeline inspections, hydrostatic leak detection, booster pump upkeep, overhead float valve calibration, and rapid breakdown response for apartment communities.",
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to know more about Plumbing Services.",
          email: "Enquiry about Plumbing Services",
          pageUrl: "/services/plumbing",
          pageLabel: "View Plumbing Details",
        },
      };
    }

    // Check Housekeeping
    if (q.includes("housekeep") || q.includes("clean") || q.includes("corridor") || q.includes("lobby") || q.includes("garbage") || q.includes("washroom")) {
      const match = servicesCatalogue.find((s) => s.slug === "housekeeping");
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "Our Housekeeping and Cleaning Services include daily damp mopping of common corridors, lobby sanitization, stairwell cleaning, glass facade wiping up to safe reach, and dry/wet garbage handling support.",
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to know more about Housekeeping Services.",
          email: "Enquiry about Housekeeping and Cleaning Services",
          pageUrl: "/services/housekeeping",
          pageLabel: "View Housekeeping Details",
        },
      };
    }

    // Check Electrical
    if (q.includes("electric") || q.includes("power") || q.includes("dg") || q.includes("generator") || q.includes("panel") || q.includes("lighting")) {
      const match = servicesCatalogue.find((s) => s.slug === "electrical-maintenance");
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "Electrical Maintenance encompasses main LT panel monitoring, diesel generator (DG) routine checks, phase load balancing, common illumination upkeep, and earth resistance safety verification.",
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to know more about Electrical Maintenance.",
          email: "Enquiry about Electrical Maintenance",
          pageUrl: "/services/electrical-maintenance",
          pageLabel: "View Electrical Details",
        },
      };
    }

    // Check Security
    if (q.includes("security") || q.includes("guard") || q.includes("manning") || q.includes("access control")) {
      const match = servicesCatalogue.find((s) => s.slug === "security-staffing");
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "Security Staffing is part of our facility service offerings for residential communities and commercial gates. Please note that security deployment is subject to full regulatory licensing compliance under the Private Security Agencies (Regulation) Act (PSARA).",
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to know more about Security Staffing.",
          email: "Enquiry about Security Staffing",
          pageUrl: "/services/security-staffing",
          pageLabel: "View Security Staffing Details",
        },
      };
    }

    // Check Consultancy / Engineering / Installation
    if (q.includes("consult") || q.includes("engineer") || q.includes("install") || q.includes("commission") || q.includes("erect")) {
      const slug = q.includes("consult") ? "consultancy-engineering" : "erection-commissioning-installation-maintenance";
      const match = servicesCatalogue.find((s) => s.slug === slug);
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `${match?.title} provides technical oversight, equipment setup, preventive health audits, and lifecycle management for building infrastructure. Would you like to speak with our engineering coordinator?`,
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: `Hello Smart Facility Services, I would like to know more about ${match?.title}.`,
          email: `Enquiry about ${match?.title}`,
          pageUrl: `/services/${slug}`,
          pageLabel: `View ${match?.title} Details`,
        },
      };
    }

    // Default conversational response
    return {
      id: Date.now().toString(),
      sender: "bot",
      text: "Smart Facility Services specializes in facility upkeep, MEP maintenance, water treatment, and building care for apartment societies and commercial properties in Bengaluru. How can we assist you with your property?",
      actionLinks: {
        call: true,
        whatsapp: "Hello Smart Facility Services, I would like to discuss maintenance support for my property.",
        email: "General Maintenance Inquiry - Smart Facility Services",
        pageUrl: "/services",
        pageLabel: "Browse All Services",
      },
      suggestedQuestions: [
        "What services do you provide?",
        "Tell me about General Maintenance.",
        "Which areas do you serve?",
        "How can I contact your team?",
      ],
    };
  };

  const handleSend = (text: string) => {
    const userText = text.trim();
    if (!userText) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Realistic natural response time
    setTimeout(() => {
      const botResponse = processQuery(userText);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating Smart Assistant Launcher Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-gradient-to-r from-forest-800 to-emerald-700 hover:from-forest-900 hover:to-emerald-800 text-white p-2.5 sm:px-4 sm:py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group border-2 border-emerald-400/40 cursor-pointer active:scale-95"
          aria-label="Open Smart Facility Assistant Chat"
          title="Open Smart Facility Assistant"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-white flex items-center justify-center p-0.5 shadow-md border border-emerald-400 shrink-0">
            <Image
              src="/images/logo.png"
              alt="Smart Facility Services"
              width={40}
              height={40}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-wide hidden sm:inline">
            Smart Facility Assistant
          </span>
          <span className="font-bold text-[11px] sm:hidden">
            Ask AI
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
        </button>
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          className="fixed bottom-20 sm:bottom-20 right-2 sm:right-6 w-[95vw] sm:w-[410px] h-[78vh] sm:h-[580px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-emerald-200 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
          role="dialog"
          aria-label="Smart Facility Assistant Chatbot"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-emerald-900 text-white p-4 flex items-center justify-between border-b border-emerald-800/50">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-white p-0.5 shadow-md border-2 border-emerald-400 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
                  <span>Smart Facility Assistant</span>
                  <Sparkles className="w-3.5 h-3.5 text-brandPink-300" />
                </h3>
                <p className="text-[11px] text-emerald-200">
                  Reliable Support. Every Day.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-emerald-100 transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/70">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-forest-800 text-emerald-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                    msg.sender === "user"
                      ? "bg-forest-800 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200/80 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Action Contact Buttons */}
                  {msg.actionLinks && (
                    <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-wrap gap-1.5">
                      {msg.actionLinks.call && (
                        <a
                          href={getPhoneLink()}
                          className="inline-flex items-center gap-1 bg-forest-700 hover:bg-forest-800 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-colors shadow-2xs"
                        >
                          <Phone className="w-3 h-3 text-emerald-300" />
                          <span>Call Now</span>
                        </a>
                      )}

                      {msg.actionLinks.whatsapp && (
                        <a
                          href={getWhatsAppLink(msg.actionLinks.whatsapp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-colors shadow-2xs"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>WhatsApp Us</span>
                        </a>
                      )}

                      {msg.actionLinks.email && (
                        <a
                          href={getEmailLink(msg.actionLinks.email)}
                          className="inline-flex items-center gap-1 bg-slate-700 hover:bg-slate-800 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-colors shadow-2xs"
                        >
                          <Mail className="w-3 h-3 text-emerald-300" />
                          <span>Email Us</span>
                        </a>
                      )}

                      {msg.actionLinks.pageUrl && (
                        <Link
                          href={msg.actionLinks.pageUrl}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-forest-900 border border-emerald-200 text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          <span>{msg.actionLinks.pageLabel || "View Details"}</span>
                          <ArrowRight className="w-3 h-3 text-emerald-600" />
                        </Link>
                      )}
                    </div>
                  )}

                  {/* Suggested Question Chips inside message */}
                  {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-gray-100 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                        Suggested questions:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedQuestions.map((sq, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSend(sq)}
                            className="text-[11px] text-left bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-forest-900 px-2.5 py-1 rounded-full transition-colors font-medium"
                          >
                            {sq}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-gray-400 text-xs pl-9">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Quick Scroll Strip */}
          <div className="p-2 bg-white border-t border-gray-100 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-thin">
            {suggestedInitialQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                className="text-[11px] bg-slate-100 hover:bg-emerald-50 text-gray-700 hover:text-forest-900 border border-gray-200 px-3 py-1 rounded-full shrink-0 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="p-3 bg-white border-t border-gray-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about General Maintenance, STP, plumbing..."
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white disabled:opacity-40 transition-colors shrink-0 shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-emerald-300" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
