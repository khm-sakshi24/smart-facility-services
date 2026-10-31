"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type ContactMode = "call" | "whatsapp";

interface ContactModalContextType {
  isOpen: boolean;
  mode: ContactMode;
  serviceName?: string;
  prefilledMessage?: string;
  openCallModal: (serviceName?: string) => void;
  openWhatsAppModal: (prefilledMessage?: string, serviceName?: string) => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export const ContactModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ContactMode>("call");
  const [serviceName, setServiceName] = useState<string | undefined>(undefined);
  const [prefilledMessage, setPrefilledMessage] = useState<string | undefined>(undefined);

  const openCallModal = useCallback((service?: string) => {
    setMode("call");
    setServiceName(service);
    setPrefilledMessage(undefined);
    setIsOpen(true);
  }, []);

  const openWhatsAppModal = useCallback((msg?: string, service?: string) => {
    setMode("whatsapp");
    setServiceName(service);
    setPrefilledMessage(msg);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ContactModalContext.Provider
      value={{
        isOpen,
        mode,
        serviceName,
        prefilledMessage,
        openCallModal,
        openWhatsAppModal,
        closeModal,
      }}
    >
      {children}
    </ContactModalContext.Provider>
  );
};

export const useContactModal = (): ContactModalContextType => {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return context;
};
