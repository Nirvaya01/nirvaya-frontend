import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ContactsProvider } from '../contexts/ContactsContext';

export default function RootLayout() {
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
  
    })();
  }, []);

  return (
    <ContactsProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="add-contact" options={{ headerShown: false }} />
        <Stack.Screen name="sos-confirmation" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="alert-status" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ContactsProvider>
  );
}