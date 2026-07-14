import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useContacts } from "../context/ContactsContext";

const RELATIONSHIPS = ["Family", "Friend", "Colleague", "Other"];

export default function AddContactScreen() {
  const router = useRouter();
  const { addContact } = useContacts();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState(RELATIONSHIPS[0]);

  const handleSave = () => {
    if (!name.trim() || !phone.trim()) return;
    addContact({ name, phone, relationship });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Contact</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <View style={styles.relationshipRow}>
        {RELATIONSHIPS.map((r) => (
          <TouchableOpacity
            key={r}
            style={[
              styles.relationshipChip,
              relationship === r && styles.relationshipChipActive,
            ]}
            onPress={() => setRelationship(r)}
          >
            <Text
              style={[
                styles.relationshipText,
                relationship === r && styles.relationshipTextActive,
              ]}
            >
              {r}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Contact</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  relationshipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 24,
    gap: 8,
  },
  relationshipChip: {
    borderWidth: 1,
    borderColor: "#2563eb",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  relationshipChipActive: { backgroundColor: "#2563eb" },
  relationshipText: { color: "#2563eb", fontWeight: "600" },
  relationshipTextActive: { color: "#fff" },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});