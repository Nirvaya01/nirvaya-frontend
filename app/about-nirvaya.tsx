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

function InfoCard({
  icon,
  title,
  body,
  isDark,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  body: string;
  isDark: boolean;
}) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: isDark ? "#0C1727" : "#FFFFFF" },
      ]}
    >
      <View style={styles.cardHeader}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: isDark ? "#123326" : "#EAF8F2" },
          ]}
        >
          <MaterialIcons name={icon} size={22} color="#0F9D58" />
        </View>
        <Text style={[styles.cardTitle, { color: isDark ? "#F8FAFC" : "#0F172A" }]}>
          {title}
        </Text>
      </View>

      <Text style={[styles.cardBody, { color: isDark ? "#CBD5E1" : "#475569" }]}>
        {body}
      </Text>
    </View>
  );
}

export default function AboutNirvayaScreen() {
  const { isDark } = useTheme();

  const features = [
    "SOS",
    "Live Location",
    "Emergency Contacts",
    "Alert History",
    "Secure Login",
    "Custom Countdown",
    "Dark Mode",
  ];

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#07111F" : "#F5F7FB" },
      ]}
    >
      <Header title="About Nirvaya" onBack={() => router.back()} />

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
          <View
            style={[
              styles.heroBadge,
              { backgroundColor: isDark ? "#123326" : "#EAF8F2" },
            ]}
          >
            <Feather name="shield" size={18} color="#0F9D58" />
            <Text style={styles.heroBadgeText}>Nirvaya Team</Text>
          </View>
          <Text style={[styles.heroTitle, { color: isDark ? "#F8FAFC" : "#0F172A" }]}>
            Fearless by design
          </Text>
          <Text style={[styles.heroSubtitle, { color: isDark ? "#94A3B8" : "#64748B" }]}>
            Nirvaya means fearless, and the app is built to help women feel
            safer through simple, reliable emergency support.
          </Text>
        </View>

        <InfoCard
          icon="psychology"
          title="Meaning"
          body='"Nirvaya" means fearless.'
          isDark={isDark}
        />

        <InfoCard
          icon="visibility"
          title="Vision"
          body="Helping women feel safer through technology."
          isDark={isDark}
        />

        <InfoCard
          icon="track-changes"
          title="Mission"
          body="Provide immediate emergency assistance, real-time location sharing, trusted contact notifications, fast SOS activation, simple interface, and reliable emergency communication."
          isDark={isDark}
        />

        <View
          style={[
            styles.card,
            { backgroundColor: isDark ? "#0C1727" : "#FFFFFF" },
          ]}
        >
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: isDark ? "#123326" : "#EAF8F2" },
              ]}
            >
              <MaterialIcons name="star" size={22} color="#0F9D58" />
            </View>
            <Text style={[styles.cardTitle, { color: isDark ? "#F8FAFC" : "#0F172A" }]}>
              Features
            </Text>
          </View>

          <View style={styles.featureWrap}>
            {features.map((feature) => (
              <View
                key={feature}
                style={[
                  styles.featureChip,
                  { backgroundColor: isDark ? "#101C2E" : "#F8FAFC" },
                ]}
              >
                <Feather name="check" size={14} color="#0F9D58" />
                <Text
                  style={[
                    styles.featureText,
                    { color: isDark ? "#E2E8F0" : "#0F172A" },
                  ]}
                >
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View
          style={[
            styles.twoColumnCard,
            { backgroundColor: isDark ? "#0C1727" : "#FFFFFF" },
          ]}
        >
          <View style={styles.metaBlock}>
            <Text style={[styles.metaLabel, { color: isDark ? "#94A3B8" : "#64748B" }]}>
              Version
            </Text>
            <Text style={[styles.metaValue, { color: isDark ? "#F8FAFC" : "#0F172A" }]}>
              1.0
            </Text>
          </View>

          <View
            style={[
              styles.divider,
              { backgroundColor: isDark ? "#1F2A3D" : "#E2E8F0" },
            ]}
          />

          <View style={styles.metaBlock}>
            <Text style={[styles.metaLabel, { color: isDark ? "#94A3B8" : "#64748B" }]}>
              Developed By
            </Text>
            <Text style={[styles.metaValue, { color: isDark ? "#F8FAFC" : "#0F172A" }]}>
              Nirvaya Team
            </Text>
          </View>
        </View>
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
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 12,
  },
  heroBadgeText: {
    color: "#0F9D58",
    fontSize: 12,
    fontWeight: "700",
  },
  heroTitle: {
    fontSize: 26,
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
  cardBody: {
    fontSize: 13,
    lineHeight: 20,
  },
  featureWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  featureChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
  },
  featureText: {
    fontSize: 12,
    fontWeight: "600",
  },
  twoColumnCard: {
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  metaBlock: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  metaValue: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "800",
  },
  divider: {
    width: 1,
    height: 44,
    marginHorizontal: 14,
  },
});
