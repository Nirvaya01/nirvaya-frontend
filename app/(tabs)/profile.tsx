import { StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Your profile settings will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6fb' },
  title: { fontSize: 24, fontWeight: '800', color: '#1a1a2e' },
  subtitle: { fontSize: 14, color: '#6b7280', marginTop: 8 },
});
