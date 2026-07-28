import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Header from "@/components/Header";
import { useAuth } from "@/Context/AuthContext";
import {
  CountdownOption,
  EmergencyPreferences,
  getPreferences,
  savePreferences,
} from "@/api/preferencesApi";
import { useTheme } from "@/Context/ThemeContext";

const STORAGE_KEY = "emergencyPreferences";

const COUNTDOWN_OPTIONS: CountdownOption[] = [3, 5, 10];

const DEFAULT_PREFERENCES: EmergencyPreferences = {
  countdown: 5,
  notificationsEnabled: true,
};

function isCountdownOption(value: number): value is CountdownOption {
  return COUNTDOWN_OPTIONS.includes(value as CountdownOption);
}

export default function EmergencyPreferencesScreen() {
  const { token } = useAuth();
  const { isDark } = useTheme();
  const [preferences, setPreferences] = useState<EmergencyPreferences>(
    DEFAULT_PREFERENCES,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPreferences = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const cached = await AsyncStorage.getItem(STORAGE_KEY);

        if (cached && isMounted) {
          const parsed = JSON.parse(cached) as EmergencyPreferences;

          if (parsed?.countdown && isCountdownOption(parsed.countdown)) {
            setPreferences({
              countdown: parsed.countdown,
              notificationsEnabled: Boolean(parsed.notificationsEnabled),
            });
          }
        }

        if (token) {
          const remote = await getPreferences(token);

          if (remote && isMounted) {
            const nextPreferences: EmergencyPreferences = {
              countdown: isCountdownOption(remote.countdown)
                ? remote.countdown
                : DEFAULT_PREFERENCES.countdown,
              notificationsEnabled: Boolean(remote.notificationsEnabled),
            };

            setPreferences(nextPreferences);
            await AsyncStorage.setItem(
              STORAGE_KEY,
              JSON.stringify(nextPreferences),
            );
          }
        }
      } catch (loadError) {
        console.log("Load preferences error:", loadError);
        if (isMounted) {
          setError("Unable to load preferences right now.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPreferences();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const persistPreferences = async (nextPreferences: EmergencyPreferences) => {
    setPreferences(nextPreferences);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextPreferences));

      if (token) {
        await savePreferences(token, nextPreferences);
      }
    } catch (saveError) {
      console.log("Save preferences error:", saveError);
      setError("Preferences updated locally, but cloud sync failed.");
    }
  };

  const handleChangeCountdown = async (countdown: CountdownOption) => {
    setError(null);
    setIsSaving(true);

    try {
      await persistPreferences({
        ...preferences,
        countdown,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleNotifications = async (value: boolean) => {
    setError(null);
    setIsSaving(true);

    try {
      await persistPreferences({
        ...preferences,
        notificationsEnabled: value,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#07111F" : "#F5F7FB" },
      ]}
    >
      <Header title="Emergency Preferences" onBack={() => router.back()} />

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
              styles.heroIcon,
              { backgroundColor: isDark ? "#123326" : "#EAF8F2" },
            ]}
          >
            <Feather name="clock" size={24} color="#0F9D58" />
          </View>

          <Text style={[styles.heroTitle, { color: isDark ? "#F8FAFC" : "#0F172A" }]}>
            SOS Countdown
          </Text>
          <Text
            style={[
              styles.heroSubtitle,
              { color: isDark ? "#94A3B8" : "#64748B" },
            ]}
          >
            Choose how long the SOS alert waits before sending.
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: isDark ? "#0C1727" : "#FFFFFF" },
          ]}
        >
          <View style={styles.cardHeader}>
            <MaterialIcons name="timer" size={20} color="#0F9D58" />
            <Text style={[styles.cardTitle, { color: isDark ? "#F8FAFC" : "#0F172A" }]}>
              Countdown Timer
            </Text>
          </View>

          {COUNTDOWN_OPTIONS.map((option) => {
            const selected = preferences.countdown === option;

            return (
              <TouchableOpacity
                key={option}
                activeOpacity={0.85}
                style={[
                  styles.optionRow,
                  {
                    backgroundColor: selected
                      ? isDark
                        ? "#123326"
                        : "#EAF8F2"
                      : "transparent",
                    borderColor: selected ? "#0F9D58" : isDark ? "#1F2A3D" : "#E2E8F0",
                  },
                ]}
                onPress={() => handleChangeCountdown(option)}
                disabled={isSaving}
              >
                <View style={styles.optionLeft}>
                  <View
                    style={[
                      styles.radioOuter,
                      { borderColor: selected ? "#0F9D58" : "#94A3B8" },
                    ]}
                  >
                    {selected ? <View style={styles.radioInner} /> : null}
                  </View>

                  <View>
                    <Text
                      style={[
                        styles.optionTitle,
                        { color: isDark ? "#F8FAFC" : "#0F172A" },
                      ]}
                    >
                      {option} seconds
                    </Text>
                    <Text
                      style={[
                        styles.optionSubtitle,
                        { color: isDark ? "#94A3B8" : "#64748B" },
                      ]}
                    >
                      {option === 5 ? "Default recommendation" : "SOS delay"}
                    </Text>
                  </View>
                </View>

                {selected ? (
                  <MaterialIcons name="check-circle" size={20} color="#0F9D58" />
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: isDark ? "#0C1727" : "#FFFFFF" },
          ]}
        >
          <View style={styles.cardHeader}>
            <MaterialIcons name="notifications-active" size={20} color="#0F9D58" />
            <Text style={[styles.cardTitle, { color: isDark ? "#F8FAFC" : "#0F172A" }]}>
              Notification Preference
            </Text>
          </View>

          <View style={styles.switchRow}>
            <View style={styles.switchTextWrap}>
              <Text
                style={[
                  styles.optionTitle,
                  { color: isDark ? "#F8FAFC" : "#0F172A" },
                ]}
              >
                Enable SOS Notifications
              </Text>
              <Text
                style={[
                  styles.optionSubtitle,
                  { color: isDark ? "#94A3B8" : "#64748B" },
                ]}
              >
                Shows countdown, SOS sent, and contact status alerts.
              </Text>
            </View>

            <Switch
              value={preferences.notificationsEnabled}
              onValueChange={handleToggleNotifications}
              trackColor={{ false: "#CBD5E1", true: "#0F9D58" }}
              thumbColor="#FFFFFF"
              disabled={isSaving}
            />
          </View>
        </View>

        {isLoading ? (
          <View style={styles.statusRow}>
            <ActivityIndicator color="#0F9D58" />
            <Text style={[styles.statusText, { color: isDark ? "#CBD5E1" : "#64748B" }]}>
              Loading preferences...
            </Text>
          </View>
        ) : null}

        {isSaving ? (
          <View style={styles.statusRow}>
            <ActivityIndicator color="#0F9D58" />
            <Text style={[styles.statusText, { color: isDark ? "#CBD5E1" : "#64748B" }]}>
              Saving changes...
            </Text>
          </View>
        ) : null}

        {error ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
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
  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EAF8F2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
  },
  heroSubtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  optionRow: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#0F9D58",
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  optionSubtitle: {
    marginTop: 3,
    fontSize: 13,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  switchTextWrap: {
    flex: 1,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 6,
    marginBottom: 6,
  },
  statusText: {
    fontSize: 13,
  },
  errorCard: {
    backgroundColor: "#FFF1F2",
    borderRadius: 16,
    padding: 14,
    marginTop: 8,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 13,
    lineHeight: 18,
  },
});
