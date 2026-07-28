import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../api/authApi";

import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { router } from "expo-router";

import { useAuth } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";

import { updateProfile } from "../api/profileApi";
import { getSafeImageSource } from "../utils/imageSource";

const COLORS = {
  primary: "#091426",
  secondary: "#006A61",
  background: "#F8F9FF",
  white: "#FFFFFF",
  textSecondary: "#45474C",
  border: "#C5C6CD",
  error: "#BA1A1A",
};

export default function EditProfile() {
  const { user, token, refreshProfile } = useAuth();
  const { isDark } = useTheme();

  const [name, setName] = useState((user as any)?.name || "");

  const [phone, setPhone] = useState((user as any)?.phone || "");

  const [gender, setGender] = useState((user as any)?.gender || "");

  const [dob, setDob] = useState((user as any)?.dob?.split("T")[0] || "");

  const [profilePicture, setProfilePicture] = useState(
    (user as any)?.profilePicture || "",
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName((user as any).name || "");
      setPhone((user as any).phone || "");
      setGender((user as any).gender || "");
      setDob((user as any).dob?.split("T")[0] || "");
      setProfilePicture((user as any).profilePicture || "");
    }
  }, [user]);

  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission required", "Please allow gallery access");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) {
        return;
      }

      const image = result.assets[0];

      await uploadProfileImage(image.uri);
    } catch (error) {
      console.log("Pick image error:", error);
      Alert.alert("Error", "Could not select image");
    }
  };

  const uploadProfileImage = async (uri: string) => {
    if (!token) {
      Alert.alert("Error", "Token missing");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("image", {
        uri,
        name: "profile.jpg",
        type: "image/jpeg",
      } as any);

      const response = await fetch(`${API_BASE_URL}/profile/picture`, {
        method: "PATCH",

        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Upload error:", data);
        throw new Error(data.message || "Upload failed");
      }

      setProfilePicture(data.profilePicture);

      await refreshProfile();

      Alert.alert("Success", "Profile picture updated");
    } catch (error) {
      console.log("Image upload error:", error);

      Alert.alert("Error", "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!token) {
      Alert.alert("Error", "Authentication token missing");
      return;
    }

    try {
      setLoading(true);

      await updateProfile(token, {
        name,
        phone,
        gender: gender.toLowerCase(),
        dob,
        profilePicture: profilePicture || undefined,
      });

      // update AuthContext data
      await refreshProfile();

      Alert.alert("Success", "Profile updated successfully");

      router.back();
    } catch (error) {
      console.log("Update profile error:", error);

      Alert.alert("Error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#07111F" : COLORS.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={26}
              color={isDark ? "#F8FAFC" : COLORS.primary}
            />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { color: isDark ? "#F8FAFC" : COLORS.primary }]}>Edit Profile</Text>

          <View style={{ width: 26 }} />
        </View>

        {/* PROFILE IMAGE */}

        <View style={styles.imageContainer}>
          <Image
            source={getSafeImageSource(profilePicture)}
            style={styles.avatar}
          />

          <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
            <Text style={styles.photoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* FORM CARD */}

        <View
          style={[
            styles.card,
            { backgroundColor: isDark ? "#0C1727" : COLORS.white },
          ]}
        >
          <Text style={[styles.label, { color: isDark ? "#F8FAFC" : COLORS.primary }]}>Name</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#132238" : "#FFFFFF",
                borderColor: isDark ? "#27415F" : COLORS.border,
                color: isDark ? "#F8FAFC" : COLORS.primary,
              },
            ]}
            placeholder="Enter your name"
            placeholderTextColor={isDark ? "#94A3B8" : COLORS.textSecondary}
          />

          <Text style={[styles.label, { color: isDark ? "#F8FAFC" : COLORS.primary }]}>Email</Text>

          <TextInput
            value={(user as any)?.email || ""}
            editable={false}
            style={[
              styles.input,
              styles.disabledInput,
              {
                backgroundColor: isDark ? "#0F1B2E" : "#EEEEEE",
                borderColor: isDark ? "#27415F" : COLORS.border,
                color: isDark ? "#CBD5E1" : "#777",
              },
            ]}
          />

          <Text style={[styles.label, { color: isDark ? "#F8FAFC" : COLORS.primary }]}>Phone</Text>

          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#132238" : "#FFFFFF",
                borderColor: isDark ? "#27415F" : COLORS.border,
                color: isDark ? "#F8FAFC" : COLORS.primary,
              },
            ]}
            placeholder="Enter phone number"
            placeholderTextColor={isDark ? "#94A3B8" : COLORS.textSecondary}
          />

          <Text style={[styles.label, { color: isDark ? "#F8FAFC" : COLORS.primary }]}>Gender</Text>

          <TextInput
            value={gender}
            onChangeText={(text) => setGender(text.toLowerCase())}
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#132238" : "#FFFFFF",
                borderColor: isDark ? "#27415F" : COLORS.border,
                color: isDark ? "#F8FAFC" : COLORS.primary,
              },
            ]}
            placeholder="male/female/other"
            placeholderTextColor={isDark ? "#94A3B8" : COLORS.textSecondary}
          />

          <Text style={[styles.label, { color: isDark ? "#F8FAFC" : COLORS.primary }]}>Date of Birth</Text>
          <TextInput
            value={dob}
            onChangeText={(text) => {
              const numbers = text.replace(/\D/g, "").slice(0, 8);

              let formatted = numbers;

              if (numbers.length > 4) {
                formatted = numbers.slice(0, 4) + "-" + numbers.slice(4);
              }

              if (numbers.length > 6) {
                formatted =
                  numbers.slice(0, 4) +
                  "-" +
                  numbers.slice(4, 6) +
                  "-" +
                  numbers.slice(6);
              }

              setDob(formatted);
            }}
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#132238" : "#FFFFFF",
                borderColor: isDark ? "#27415F" : COLORS.border,
                color: isDark ? "#F8FAFC" : COLORS.primary,
              },
            ]}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={isDark ? "#94A3B8" : COLORS.textSecondary}
            keyboardType="number-pad"
          />

          <Text style={[styles.label, { color: isDark ? "#F8FAFC" : COLORS.primary }]}>Profile Picture URL</Text>

          <TextInput
            value={profilePicture}
            onChangeText={setProfilePicture}
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#132238" : "#FFFFFF",
                borderColor: isDark ? "#27415F" : COLORS.border,
                color: isDark ? "#F8FAFC" : COLORS.primary,
              },
            ]}
            placeholder="Image URL"
            placeholderTextColor={isDark ? "#94A3B8" : COLORS.textSecondary}
          />
        </View>

        {/* SAVE BUTTON */}

        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: isDark ? "#0F9D58" : COLORS.primary },
            loading && {
              opacity: 0.6,
            },
          ]}
          disabled={loading}
          onPress={handleSave}
        >
          <Text style={styles.saveText}>
            {loading ? "Saving..." : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
  },

  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  photoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 15,
  },

  photoText: {
    color: "white",
    fontWeight: "700",
    marginLeft: 8,
  },

  card: {
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 20,
    elevation: 3,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 7,
    marginTop: 15,
  },

  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },

  disabledInput: {
  },

  saveButton: {
    marginHorizontal: 20,
    marginTop: 25,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },

  saveText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
  },
});
