import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../Context/Authcontext";
import { Typography, Card } from "../../components";
import theme from "../../theme";

export default function Profile() {
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    setIsAuthenticated(false);
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Typography variant="headlineLg" style={styles.title}>
        Profile
      </Typography>
      <Typography variant="bodyMd" style={styles.subtitle}>
        Your account details
      </Typography>

      <Card variant="elevated" style={styles.card}>
        <View style={styles.avatar}>
          <Typography variant="headlineMd" style={{ color: theme.colors.primary[50] }}>
            S
          </Typography>
        </View>
        <Typography variant="headlineMd" style={styles.name}>
          Sarah Jenkins
        </Typography>
        <Typography variant="bodyMd" style={{ color: theme.colors.text.secondary }}>
          sarah.jenkins@email.com
        </Typography>
      </Card>

      <TouchableOpacity activeOpacity={0.6} onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.default, paddingHorizontal: theme.spacing.marginMobile, paddingTop: 60 },
  title: { marginBottom: theme.spacing.xs },
  subtitle: { color: theme.colors.text.secondary, marginBottom: theme.spacing.xl },
  card: { alignItems: "center", paddingVertical: theme.spacing.lg, marginBottom: theme.spacing.xl },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: theme.colors.primary[900], justifyContent: "center", alignItems: "center", marginBottom: theme.spacing.sm },
  name: { marginBottom: theme.spacing.base },
  logoutButton: { borderWidth: 1, borderColor: theme.colors.error[600], borderRadius: theme.radius.default, paddingVertical: theme.spacing.sm, alignItems: "center", justifyContent: "center" },
  logoutText: { color: theme.colors.error[600], fontFamily: theme.typography.fontFamily, fontSize: theme.typography.labelMd.fontSize, fontWeight: theme.typography.labelMd.fontWeight as any },
});