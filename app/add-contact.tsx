import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useContacts } from '../contexts/ContactsContext';

const RELATIONSHIPS = ['Family', 'Friend', 'Colleague', 'Other'];

export default function AddContact() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { getContact, addContact, updateContact, deleteContact } = useContacts();
  const isEditing = !!id;

  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Family');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (id) {
      const existing = getContact(id);
      if (existing) {
        setName(existing.name);
        setRelationship(existing.relation);
        setPhone(existing.phone);
      }
    }
  }, [id]);

  function handleSave() {
    if (!name.trim()) return;

    const payload = {
      name,
      relation: relationship,
      phone,
      trusted: isEditing ? getContact(id!)?.trusted ?? false : false,
    };

    if (isEditing) {
      updateContact(id!, payload);
    } else {
      addContact(payload);
    }
    router.back();
  }

  function handleDelete() {
    if (!id) return;
    deleteContact(id);
    router.back();
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#091426" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nirvaya</Text>
        <View style={styles.iconBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>
          {isEditing ? 'Edit Emergency Contact' : 'Add Emergency Contact'}
        </Text>
        <Text style={styles.subtitle}>
          Add a trusted person to notify during an emergency. They will receive SMS alerts.
        </Text>

        <Text style={styles.label}>Contact Name</Text>
        <View style={styles.inputRow}>
          <Ionicons name="person-outline" size={18} color="#6b7280" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="e.g. Jane Doe"
            placeholderTextColor="#9aa0ac"
          />
        </View>

        <Text style={styles.label}>Relationship</Text>
        <View style={styles.chipRow}>
          {RELATIONSHIPS.map((option) => {
            const selected = relationship === option;
            return (
              <TouchableOpacity
                key={option}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => setRelationship(option)}
              >
                <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputRow}>
          <Ionicons name="call-outline" size={18} color="#6b7280" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="(555) 000-0000"
            placeholderTextColor="#9aa0ac"
            keyboardType="phone-pad"
          />
        </View>
        <Text style={styles.helperText}>Make sure to include country code if applicable.</Text>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Ionicons name="checkmark-done-outline" size={18} color="#fff" />
          <Text style={styles.saveBtnText}>Save Contact</Text>
        </TouchableOpacity>

        {isEditing && (
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.deleteBtnText}>Delete Contact</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9ff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 8,
  },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#091426' },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 48 },
  title: { fontSize: 26, fontWeight: '800', color: '#0d1c2f' },
  subtitle: { fontSize: 15, color: '#6b7280', marginTop: 8, lineHeight: 21 },
  label: { fontSize: 14, fontWeight: '700', color: '#0d1c2f', marginTop: 24, marginBottom: 8 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e5ee',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 15, color: '#0d1c2f' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: {
    borderWidth: 1,
    borderColor: '#e2e5ee',
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  chipSelected: { backgroundColor: '#86f2e4', borderColor: '#86f2e4' },
  chipText: { fontSize: 14, color: '#45474c', fontWeight: '600' },
  chipTextSelected: { color: '#006f66' },
  helperText: { fontSize: 12, color: '#9aa0ac', marginTop: 6 },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#0f6e4f',
    borderRadius: 12,
    height: 52,
    marginTop: 32,
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  deleteBtn: { alignItems: 'center', marginTop: 16, paddingVertical: 10 },
  deleteBtnText: { color: '#ba1a1a', fontWeight: '600', fontSize: 14 },
});