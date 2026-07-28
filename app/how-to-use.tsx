import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Header from "@/components/Header";
import { useTheme } from "@/Context/ThemeContext";

type SectionCardProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  points: string[];
  isDark: boolean;
};

function SectionCard({ icon, title, points, isDark }: SectionCardProps) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: isDark ? "#0C1727" : "#FFFFFF" },
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconCircle, { backgroundColor: isDark ? "#123326" : "#EAF8F2" }]}>
          <MaterialIcons name={icon} size={22} color="#0F9D58" />
        </View>
        <Text style={[styles.cardTitle, { color: isDark ? "#F8FAFC" : "#0F172A" }]}>
          {title}
        </Text>
      </View>

      {points.map((point) => (
        <View key={point} style={styles.pointRow}>
          <Feather name="check-circle" size={16} color="#0F9D58" />
          <Text style={[styles.pointText, { color: isDark ? "#CBD5E1" : "#475569" }]}>
            {point}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default function HowToUseScreen() {
  const { isDark } = useTheme();

  const sections = [
    {
      icon: "dashboard",
      title: "Dashboard",
      points: [
        "See your SOS button, current location, and greeting right away.",
        "Use the dashboard as your main starting point after login.",
      ],
    },
    {
      icon: "people",
      title: "Emergency Contacts",
      points: [
        "Add trusted people who should receive your emergency alerts.",
        "Edit or delete contacts whenever your list changes.",
      ],
    },
    {
      icon: "warning",
      title: "SOS",
      points: [
        "Press SOS to begin the countdown before help is sent.",
        "The app shares your location and alerts your emergency contacts.",
        "You can customize the countdown from Emergency Preferences.",
      ],
    },
    {
      icon: "history",
      title: "Emergency History",
      points: [
        "Previous SOS alerts are stored in your history screen.",
        "Use history to review when alerts were triggered.",
      ],
    },
    {
      icon: "person",
      title: "Profile",
      points: [
        "Open Profile to edit your personal details.",
        "Use Preferences, Permissions, and Dark Mode from one place.",
        "Logout is protected with a confirmation dialog.",
      ],
    },
  ];

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#07111F" : "#F5F7FB" },
      ]}
    >
      <Header title="How to Use" onBack={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View
          style={[
            styles.heroCard,
            { backgroundColor: isDark ? "#0C1727" : "#FFFFFF" },
          ]}
        >
          <Text style={[styles.heroTitle, { color: isDark ? "#F8FAFC" : "#0F172A" }]}>
            Beginner-friendly guide
          </Text>
          <Text style={[styles.heroSubtitle, { color: isDark ? "#94A3B8" : "#64748B" }]}>
            A simple walkthrough of the main Nirvaya screens and how each one
            helps you stay safe.
          </Text>
        </View>

        {sections.map((section) => (
          <SectionCard
            key={section.title}
            icon={section.icon as keyof typeof MaterialIcons.glyphMap}
            title={section.title}
            points={section.points}
            isDark={isDark}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 28,
  },
  heroCard: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
  },
  heroSubtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "800",
    flex: 1,
  },
  pointRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 10,
  },
  pointText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
});
