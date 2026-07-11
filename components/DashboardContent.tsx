import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";

const { width } = Dimensions.get("window");

const COLORS = {
  background: "#EEF2F7",
  cardBg: "#FFFFFF",
  primary: "#C0392B",
  primaryLight: "#E74C3C",
  safeGreen: "#27AE60",
  textPrimary: "#1A1A2E",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  accent: "#3B82F6",
  avatarBorder: "#E5E7EB",
  cardBorder: "#F3F4F6",
  sosRing: "rgba(192,57,43,0.15)",
  sosRingOuter: "rgba(192,57,43,0.07)",
} as const;

interface User {
  name: string;
  avatar: string | null;
  isSafe: boolean;
}

interface Location {
  label: string;
  address: string;
}

interface Contact {
  id: string;
  name: string;
  initial: string;
  color: string;
}

interface RecentAlert {
  message: string;
  time: string;
}

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface SectionLabelProps {
  text: string;
}

interface AvatarStackProps {
  contacts: Contact[];
}

interface UserAvatarProps {
  user: User;
}

const MOCK_USER: User = {
  name: "Sarah",
  avatar: null,
  isSafe: true,
};

const MOCK_LOCATION: Location = {
  label: "CURRENT LOCATION",
  address: "Safety Way, kathmandu",
};

const MOCK_CONTACTS: Contact[] = [
  { id: "1", name: "Mom", initial: "M", color: "#F59E0B" },
  { id: "2", name: "Sister", initial: "S", color: "#8B5CF6" },
  { id: "3", name: "Jess", initial: "J", color: "#10B981" },
  { id: "4", name: "Officer Ray", initial: "R", color: "#3B82F6" },
];

const MOCK_RECENT_ALERT: RecentAlert | null = null;

const Card: React.FC<CardProps> = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

const SectionLabel: React.FC<SectionLabelProps> = ({ text }) => (
  <View style={styles.sectionLabelRow}>
    <Text style={styles.sectionLabelText}>{text}</Text>
  </View>
);

const AvatarStack: React.FC<AvatarStackProps> = ({ contacts }) => (
  <View style={styles.avatarStack}>
    {contacts.slice(0, 3).map((contact: Contact, index: number) => (
      <View
        key={contact.id}
        style={[
          styles.avatarCircle,
          {
            backgroundColor: contact.color,
            marginLeft: index === 0 ? 0 : -8,
            zIndex: 10 - index,
          },
        ]}
      >
        <Text style={styles.avatarInitial}>{contact.initial}</Text>
      </View>
    ))}
    {contacts.length > 3 && (
      <View
        style={[
          styles.avatarCircle,
          { backgroundColor: "#E5E7EB", marginLeft: -8 },
        ]}
      >
        <Text style={[styles.avatarInitial, { color: COLORS.textSecondary }]}>
          +{contacts.length - 3}
        </Text>
      </View>
    )}
  </View>
);

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => (
  <View>
    {user.avatar ? (
      <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
    ) : (
      <View style={[styles.userAvatar, styles.userAvatarFallback]}>
        <Text style={styles.userAvatarInitial}>{user.name[0]}</Text>
      </View>
    )}
  </View>
);

