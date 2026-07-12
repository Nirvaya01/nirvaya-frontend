import { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../Context/Authcontext";
import { Button, Input, Typography } from "../../components";
import theme from "../../theme";

export default function Login() {
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Typography variant="headlineLg" style={styles.title}>Welcome back</Typography>
      <Typography variant="bodyMd" style={styles.subtitle}>Log in to continue to your Trusted Circle.</Typography>

      <View style={styles.form}>
        <Input value={email} onChangeText={setEmail} placeholder="Email" style={styles.input} />
        <Input value={password} onChangeText={setPassword} placeholder="Password" style={styles.input} />
        <Button variant="primary" onPress={handleLogin} style={styles.button}>Continue</Button>
        <Button variant="ghost" onPress={() => router.push("/(auth)/signup")} style={styles.button}>Create an account</Button>
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