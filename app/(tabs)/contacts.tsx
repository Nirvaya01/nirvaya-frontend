import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ContactCard, { Contact } from '../../components/contacts/ContactCard';

const INITIAL_CONTACTS: Contact[] = [
  { id: '1', name: 'Michael Chen', relation: 'Brother', phone: '+1 (555) 019-2834', trusted: true, initial: 'M' },
  { id: '2', name: 'Sarah Jenkins', relation: 'Mother', phone: '+1 (555) 837-9921', trusted: true, initial: 'S' },
  { id: '3', name: 'David Ross', relation: 'Roommate', phone: '+1 (555) 342-1188', trusted: false, initial: 'D' },
];

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formName, setFormName] = useState('');
  const [formRelation, setFormRelation] = useState('');
  const [formPhone, setFormPhone] = useState('');

  function openAddModal() {
    setEditingId(null);
    setFormName('');
    setFormRelation('');
    setFormPhone('');
    setModalVisible(true);
  }

  function openEditModal(contact: Contact) {
    setEditingId(contact.id);
    setFormName(contact.name);
    setFormRelation(contact.relation);
    setFormPhone(contact.phone);
    setModalVisible(true);
  }

  function saveContact() {
    if (!formName.trim()) return;

    if (editingId) {
      setContacts((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? { ...c, name: formName, relation: formRelation, phone: formPhone, initial: formName[0].toUpperCase() }
            : c
        )
      );
    } else {
      const newContact: Contact = {
        id: Date.now().toString(),
        name: formName,
        relation: formRelation,
        phone: formPhone,
        trusted: false,
        initial: formName[0]?.toUpperCase() ?? '?',
      };
      setContacts((prev) => [...prev, newContact]);
    }
    setModalVisible(false);
  }

  function deleteContact() {
    if (!editingId) return;
    setContacts((prev) => prev.filter((c) => c.id !== editingId));
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color="#1a1a2e" />
        <Text style={styles.headerTitle}>Nirvaya</Text>
        <Ionicons name="settings-outline" size={22} color="#1a1a2e" />
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.title}>Trusted Circle</Text>
        <Text style={styles.subtitleText}>Your emergency contacts</Text>
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactCard item={item} onPress={() => openEditModal(item)} />
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
      />

      <TouchableOpacity style={styles.fab} onPress={openAddModal}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {editingId ? 'Edit Contact' : 'Add Contact'}
            </Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={formName}
              onChangeText={setFormName}
              placeholder="Full name"
            />

            <Text style={styles.label}>Relation</Text>
            <TextInput
              style={styles.input}
              value={formRelation}
              onChangeText={setFormRelation}
              placeholder="e.g. Brother, Mother, Friend"
            />

            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={formPhone}
              onChangeText={setFormPhone}
              placeholder="+1 (555) 000-0000"
              keyboardType="phone-pad"
            />

            <View style={styles.modalActions}>
              {editingId && (
                <TouchableOpacity style={styles.deleteBtn} onPress={deleteContact}>
                  <Text style={styles.deleteBtnText}>Delete</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={saveContact}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a2e' },
  titleBlock: { paddingHorizontal: 16, marginTop: 8, marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '800', color: '#1a1a2e' },
  subtitleText: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 32,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 16,
  },
  label: { fontSize: 13, color: '#6b7280', marginBottom: 4, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1a1a2e',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 24,
  },
  deleteBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 'auto',
  },
  deleteBtnText: { color: '#dc2626', fontWeight: '600' },
  cancelBtn: { paddingVertical: 10, paddingHorizontal: 14 },
  cancelBtnText: { color: '#6b7280', fontWeight: '600' },
  saveBtn: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  saveBtnText: { color: '#fff', fontWeight: '700' },
});