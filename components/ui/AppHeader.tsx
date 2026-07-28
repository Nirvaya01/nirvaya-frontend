import { useAppTheme } from "@/hooks/useAppTheme";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title?: string;
  showBack?: boolean;
  showSettings?: boolean;
};

export default function AppHeader({
  title = "Nirvaya",
  showBack = true,
  showSettings = false,
}: Props) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingTop: insets.top + 6,
          paddingBottom: 8,
          backgroundColor: theme.background,
          borderBottomColor: theme.tabBarBorder,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.side}>
          {showBack ? (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.back()}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <MaterialIcons name="chevron-left" size={22} color={theme.icon} />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconButton} />
          )}
        </View>

        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {title}
        </Text>

        <View style={[styles.side, { alignItems: "flex-end" }]}>
          {showSettings ? (
            <View style={styles.iconButton} />
          ) : (
            <View style={styles.iconButton} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
  },
  row: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  side: {
    width: 44,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
      },
      android: { elevation: 1 },
    }),
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
});
