"use client";

import React, { createContext, useContext, useEffect } from "react";
import { translations, Translations } from "@/config/translations";

interface LanguageContextType {
  language: "en";
  setLanguage: (lang: "en") => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    try {
      // Clear any legacy language override from user's browser localStorage
      localStorage.removeItem("sfs_lang");
    } catch {
      // ignore SSR
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language: "en", setLanguage: () => {}, t: translations.en }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
