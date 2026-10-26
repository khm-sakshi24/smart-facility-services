"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTopButton: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 350) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="hidden sm:flex fixed bottom-6 left-6 z-40 p-3 rounded-full bg-white/90 backdrop-blur-md text-forest-900 border border-emerald-300 shadow-md hover:bg-forest-800 hover:text-white transition-all duration-300 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-forest-600"
      aria-label="Scroll to top of page"
      title="Scroll to top"
    >
      <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};
