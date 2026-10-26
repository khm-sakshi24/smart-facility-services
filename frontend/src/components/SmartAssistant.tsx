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
  Bot,
  User,
  Sparkles,
  ArrowRight,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Calendar,
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

const TOP_SUGGESTED_QUESTIONS = [
  "⭐️ Customer Ratings & Reviews",
  "⚡️ 24/7 Emergency Dispatch",
  "📍 Hoodi & Whitefield Coverage",
  "🧹 Housekeeping & Cleaning",
  "💧 STP & Water Tank Care",
  "⚡️ Electrical & DG Maintenance",
  "💼 How to get an AMC Quote?",
  "🛠️ How does your 4-step process work?",
  "📞 What is your helpline number?",
];

const welcomeMessage: ChatMessage = {
  id: "welcome",
  sender: "bot",
  text: "Hello! Welcome to Smart Facility Services. I am your 24/7 Virtual Assistant.\n\nI can answer any questions about our 13 facility disciplines, 24/7 emergency dispatch, Bengaluru coverage, pricing & AMC quotes, KSPCB compliance, customer ratings, or how we work with your property. How can I help you today?",
  suggestedQuestions: [
    "⭐️ Customer Ratings & Reviews",
    "⚡️ 24/7 Emergency Dispatch",
    "🧹 Housekeeping & Cleaning",
    "💼 How to get an AMC Quote?",
  ],
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

  // Comprehensive Knowledge Engine covering every aspect of the entire website
  const processQuery = (rawQuery: string): ChatMessage => {
    const q = rawQuery.toLowerCase().trim();

    // 1. GREETINGS & CASUAL INTROS
    if (
      q === "hi" ||
      q === "hello" ||
      q === "hey" ||
      q.startsWith("hi ") ||
      q.startsWith("hello ") ||
      q.startsWith("hey ") ||
      q.includes("good morning") ||
      q.includes("good afternoon") ||
      q.includes("good evening") ||
      q.includes("namaste") ||
      q.includes("how are you")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `Hello! Smart Facility Services provides reliable, 24/7 facility operations and building maintenance across Bengaluru.\n\nYou can ask me anything about our 13 services, emergency breakdown dispatch, pricing and AMC quotes, customer ratings, or active areas like Hoodi and Whitefield. What would you like to know?`,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to know more about your facility services.",
          pageUrl: "/services",
          pageLabel: "Explore All 13 Services",
        },
        suggestedQuestions: [
          "What services do you provide?",
          "⭐️ Customer Ratings & Reviews",
          "⚡️ 24/7 Emergency Dispatch",
          "Which areas do you serve?",
        ],
      };
    }

    // 2. RATINGS, REVIEWS & AMAZON-STYLE REPUTATION
    if (
      q.includes("rating") ||
      q.includes("review") ||
      q.includes("feedback") ||
      q.includes("star") ||
      q.includes("amazon") ||
      q.includes("testimonial") ||
      q.includes("reputation") ||
      q.includes("what do customer") ||
      q.includes("client say")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `⭐️ Smart Facility Services holds a verified 4.9 out of 5-star customer rating across 148 global client evaluations in Bengaluru!\n\n• 89% 5-Star Ratings\n• 98% Client Recommendation Rate\n• Trusted by leading apartment RWAs and business complexes in Bellandur, Whitefield, Hoodi, and Mahadevapura.\n\nYou can read all verified reviews or write your own customer review in our Amazon-style ratings section on the homepage!`,
        actionLinks: {
          pageUrl: "/#reviews",
          pageLabel: "View Customer Ratings & Reviews",
          whatsapp: "Hello Smart Facility Services, I saw your 4.9-star reviews and want to discuss maintenance for our society.",
        },
        suggestedQuestions: [
          "💼 How to get an AMC Quote?",
          "🧹 Housekeeping & Cleaning",
          "⚡️ 24/7 Emergency Dispatch",
        ],
      };
    }

    // 3. 24/7 AVAILABILITY & EMERGENCY BREAKDOWN DISPATCH
    if (
      q.includes("24/7") ||
      q.includes("24*7") ||
      q.includes("24 hours") ||
      q.includes("emergency") ||
      q.includes("breakdown") ||
      q.includes("night") ||
      q.includes("sunday") ||
      q.includes("holiday") ||
      q.includes("urgent") ||
      q.includes("pipe burst") ||
      q.includes("power cut") ||
      q.includes("tripping") ||
      q.includes("water stopped") ||
      q.includes("motor burnt")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `🚨 Yes! Smart Facility Services operates a dedicated 24/7 Emergency Breakdown Dispatch team 365 days a year.\n\n• Average dispatch arrival time: Under 25–30 minutes across Hoodi, Garudachar Palya, and Whitefield.\n• Covers critical emergencies: main water pipe bursts, hydro-pneumatic pump failures, electrical LT panel tripping, and STP/WTP alarms.\n• Call our operations team directly at ${businessInfo.primaryPhoneDisplay} anytime, day or night.`,
        actionLinks: {
          call: true,
          whatsapp: "URGENT: Emergency breakdown assistance required for our property.",
          pageUrl: "/service-areas",
          pageLabel: "Check Dispatch Zones",
        },
        suggestedQuestions: [
          "How fast can you reach my location?",
          "Do you provide plumbing services?",
          "What is STP, ETP and WTP maintenance?",
        ],
      };
    }

    // 4. DISPATCH SPEED & ARRIVAL TIMES
    if (
      q.includes("how fast") ||
      q.includes("dispatch time") ||
      q.includes("arrival time") ||
      q.includes("how long") ||
      q.includes("reach") ||
      q.includes("response time") ||
      q.includes("timing")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `⏱️ Our operational units are stationed at localized hubs:\n\n• Hoodi Hub: < 25 Minutes average dispatch\n• Garudachar Palya Hub: < 30 Minutes dispatch\n• Whitefield Hub: < 25 Minutes dispatch\n• East Bengaluru Corridor: Rapid mobile van deployment\n\nAll mobile technician vans are equipped with GPS tracking and essential spare parts for fast resolution.`,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, how fast can a supervisor visit our apartment for an assessment?",
          pageUrl: "/service-areas",
          pageLabel: "View Live Dispatch Map",
        },
      };
    }

    // 5. PRICING, QUOTATIONS & AMC (ANNUAL MAINTENANCE CONTRACT)
    if (
      q.includes("price") ||
      q.includes("cost") ||
      q.includes("rate") ||
      q.includes("charge") ||
      q.includes("quote") ||
      q.includes("quotation") ||
      q.includes("fee") ||
      q.includes("amc") ||
      q.includes("package") ||
      q.includes("how much") ||
      q.includes("billing") ||
      q.includes("commercial")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `💼 We structure transparent, customized Annual Maintenance Contracts (AMC) and tailored service packages:\n\n• Pricing depends on unit count, equipment capacity (kVA of DG backup, KLD of STP/WTP), and staffing frequency.\n• We provide 100% itemized, transparent quotations with zero hidden charges after a rapid site inspection.\n• To receive a customized proposal for your apartment society or commercial complex, reach out directly using the options below:`,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to request an AMC quotation and scope review for our property.",
          email: "Request for Quotation / AMC Scope - Smart Facility Services",
          pageUrl: "/contact",
          pageLabel: "Submit Quotation Request",
        },
        suggestedQuestions: [
          "🛠️ How does your 4-step process work?",
          "What services do you provide?",
          "Which areas do you serve?",
        ],
      };
    }

    // 6. HOW WE WORK WITH YOU (4-STEP PROCESS)
    if (
      q.includes("how do you work") ||
      q.includes("process") ||
      q.includes("step") ||
      q.includes("how we work") ||
      q.includes("onboard") ||
      q.includes("start service") ||
      q.includes("workflow")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `📋 We follow a straightforward 4-step operational process to ensure seamless property care:\n\n1. 🔍 Step 01: Discover Required Service — Review your property's specific disciplines.\n2. 📞 Step 02: Direct Operations Contact — Connect 24/7 to assign a technical supervisor.\n3. 📅 Step 03: Property & Scope Review — On-site assessment of pump rooms, LT panels, and unit count.\n4. 🔧 Step 04: Routine Daily Delivery — Deployment of trained, uniformed staff with daily digital checklist sign-offs.`,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to schedule a Step 03 Property Scope Review.",
          pageUrl: "/process",
          pageLabel: "View Process Details",
        },
      };
    }

    // 7. TECHNOLOGY & DIGITAL TRACKING (GPS, QR, IOT, CLOUD)
    if (
      q.includes("tech") ||
      q.includes("gps") ||
      q.includes("qr") ||
      q.includes("iot") ||
      q.includes("cloud") ||
      q.includes("software") ||
      q.includes("app") ||
      q.includes("digital") ||
      q.includes("checklist") ||
      q.includes("tracking")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `💻 Smart Facility Services leverages 4 modern technology pillars for transparent building management:\n\n• GPS-Tracked Dispatch: Mobile technician vans dispatched via live traffic routing for <30-min arrival.\n• Digital QR Patrols: Housekeeping & security scan on-site QR checkpoints across apartment blocks.\n• IoT Sensor Alerts: Real-time telemetry monitoring for STP effluent levels and pump pressures.\n• Cloud Maintenance Logs: Daily digital checklists signed and shared directly with society RWA committees.`,
        actionLinks: {
          whatsapp: "Hello Smart Facility Services, tell me more about your digital QR patrols and maintenance logs.",
          pageUrl: "/#map-section",
          pageLabel: "View Technology Architecture",
        },
      };
    }

    // 8. STAFF VERIFICATION, UNIFORMS & TRAINING
    if (
      q.includes("staff") ||
      q.includes("worker") ||
      q.includes("uniform") ||
      q.includes("trained") ||
      q.includes("police verification") ||
      q.includes("background") ||
      q.includes("id card") ||
      q.includes("safety gear") ||
      q.includes("dress code") ||
      q.includes("absent") ||
      q.includes("attendance")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `👷‍♂️ All Smart Facility Services personnel adhere to strict operational standards:\n\n• 100% Background Checked: Verified identity and police verification documentation.\n• Uniformed & Equipped: Standardized company uniforms, ID badges, and safety PPE gear.\n• Biometric/Digital Attendance: Ensures punctuality and eliminates absenteeism.\n• Dedicated Supervisor: Daily inspections, task sign-offs, and immediate resident committee liaison.`,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I want to inquire about dedicated facility staffing.",
          pageUrl: "/about",
          pageLabel: "Learn About Our Standards",
        },
      };
    }

    // 9. REGULATORY & ENVIRONMENTAL COMPLIANCE (KSPCB, BBMP, PSARA)
    if (
      q.includes("compliance") ||
      q.includes("kspcb") ||
      q.includes("pollution") ||
      q.includes("bbmp") ||
      q.includes("psara") ||
      q.includes("legal") ||
      q.includes("safety") ||
      q.includes("standard") ||
      q.includes("audit") ||
      q.includes("certificate")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `🛡️ We ensure complete statutory and environmental compliance:\n\n• KSPCB Environmental Standards: Daily STP/WTP effluent parameter monitoring to meet Karnataka State Pollution Control Board discharge norms.\n• BBMP Waste Guidelines: Structured dry, wet, and sanitary waste segregation.\n• Electrical Safety: Adherence to Indian Electricity Rules for LT panels and DG backup.\n• PSARA Guarding: Security services compliant with the Private Security Agencies (Regulation) Act.`,
        actionLinks: {
          whatsapp: "Hello Smart Facility Services, we require KSPCB-compliant STP maintenance for our society.",
          pageUrl: "/about",
          pageLabel: "View Compliance Standards",
        },
      };
    }

    // 10. SERVICE AREAS & LOCALITY COVERAGE
    if (
      q.includes("area") ||
      q.includes("location") ||
      q.includes("hoodi") ||
      q.includes("whitefield") ||
      q.includes("garudachar") ||
      q.includes("mahadevapura") ||
      q.includes("bellandur") ||
      q.includes("marathahalli") ||
      q.includes("kr puram") ||
      q.includes("kadugodi") ||
      q.includes("brookefield") ||
      q.includes("varthur") ||
      q.includes("where do you serve") ||
      q.includes("bengaluru") ||
      q.includes("bangalore") ||
      q.includes("karnataka")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `📍 We provide confirmed, daily facility support across East Bengaluru and the wider metro area:\n\n• Core Service Hub: Hoodi Circle, Ayyappa Nagar, ITPL Main Road\n• Active Operations: Garudachar Palya, Mahadevapura Industrial Corridor\n• Primary Hub: Whitefield, Hope Farm, EPIP Zone, Channasandra\n• Extended Metro: Bellandur, Marathahalli, KR Puram, Kadugodi, Varthur\n\nWould you like to check service availability for your specific apartment or layout?`,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to check service availability for my location.",
          pageUrl: "/service-areas",
          pageLabel: "View All Service Areas & Live Map",
        },
        suggestedQuestions: [
          "⚡️ 24/7 Emergency Dispatch",
          "What services do you provide?",
          "💼 How to get an AMC Quote?",
        ],
      };
    }

    // 11. CONTACT, HELPLINE & OFFICE INFORMATION
    if (
      q.includes("contact") ||
      q.includes("phone") ||
      q.includes("call") ||
      q.includes("whatsapp") ||
      q.includes("email") ||
      q.includes("number") ||
      q.includes("reach") ||
      q.includes("talk") ||
      q.includes("address") ||
      q.includes("office") ||
      q.includes("helpline")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `📞 You can connect with Smart Facility Services 24/7 through any of our direct channels:\n\n• Primary 24/7 Helpline: ${businessInfo.primaryPhoneDisplay}\n• Official WhatsApp: +91 96638 46126\n• Operations Email: ${businessInfo.email}\n• Hub Locations: Hoodi, Garudachar Palya, Whitefield, Bengaluru\n\nOur technical supervisors are available around the clock to assist you.`,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to speak directly with your operations supervisor.",
          email: "Facility Maintenance Inquiry - Smart Facility Services",
          pageUrl: "/contact",
          pageLabel: "Open Contact Page",
        },
      };
    }

    // 12. ABOUT COMPANY & BRAND IDENTITY
    if (
      q.includes("about") ||
      q.includes("who are you") ||
      q.includes("company") ||
      q.includes("experience") ||
      q.includes("vision") ||
      q.includes("mission") ||
      q.includes("smart facility services") ||
      q.includes("tagline")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `🏢 Smart Facility Services is Bengaluru's premier facility management and building maintenance partner.\n\n• Tagline: "Reliable Support. Every Day."\n• Specialization: Comprehensive facility operations, MEP engineering, water & wastewater systems, and building upkeep for gated communities, apartment associations, and commercial complexes.\n• Customer Rating: 4.9/5 stars based on 148 verified client reviews.`,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to learn more about your company profile.",
          pageUrl: "/about",
          pageLabel: "Read Our Full Company Overview",
        },
      };
    }

    // 13. COMPLAINTS & ESCALATION MATRIX
    if (
      q.includes("complaint") ||
      q.includes("escalat") ||
      q.includes("grievance") ||
      q.includes("issue") ||
      q.includes("problem") ||
      q.includes("unhappy") ||
      q.includes("not satisfied")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `⚠️ At Smart Facility Services, client satisfaction is our priority. We maintain a structured escalation matrix:\n\n• Level 1 (Immediate): On-site Technical Supervisor attends to issues within 15–30 minutes.\n• Level 2 (Within 2 Hours): Operations Manager visits to audit and rectify the issue.\n• Level 3 (Direct Management): Escalated to Senior Executive Leadership.\n\nPlease call our 24/7 operations line directly for immediate resolution.`,
        actionLinks: {
          call: true,
          whatsapp: "OPERATIONS ESCALATION: Requesting supervisor review for my property.",
          email: "Service Feedback / Escalation - Smart Facility Services",
        },
      };
    }

    // 14. SERVICES CATALOGUE OVERVIEW
    if (
      q.includes("what services") ||
      q.includes("all services") ||
      q.includes("service list") ||
      q.includes("catalogue") ||
      q.includes("services do you") ||
      q.includes("services provide") ||
      q.includes("disciplines")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `🛠️ Smart Facility Services provides end-to-end building care across 13 professional disciplines:\n\n1. Housekeeping & Sanitization\n2. Electrical Maintenance & DG Backup\n3. Plumbing & Booster Pumps\n4. HVAC & Air-Conditioning\n5. General Maintenance & Handyman Care\n6. STP, ETP & WTP Operations\n7. Sewage Tank Cleaning & Desilting\n8. Swimming Pool Maintenance\n9. Swimming Pool Rework & Waterproofing\n10. Water Tank Scientific Disinfection\n11. Security Staffing & Manned Guarding\n12. Consultancy & Engineering Audits\n13. Installation, Erection & Commissioning`,
        actionLinks: {
          pageUrl: "/services",
          pageLabel: "Browse All 13 Services",
          whatsapp: "Hello Smart Facility Services, I would like to know more about your full services catalogue.",
        },
        suggestedQuestions: [
          "Tell me about General Maintenance.",
          "What is STP, ETP and WTP maintenance?",
          "Do you provide plumbing services?",
          "⭐️ Customer Ratings & Reviews",
        ],
      };
    }

    // 15. SPECIFIC SERVICE MATCHERS

    // General Maintenance
    if (
      q.includes("general") ||
      q.includes("routine maintenance") ||
      q.includes("handyman") ||
      q.includes("upkeep") ||
      q.includes("carpentry") ||
      q.includes("masonry") ||
      q.includes("painting")
    ) {
      const match = servicesCatalogue.find((s) => s.slug === "general-maintenance");
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `🔧 General Maintenance includes routine property upkeep, preventive physical inspections, minor repairs, masonry touch-ups, door hardware servicing, and holistic facility coordination.\n\nWould you like to schedule an inspection visit with our technical supervisor?`,
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to know more about General Maintenance.",
          pageUrl: "/services/general-maintenance",
          pageLabel: "View General Maintenance Details",
        },
      };
    }

    // Housekeeping & Cleaning
    if (
      q.includes("housekeep") ||
      q.includes("clean") ||
      q.includes("corridor") ||
      q.includes("lobby") ||
      q.includes("garbage") ||
      q.includes("waste") ||
      q.includes("segregat") ||
      q.includes("sanitiz") ||
      q.includes("mopping") ||
      q.includes("washroom")
    ) {
      const match = servicesCatalogue.find((s) => s.slug === "housekeeping");
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `🧹 Housekeeping and Cleaning Services include:\n\n• Daily damp mopping of residential corridors and clubhouse\n• Stairwell, basement, and lift car sanitization\n• Glass facade wiping up to safe reach\n• Strict BBMP dry, wet, and sanitary waste segregation support\n• Daily supervisor digital checklist sign-offs`,
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to inquire about Housekeeping Services for our society.",
          pageUrl: "/services/housekeeping",
          pageLabel: "View Housekeeping Details",
        },
      };
    }

    // STP / ETP / WTP Operations
    if (
      q.includes("stp") ||
      q.includes("etp") ||
      q.includes("wtp") ||
      q.includes("sewage treatment") ||
      q.includes("water treatment plant") ||
      q.includes("effluent") ||
      q.includes("aeration") ||
      q.includes("blower") ||
      q.includes("sludge")
    ) {
      const match = servicesCatalogue.find((s) => s.slug === "stp-etp-wtp-maintenance");
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `💧 STP, ETP & WTP Maintenance & Operations includes:\n\n• Daily microbial culture monitoring and chemical dosing\n• Backwashing dual media sand and activated carbon filters\n• Air blower and submersible pump health verification\n• Daily parameter logging to ensure 100% KSPCB discharge compliance\n• 24/7 rapid technician response for unexpected pump tripping`,
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to inquire about STP/WTP Maintenance for our property.",
          pageUrl: "/services/stp-etp-wtp-maintenance",
          pageLabel: "View STP/ETP/WTP Details",
        },
      };
    }

    // Water Tank Cleaning
    if (
      q.includes("water tank") ||
      q.includes("sump") ||
      q.includes("drinking water") ||
      q.includes("overhead tank") ||
      q.includes("tank cleaning") ||
      q.includes("tank disinfection")
    ) {
      const match = servicesCatalogue.find((s) => s.slug === "water-tank-cleaning");
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `🚿 Water Tank Cleaning Work provides 6-stage scientific purification:\n\n1. Dewatering & sludge evacuation\n2. High-pressure rotary jet washing\n3. Anti-bacterial scrub & grime clearing\n4. Industrial vacuum sludge suctioning\n5. UV antibacterial disinfection\n6. Before-and-after photographic documentation for society RWA notice boards`,
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to book Water Tank Deep Cleaning for our community.",
          pageUrl: "/services/water-tank-cleaning",
          pageLabel: "View Water Tank Cleaning Details",
        },
      };
    }

    // Sewage Tank Cleaning
    if (
      q.includes("sewage tank") ||
      q.includes("septic") ||
      q.includes("chamber") ||
      q.includes("desilt") ||
      q.includes("vacuum suction")
    ) {
      const match = servicesCatalogue.find((s) => s.slug === "sewage-tank-cleaning");
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `🚽 Sewage Tank Cleaning Work involves scheduled chamber desilting, mechanized vacuum suction of settled solids, and clearing blockages safely in full compliance with municipal health & safety protocols.`,
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to inquire about Sewage Tank Cleaning.",
          pageUrl: "/services/sewage-tank-cleaning",
          pageLabel: "View Sewage Cleaning Details",
        },
      };
    }

    // Electrical Maintenance & DG Backup
    if (
      q.includes("electric") ||
      q.includes("power") ||
      q.includes("dg") ||
      q.includes("generator") ||
      q.includes("panel") ||
      q.includes("wiring") ||
      q.includes("phase") ||
      q.includes("illumination") ||
      q.includes("light")
    ) {
      const match = servicesCatalogue.find((s) => s.slug === "electrical-maintenance");
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `⚡ Electrical Maintenance encompasses:\n\n• Main LT switchgear monitoring and thermal scanning\n• Diesel generator (DG) daily battery, coolant, and AMF panel checks\n• Phase load balancing to prevent feeder tripping\n• Common area illumination and timer maintenance\n• Earth pit resistance safety testing`,
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to inquire about Electrical & DG Maintenance.",
          pageUrl: "/services/electrical-maintenance",
          pageLabel: "View Electrical Details",
        },
      };
    }

    // Plumbing Services
    if (
      q.includes("plumb") ||
      q.includes("pipe") ||
      q.includes("leak") ||
      q.includes("drain") ||
      q.includes("valve") ||
      q.includes("pump") ||
      q.includes("booster")
    ) {
      const match = servicesCatalogue.find((s) => s.slug === "plumbing");
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `🚰 Plumbing Services include:\n\n• Hydro-pneumatic booster pump system care & pressure vessel tuning\n• Pipeline hydrostatic leak detection & joint repairs\n• Overhead float valve and solenoid calibration\n• Drainage and rainwater harvesting line desilting\n• 24/7 rapid emergency repair dispatch`,
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to inquire about Plumbing Services.",
          pageUrl: "/services/plumbing",
          pageLabel: "View Plumbing Details",
        },
      };
    }

    // Swimming Pool Maintenance & Rework
    if (
      q.includes("pool") ||
      q.includes("swimming") ||
      q.includes("rework") ||
      q.includes("tile") ||
      q.includes("chlorine")
    ) {
      const isRework = q.includes("rework") || q.includes("renovat") || q.includes("grout") || q.includes("leak");
      const slug = isRework ? "swimming-pool-rework" : "swimming-pool-maintenance";
      const match = servicesCatalogue.find((s) => s.slug === slug);
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: isRework
          ? `🏊‍♂️ Swimming Pool Rework & Overhaul includes crack sealing, underwater epoxy grouting, coping stone replacement, tile repair, and filter media replenishment.`
          : `🏊 Swimming Pool Maintenance includes daily surface skimming, vacuum suction cleaning, water pH/chlorine chemical balancing, sand filter backwashing, and suction pump servicing.`,
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: `Hello Smart Facility Services, I would like to inquire about ${match?.title || "Swimming Pool Care"}.`,
          pageUrl: `/services/${slug}`,
          pageLabel: `View Pool Services Details`,
        },
      };
    }

    // HVAC & Air Conditioning
    if (
      q.includes("hvac") ||
      q.includes("ac") ||
      q.includes("air condition") ||
      q.includes("chiller") ||
      q.includes("cooling tower")
    ) {
      const match = servicesCatalogue.find((s) => s.slug === "hvac-maintenance");
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `❄️ HVAC & Air-Conditioning Maintenance covers routine filter washing, coil chemical cleaning, refrigerant pressure checks, electrical terminal torque testing, and thermostat calibration for residential clubhouses and commercial floors.`,
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to know more about HVAC Maintenance.",
          pageUrl: "/services/hvac-maintenance",
          pageLabel: "View HVAC Details",
        },
      };
    }

    // Security Staffing
    if (
      q.includes("security") ||
      q.includes("guard") ||
      q.includes("manning") ||
      q.includes("gate") ||
      q.includes("visitor")
    ) {
      const match = servicesCatalogue.find((s) => s.slug === "security-staffing");
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `🛡️ Security Staffing provides disciplined manned guarding, visitor logbook/app management, perimeter patrolling, and gate access control compliant with the Private Security Agencies (Regulation) Act (PSARA).`,
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: "Hello Smart Facility Services, I would like to inquire about Security Staffing.",
          pageUrl: "/services/security-staffing",
          pageLabel: "View Security Details",
        },
      };
    }

    // Consultancy, Engineering & Installation
    if (
      q.includes("consult") ||
      q.includes("engineer") ||
      q.includes("install") ||
      q.includes("erect") ||
      q.includes("commission")
    ) {
      const slug = q.includes("consult") ? "consultancy-engineering" : "erection-commissioning-installation-maintenance";
      const match = servicesCatalogue.find((s) => s.slug === slug);
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: `⚙️ ${match?.title} provides technical oversight, energy audits, equipment life-cycle planning, and specialized mechanical/electrical equipment setup for modern building infrastructure.`,
        serviceMatch: match,
        actionLinks: {
          call: true,
          whatsapp: `Hello Smart Facility Services, I would like to discuss ${match?.title}.`,
          pageUrl: `/services/${slug}`,
          pageLabel: `View Engineering Details`,
        },
      };
    }

    // 16. INTELLIGENT COMPREHENSIVE FALLBACK (NEVER BLOCKS)
    return {
      id: Date.now().toString(),
      sender: "bot",
      text: `Smart Facility Services provides 24/7 end-to-end facility management, MEP engineering, water operations, and building care across Bengaluru.\n\nI can provide direct information on:\n• 13 Core Disciplines (Housekeeping, STP, Electrical, Plumbing, Pool, Tank Cleaning)\n• 24/7 Emergency Dispatch & <30-min response times\n• Pricing & Custom AMC Proposals for your society\n• Verified 4.9-Star Customer Ratings & Reviews\n• Service hubs in Hoodi, Whitefield, Garudachar Palya, and East Bengaluru\n\nHow may our operations team assist your property today?`,
      actionLinks: {
        call: true,
        whatsapp: `Hello Smart Facility Services, I would like to inquire about: "${rawQuery}"`,
        email: "Maintenance Scope Inquiry - Smart Facility Services",
        pageUrl: "/services",
        pageLabel: "Explore Services Catalogue",
      },
      suggestedQuestions: [
        "⭐️ Customer Ratings & Reviews",
        "⚡️ 24/7 Emergency Dispatch",
        "💼 How to get an AMC Quote?",
        "📍 Hoodi & Whitefield Coverage",
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
    }, 400);
  };

  return (
    <>
      {/* Floating Smart Assistant Launcher Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-gradient-to-r from-forest-800 to-emerald-700 hover:from-forest-900 hover:to-emerald-800 text-white p-2.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-emerald-900/40 transition-all duration-300 group border-2 border-emerald-400/50 cursor-pointer active:scale-95"
          aria-label="Open Smart Facility Assistant Chat"
          title="Open Smart Facility Assistant (24/7 Online)"
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
          <span className="font-extrabold text-xs sm:text-sm tracking-wide hidden sm:inline">
            Smart Facility Assistant
          </span>
          <span className="font-extrabold text-[11px] sm:hidden">
            Ask AI
          </span>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
        </button>
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          className="fixed bottom-20 sm:bottom-20 right-2 sm:right-6 w-[95vw] sm:w-[420px] h-[80vh] sm:h-[600px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border-2 border-emerald-500/30 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
          role="dialog"
          aria-label="Smart Facility Assistant Chatbot"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-emerald-950 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-emerald-800/60 shadow-sm">
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
                <h3 className="font-black text-sm tracking-tight text-white flex items-center gap-1.5">
                  <span>Smart Facility Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h3>
                <p className="text-[11px] text-emerald-200 font-medium">
                  24/7 Online • Answers Any Website Question
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/15 text-emerald-100 transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-slate-50/70">
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
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                    msg.sender === "user"
                      ? "bg-forest-800 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200/90 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Action Contact Buttons */}
                  {msg.actionLinks && (
                    <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-wrap gap-1.5">
                      {msg.actionLinks.call && (
                        <a
                          href={getPhoneLink()}
                          className="inline-flex items-center gap-1 bg-forest-800 hover:bg-forest-900 active:scale-95 text-white text-[11px] font-extrabold px-2.5 py-1.5 rounded-lg transition-all shadow-2xs"
                        >
                          <Phone className="w-3 h-3 text-emerald-300" />
                          <span>Call 24/7 Helpline</span>
                        </a>
                      )}

                      {msg.actionLinks.whatsapp && (
                        <a
                          href={getWhatsAppLink(msg.actionLinks.whatsapp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-[11px] font-extrabold px-2.5 py-1.5 rounded-lg transition-all shadow-2xs"
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
                          <span>Email</span>
                        </a>
                      )}

                      {msg.actionLinks.pageUrl && (
                        <Link
                          href={msg.actionLinks.pageUrl}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-forest-950 border border-emerald-300 text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          <span>{msg.actionLinks.pageLabel || "View Details"}</span>
                          <ArrowRight className="w-3 h-3 text-emerald-700" />
                        </Link>
                      )}
                    </div>
                  )}

                  {/* Suggested Question Chips inside message */}
                  {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-gray-100 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                        Tap for instant answer:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedQuestions.map((sq, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSend(sq)}
                            className="text-[11px] text-left bg-emerald-50 hover:bg-emerald-100 active:scale-95 border border-emerald-200 text-forest-950 px-2.5 py-1 rounded-full transition-transform font-bold"
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
            {TOP_SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                className="text-[11px] bg-slate-100 hover:bg-emerald-50 active:scale-95 text-gray-800 hover:text-forest-950 border border-gray-200 px-3 py-1 rounded-full shrink-0 transition-all font-bold"
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
              placeholder="Ask anything about our services, ratings, pricing, 24/7..."
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
