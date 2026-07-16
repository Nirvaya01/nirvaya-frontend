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
import { useAuth } from "../Context/AuthContext";

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
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.row}
      onPress={onPress}
    >
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
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
      // app/_layout.tsx automatically redirects to login
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

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

        {/* Safety Core */}

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

        {/* Security */}

        <View style={styles.card}>
          <SettingsRow
            title="Security"
            subtitle="Password, PIN & Two-Factor Authentication"
            icon="lock"
            iconBackground="#D5E3FD"
            iconColor={COLORS.primary}
          />
        </View>

        {/* Logout */}

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.logoutCard}
          onPress={handleLogout}
        >
          <View style={styles.logoutLeft}>
            <View style={styles.logoutIcon}>
              <MaterialIcons
                name="logout"
                size={22}
                color={COLORS.error}
              />
            </View>

            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.version}>
          Nirvaya Version 2.4.1
        </Text>
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
    height: 60,
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
    letterSpacing: 0.5,
  },

  profileCard: {
    marginHorizontal: 20,
    marginTop: 15,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    alignItems: "center",
    paddingBottom: 25,
    overflow: "hidden",
    elevation: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  profileBackground: {
    height: 90,
    width: "100%",
    backgroundColor: COLORS.secondary,
    position: "absolute",
    top: 0,
  },

  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 40,
    borderWidth: 4,
    borderColor: COLORS.white,
  },

  name: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
  },

  email: {
    marginTop: 5,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
  },

  editText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 14,
  },

  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.secondary,
    marginBottom: 10,
    letterSpacing: 1,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconCircle: {
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  rowTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
  },

  rowSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 5,
  },

  logoutCard: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  logoutLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoutIcon: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: COLORS.errorContainer,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.error,
  },

  version: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
});