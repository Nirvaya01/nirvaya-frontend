import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type Contact = {
  id: string;
  name: string;
  relation: string;
  phone: string;
  trusted: boolean;
  initial: string;
};

type ContactCardProps = {
  item: Contact;
  onPress: () => void;
};

export default function ContactCard({ item, onPress }: ContactCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.initial}</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{item.name}</Text>
          {item.trusted && (
            <View style={styles.badge}>
              <MaterialIcons name="verified" size={12} color="#0f5132" />
              <Text style={styles.badgeText}>Trusted</Text>
            </View>
          )}
        </View>
        <Text style={styles.subtitle}>{item.relation} . {item.phone}</Text>
      </View>
      <TouchableOpacity style={styles.callButton}>
        <Ionicons name="call" size={20} color="#0f5132" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dde3f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: { fontWeight: '700', color: '#1a1a2e', fontSize: 16 },
  info: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { fontWeight: '700', fontSize: 16, color: '#1a1a2e' },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#d1f5e0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: { fontSize: 11, color: '#0f5132', fontWeight: '600' },
  subtitle: { color: '#6b7280', marginTop: 2, fontSize: 13 },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8ecf7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
