import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Header from "@/components/Header";
import { useAuth } from "@/Context/AuthContext";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function SettingsScreen() {
  const { logout } = useAuth();
  const theme = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Settings" onBack={() => router.back()} />

      <TouchableOpacity
        style={[styles.item, { backgroundColor: theme.surface }]}
        onPress={() => router.push("/edit-profile")}
      >
        <Feather name="user" size={22} color={theme.primary} />
        <Text style={[styles.text, { color: theme.text }]}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.item, { backgroundColor: theme.surface }]}>
        <Feather name="moon" size={22} color={theme.primary} />
        <Text style={[styles.text, { color: theme.text }]}>Dark Mode</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.item, { backgroundColor: theme.surface }]}>
        <Feather name="lock" size={22} color={theme.primary} />
        <Text style={[styles.text, { color: theme.text }]}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.item, { backgroundColor: theme.surface }]}
        onPress={logout}
      >
        <Feather name="log-out" size={22} color={theme.danger} />
        <Text style={[styles.text, { color: theme.danger }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginHorizontal: 16,
    marginTop: 15,
    borderRadius: 14,
  },
  text: {
    marginLeft: 18,
    fontSize: 17,
    fontWeight: "600",
  },
});
