import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useContacts } from "../../context/ContactsContext";

export default function ContactsScreen() {
  const router = useRouter();
  const { contacts } = useContacts();

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={styles.empty}>No contacts yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>{item.phone} · {item.relationship}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add-contact")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  empty: { textAlign: "center", marginTop: 40, color: "#6b7280" },
  card: {
    backgroundColor: "#f3f4f6",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  name: { fontSize: 16, fontWeight: "600" },
  meta: { fontSize: 14, color: "#6b7280", marginTop: 4 },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#2563eb",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  fabText: { color: "#fff", fontSize: 28, lineHeight: 30 },
});