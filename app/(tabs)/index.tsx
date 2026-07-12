import { View, StyleSheet } from "react-native";
import { Typography, Button } from "../../components";
import theme from "../../theme";

export default function Home() {
  return (
    <View style={styles.container}>
      <Typography variant="headlineLg" style={styles.greeting}>Hello, Sarah.</Typography>
      <Typography variant="bodyMd" style={styles.status}>● You are safe.</Typography>

      <View style={styles.sosWrapper}>
        <Button onPress={() => {}}>SOS</Button>
      </View>

      <Typography variant="bodyMd" style={styles.hint}>Tap to notify your emergency contacts.</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.default, alignItems: "center", paddingTop: 100 },
  greeting: { marginBottom: theme.spacing.xs },
  status: { color: theme.colors.secondary[600], marginBottom: theme.spacing.xl },
  sosWrapper: { marginVertical: theme.spacing.xl },
  hint: { color: theme.colors.text.secondary, marginTop: theme.spacing.lg },
});