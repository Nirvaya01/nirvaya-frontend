import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ContactCard from "../../components/contacts/ContactCard";
import AppHeader from "../../components/ui/AppHeader";
import { useContacts } from "../../contexts/ContactsContext";

export default function Contacts() {
  const { contacts } = useContacts();

  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Trusted Circle</Text>
        <Text style={styles.subtitleText}>Your emergency contacts</Text>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactCard item={item} onPress={() => router.push(`/add-contact?id=${item.id}`)} />
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
      />
      <TouchableOpacity style={styles.fab} onPress={() => router.push("/add-contact")}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9ff" },
  titleBlock: { paddingHorizontal: 16, marginTop: 8, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "700", color: "#0d1c2f" },
  subtitleText: { fontSize: 16, color: "#45474c", marginTop: 4 },
  fab: {
    position: "absolute", right: 20, bottom: 96, width: 56, height: 56, borderRadius: 16,
    backgroundColor: "#091426", alignItems: "center", justifyContent: "center",
    shadowColor: "rgba(30,41,59,1)", shadowOpacity: 0.2, shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 }, elevation: 6,
  },
});
