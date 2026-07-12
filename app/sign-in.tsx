import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (): void => {
    // TODO: hook up to your auth backend
    console.log('Logging in with', email, password);
    // On success, send them into the tab app:
    // router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>🛡️</Text>
        </View>

        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to stay protected with Nirvaya</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor="#B9A9C9"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#B9A9C9"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.forgotWrap}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.googleButton} activeOpacity={0.85}>
            <Text style={styles.googleG}>G</Text>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/sign-up')} style={styles.footerWrap}>
          <Text style={styles.footerText}>
            New here? <Text style={styles.footerLink}>Create an account</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.trustRow}>
          <Text style={styles.trustText}>🔒 Your data is encrypted and private</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const PRIMARY = '#7A1FA2';
const ACCENT = '#FF6F61';
const BG = '#FDF7FB';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 32, alignItems: 'center' },
  logoCircle: {
    width: 76, height: 76, borderRadius: 38, backgroundColor: PRIMARY,
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
    shadowColor: PRIMARY, shadowOpacity: 0.3, shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 }, elevation: 6,
  },
  logoEmoji: { fontSize: 32 },
  title: { fontSize: 26, fontWeight: '700', color: '#2E1836', textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#7A6A82', marginTop: 6, marginBottom: 28, textAlign: 'center', paddingHorizontal: 16 },
  card: {
    width: '100%', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 }, elevation: 2,
  },
  label: { fontSize: 13, fontWeight: '600', color: '#4A3B52', marginBottom: 6, marginTop: 12 },
  input: {
    width: '100%', borderWidth: 1.5, borderColor: '#EEDDF3', backgroundColor: '#FCF9FD',
    borderRadius: 14, paddingHorizontal: 16, paddingVertical: 13, fontSize: 15, color: '#2E1836',
  },
  forgotWrap: { alignSelf: 'flex-end', marginTop: 10, marginBottom: 8 },
  forgotText: { color: PRIMARY, fontSize: 13, fontWeight: '600' },
  primaryButton: {
    backgroundColor: ACCENT, borderRadius: 14, paddingVertical: 15, alignItems: 'center', marginTop: 16,
    shadowColor: ACCENT, shadowOpacity: 0.35, shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 }, elevation: 4,
  },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  divider: { flexDirection: 'row', alignItems: 'center', width: '100%', marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: '#EEDDF3' },
  orText: { marginHorizontal: 12, color: '#B9A9C9', fontSize: 13 },
  googleButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: '#EEDDF3', borderRadius: 14, paddingVertical: 13, width: '100%',
  },
  googleG: { fontSize: 16, fontWeight: '700', color: PRIMARY, marginRight: 10 },
  googleButtonText: { color: '#4A3B52', fontSize: 14, fontWeight: '600' },
  footerWrap: { marginTop: 24 },
  footerText: { color: '#7A6A82', fontSize: 14 },
  footerLink: { color: PRIMARY, fontWeight: '700' },
  trustRow: { marginTop: 28, alignItems: 'center' },
  trustText: { color: '#9A8AA2', fontSize: 12 },
});