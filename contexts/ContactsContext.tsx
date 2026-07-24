import React, { createContext, useContext, useState } from "react";

import { Contact } from "../components/contacts/ContactCard";

import {
  createEmergencyContact,
  deleteEmergencyContact,
  getEmergencyContacts,
  updateEmergencyContact,
} from "../api/contactsApi";

import { useAuth } from "../Context/AuthContext";

type ContactInput = {
  name: string;
  email: string;
  phone: string;
  relationship: string;
};

type ContactsContextType = {
  contacts: (Contact & { id: string; initial?: string })[];

  loading: boolean;

  fetchContacts: () => Promise<void>;

  addContact: (contact: ContactInput) => Promise<void>;

  updateContact: (id: string, contact: ContactInput) => Promise<void>;

  deleteContact: (id: string) => Promise<void>;

  getContact: (
    id: string,
  ) => (Contact & { id: string; initial?: string }) | undefined;
};

const ContactsContext = createContext<ContactsContextType | undefined>(
  undefined,
);

export function ContactsProvider({ children }: { children: React.ReactNode }) {
  // Get JWT from AuthContext
  const { token } = useAuth();

  const [contacts, setContacts] = useState<
    (Contact & { id: string; initial?: string })[]
  >([]);

  const [loading, setLoading] = useState(false);

  // =========================
  // GET ALL CONTACTS
  // =========================

  async function fetchContacts() {
    if (!token) return;

    try {
      setLoading(true);

      const response = await getEmergencyContacts(token);

      if (response.success) {
        const formattedContacts = response.contacts.map((contact: any) => ({
          ...contact,

          id: contact._id,

          initial: contact.name?.[0]?.toUpperCase() ?? "?",
        }));

        setContacts(formattedContacts);
      }
    } catch (error) {
      console.log("Fetch contacts error:", error);
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // ADD CONTACT
  // =========================

  async function addContact(contact: ContactInput) {
    if (!token) return;

    try {
      const response = await createEmergencyContact(token, contact);

      if (response.success) {
        const newContact = {
          ...response.contact,

          id: response.contact._id,

          initial: response.contact.name?.[0]?.toUpperCase() ?? "?",
        };

        setContacts((prev) => [...prev, newContact]);
      }
    } catch (error) {
      console.log("Add contact error:", error);
    }
  }

  // =========================
  // UPDATE CONTACT
  // =========================

  async function updateContact(id: string, contact: ContactInput) {
    if (!token) return;

    try {
      const response = await updateEmergencyContact(token, id, contact);

      if (response.success) {
        const updated = {
          ...response.contact,

          id: response.contact._id,

          initial: response.contact.name?.[0]?.toUpperCase() ?? "?",
        };

        setContacts((prev) =>
          prev.map((item) => (item.id === id ? updated : item)),
        );
      }
    } catch (error) {
      console.log("Update contact error:", error);
    }
  }

  // =========================
  // DELETE CONTACT
  // =========================

  async function deleteContact(id: string) {
    if (!token) return;

    try {
      const response = await deleteEmergencyContact(token, id);

      if (response.success) {
        setContacts((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log("Delete contact error:", error);
    }
  }

  // =========================
  // GET SINGLE CONTACT
  // =========================

  function getContact(id: string) {
    return contacts.find((contact) => contact.id === id);
  }

  return (
    <ContactsContext.Provider
      value={{
        contacts,

        loading,

        fetchContacts,

        addContact,

        updateContact,

        deleteContact,

        getContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactsContext);

  if (!context) {
    throw new Error("useContacts must be used inside ContactsProvider");
  }

  return context;
}
