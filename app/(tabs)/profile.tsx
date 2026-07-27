import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../Context/ThemeContext";
import { getProfile } from "../../utils/profileStorage";

import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

// Try to import useAuth from the project's AuthContext. If the module
// doesn't exist (e.g. different path or not yet created), fall back to a
// no-op implementation to avoid build-time import errors.
let useAuth: () => { logout: () => Promise<void> };
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require("../../Context/AuthContext");
  useAuth = mod.useAuth || (() => ({ logout: async () => {} }));
} catch (err) {
  useAuth = () => ({ logout: async () => {} });
}

const { width } = Dimensions.get("window");


interface RowProps {
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  iconBackground: string;
  iconColor: string;
  onPress?: () => void;
  styles: any;
}

const SettingsRow = ({
  title,
  subtitle,
  icon,
  iconBackground,
  iconColor,
  onPress,
  styles
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
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  console.log("Dark Mode:", isDark);
  
  const COLORS = {
  primary: isDark ? "#FFFFFF" : "#091426",
  secondary: isDark ? "#86F2E4" : "#006A61",
  background: isDark ? "#121212" : "#F8F9FF",
  white: isDark ? "#1E1E1E" : "#FFFFFF",
  error: "#BA1A1A",
  errorContainer: "#FFDAD6",
  textSecondary: isDark ? "#AAAAAA" : "#45474C",
  border: isDark ? "#333333" : "#C5C6CD",
  surfaceVariant: isDark ? "#333333" : "#D5E3FD",
  safeZone: "#86F2E4",
  shadow: "rgba(30,41,59,0.08)",
};
const styles = createStyles(COLORS);
  const [profile, setProfile] = useState({
  name: "Sarah Jenkins",
  email: "sarah@example.com",
  phone: "",
  address: "",
  avatar: "",
});



useFocusEffect(
  useCallback(() => {
    const loadProfile = async () => {
      const data = await getProfile();

      if (data) {
        setProfile({
          name: data.name || "Sarah Jenkins",
          email: data.email || "sarah@example.com",
          phone: data.phone || "",
          address: data.address || "",
         avatar: data.image ?? "",
        });
      }
    };

    loadProfile();
  }, [])
);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      router.replace("/(auth)/login");
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: COLORS.background}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        {/* Top App Bar */}

        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
          </TouchableOpacity>

          <Text style={styles.logo}>Nirvaya</Text>

          <TouchableOpacity
  style={styles.iconButton}
  onPress={() => router.push("/settings")}
>
  <Feather
    name="settings"
    size={19}
    color={COLORS.primary}
  />
</TouchableOpacity>
        </View>

        {/* Profile Card */}

        <View style={styles.profileCard}>
          <View style={styles.profileBackground} />

          <Image
  source={{
    uri:
      profile.avatar ||
      "https://i.pravatar.cc/300",
  }}
  style={styles.avatar}
/>

         <Text style={styles.name}>
  {profile.name || "Your Name"}
</Text>

          <Text style={styles.email}>
  {profile.email || "your@email.com"}
</Text>

          <TouchableOpacity
  style={styles.editButton}
  onPress={() => router.push("/edit-profile")}
>
            <MaterialIcons name="edit" color="white" size={18} />

            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Safety Core Card */}
        <View style={[styles.card, {backgroundColor: COLORS.white}]}>

          <Text style={styles.sectionTitle}>SAFETY CORE</Text>

          <SettingsRow
            title="Emergency Preferences"
            subtitle="Notifications, Countdown"
            icon="health-and-safety"
            iconBackground="#FFDAD6"
            iconColor="#BA1A1A"
            styles={styles}
          />

          <View style={styles.divider} />

          <SettingsRow
            title="Permissions"
            subtitle="Location & Alerts"
            icon="my-location"
            iconBackground="#86F2E4"
            iconColor="#006A61"
            styles={styles}
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
            styles={styles}
          />
        </View>
        {/* Appearance Card */}

<View style={styles.card}>

  <View style={styles.row}>

    <View style={styles.rowLeft}>

      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: "#D5E3FD",
          },
        ]}
      >
        <Ionicons
          name="moon"
          size={22}
          color={COLORS.primary}
        />
      </View>

      <View>
        <Text style={styles.rowTitle}>
          Dark Mode
        </Text>

        <Text style={styles.rowSubtitle}>
          Switch between dark and bright mode
        </Text>
      </View>

    </View>


    <Switch
  value={isDark}
  onValueChange={toggleTheme}
  trackColor={{
    false: "#767577",
    true: COLORS.secondary,
  }}
  thumbColor={isDark ? "#FFFFFF" : "#f4f3f4"}
/>

  </View>

</View>

        {/* Logout Card */}

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.logoutCard}
          onPress={handleLogout}
        >
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

const createStyles = (COLORS: any) =>
  StyleSheet.create({
  container: {
    flex: 1,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 14,
   backgroundColor: COLORS.surfaceVariant,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF1F6",
    alignItems: "center",
    justifyContent: "center",
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
  backgroundColor: COLORS.secondary,
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
