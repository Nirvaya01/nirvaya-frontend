import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "./Context/Authcontext";
import { ContactsProvider } from '../contexts/ContactsContext';

function RootNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
       <ContactsProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="dashboard" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            <Stack.Screen name="add-contact" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ContactsProvider>
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