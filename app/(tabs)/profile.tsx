import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {
  Alert,
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useAuth } from "../../Context/AuthContext";
import { useTheme } from "../../Context/ThemeContext";
import { getSafeImageSource } from "../../utils/imageSource";

type ProfileRowProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  iconBackground: string;
  iconColor: string;
  title: string;
  subtitle: string;
  titleColor: string;
  subtitleColor: string;
  chevronColor: string;
  onPress?: () => void;
  rightElement?: ReactNode;
};

function ProfileRow({
  icon,
  iconBackground,
  iconColor,
  title,
  subtitle,
  titleColor,
  subtitleColor,
  chevronColor,
  onPress,
  rightElement,
}: ProfileRowProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.row}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.rowLeft}>
        <View style={[styles.iconCircle, { backgroundColor: iconBackground }]}>
          <MaterialIcons name={icon} size={22} color={iconColor} />
        </View>

        <View style={styles.rowTextWrap}>
          <Text style={[styles.rowTitle, { color: titleColor }]}>{title}</Text>
          <Text style={[styles.rowSubtitle, { color: subtitleColor }]}>
            {subtitle}
          </Text>
        </View>
      </View>

      {rightElement ?? (
        <MaterialIcons name="chevron-right" size={24} color={chevronColor} />
      )}
    </TouchableOpacity>
  );
}

