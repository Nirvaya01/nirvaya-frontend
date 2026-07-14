import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface ContactsContextType {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, "id">) => void;
  removeContact: (id: string) => void;
}

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const addContact = (contact: Omit<Contact, "id">) => {
    setContacts((prev) => [
      ...prev,
      { ...contact, id: Date.now().toString() },
    ]);
  };

  const removeContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ContactsContext.Provider value={{ contacts, addContact, removeContact }}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts(): ContactsContextType {
  const ctx = useContext(ContactsContext);
  if (!ctx) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return ctx;
}