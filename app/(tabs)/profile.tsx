import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  getProfile,
  loginAndGetToken,
  updateProfile,
  UserProfile,
} from "../api/profileApi";

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

// TODO: replace with a real login screen later.
const DEV_EMAIL = "sarah2@example.com";
const DEV_PASSWORD = "test1234";

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
        <View style={[styles.iconCircle, { backgroundColor: iconBackground }]}>
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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  async function loadProfile() {
    try {
      setLoading(true);
      setError(null);
      await loginAndGetToken(DEV_EMAIL, DEV_PASSWORD);
      const data = await getProfile();
      setProfile(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  function openEdit() {
    if (!profile) return;
    setFormName(profile.fullName);
    setFormPhone(profile.phone || "");
    setFormError(null);
    setEditing(true);
  }

  function validateForm(): string | null {
    if (formName.trim().length < 2) {
      return "Name must be at least 2 characters.";
    }
    if (formPhone && !/^\+?[0-9]{7,15}$/.test(formPhone.trim())) {
      return "Enter a valid phone number.";
    }
    return null;
  }

  async function handleSave() {
    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }
    try {
      setSaving(true);
      setFormError(null);
      const updated = await updateProfile({
        fullName: formName.trim(),
        phone: formPhone.trim() || undefined,
      });
      setProfile(updated);
      setEditing(false);
    } catch (err: any) {
      setFormError(err.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadProfile}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.topBar}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.logo}>Nirvaya</Text>
          <TouchableOpacity>
            <Feather name="settings" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileBackground} />

          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitial}>
              {profile?.fullName?.charAt(0).toUpperCase() || "?"}
            </Text>
          </View>

          <Text style={styles.name}>{profile?.fullName}</Text>
          <Text style={styles.email}>{profile?.email}</Text>
          {profile?.phone ? (
            <Text style={styles.phone}>{profile.phone}</Text>
          ) : null}

          <TouchableOpacity style={styles.editButton} onPress={openEdit}>
            <MaterialIcons name="edit" color="white" size={18} />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

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

        <View style={styles.card}>
          <SettingsRow
            title="Security"
            subtitle="Password, PIN & Two-Factor Authentication"
            icon="lock"
            iconBackground="#D5E3FD"
            iconColor={COLORS.primary}
          />
        </View>

        <TouchableOpacity activeOpacity={0.9} style={styles.logoutCard}>
          <View style={styles.logoutLeft}>
            <View style={styles.logoutIcon}>
              <MaterialIcons name="logout" size={22} color={COLORS.error} />
            </View>
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.version}>Nirvaya Version 2.4.1</Text>
      </ScrollView>

      <Modal visible={editing} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={formName}
              onChangeText={setFormName}
              placeholder="Full name"
            />

            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              style={styles.input}
              value={formPhone}
              onChangeText={setFormPhone}
              placeholder="+91XXXXXXXXXX"
              keyboardType="phone-pad"
            />

            {formError ? (
              <Text style={styles.formErrorText}>{formError}</Text>
            ) : null}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditing(false)}
                disabled={saving}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.saveText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { justifyContent: "center", alignItems: "center", paddingHorizontal: 24 },
  loadingText: { marginTop: 12, color: COLORS.textSecondary, fontSize: 16 },
  errorText: { color: COLORS.error, fontSize: 16, textAlign: "center", marginBottom: 16 },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryText: { color: COLORS.white, fontWeight: "700" },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  logo: { fontSize: 22, fontWeight: "700", color: COLORS.primary },

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
  profileBackground: { width: "100%", height: 90, backgroundColor: COLORS.surfaceVariant },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -50,
    borderWidth: 4,
    borderColor: COLORS.white,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: { color: COLORS.white, fontSize: 36, fontWeight: "700" },

  name: { marginTop: 15, fontSize: 26, fontWeight: "700", color: COLORS.primary },
  email: { marginTop: 6, color: COLORS.textSecondary, fontSize: 16 },
  phone: { marginTop: 2, color: COLORS.textSecondary, fontSize: 14 },

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
  editText: { color: COLORS.white, fontWeight: "700", marginLeft: 8, fontSize: 16 },

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
  rowLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  rowTitle: { fontSize: 18, fontWeight: "600", color: COLORS.primary },
  rowSubtitle: { marginTop: 4, color: COLORS.textSecondary, fontSize: 14 },
  divider: { height: 1, backgroundColor: COLORS.border, marginLeft: 80 },

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
  logoutLeft: { flexDirection: "row", alignItems: "center" },
  logoutIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFF3F2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  logoutText: { color: COLORS.error, fontSize: 20, fontWeight: "700" },

  version: {
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
    color: COLORS.textSecondary,
    opacity: 0.6,
    fontSize: 13,
  },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  modalCard: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalTitle: { fontSize: 20, fontWeight: "700", color: COLORS.primary, marginBottom: 16 },
  inputLabel: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.primary,
  },
  formErrorText: { color: COLORS.error, marginTop: 12, fontSize: 14 },
  modalActions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 24 },
  cancelButton: { paddingHorizontal: 20, paddingVertical: 12, marginRight: 8 },
  cancelText: { color: COLORS.textSecondary, fontWeight: "600" },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 10,
    minWidth: 90,
    alignItems: "center",
  },
  saveText: { color: COLORS.white, fontWeight: "700" },
});