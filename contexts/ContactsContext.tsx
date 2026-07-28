import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

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
  const { token } = useAuth();
  const [contacts, setContacts] = useState<
    (Contact & { id: string; initial?: string })[]
  >([]);
  const [loading, setLoading] = useState(false);

  const fetchContacts = useCallback(async () => {
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
  }, [token]);

  const addContact = useCallback(
    async (contact: ContactInput) => {
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
    },
    [token],
  );

  const updateContact = useCallback(
    async (id: string, contact: ContactInput) => {
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
    },
    [token],
  );

  const deleteContact = useCallback(
    async (id: string) => {
      if (!token) return;

      try {
        const response = await deleteEmergencyContact(token, id);

        if (response.success) {
          setContacts((prev) => prev.filter((item) => item.id !== id));
        }
      } catch (error) {
        console.log("Delete contact error:", error);
      }
    },
    [token],
  );

  const getContact = useCallback(
    (id: string) => {
      return contacts.find((contact) => contact.id === id);
    },
    [contacts],
  );

  const value = useMemo(
    () => ({
      contacts,
      loading,
      fetchContacts,
      addContact,
      updateContact,
      deleteContact,
      getContact,
    }),
    [
      contacts,
      loading,
      fetchContacts,
      addContact,
      updateContact,
      deleteContact,
      getContact,
    ],
  );

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
}

export function useContacts() {
  const context = useContext(ContactsContext);

  if (!context) {
    throw new Error("useContacts must be used inside ContactsProvider");
  }

  return context;
}