export default function Profile() {
  const { user, logout, refreshProfile } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        await refreshProfile();
      } catch (error) {
        console.log("Profile loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [refreshProfile]);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            router.replace("/(auth)/login");
          } catch (error) {
            console.log("Logout error:", error);
          }
        },
      },
    ]);
  };

  const profilePicture = getSafeImageSource(user?.profilePicture);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#07111F" : "#F5F7FB" },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View
          style={[
            styles.headerCard,
            { backgroundColor: isDark ? "#0C1727" : "#FFFFFF" },
          ]}
        >
          <View style={styles.headerTop}>
            <View>
              <Text
                style={[
                  styles.headerEyebrow,
                  { color: isDark ? "#7DD3A7" : "#006A61" },
                ]}
              >
                Account
              </Text>
              <Text
                style={[
                  styles.headerTitle,
                  { color: isDark ? "#F8FAFC" : "#0F172A" },
                ]}
              >
                Profile
              </Text>
            </View>

            <View
              style={[
                styles.brandBadge,
                { backgroundColor: isDark ? "#123326" : "#EAF8F2" },
              ]}
            >
              <Feather name="shield" size={16} color="#0F9D58" />
              <Text style={styles.brandText}>Nirvaya</Text>
            </View>
          </View>

          <View
            style={[
              styles.profileCard,
              { backgroundColor: isDark ? "#101C2E" : "#F8FAFC" },
            ]}
          >
            <View style={styles.avatarRing}>
              <Image source={profilePicture} style={styles.avatar} />
            </View>

            <Text style={[styles.name, { color: isDark ? "#F8FAFC" : "#0F172A" }]}>
              {user?.name ?? "User"}
            </Text>
            <Text
              style={[
                styles.email,
                { color: isDark ? "#CBD5E1" : "#64748B" },
              ]}
            >
              {user?.email ?? "No email available"}
            </Text>

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.editButton}
              onPress={() => router.push("/edit-profile")}
            >
              <MaterialIcons name="edit" size={18} color="#FFFFFF" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color="#006A61" />
              <Text style={styles.loadingText}>Refreshing profile...</Text>
            </View>
          ) : null}
        </View>

        <View
          style={[
            styles.sectionCard,
            { backgroundColor: isDark ? "#0C1727" : "#FFFFFF" },
          ]}
        >
          <Text
            style={[
              styles.sectionLabel,
              { color: isDark ? "#7DD3A7" : "#006A61" },
            ]}
          >
            Settings
          </Text>

          <ProfileRow
            icon="health-and-safety"
            iconBackground={isDark ? "#163525" : "#EAF8F2"}
            iconColor="#0F9D58"
            title="Emergency Preferences"
            subtitle="Countdown timer and SOS notifications"
            titleColor={isDark ? "#F8FAFC" : "#0F172A"}
            subtitleColor={isDark ? "#94A3B8" : "#64748B"}
            chevronColor={isDark ? "#94A3B8" : "#98A2B3"}
            onPress={() => router.push("/emergency-preferences")}
          />

          <ProfileRow
            icon="my-location"
            iconBackground={isDark ? "#18283A" : "#E8F1FF"}
            iconColor="#2563EB"
            title="Permissions"
            subtitle="Location, alerts, and device access"
            titleColor={isDark ? "#F8FAFC" : "#0F172A"}
            subtitleColor={isDark ? "#94A3B8" : "#64748B"}
            chevronColor={isDark ? "#94A3B8" : "#98A2B3"}
            onPress={() => router.push("/permissions")}
          />

          <ProfileRow
            icon="moon"
            iconBackground={isDark ? "#22263A" : "#EEF2FF"}
            iconColor={isDark ? "#A5B4FC" : "#1E3A8A"}
            title="Dark Mode"
            subtitle="Switch between light and dark theme"
            titleColor={isDark ? "#F8FAFC" : "#0F172A"}
            subtitleColor={isDark ? "#94A3B8" : "#64748B"}
            chevronColor={isDark ? "#94A3B8" : "#98A2B3"}
            rightElement={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: "#C7D2FE", true: "#0F9D58" }}
                thumbColor="#FFFFFF"
              />
            }
          />

          <ProfileRow
            icon="menu-book"
            iconBackground={isDark ? "#2A2340" : "#F3E8FF"}
            iconColor="#7C3AED"
            title="How to Use"
            subtitle="Simple guide for SOS, contacts, and history"
            titleColor={isDark ? "#F8FAFC" : "#0F172A"}
            subtitleColor={isDark ? "#94A3B8" : "#64748B"}
            chevronColor={isDark ? "#94A3B8" : "#98A2B3"}
            onPress={() => router.push("/how-to-use")}
          />

          <ProfileRow
            icon="info-outline"
            iconBackground={isDark ? "#29303E" : "#E2E8F0"}
            iconColor="#475569"
            title="About Nirvaya"
            subtitle="Meaning, mission, and app features"
            titleColor={isDark ? "#F8FAFC" : "#0F172A"}
            subtitleColor={isDark ? "#94A3B8" : "#64748B"}
            chevronColor={isDark ? "#94A3B8" : "#98A2B3"}
            onPress={() => router.push("/about-nirvaya")}
          />

          <ProfileRow
            icon="logout"
            iconBackground={isDark ? "#3A1B1B" : "#FFF1F2"}
            iconColor="#B91C1C"
            title="Logout"
            subtitle="Sign out of your account safely"
            titleColor={isDark ? "#F8FAFC" : "#0F172A"}
            subtitleColor={isDark ? "#94A3B8" : "#64748B"}
            chevronColor={isDark ? "#94A3B8" : "#98A2B3"}
            onPress={handleLogout}
          />
        </View>
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
    paddingTop: 10,
    paddingBottom: 28,
  },
  headerCard: {
    borderRadius: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerEyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  headerTitle: {
    marginTop: 4,
    fontSize: 28,
    fontWeight: "800",
  },
  brandBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  brandText: {
    color: "#0F9D58",
    fontSize: 12,
    fontWeight: "700",
  },
  profileCard: {
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: "center",
  },
  avatarRing: {
    padding: 4,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  name: {
    marginTop: 14,
    fontSize: 24,
    fontWeight: "800",
  },
  email: {
    marginTop: 6,
    fontSize: 14,
  },
  editButton: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#006A61",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  loadingRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  loadingText: {
    fontSize: 13,
    color: "#64748B",
  },
  sectionCard: {
    marginTop: 16,
    borderRadius: 24,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  sectionLabel: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 4,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
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
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  rowTextWrap: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  rowSubtitle: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 18,
    color: "#64748B",
  },
});
