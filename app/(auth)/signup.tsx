import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link, router } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function SignupScreen() {
  const {login}= useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
  console.log("BUTTON PRESSED");
  login();

  setTimeout(() => {
    router.replace("/(tabs)");
  }, 100);
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
  style={[
    styles.button,
    {
      opacity:
        name.trim() && email.trim() && password.trim()
          ? 1
          : 0.5,
    },
  ]}
  disabled={
    !name.trim() ||
    !email.trim() ||
    !password.trim()
  }
  onPress={handleSignup}
>
  <Text style={styles.buttonText}>Continue</Text>
</TouchableOpacity>
      <Link href="/(auth)/login" style={styles.link}>
        Already have an account? Login
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  link: {
    marginTop: 25,
    textAlign: "center",
    color: "#2563eb",
    fontWeight: "600",
  },
});