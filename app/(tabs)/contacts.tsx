import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const CONTACTS = [
  { id: '1', name: 'Michael Chen', relation: 'Brother', phone: '+1 (555) 019-2834', trusted: true },
  { id: '2', name: 'Sarah Jenkins', relation: 'Mother', phone: '+1 (555) 837-9921', trusted: true },
  { id: '3', name: 'David Ross', relation: 'Roommate', phone: '+1 (555) 342-1188', trusted: false },
];

export default function Contacts() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trusted Circle</Text>
      <Text style={styles.subtitle}>Your emergency contacts</Text>

      <FlatList
        data={CONTACTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.contactRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{item.name}</Text>
                {item.trusted && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Trusted</Text>
                  </View>
                )}
              </View>
              <Text style={styles.meta}>{item.relation} • {item.phone}</Text>
            </View>
            <TouchableOpacity>
              <Feather name="phone" size={18} color="#0F9D6E" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab}>
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F5F1', paddingHorizontal: 20, paddingTop: 60 },
  title: { fontSize: 22, fontWeight: '700', color: '#1a1a1a' },
  subtitle: { fontSize: 13, color: '#777', marginBottom: 20 },
  contactRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#EFEDE8', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { fontSize: 16, fontWeight: '600', color: '#333' },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: 15, fontWeight: '600', color: '#1a1a1a', marginRight: 8 },
  badge: { backgroundColor: '#E3F6EE', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { fontSize: 10, color: '#0F9D6E', fontWeight: '600' },
  meta: { fontSize: 12, color: '#888', marginTop: 2 },
  fab: { position: 'absolute', right: 20, bottom: 30, width: 52, height: 52, borderRadius: 26, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' },
});