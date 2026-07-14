import React from "react";
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ContactsProvider } from "../context/ContactsContext";
function RootNavigation() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ContactsProvider>
        <RootNavigation />
      </ContactsProvider>
    </AuthProvider>
  );
}