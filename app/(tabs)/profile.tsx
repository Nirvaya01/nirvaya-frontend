import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#091426",
  secondary: "#006A61",
  background: "#F8F9FF",
  white: "#FFFFFF",
  error: "#BA1A1A",
  errorContainer: "#FFDAD6",
  textSecondary: "#45474C",
  border: "#C5C6CD",
  surfaceVariant: "#D5E3FD",
  safeZone: "#86F2E4",
  shadow: "rgba(30,41,59,0.08)",
};

const profile = {
  name: "Sarah Jenkins",
  email: "sarah@example.com",
  avatar: "https://randomuser.me/api/portraits/women/68.jpg",
};

interface RowProps {
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  iconBackground: string;
  iconColor: string;
  onPress?: () => void;
}

const SettingsRow = ({
  title,
  subtitle,
  icon,
  iconBackground,
  iconColor,
  onPress,
}: RowProps) => {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.row} onPress={onPress}>
      <View style={styles.rowLeft}>
        <View
          style={[
            styles.iconCircle,
            {
              backgroundColor: iconBackground,
            },
          ]}
        >
          <MaterialIcons name={icon} size={22} color={iconColor} />
        </View>

        <View>
          <Text style={styles.rowTitle}>{title}</Text>

          <Text style={styles.rowSubtitle}>{subtitle}</Text>
        </View>
      </View>

      <MaterialIcons name="chevron-right" size={24} color="#999" />
    </TouchableOpacity>
  );
};

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        {/* Top App Bar */}

        <View style={styles.topBar}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <Text style={styles.logo}>Nirvaya</Text>

          <TouchableOpacity>
            <Feather name="settings" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}

        <View style={styles.profileCard}>
          <View style={styles.profileBackground} />

          <Image
            source={{
              uri: profile.avatar,
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>{profile.name}</Text>

          <Text style={styles.email}>{profile.email}</Text>

          <TouchableOpacity style={styles.editButton}>
            <MaterialIcons name="edit" color="white" size={18} />

            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Safety Core Card */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>SAFETY CORE</Text>

          <SettingsRow
            title="Emergency Preferences"
            subtitle="Notifications, Countdown"
            icon="health-and-safety"
            iconBackground="#FFDAD6"
            iconColor="#BA1A1A"
          />

          <View style={styles.divider} />

          <SettingsRow
            title="Permissions"
            subtitle="Location & Alerts"
            icon="my-location"
            iconBackground="#86F2E4"
            iconColor="#006A61"
          />
        </View>
        {/* Security Card */}

        <View style={styles.card}>
          <SettingsRow
            title="Security"
            subtitle="Password, PIN & Two-Factor Authentication"
            icon="lock"
            iconBackground="#D5E3FD"
            iconColor={COLORS.primary}
          />
        </View>

        {/* Logout Card */}

        <TouchableOpacity activeOpacity={0.9} style={styles.logoutCard}>
          <View style={styles.logoutLeft}>
            <View style={styles.logoutIcon}>
              <MaterialIcons name="logout" size={22} color={COLORS.error} />
            </View>

            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>

        {/* Version */}

        <Text style={styles.version}>Nirvaya Version 2.4.1</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },

  logo: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
  },

  profileCard: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    overflow: "hidden",
    alignItems: "center",
    paddingBottom: 22,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  profileBackground: {
    width: "100%",
    height: 90,
    backgroundColor: COLORS.surfaceVariant,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -50,
    borderWidth: 4,
    borderColor: COLORS.white,
  },

  name: {
    marginTop: 15,
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.primary,
  },

  email: {
    marginTop: 6,
    color: COLORS.textSecondary,
    fontSize: 16,
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
  },

  editText: {
    color: COLORS.white,
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 16,
  },

  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginTop: 22,
    borderRadius: 18,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    color: COLORS.secondary,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  rowTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.primary,
  },

  rowSubtitle: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: 14,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 80,
  },
  logoutCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.errorContainer,
    paddingVertical: 18,
    paddingHorizontal: 18,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },

  logoutLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoutIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFF3F2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  logoutText: {
    color: COLORS.error,
    fontSize: 20,
    fontWeight: "700",
  },

  version: {
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
    color: COLORS.textSecondary,
    opacity: 0.6,
    fontSize: 13,
  },
});