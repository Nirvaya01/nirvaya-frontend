import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";

export type AlertEntry = {
  id: string;
  type: "sos" | "location";
  title: string;
  date: string;
  detail: string;
  status: string;
};

type AlertCardProps = {
  item: AlertEntry;
};

export default function AlertCard({ item }: AlertCardProps) {
  const theme = useAppTheme();
  const isSos = item.type === "sos";

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, shadowColor: theme.shadow }]}>
      <View style={[styles.avatar, isSos ? { backgroundColor: theme.dangerSoft } : { backgroundColor: theme.surfaceSoft }]}>
        <Ionicons
          name={isSos ? "megaphone" : "location"}
          size={22}
          color={isSos ? theme.danger : theme.primary}
        />
      </View>

      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
          <Text style={[styles.date, { color: theme.textSecondary }]}>{item.date}</Text>
        </View>

        <Text style={[styles.detail, { color: theme.textSecondary }]}>{item.detail}</Text>

        <View style={[styles.statusPill, { backgroundColor: theme.surfaceSoft }]}>
          <Ionicons name="checkmark-circle" size={15} color={theme.primaryDark} />
          <Text style={[styles.statusText, { color: theme.primaryDark }]}>{item.status}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  info: { flex: 1 },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  title: { fontWeight: "800", fontSize: 17 },
  date: { fontSize: 12, fontWeight: "600", paddingTop: 2 },
  detail: { marginTop: 4, fontSize: 13.5, fontWeight: "500" },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 10,
  },
  statusText: { fontSize: 12, fontWeight: "700" },
});
