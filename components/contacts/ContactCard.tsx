import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";

export type Contact = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
  initial: string;
};

type ContactCardProps = {
  item: Contact;
  onPress: () => void;
};

export default function ContactCard({ item, onPress }: ContactCardProps) {
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          shadowColor: theme.shadow,
          borderColor: theme.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        <View style={[styles.avatar, { backgroundColor: theme.surfaceSoft }]}>
          <Text style={[styles.avatarText, { color: theme.primaryDark }]}>
            {item.initial}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>

          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {item.relationship} • {item.phone}
          </Text>

          <Text style={[styles.email, { color: theme.textSecondary }]}>
            {item.email}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.callButton, { backgroundColor: theme.successSoft }]}>
        <Ionicons name="call" size={18} color={theme.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatarText: {
    fontWeight: "600",
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "600",
    fontSize: 18,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 14,
  },
  email: {
    marginTop: 3,
    fontSize: 13,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
});
