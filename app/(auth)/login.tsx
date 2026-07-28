import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "../../Context/AuthContext";
import { useTheme } from "../../Context/ThemeContext";

const COLORS = {
  primary: "#0F5D50",
  title: "#0F1B2E",
  subtitle: "#5B6472",
  inputBg: "#F1F3F6",
  placeholder: "#9AA3AF",
  white: "#FFFFFF",
};

export default function Login() {
  const { login } = useAuth();
  const { isDark } = useTheme();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter both email and password.");

      return;
    }

    setLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
        console.log("Login successful");

        // No navigation here
        // AuthContext updates isLoggedIn
        // _layout.tsx handles redirect
      } else {
        Alert.alert("Login Failed", "Invalid email or password.");
      }
    } catch (error) {
      console.log(error);

      Alert.alert("Login Failed", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: isDark ? "#07111F" : "#FFFFFF" },
      ]}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? "#F8FAFC" : COLORS.title}
          />
        </TouchableOpacity>

        <Text style={[styles.logo, { color: isDark ? "#F8FAFC" : COLORS.title }]}>Nirvaya</Text>

        <Text style={[styles.title, { color: isDark ? "#F8FAFC" : COLORS.title }]}>Welcome Back</Text>

        <Text style={[styles.subtitle, { color: isDark ? "#CBD5E1" : COLORS.subtitle }]}>Log in to continue to Nirvaya.</Text>

        <Text style={[styles.label, { color: isDark ? "#F8FAFC" : COLORS.title }]}>Email Address</Text>

        <View style={[styles.inputWrapper, { backgroundColor: isDark ? "#132238" : COLORS.inputBg }]}>
          <Ionicons
            name="mail-outline"
            size={20}
            color={isDark ? "#94A3B8" : COLORS.placeholder}
            style={styles.icon}
          />

          <TextInput
            style={styles.input}
            placeholder="john@example.com"
            placeholderTextColor={isDark ? "#94A3B8" : COLORS.placeholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text style={[styles.label, { color: isDark ? "#F8FAFC" : COLORS.title }]}>Password</Text>

        <View style={[styles.inputWrapper, { backgroundColor: isDark ? "#132238" : COLORS.inputBg }]}>
  <Ionicons
    name="lock-closed-outline"
    size={20}
    color={isDark ? "#94A3B8" : COLORS.placeholder}
    style={styles.icon}
  />

  <TextInput
    style={styles.input}
    placeholder="••••••••"
    placeholderTextColor={isDark ? "#94A3B8" : COLORS.placeholder}
    value={password}
    onChangeText={setPassword}
    secureTextEntry={!showPassword}
  />

  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    <Ionicons
      name={showPassword ? "eye-off-outline" : "eye-outline"}
      size={20}
      color={isDark ? "#94A3B8" : COLORS.placeholder}
    />
  </TouchableOpacity>
</View>

        <View style={styles.secureRow}>
          <Ionicons
            name="shield-checkmark-outline"
            size={16}
            color={isDark ? "#7DD3A7" : COLORS.primary}
          />

          <Text style={[styles.secureText, { color: isDark ? "#CBD5E1" : COLORS.subtitle }]}>
            Your data is secure and private.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDark ? "#0F9D58" : COLORS.primary }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text style={[styles.link, { color: isDark ? "#CBD5E1" : COLORS.subtitle }]}>
            Don&apos;t have an account?{" "}
            <Text style={[styles.linkBold, { color: isDark ? "#7DD3A7" : COLORS.primary }]}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },

  backButton: {
    paddingVertical: 12,
  },

  logo: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 48,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 32,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 20,
    height: 54,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  secureRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  secureText: {
    fontSize: 13,
    marginLeft: 6,
  },

  button: {
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
  },

  link: {
    textAlign: "center",
    fontSize: 14,
  },

  linkBold: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});
