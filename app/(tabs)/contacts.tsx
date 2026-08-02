import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppTheme } from "@/hooks/useAppTheme";
import ContactCard from "../../components/contacts/ContactCard";
import AppHeader from "../../components/ui/AppHeader";
import { useContacts } from "../../Contexts/ContactsContext";

export default function Contacts() {
  const { contacts, fetchContacts } = useContacts();
  const theme = useAppTheme();

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <AppHeader showSettings={false} />

      <View style={styles.titleBlock}>
        <Text style={[styles.title, { color: theme.text }]}>
          Trusted Circle
        </Text>
        <Text style={[styles.subtitleText, { color: theme.textSecondary }]}>
          Your emergency contacts
        </Text>
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactCard
            item={item}
            onPress={() => router.push(`/add-contact?id=${item.id}`)}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.primary }]}
        onPress={() => router.push("/add-contact")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleBlock: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 12 },
  title: { fontSize: 24, fontWeight: "700", letterSpacing: -0.3 },
  subtitleText: { fontSize: 16, marginTop: 4 },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 96,
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(30,41,59,1)",
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
});
