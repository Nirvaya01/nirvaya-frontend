import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ContactsProvider } from '../contexts/ContactsContext';

export default function RootLayout() {
  return (
    <ContactsProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="add-contact" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ContactsProvider>
  );
}