"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { businessInfo } from "@/config/businessInfo";

export const WelcomeAnnouncement: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem("sfs_welcome_dismissed");
      if (!dismissed) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem("sfs_welcome_dismissed", "true");
    } catch {
      // ignore
    }
  };

  if (!isVisible) return null;

  return (
    <div className="hidden sm:block bg-gradient-to-r from-forest-950 via-forest-900 to-emerald-950 text-white text-xs sm:text-sm py-2 px-4 border-b border-emerald-700/40 relative z-30 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-4 h-4 text-brandPink-300 shrink-0" />
          <span>
            Welcome to <strong>{businessInfo.name}</strong> — {businessInfo.tagline}
          </span>
        </div>
        <button
          onClick={handleDismiss}
          className="p-1 rounded hover:bg-forest-800 text-gray-300 hover:text-white transition-colors shrink-0"
          aria-label="Dismiss welcome announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
