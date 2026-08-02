import Header from "@/components/Header";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/Context/AuthContext";
import { getHistory } from "@/api/historyApi";
import { useAppTheme } from "@/hooks/useAppTheme";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useContacts } from "../Contexts/ContactsContext";
import { getSafeImageSource } from "../utils/imageSource";

const COLORS = {
  primary: "#091426",
  secondary: "#006A61",
  background: "#F8F9FF",
  white: "#FFFFFF",
  error: "#BA1A1A",
  textSecondary: "#45474C",
  border: "#C5C6CD",
  safe: "#10B981",
  safeZone: "#86F2E4",
  shadow: "rgba(30,41,59,0.08)",
  surfaceVariant: "#D5E3FD",
};

interface Alert {
  id: string;
  message: string;
  createdAt: string;
}

interface CardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onPress?: () => void;
}

const DashboardCard = ({ title, icon, children, onPress }: CardProps) => {
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.card,
        { backgroundColor: theme.surface, shadowColor: theme.shadow },
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleRow}>
          {icon}
          <Text style={[styles.cardTitle, { color: theme.success }]}>
            {title}
          </Text>
        </View>

        <MaterialIcons name="chevron-right" size={22} color={theme.iconMuted} />
      </View>

      {children}
    </TouchableOpacity>
  );
};

const GreetingHeader = () => {
  const { user } = useAuth();
  const theme = useAppTheme();
  // user may come from auth context; avoid referencing an undefined type
  const userData = user as any | undefined;

  return (
    <View style={styles.headerContainer}>
      <Image
        source={getSafeImageSource(userData?.profilePicture)}
        style={[styles.avatar, { borderColor: theme.surface }]}
      />

      <View style={{ flex: 1 }}>
        <Text style={[styles.greeting, { color: theme.text }]}>
          Hello, {userData?.name || "User"}.
        </Text>

        <View style={styles.statusRow}>
          <View style={[styles.safeDot, { backgroundColor: theme.success }]} />

          <Text style={[styles.safeText, { color: theme.textSecondary }]}>
            You are safe.
          </Text>
        </View>
      </View>
    </View>
  );
};

interface SOSButtonProps {
  onPress: () => void;
}

const SOSButton = ({ onPress }: SOSButtonProps) => {
  const theme = useAppTheme();
  const pulse = useRef(new Animated.Value(1)).current;
  const pulse2 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.4,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.delay(700),
          Animated.timing(pulse2, {
            toValue: 1.5,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(pulse2, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [pulse, pulse2]);

  return (
    <View style={styles.sosContainer}>
      <Animated.View
        style={[
          styles.pulse,
          {
            backgroundColor: theme.danger,
            transform: [{ scale: pulse }],
            opacity: pulse.interpolate({
              inputRange: [1, 1.4],
              outputRange: [0.35, 0],
            }),
          },
        ]}
      />

      <Animated.View
        style={[
          styles.pulse,
          {
            backgroundColor: theme.danger,
            transform: [{ scale: pulse2 }],
            opacity: pulse2.interpolate({
              inputRange: [1, 1.5],
              outputRange: [0.25, 0],
            }),
          },
        ]}
      />

      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.sosButton,
          { backgroundColor: theme.danger, shadowColor: theme.danger },
        ]}
        onPress={onPress}
      >
        <MaterialIcons name="emergency" color="white" size={48} />
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>

      <Text style={[styles.sosCaption, { color: theme.textSecondary }]}>
        Tap to notify your emergency contacts.
      </Text>
    </View>
  );
};

const ProtectionStatus = () => {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.protectionCard,
        {
          backgroundColor: theme.surface,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <View style={[styles.safeDot, { backgroundColor: theme.success }]} />

      <Text style={[styles.safeText, { color: theme.textSecondary }]}>
        Protection Active
      </Text>
    </View>
  );
};

