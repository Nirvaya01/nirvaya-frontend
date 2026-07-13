import React, { createContext, useContext, useState } from 'react';
import { Contact } from '../components/contacts/ContactCard';

const INITIAL_CONTACTS: Contact[] = [
  { id: '1', name: 'Michael Chen', relation: 'Brother', phone: '+1 (555) 019-2834', trusted: true, initial: 'M' },
  { id: '2', name: 'Sarah Jenkins', relation: 'Mother', phone: '+1 (555) 837-9921', trusted: true, initial: 'S' },
  { id: '3', name: 'David Ross', relation: 'Roommate', phone: '+1 (555) 342-1188', trusted: false, initial: 'D' },
];

type ContactsContextType = {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, 'id' | 'initial'>) => void;
  updateContact: (id: string, contact: Omit<Contact, 'id' | 'initial'>) => void;
  deleteContact: (id: string) => void;
  getContact: (id: string) => Contact | undefined;
};

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

export function ContactsProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);

  function addContact(contact: Omit<Contact, 'id' | 'initial'>) {
    const newContact: Contact = { ...contact, id: Date.now().toString(), initial: contact.name[0]?.toUpperCase() ?? '?' };
    setContacts((prev) => [...prev, newContact]);
  }
  function updateContact(id: string, contact: Omit<Contact, 'id' | 'initial'>) {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, ...contact, initial: contact.name[0]?.toUpperCase() ?? '?' } : c)));
  }
  function deleteContact(id: string) {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }
  function getContact(id: string) {
    return contacts.find((c) => c.id === id);
  }

  return (
    <ContactsContext.Provider value={{ contacts, addContact, updateContact, deleteContact, getContact }}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const ctx = useContext(ContactsContext);
  if (!ctx) throw new Error('useContacts must be used within a ContactsProvider');
  return ctx;
}