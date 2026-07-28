import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title: string;
  onBack?: () => void;
};

export default function Header({ title, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.topBar,
        {
          paddingTop: insets.top + 8,
          paddingBottom: 12,
          backgroundColor: theme.background,
          borderBottomColor: theme.tabBarBorder,
        },
      ]}
    >
      {onBack ? (
        <TouchableOpacity style={styles.sideButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={theme.icon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.sideButton} />
      )}

      <Text style={[styles.logo, { color: theme.text }]}>{title}</Text>

      <View style={styles.sideButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  sideButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: "transparent",
  },

  logo: {
    fontSize: 22,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },
});
