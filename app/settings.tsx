import Header from "@/components/Header";
import { useAuth } from "@/Context/AuthContext";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Header
        title="Settings"
        onBack={() => router.back()}
      />
    <TouchableOpacity
  style={styles.item}
  onPress={() => router.push("/edit-profile")}
>
  <Feather name="user" size={22} />
  <Text style={styles.text}>Edit Profile</Text>
</TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Feather name="moon" size={22} />
        <Text style={styles.text}>Dark Mode</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Feather name="lock" size={22} />
        <Text style={styles.text}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={logout}
      >
        <Feather name="log-out" size={22} color="red" />
        <Text style={[styles.text, { color: "red" }]}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FF",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
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