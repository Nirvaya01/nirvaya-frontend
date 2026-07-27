import { Feather, Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title: string;
  onBack?: () => void;
  onSettings?: () => void;
};

export default function Header({
  title,
  onBack,
  onSettings,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.topBar, { paddingTop: insets.top + 10 }]}>      
{onBack ? (
  <TouchableOpacity style={styles.sideButton} onPress={onBack}>
    <Ionicons name="arrow-back" size={24} color="#091426" />
  </TouchableOpacity>
) : (
  <View style={styles.sideButton} />
)}

<Text style={styles.logo}>{title}</Text>

<TouchableOpacity style={styles.sideButton} onPress={onSettings}>
  <Feather name="settings" size={22} color="#091426" />
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  sideButton: {
  width: 40,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
},

  logo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#091426",
  },
});