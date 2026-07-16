import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../Context/AuthContext';

const COLORS = {
  primary: '#0F5D50',
  title: '#0F1B2E',
  subtitle: '#5B6472',
  inputBg: '#F1F3F6',
  placeholder: '#9AA3AF',
  white: '#FFFFFF',
};

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      // Replace this with your Express API later
      const token = 'mock-token-' + Date.now();

      await login(token);

      console.log('Login successful');

      // DO NOT navigate here.
      // app/_layout.tsx will automatically redirect
      // when isLoggedIn becomes true.
    } catch (error) {
      console.log(error);
      Alert.alert('Login Failed', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={COLORS.title}
          />
        </TouchableOpacity>

        <Text style={styles.logo}>Nirvaya</Text>

        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>
          Log in to continue to Nirvaya.
        </Text>

        <Text style={styles.label}>Email Address</Text>

        <View style={styles.inputWrapper}>
          <Ionicons
            name="mail-outline"
            size={20}
            color={COLORS.placeholder}
            style={styles.icon}
          />

          <TextInput
            style={styles.input}
            placeholder="john@example.com"
            placeholderTextColor={COLORS.placeholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>Password</Text>

        <View style={styles.inputWrapper}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color={COLORS.placeholder}
            style={styles.icon}
          />

          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={COLORS.placeholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.secureRow}>
          <Ionicons
            name="shield-checkmark-outline"
            size={16}
            color={COLORS.primary}
          />

          <Text style={styles.secureText}>
            Your data is secure and private.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>
              Login
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/(auth)/signup')}
        >
          <Text style={styles.link}>
            Don't have an account?{' '}
            <Text style={styles.linkBold}>
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    fontWeight: '800',
    color: COLORS.title,
    textAlign: 'center',
    marginBottom: 48,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.title,
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: COLORS.subtitle,
    textAlign: 'center',
    marginBottom: 32,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.title,
    marginBottom: 8,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
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
    color: COLORS.title,
  },

  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },

  secureText: {
    fontSize: 13,
    color: COLORS.subtitle,
    marginLeft: 6,
  },

  button: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
  },

  link: {
    color: COLORS.subtitle,
    textAlign: 'center',
    fontSize: 14,
  },

  linkBold: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});