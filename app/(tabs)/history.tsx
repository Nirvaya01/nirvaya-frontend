import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type FeatherIconName = React.ComponentProps<typeof Feather>['name'];

type HistoryItem = {
  id: string;
  type: string;
  icon: FeatherIconName;
  color: string;
  date: string;
  time: string;
  place: string;
};

const HISTORY: HistoryItem[] = [
  { id: '1', type: 'SOS Alert', icon: 'alert-triangle', color: '#E53935', date: 'Oct 12, 2023', time: '14:32', place: 'Central Park, Near Boathouse' },
  { id: '2', type: 'Location Shared', icon: 'map-pin', color: '#0F9D6E', date: 'Sep 28, 2023', time: '21:15', place: '5th Ave & 42nd St' },
  { id: '3', type: 'SOS Alert', icon: 'alert-triangle', color: '#E53935', date: 'Aug 05, 2023', time: '02:40', place: 'Subway Station G Line' },
];

export default function History() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alert History</Text>

      <FlatList
        data={HISTORY}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={[styles.iconCircle, { backgroundColor: item.color + '22' }]}>
              <Feather name={item.icon} size={18} color={item.color} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.topRow}>
                <Text style={styles.type}>{item.type}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <Text style={styles.meta}>{item.time} • {item.place}</Text>
              <View style={styles.statusBadge}>
                <Feather name="check" size={10} color="#0F9D6E" />
                <Text style={styles.statusText}>  Sent Successfully</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F5F1', paddingHorizontal: 20, paddingTop: 60 },
  title: { fontSize: 22, fontWeight: '700', color: '#1a1a1a', marginBottom: 20 },
  row: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 12 },
  iconCircle: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between' },
  type: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  date: { fontSize: 11, color: '#999' },
  meta: { fontSize: 12, color: '#777', marginTop: 2 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFEDE8', alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, marginTop: 8 },
  statusText: { fontSize: 10, color: '#0F9D6E', fontWeight: '600' },
});