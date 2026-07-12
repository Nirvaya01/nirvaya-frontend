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
      <View style={styles.left}>
        <View style={[styles.avatar, item.trusted ? styles.avatarTrusted : styles.avatarDefault]}>
          <Text style={[styles.avatarText, item.trusted ? styles.avatarTextTrusted : styles.avatarTextDefault]}>
            {item.initial}
          </Text>
        </View>
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{item.name}</Text>
            {item.trusted && (
              <View style={styles.badge}>
                <MaterialIcons name="verified" size={14} color="#006f66" />
                <Text style={styles.badgeText}>Trusted</Text>
              </View>
            )}
          </View>
          <Text style={styles.subtitle}>{item.relation} • {item.phone}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.callButton}>
        <Ionicons name="call" size={18} color="#006a61" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: 'rgba(30,41,59,1)',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarTrusted: { backgroundColor: '#d8e3fb' },
  avatarDefault: { backgroundColor: '#dde9ff' },
  avatarText: { fontWeight: '600', fontSize: 20 },
  avatarTextTrusted: { color: '#111c2d' },
  avatarTextDefault: { color: '#45474c' },
  info: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  name: { fontWeight: '600', fontSize: 18, color: '#0d1c2f' },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#86f2e4',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: { fontSize: 12, color: '#006f66', fontWeight: '500' },
  subtitle: { color: '#45474c', marginTop: 2, fontSize: 14 },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e6eeff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});