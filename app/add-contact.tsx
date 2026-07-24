import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import React, { useEffect, useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useContacts } from "../contexts/ContactsContext";

const RELATIONSHIPS = ["Family", "Friend", "Colleague", "Other"];

export default function AddContact() {
  const { id } = useLocalSearchParams<{
    id?: string;
  }>();

  const {
    getContact,

    addContact,

    updateContact,

    deleteContact,
  } = useContacts();

  const isEditing = !!id;

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [relationship, setRelationship] = useState("Family");

  useEffect(() => {
    if (id) {
      const existing = getContact(id);

      if (existing) {
        setName(existing.name);

        setEmail(existing.email);

        setPhone(existing.phone);

        setRelationship(existing.relationship);
      }
    }
  }, [id]);

  async function handleSave() {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      return;
    }

    const payload = {
      name,

      email,

      phone,

      relationship,
    };

    if (isEditing) {
      await updateContact(id!, payload);
    } else {
      await addContact(payload);
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
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color="#091426" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Nirvaya</Text>

        <View style={styles.iconBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          {isEditing ? "Edit Emergency Contact" : "Add Emergency Contact"}
        </Text>

        <Text style={styles.subtitle}>
          Add a trusted person to notify during an emergency.
        </Text>

        <Text style={styles.label}>Contact Name</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Jane Doe"
        />

        <Text style={styles.label}>Email Address</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="example@gmail.com"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Relationship</Text>

        <View style={styles.chipRow}>
          {RELATIONSHIPS.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.chip,

                relationship === option && styles.chipSelected,
              ]}
              onPress={() => setRelationship(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Phone Number</Text>

        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="9800000000"
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
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
  container: {
    flex: 1,
    backgroundColor: "#f8f9ff",
  },

  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 8,
    color: "#6b7280",
  },

  label: {
    marginTop: 20,
    fontWeight: "700",
  },

  input: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginTop: 8,
  },

  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
  },

  chipSelected: {
    backgroundColor: "#86f2e4",
  },

  saveBtn: {
    marginTop: 30,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#0f6e4f",
    alignItems: "center",
    justifyContent: "center",
  },

  saveBtnText: {
    color: "#fff",
    fontWeight: "700",
  },

  deleteBtn: {
    alignItems: "center",
    marginTop: 20,
  },

  deleteBtnText: {
    color: "red",
  },
});
