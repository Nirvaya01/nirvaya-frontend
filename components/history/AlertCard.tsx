import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type AlertEntry = {
  id: string;
  type: 'sos' | 'location';
  title: string;
  date: string;
  detail: string;
  status: string;
};

type AlertCardProps = {
  item: AlertEntry;
};

export default function AlertCard({ item }: AlertCardProps) {
  const isSos = item.type === 'sos';

  return (
    <View style={styles.card}>
      <View style={[styles.avatar, isSos ? styles.avatarSos : styles.avatarLoc]}>
        <Ionicons
          name={isSos ? 'megaphone' : 'location'}
          size={22}
          color={isSos ? '#e15347' : '#0f6e4f'}
        />
      </View>
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text style={styles.detail}>{item.detail}</Text>
        <View style={styles.statusPill}>
          <Ionicons name="checkmark-circle" size={15} color="#16233d" />
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarSos: { backgroundColor: '#fbdfdc' },
  avatarLoc: { backgroundColor: '#dce9f8' },
  info: { flex: 1 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  title: { fontWeight: '800', fontSize: 17, color: '#1a1a2e' },
  date: { fontSize: 12, color: '#6b7280', fontWeight: '600', paddingTop: 2 },
  detail: { color: '#6b7280', marginTop: 4, fontSize: 13.5, fontWeight: '500' },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#dce3f7',
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 10,
  },
  statusText: { fontSize: 12, color: '#16233d', fontWeight: '700' },
});