export default function HomeDashboard() {
  const theme = useAppTheme();
  const [currentAddress, setCurrentAddress] = useState<string>(
    "Fetching location...",
  );
  const [coordsText, setCoordsText] = useState<string>("");
  const { contacts, loading: contactsLoading } = useContacts();
  const { token } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertsLoading, setAlertsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();

        if (status !== "granted") {
          if (isMounted) setCurrentAddress("Location permission not granted");
          return;
        }

        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        if (isMounted) {
          setCoordsText(
            `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`,
          );
        }

        const [place] = await Location.reverseGeocodeAsync({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        if (!isMounted) return;

        if (place) {
          // Build the address using every field that might be populated.
          // Nepal (and many other regions) often return sparse data from
          // reverse geocoding, so we fall back through multiple fields
          // instead of relying on `street` alone.
          const parts = [
            place.name,
            place.street,
            place.district,
            place.city || place.subregion,
            place.region,
          ].filter(Boolean);

          setCurrentAddress(parts.join(", ") || "Location found");
        } else {
          setCurrentAddress(
            `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
          );
        }
      } catch {
        if (isMounted) setCurrentAddress("Unable to fetch location");
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchAlerts = async () => {
      try {
        if (!token) return;

        const response = await getHistory(token);

        const formatted = response.history.map((item: any) => ({
          id: item._id,
          message: "SOS Alert Sent",
          createdAt: item.createdAt,
        }));

        if (isMounted) setAlerts(formatted);
      } catch (error) {
        console.log("Failed to fetch alerts:", error);
      } finally {
        if (isMounted) setAlertsLoading(false);
      }
    };

    fetchAlerts();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleSOSPress = React.useCallback(() => {
    router.push("/sos-confirmation");
  }, []);
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 28,
          backgroundColor: theme.background,
          paddingHorizontal: 16,
        }}
      >
        {/* Header */}

        <Header title="Nirvaya" />

        <View style={styles.heroSection}>
          <GreetingHeader />
          <ProtectionStatus />
        </View>

        <SOSButton onPress={handleSOSPress} />
        {/* Remaining cards come in Part 2 */}
        {/* Safe Zones Card */}

        <DashboardCard
          title="Safe Zones"
          icon={
            <MaterialIcons name="location-on" size={18} color={theme.primary} />
          }
        >
          <Text style={[styles.zoneTitle, { color: theme.text }]}>
            {currentAddress}
          </Text>
          {coordsText ? (
            <Text style={[styles.coordsText, { color: theme.textSecondary }]}>
              {coordsText}
            </Text>
          ) : null}
        </DashboardCard>

        {/* Trusted Contacts */}

        <DashboardCard
          title="Trusted Contacts"
          onPress={() => router.push("/contacts")}
          icon={<MaterialIcons name="group" size={18} color={theme.primary} />}
        >
          {contactsLoading ? (
            <Text style={[styles.smallText, { color: theme.textSecondary }]}>
              Loading contacts...
            </Text>
          ) : (
            <View style={styles.contactsRow}>
              <View>
                <Text style={[styles.bigNumber, { color: theme.text }]}>
                  Contacts
                </Text>

                <Text
                  style={[styles.smallText, { color: theme.textSecondary }]}
                >
                  {contacts.length > 0
                    ? "Ready to alert"
                    : "No contacts added yet"}
                </Text>
              </View>

              {contacts.length > 0 && (
                <View style={styles.avatarGroup}>
                  {contacts.slice(0, 2).map((c, index) => (
                    <View
                      key={c.id}
                      style={[
                        styles.smallAvatar,
                        {
                          marginLeft: index === 0 ? 0 : -10,
                          backgroundColor: theme.primaryDark,
                        },
                      ]}
                    >
                      <Text style={styles.avatarLetter}>
                        {c.name.charAt(0)}
                      </Text>
                    </View>
                  ))}

                  {contacts.length > 2 && (
                    <View
                      style={[
                        styles.smallAvatar,
                        {
                          marginLeft: -10,
                          backgroundColor: theme.surfaceSoft,
                        },
                      ]}
                    >
                      <Text style={styles.avatarLetter}>
                        +{contacts.length - 2}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          )}
        </DashboardCard>

        {/* Recent Alert */}

        <DashboardCard
          title="Recent Alert"
          onPress={() => router.push("/history")}
          icon={
            <MaterialIcons name="history" size={18} color={theme.primary} />
          }
        >
          {alertsLoading ? (
            <Text style={[styles.smallText, { color: theme.textSecondary }]}>
              Loading alerts...
            </Text>
          ) : alerts.length > 0 ? (
            <View style={styles.alertContainer}>
              <MaterialIcons
                name="notifications-active"
                size={40}
                color={theme.danger}
              />

              <Text
                style={[styles.alertDateText, { color: theme.textSecondary }]}
              >
                {alerts[0].message}
              </Text>

              <Text
                style={[styles.alertDateText, { color: theme.textSecondary }]}
              >
                {new Date(alerts[0].createdAt).toLocaleString()}
              </Text>
            </View>
          ) : (
            <View style={styles.alertContainer}>
              <MaterialIcons
                name="notifications-paused"
                size={40}
                color={theme.iconMuted}
              />

              <Text
                style={[styles.alertDateText, { color: theme.textSecondary }]}
              >
                No recent alerts.
              </Text>
            </View>
          )}
        </DashboardCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 10,
  },

  logo: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },

  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.primary,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  safeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.safe,
    marginRight: 8,
  },

  safeText: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },

  protectionCard: {
    alignSelf: "flex-start",
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },

  sosContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 330,
    marginTop: 15,
    marginBottom: 15,
  },

  pulse: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: COLORS.error,
  },

  sosButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.error,
    justifyContent: "center",
    alignItems: "center",
    elevation: 12,
    shadowColor: COLORS.error,
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },

  sosText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 40,
    marginTop: 6,
  },

  sosCaption: {
    marginTop: 28,
    color: COLORS.textSecondary,
    fontSize: 16,
    textAlign: "center",
    width: 250,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 18,
    borderRadius: 18,
    padding: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardTitle: {
    marginLeft: 8,
    color: COLORS.secondary,
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  zoneTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 15,
  },

  coordsText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: -10,
    marginBottom: 15,
  },

  zoneContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  zoneChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
    marginBottom: 10,
  },

  activeZone: {
    backgroundColor: COLORS.safeZone,
    borderColor: COLORS.safeZone,
  },

  zoneText: {
    color: COLORS.textSecondary,
    fontWeight: "600",
  },

  activeZoneText: {
    color: COLORS.secondary,
  },

  contactsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bigNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
  },

  smallText: {
    marginTop: 5,
    color: COLORS.textSecondary,
  },

  avatarGroup: {
    flexDirection: "row",
    alignItems: "center",
  },

  smallAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },

  avatarLetter: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  alertContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },

  alertDateText: {
    marginTop: 6,
    color: COLORS.textSecondary,
    fontSize: 13,
  },
});
