import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AlertCard, { AlertEntry } from '../../components/history/AlertCard';
import AppHeader from '../../components/ui/AppHeader';

const ALERT_HISTORY: AlertEntry[] = [
  {
    id: '1',
    type: 'sos',
    title: 'SOS Alert',
    date: 'Oct 12, 2023',
    detail: '14:32 · Central Park, Near Boathouse',
    status: 'Sent Successfully',
  },
  {
    id: '2',
    type: 'location',
    title: 'Location Shared',
    date: 'Sep 28, 2023',
    detail: '21:15 · 5th Ave & 42nd St',
    status: 'Sent Successfully',
  },
  {
    id: '3',
    type: 'sos',
    title: 'SOS Alert',
    date: 'Aug 05, 2023',
    detail: '02:40 · Subway Station G Line',
    status: 'Sent Successfully',
  },
];

export default function History() {
  return (
    <View style={styles.container}>
      <AppHeader />

      <View style={styles.titleBlock}>
        <Text style={styles.title}>Alert History</Text>
      </View>

      <FlatList
        data={ALERT_HISTORY}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AlertCard item={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9ff' },
  titleBlock: { paddingHorizontal: 16, marginTop: 8, marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '800', color: '#0d1c2f' },
});