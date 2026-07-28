import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Header from "@/components/Header";
import { useTheme } from "@/Context/ThemeContext";
import { PermissionItem, usePermissions } from "@/hooks/usePermissions";
import { router } from "expo-router";

function PermissionStatusPill({ status }: { status: PermissionItem["status"] }) {
  const colors = useMemo(() => {
    switch (status) {
      case "Allowed":
        return { bg: "#EAF8F2", text: "#0F9D58" };
      case "Denied":
        return { bg: "#FEE2E2", text: "#B91C1C" };
      case "Limited":
        return { bg: "#FEF3C7", text: "#B45309" };
      case "Unavailable":
        return { bg: "#E2E8F0", text: "#475569" };
      default:
        return { bg: "#E2E8F0", text: "#475569" };
    }
  }, [status]);

  return (
    <View style={[styles.statusPill, { backgroundColor: colors.bg }]}>
      <Text style={[styles.statusPillText, { color: colors.text }]}>
        {status}
      </Text>
    </View>
  );
}

function PermissionCard({
  item,
  isDark,
}: {
  item: PermissionItem;
  isDark: boolean;
}) {
  return (
    <View
      style={[
        styles.permissionCard,
        { backgroundColor: isDark ? "#0C1727" : "#FFFFFF" },
      ]}
    >
      <View style={styles.permissionTopRow}>
        <View style={[styles.permissionIcon, { backgroundColor: isDark ? "#123326" : "#EAF8F2" }]}>
          <MaterialIcons name={item.icon as any} size={22} color="#0F9D58" />
        </View>

        <View style={styles.permissionTextWrap}>
          <Text style={[styles.permissionTitle, { color: isDark ? "#F8FAFC" : "#0F172A" }]}>
            {item.title}
          </Text>
          <Text style={[styles.permissionSubtitle, { color: isDark ? "#94A3B8" : "#64748B" }]}>
            {item.subtitle}
          </Text>
        </View>

        <PermissionStatusPill status={item.status} />
      </View>

      <View style={styles.permissionFooter}>
        {item.required ? (
          <View style={styles.requiredBadge}>
            <Text style={styles.requiredBadgeText}>Required</Text>
          </View>
        ) : (
          <View style={styles.optionalBadge}>
            <Text style={styles.optionalBadgeText}>Optional</Text>
          </View>
        )}

        <Text style={[styles.availabilityText, { color: isDark ? "#CBD5E1" : "#64748B" }]}>
          {item.available ? "Available on this device" : "Not available in this build"}
        </Text>
      </View>
    </View>
  );
}

export default function PermissionsScreen() {
  const { isDark } = useTheme();
  const { items, loading, refresh, openAppSettings } = usePermissions();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#07111F" : "#F5F7FB" },
      ]}
    >
      <Header title="Permissions" onBack={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View
          style={[
            styles.heroCard,
            { backgroundColor: isDark ? "#0C1727" : "#FFFFFF" },
          ]}
        >
          <View style={styles.heroIcon}>
            <Feather name="shield" size={24} color="#0F9D58" />
          </View>

          <Text style={[styles.heroTitle, { color: isDark ? "#F8FAFC" : "#0F172A" }]}>
            Device Permissions
          </Text>
          <Text style={[styles.heroSubtitle, { color: isDark ? "#94A3B8" : "#64748B" }]}>
            Nirvaya uses device permissions for SOS location sharing and media
            access. You can manage them from your phone settings.
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.manageButton}
            onPress={openAppSettings}
          >
            <Feather name="settings" size={16} color="#FFFFFF" />
            <Text style={styles.manageButtonText}>Manage Permissions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#7DD3A7" : "#006A61" }]}>
            Current Status
          </Text>

          <TouchableOpacity onPress={refresh} activeOpacity={0.8}>
            <Text style={[styles.refreshText, { color: isDark ? "#94A3B8" : "#64748B" }]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color="#0F9D58" />
            <Text style={[styles.loadingText, { color: isDark ? "#CBD5E1" : "#64748B" }]}>
              Checking permissions...
            </Text>
          </View>
        ) : null}

        {items.map((item) => (
          <PermissionCard key={item.key} item={item} isDark={isDark} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 28,
  },
  heroCard: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    backgroundColor: "#EAF8F2",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
  },
  heroSubtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
  },
  manageButton: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#006A61",
    paddingVertical: 12,
    borderRadius: 14,
  },
  manageButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  refreshText: {
    fontSize: 13,
    fontWeight: "600",
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 13,
  },
  permissionCard: {
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  permissionTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  permissionIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  permissionTextWrap: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  permissionSubtitle: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: "700",
  },
  permissionFooter: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  requiredBadge: {
    backgroundColor: "#EAF8F2",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  requiredBadgeText: {
    color: "#0F9D58",
    fontSize: 12,
    fontWeight: "700",
  },
  optionalBadge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  optionalBadgeText: {
    color: "#4338CA",
    fontSize: 12,
    fontWeight: "700",
  },
  availabilityText: {
    flex: 1,
    textAlign: "right",
    fontSize: 12,
  },
});
