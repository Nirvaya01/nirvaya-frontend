import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "./Context/Authcontext";

function RootNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <>
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen name="(auth)/signup" />
        </>
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}