export default function DashboardContent() {
  const [sosPressed, setSosPressed] = useState<boolean>(false);

  const handleSOS = (): void => {
    router.push("/sos-confirmation");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.appName}>Nirvaya</Text>
        <TouchableOpacity style={styles.settingsIcon}>
          <Text style={{ fontSize: 18, color: COLORS.textPrimary }}>⚙</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greetingRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.greetingText}>Hello, {MOCK_USER.name}.</Text>
            <View style={styles.safeRow}>
              <View
                style={[
                  styles.safeDot,
                  {
                    backgroundColor: MOCK_USER.isSafe
                      ? COLORS.safeGreen
                      : COLORS.primary,
                  },
                ]}
              />
              <Text
                style={[
                  styles.safeText,
                  {
                    color: MOCK_USER.isSafe ? COLORS.safeGreen : COLORS.primary,
                  },
                ]}
              >
                {MOCK_USER.isSafe ? "You are safe." : "Alert active."}
              </Text>
            </View>
          </View>
          <UserAvatar user={MOCK_USER} />
        </View>

        <View style={styles.sosBgCircleOuter}>
          <View style={styles.sosBgCircleInner}>
            <TouchableOpacity
              style={[styles.sosButton, sosPressed && styles.sosButtonPressed]}
              onPress={handleSOS}
              activeOpacity={0.85}
            >
              <Text style={styles.sosStar}>✱</Text>
              <Text style={styles.sosLabel}>SOS</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.sosTapHint}>
          Tap to notify your emergency{"\n"}contacts.
        </Text>

        <Card style={styles.locationCard}>
          <View style={styles.locationMapThumb}>
            <Text style={{ fontSize: 22 }}>🗺</Text>
          </View>
          <View style={{ flex: 1, paddingLeft: 12 }}>
            <View style={styles.locationLabelRow}>
              <Text style={{ fontSize: 11, color: COLORS.accent }}>📍</Text>
              <Text style={styles.locationLabel}>{MOCK_LOCATION.label}</Text>
            </View>
            <Text style={styles.locationAddress}>{MOCK_LOCATION.address}</Text>
          </View>
          <TouchableOpacity style={styles.locationChevron}>
            <Text style={{ color: COLORS.textMuted, fontSize: 18 }}>›</Text>
          </TouchableOpacity>
        </Card>

        <Card>
          <SectionLabel text="EMERGENCY CONTACTS" />
          <View style={styles.contactsRow}>
            <View>
              <Text style={styles.contactsCount}>
                {MOCK_CONTACTS.length} Protected
              </Text>
              <Text style={styles.contactsReady}>Ready to alert</Text>
            </View>
            <AvatarStack contacts={MOCK_CONTACTS} />
          </View>
        </Card>

        <Card>
          <SectionLabel text="RECENT ALERT" />
          {MOCK_RECENT_ALERT ? (
            <View style={styles.alertItem}>
              <Text style={styles.alertText}>{MOCK_RECENT_ALERT.message}</Text>
              <Text style={styles.alertTime}>{MOCK_RECENT_ALERT.time}</Text>
            </View>
          ) : (
            <View style={styles.emptyAlertBox}>
              <Text style={styles.emptyAlertIcon}>🔔</Text>
              <Text style={styles.emptyAlertText}>No recent alerts.</Text>
            </View>
          )}
        </Card>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 20 : 12,
    paddingBottom: 4,
    backgroundColor: COLORS.background,
  },
  appName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
  },
  settingsIcon: {
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  safeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  safeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  safeText: {
    fontSize: 15,
    fontWeight: "600",
  },
  userAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: COLORS.avatarBorder,
  },
  userAvatarFallback: {
    backgroundColor: "#DDE3EE",
    justifyContent: "center",
    alignItems: "center",
  },
  userAvatarInitial: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  sosBgCircleOuter: {
    alignSelf: "center",
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: COLORS.sosRingOuter,
    justifyContent: "center",
    alignItems: "center",
  },
  sosBgCircleInner: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: COLORS.sosRing,
    justifyContent: "center",
    alignItems: "center",
  },
  sosButton: {
    width: 136,
    height: 136,
    borderRadius: 68,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 10,
  },
  sosButtonPressed: {
    backgroundColor: "#96281B",
    transform: [{ scale: 0.96 }],
  },
  sosStar: {
    fontSize: 28,
    color: "#FFFFFF",
    marginBottom: 2,
  },
  sosLabel: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  sosTapHint: {
    textAlign: "center",
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 14,
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionLabelText: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.6,
    color: COLORS.textMuted,
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationMapThumb: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: "#EEF2F7",
    justifyContent: "center",
    alignItems: "center",
  },
  locationLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  locationLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.6,
    color: COLORS.accent,
    marginLeft: 3,
  },
  locationAddress: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  locationChevron: {
    paddingLeft: 8,
  },
  contactsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactsCount: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  contactsReady: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  avatarStack: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  avatarInitial: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  alertItem: {
    padding: 10,
    backgroundColor: "#FEF2F2",
    borderRadius: 10,
  },
  alertText: {
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  alertTime: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  emptyAlertBox: {
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyAlertIcon: {
    fontSize: 28,
    opacity: 0.25,
    marginBottom: 8,
  },
  emptyAlertText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
});