"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, X, Send, Bot, User, Sparkles, ChevronRight } from "lucide-react";
import { servicesCatalogue } from "@/config/servicesData";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  actionLink?: {
    href: string;
    label: string;
  };
}

const defaultWelcomeMessage: ChatMessage = {
  id: "welcome",
  sender: "bot",
  text: "Hello! I am the Smart Facility Services virtual assistant. How can I help you today? You can ask about our service coverage, STP/WTP operations, maintenance process, or request a quotation.",
};

const quickQuestions = [
  "Which areas in Bengaluru do you serve?",
  "What is included in STP and WTP maintenance?",
  "How does your quotation process work?",
  "Is security staffing available?",
  "Do you handle emergency plumbing issues?",
];

export const SmartAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([defaultWelcomeMessage]);
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

  const generateAnswer = (query: string): ChatMessage => {
    const q = query.toLowerCase();

    if (q.includes("area") || q.includes("location") || q.includes("hoodi") || q.includes("whitefield") || q.includes("garudachar")) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "Our primary confirmed service coverage is in Hoodi, Garudachar Palya, and Whitefield in Bengaluru. We also evaluate operations for residential communities across Bengaluru upon technical review.",
        actionLink: { href: "/service-areas", label: "View Service Areas" },
      };
    }

    if (q.includes("stp") || q.includes("wtp") || q.includes("etp") || q.includes("water treatment") || q.includes("sewage")) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "We provide comprehensive STP, ETP, and WTP Operation & Maintenance adhering strictly to KSPCB guidelines. This includes daily microbial monitoring, chemical dosing, backwashing sand/carbon filters, and sludge dewatering.",
        actionLink: { href: "/services/stp-etp-wtp-maintenance", label: "Explore STP/WTP Service" },
      };
    }

    if (q.includes("process") || q.includes("how it works") || q.includes("quotation") || q.includes("quote") || q.includes("step")) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "Our proposed workflow follows 7 clear stages: 1) Submit enquiry, 2) Requirements review, 3) Site inspection, 4) Tailored quotation, 5) Approval & scheduling, 6) Work execution & log documentation, and 7) Post-service follow-up.",
        actionLink: { href: "/process", label: "View Our Work Process" },
      };
    }

    if (q.includes("security") || q.includes("guard") || q.includes("psara")) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "Security Staffing is part of our proposed service catalogue. Please note that security deployment is subject to full regulatory licensing under the Private Security Agencies (Regulation) Act (PSARA).",
        actionLink: { href: "/services/security-staffing", label: "View Security Details" },
      };
    }

    if (q.includes("price") || q.includes("cost") || q.includes("charge") || q.includes("rate")) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "Because facility scale, equipment age, and association requirements differ, we never invent generic rates. All commercial pricing is provided through a formal quotation following a physical or technical site evaluation.",
        actionLink: { href: "/contact", label: "Contact Us to Discuss" },
      };
    }

    if (q.includes("housekeeping") || q.includes("cleaning")) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "Our Housekeeping Services include common area damp mopping, lobby sanitation, stairwell cleaning, glass facade washing up to safe reach, and dry/wet garbage clearance.",
        actionLink: { href: "/services/housekeeping-services", label: "Housekeeping Details" },
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      sender: "bot",
      text: "Thank you for asking. Smart Facility Services specializes in facility upkeep, mechanical & electrical maintenance, and environmental plants for apartments and commercial spaces. Would you like to speak directly with our team?",
      actionLink: { href: "/contact", label: "Contact Smart Facility Services" },
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

    setTimeout(() => {
      const botResponse = generateAnswer(userText);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-forest-800 hover:bg-forest-900 text-white shadow-2xl hover:scale-105 transition-all flex items-center justify-center border-2 border-emerald-400/50 group focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Open Smart Service Assistant"
      >
        <Bot className="w-6 h-6 text-emerald-300 group-hover:rotate-6 transition-transform" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pl-2">
          Service Assistant
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brandPink-500 rounded-full border-2 border-white animate-pulse"></span>
      </button>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[540px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-emerald-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="bg-forest-950 text-white px-5 py-4 flex items-center justify-between border-b border-forest-800">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-200">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  <span>Smart Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </h4>
                <p className="text-[11px] text-emerald-300">Verified Knowledge &amp; Guidance</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-forest-800 text-gray-300 hover:text-white transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick FAQ Pills */}
          <div className="p-2.5 bg-emerald-50/70 border-b border-emerald-100 overflow-x-auto flex gap-2 text-xs no-scrollbar">
            {quickQuestions.slice(0, 3).map((qq, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qq)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-white border border-emerald-200 text-forest-900 font-medium hover:bg-emerald-100 transition-colors shrink-0"
              >
                {qq}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    msg.sender === "user"
                      ? "bg-forest-800 text-white"
                      : "bg-emerald-100 text-forest-900"
                  }`}
                >
                  {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === "user"
                      ? "bg-forest-800 text-white rounded-tr-none"
                      : "bg-white text-gray-800 border border-gray-200/80 rounded-tl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.actionLink && (
                    <div className="mt-2.5 pt-2 border-t border-gray-100">
                      <Link
                        href={msg.actionLink.href}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-forest-800 hover:text-emerald-600 underline"
                      >
                        <span>{msg.actionLink.label}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500 italic p-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
                <span>Reviewing knowledge base...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
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
              placeholder="Ask about services or process..."
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-600 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white disabled:opacity-40 transition-opacity"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
