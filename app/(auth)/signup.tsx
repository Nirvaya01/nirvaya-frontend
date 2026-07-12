import { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../Context/Authcontext";
import { Button, Input, Typography } from "../../components";
import theme from "../../theme";

export default function Signup() {
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    setIsAuthenticated(true);
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Typography variant="headlineLg" style={styles.title}>Create your account</Typography>
      <Typography variant="bodyMd" style={styles.subtitle}>Join Nirvaya and set up your Trusted Circle.</Typography>

      <View style={styles.form}>
        <Input value={name} onChangeText={setName} placeholder="Full name" style={styles.input} />
        <Input value={email} onChangeText={setEmail} placeholder="Email" style={styles.input} />
        <Input value={password} onChangeText={setPassword} placeholder="Password" style={styles.input} />
        <Button variant="primary" onPress={handleSignup} style={styles.button}>Create Account</Button>
        <Button variant="ghost" onPress={() => router.push("/(auth)/login")} style={styles.button}>Already have an account? Log in</Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.default, paddingHorizontal: theme.spacing.marginMobile, justifyContent: "center" },
  title: { marginBottom: theme.spacing.xs },
  subtitle: { color: theme.colors.text.secondary, marginBottom: theme.spacing.xl },
  form: { gap: theme.spacing.md },
  input: { marginBottom: theme.spacing.sm },
  button: { marginTop: theme.spacing.xs },
});