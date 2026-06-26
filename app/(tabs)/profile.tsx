/**
 * ProfileScreen.tsx
 * Nirvaya SOS Safety App — Profile & Settings Screen
 *
 * Architecture:
 *  - ProfileCard        → avatar, name, email, edit button
 *  - SettingsItem       → reusable pressable row with icon + chevron
 *  - SectionCard        → white card wrapper with optional title
 *  - BottomTab          → single bottom-nav tab button
 *  - ProfileScreen      → root screen, composes everything
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Alert,
  Animated,
  ColorSchemeName,
  Image,
  Platform,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";

// ---------------------------------------------------------------------------
// Vector icons — works with both Expo and bare React Native projects.
// ---------------------------------------------------------------------------
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
//
// For this standalone file we define a tiny shim so the file compiles and
// can be dropped straight in. Delete the shim and uncomment the real import.
// ---------------------------------------------------------------------------
const Icon = ({
  name,
  size = 24,
  color = "#0D1C2F",
}: {
  name: string;
  size?: number;
  color?: string;
}) => (
  /* Replace this placeholder with your real icon library component */
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color + "33",
      alignItems: "center",
      justifyContent: "center",
    }}
    accessibilityLabel={name}
  />
);

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

interface User {
  name: string;
  email: string;
  avatarUrl?: string;
  version?: string;
}

interface NavTab {
  label: string;
  icon: string;
  route: string;
}

interface SettingsItemProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  isDark?: boolean;
  isLast?: boolean;
}

interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
  isDark?: boolean;
  style?: object;
}

interface ProfileCardProps {
  user: User;
  onEditPress: () => void;
  isDark?: boolean;
}

interface BottomTabProps {
  tab: NavTab;
  isActive: boolean;
  onPress: () => void;
  isDark?: boolean;
}

// ---------------------------------------------------------------------------
// PALETTE — light & dark
// ---------------------------------------------------------------------------

const Colors = {
  light: {
    primary: "#091426",
    background: "#F8F9FF",
    card: "#FFFFFF",
    secondary: "#006A61",
    error: "#BA1A1A",
    errorContainer: "#FFDAD6",
    border: "#C5C6CD",
    textPrimary: "#0D1C2F",
    textSecondary: "#45474C",
    surfaceContainer: "#E6EEFF",
    surfaceHigh: "#DDE9FF",
    secondaryContainer: "#86F2E4",
    onSecondaryContainer: "#006F66",
    headerBg: "#FFFFFF",
    shadow: "rgba(30,41,59,0.10)",
    activeTab: "#091426",
    activeTabBg: "#D8E3FB",
    inactiveTab: "#75777D",
    lockBg: "#D5E3FD",
    lockColor: "#091426",
  },
  dark: {
    primary: "#BCC7DE",
    background: "#0D1C2F",
    card: "#1E293B",
    secondary: "#6BD8CB",
    error: "#FFB4AB",
    errorContainer: "#93000A",
    border: "#3C475A",
    textPrimary: "#EBF1FF",
    textSecondary: "#BCC7DE",
    surfaceContainer: "#233144",
    surfaceHigh: "#2C3E53",
    secondaryContainer: "#005049",
    onSecondaryContainer: "#6BD8CB",
    headerBg: "#1E293B",
    shadow: "rgba(0,0,0,0.35)",
    activeTab: "#BCC7DE",
    activeTabBg: "#3C475A",
    inactiveTab: "#75777D",
    lockBg: "#3C475A",
    lockColor: "#BCC7DE",
  },
};

// ---------------------------------------------------------------------------
// REUSABLE: ProfileCard
// ---------------------------------------------------------------------------

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  onEditPress,
  isDark,
}) => {
  const C = isDark ? Colors.dark : Colors.light;
  const s = profileCardStyles(C);

  return (
    <View style={s.card} accessible={false}>
      {/* Subtle gradient band at top */}
      <View style={s.gradientBand} />

      {/* Avatar */}
      <View style={s.avatarWrapper}>
        {user.avatarUrl ? (
          <Image
            source={{ uri: user.avatarUrl }}
            style={s.avatar}
            accessibilityLabel={`Profile photo of ${user.name}`}
          />
        ) : (
          /* Placeholder initials avatar */
          <View style={[s.avatar, s.avatarPlaceholder]}>
            <Text
              style={s.avatarInitials}
              accessibilityLabel={`Initials of ${user.name}`}
            >
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </Text>
          </View>
        )}
      </View>

      {/* Name & email */}
      <Text style={s.name} accessibilityRole="header" allowFontScaling>
        {user.name}
      </Text>
      <Text style={s.email} allowFontScaling>
        {user.email}
      </Text>

      {/* Edit button */}
      <Pressable
        style={({ pressed }) => [s.editBtn, pressed && s.editBtnPressed]}
        onPress={onEditPress}
        accessibilityRole="button"
        accessibilityLabel="Edit your profile"
        accessibilityHint="Opens profile editing screen"
      >
        <Icon name="edit" size={18} color={C.card} />
        <Text style={s.editBtnText} allowFontScaling>
          Edit Profile
        </Text>
      </Pressable>
    </View>
  );
};

const profileCardStyles = (C: typeof Colors.light) =>
  StyleSheet.create({
    card: {
      backgroundColor: C.card,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: C.border,
      alignItems: "center",
      paddingTop: 24,
      paddingBottom: 20,
      paddingHorizontal: 20,
      overflow: "hidden",
      // Soft shadow
      shadowColor: C.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 12,
      elevation: 3,
    },
    gradientBand: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 80,
      backgroundColor: C.surfaceContainer,
      opacity: 0.55,
    },
    avatarWrapper: {
      borderWidth: 3,
      borderColor: C.card,
      borderRadius: 52,
      shadowColor: C.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 6,
      elevation: 4,
      marginBottom: 12,
    },
    avatar: {
      width: 96,
      height: 96,
      borderRadius: 48,
    },
    avatarPlaceholder: {
      backgroundColor: C.surfaceHigh,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarInitials: {
      fontSize: 32,
      fontWeight: "700",
      color: C.primary,
      letterSpacing: 1,
    },
    name: {
      fontSize: 22,
      fontWeight: "700",
      color: C.textPrimary,
      marginBottom: 4,
      textAlign: "center",
      letterSpacing: -0.3,
    },
    email: {
      fontSize: 14,
      fontWeight: "500",
      color: C.textSecondary,
      textAlign: "center",
      marginBottom: 16,
    },
    editBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: C.primary,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 24,
      width: "100%",
      minHeight: 44, // Accessibility: minimum touch target
    },
    editBtnPressed: {
      opacity: 0.85,
      transform: [{ scale: 0.975 }],
    },
    editBtnText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "600",
      letterSpacing: 0.2,
    },
  });

// ---------------------------------------------------------------------------
// REUSABLE: SectionCard — white card with optional title label
// ---------------------------------------------------------------------------

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  isDark,
  style,
}) => {
  const C = isDark ? Colors.dark : Colors.light;
  const s = sectionCardStyles(C);

  return (
    <View style={[s.card, style]}>
      {title && (
        <View style={s.titleRow}>
          <Text style={s.title} accessibilityRole="header" allowFontScaling>
            {title.toUpperCase()}
          </Text>
        </View>
      )}
      {children}
    </View>
  );
};

const sectionCardStyles = (C: typeof Colors.light) =>
  StyleSheet.create({
    card: {
      backgroundColor: C.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: C.border,
      overflow: "hidden",
      shadowColor: C.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 12,
      elevation: 2,
    },
    titleRow: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: isDarkColor(C.surfaceContainer)
        ? C.surfaceContainer
        : C.surfaceContainer,
      borderBottomWidth: 1,
      borderBottomColor: C.border,
    },
    title: {
      fontSize: 11,
      fontWeight: "600",
      color: C.textSecondary,
      letterSpacing: 1.1,
    },
  });

// tiny helper — not actually checking luminance, just used for internal clarity
const isDarkColor = (_: string) => false;

// ---------------------------------------------------------------------------
// REUSABLE: SettingsItem — pressable row
// ---------------------------------------------------------------------------

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  onPress,
  isDark,
  isLast = false,
}) => {
  const C = isDark ? Colors.dark : Colors.light;
  const s = settingsItemStyles(C);

  return (
    <Pressable
      style={({ pressed }) => [
        s.row,
        !isLast && s.rowBorder,
        pressed && s.rowPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={subtitle ? `${subtitle}` : undefined}
      android_ripple={{ color: C.surfaceContainer, borderless: false }}
    >
      {/* Icon bubble */}
      <View style={[s.iconBubble, { backgroundColor: iconBg }]}>
        <Icon name={icon} size={22} color={iconColor} />
      </View>

      {/* Text block */}
      <View style={s.textBlock}>
        <Text style={s.title} allowFontScaling numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={s.subtitle} allowFontScaling numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>

      {/* Chevron */}
      <Icon name="chevron-right" size={20} color={C.textSecondary} />
    </Pressable>
  );
};

const settingsItemStyles = (C: typeof Colors.light) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
      minHeight: 64,
      gap: 14,
    },
    rowBorder: {
      borderBottomWidth: 1,
      borderBottomColor: C.border,
    },
    rowPressed: {
      backgroundColor: C.surfaceContainer,
    },
    iconBubble: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    textBlock: {
      flex: 1,
      gap: 2,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      color: C.textPrimary,
    },
    subtitle: {
      fontSize: 12,
      fontWeight: "500",
      color: C.textSecondary,
    },
  });

// ---------------------------------------------------------------------------
// REUSABLE: BottomTab
// ---------------------------------------------------------------------------

const BottomTab: React.FC<BottomTabProps> = ({
  tab,
  isActive,
  onPress,
  isDark,
}) => {
  const C = isDark ? Colors.dark : Colors.light;
  const s = bottomTabStyles(C);

  return (
    <Pressable
      style={s.tab}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityLabel={tab.label}
      accessibilityState={{ selected: isActive }}
      android_ripple={{ color: C.activeTabBg, borderless: true, radius: 32 }}
    >
      {/* Active pill indicator */}
      <View style={[s.iconWrap, isActive && s.iconWrapActive]}>
        <Icon
          name={tab.icon}
          size={22}
          color={isActive ? C.activeTab : C.inactiveTab}
        />
      </View>
      <Text
        style={[s.label, isActive && s.labelActive]}
        allowFontScaling
        numberOfLines={1}
      >
        {tab.label}
      </Text>
    </Pressable>
  );
};

const bottomTabStyles = (C: typeof Colors.light) =>
  StyleSheet.create({
    tab: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 8,
      minHeight: 56,
    },
    iconWrap: {
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderRadius: 20,
      marginBottom: 4,
    },
    iconWrapActive: {
      backgroundColor: C.activeTabBg,
    },
    label: {
      fontSize: 10,
      fontWeight: "500",
      color: C.inactiveTab,
      letterSpacing: 0.3,
    },
    labelActive: {
      color: C.activeTab,
      fontWeight: "700",
    },
  });

// ---------------------------------------------------------------------------
// BOTTOM NAV CONFIG
// ---------------------------------------------------------------------------

const NAV_TABS: NavTab[] = [
  { label: "Home", icon: "home", route: "HomeScreen" },
  { label: "Contacts", icon: "people", route: "ContactsScreen" },
  { label: "History", icon: "time", route: "HistoryScreen" },
  { label: "Profile", icon: "person", route: "ProfileScreen" },
];

// ---------------------------------------------------------------------------
// ROOT SCREEN: ProfileScreen
// ---------------------------------------------------------------------------

/**
 * ProfileScreen
 *
 * Props (React Navigation):
 *   navigation — standard RN navigation prop (NavigationProp)
 *   route      — standard RN route prop
 *
 * For standalone use, dummy navigation functions are provided below.
 */
const ProfileScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  // ----- Colour scheme -----
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>("light");
  const isDark = colorScheme === "dark";
  const C = isDark ? Colors.dark : Colors.light;

  // ----- Fade-in animation on mount -----
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 380,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // ----- Pull-to-refresh -----
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // TODO: fetch fresh user data from API
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  // ----- Active bottom tab -----
  const [activeTab, setActiveTab] = useState<string>("ProfileScreen");

  // ----- User data (replace with API fetch) -----
  const user: User = {
    name: "Sarah Jenkins",
    email: "sarah@example.com",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASmFv9wAFc0QKnbu_SZ3z5ztg75OG9twmOL3bWW5hMTlq11p3WjLcLu5Nz-HLEJuPXXUpcPnhmtiNzzG1Afwb9tl2j4WukcIGWp-XyHLf5fnXLAuDvnB0cB5UAWutpr0b2B2OGQhexO1ZikykuBXRyq3DjRUMkvCYFfaTwUd49ti2o3DfUQv8RUpy4sG_Ux3ZapYGRe84gMOqw7l_K2T6rcVbjpw1J6MHKyEl5B8ehlE6c4SQLKlWUf5lf7WzaJw9jg-pAFHubtis0",
    version: "2.4.1",
  };

  // ----- Navigation helpers (dummy until wired to real nav) -----
  const navigate = (screen: string) => {
    if (navigation) {
      navigation.navigate(screen);
    } else {
      // Accessibility announcement for screen reader on nav without navigator
      AccessibilityInfo.announceForAccessibility(`Navigating to ${screen}`);
      console.log(`[Nirvaya] Navigate → ${screen}`);
    }
  };

  // ----- Logout confirmation -----
  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out of Nirvaya?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => {
            // TODO: clear auth token, reset navigation stack
            console.log("[Nirvaya] User logged out");
            navigate("LoginScreen");
          },
        },
      ],
      { cancelable: true },
    );
  };

  // ----- Styles (colour-aware) -----
  const s = screenStyles(C);

  return (
    <SafeAreaView style={s.safeArea}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={C.headerBg}
      />

      {/* ── TOP APP BAR ── */}
      <View style={s.header}>
        <Pressable
          onPress={() => navigation?.goBack()}
          style={s.headerBtn}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          android_ripple={{
            color: C.surfaceContainer,
            borderless: true,
            radius: 20,
          }}
        >
          <Icon name="arrow-back" size={24} color={C.primary} />
        </Pressable>

        <Text style={s.headerTitle} allowFontScaling accessibilityRole="header">
          Nirvaya
        </Text>

        <Pressable
          onPress={() => navigate("SettingsScreen")}
          style={s.headerBtn}
          accessibilityRole="button"
          accessibilityLabel="Open settings"
          android_ripple={{
            color: C.surfaceContainer,
            borderless: true,
            radius: 20,
          }}
        >
          <Icon name="settings" size={24} color={C.primary} />
        </Pressable>
      </View>

      {/* ── SCROLLABLE CONTENT ── */}
      <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim }]}>
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={C.primary}
              colors={[C.primary]}
            />
          }
        >
          {/* ── PROFILE CARD ── */}
          <ProfileCard
            user={user}
            onEditPress={() => navigate("EditProfileScreen")}
            isDark={isDark}
          />

          {/* ── SAFETY CORE ── */}
          <SectionCard title="Safety Core" isDark={isDark} style={s.section}>
            <SettingsItem
              icon="health-and-safety"
              iconBg={isDark ? C.errorContainer + "55" : "#FFDAD6"}
              iconColor={C.error}
              title="Emergency Preferences"
              subtitle="Notifications, Countdown Duration"
              onPress={() => navigate("EmergencyPreferencesScreen")}
              isDark={isDark}
            />
            <SettingsItem
              icon="my-location"
              iconBg={
                isDark ? C.secondaryContainer + "55" : C.secondaryContainer
              }
              iconColor={C.onSecondaryContainer}
              title="Permissions"
              subtitle="Location Tracking, System Alerts"
              onPress={() => navigate("PermissionsScreen")}
              isDark={isDark}
              isLast
            />
          </SectionCard>

          {/* ── SECURITY ── */}
          <SectionCard isDark={isDark} style={s.section}>
            <SettingsItem
              icon="lock"
              iconBg={C.lockBg}
              iconColor={C.lockColor}
              title="Security"
              subtitle="Change Password, Two-Factor Authentication"
              onPress={() => navigate("SecurityScreen")}
              isDark={isDark}
              isLast
            />
          </SectionCard>

          {/* ── LOGOUT (danger zone) ── */}
          <SectionCard
            isDark={isDark}
            style={[s.section, s.dangerCard, { borderColor: C.error + "66" }]}
          >
            <Pressable
              style={({ pressed }) => [
                s.logoutRow,
                pressed && { backgroundColor: C.errorContainer + "44" },
              ]}
              onPress={handleLogout}
              accessibilityRole="button"
              accessibilityLabel="Log out of Nirvaya"
              accessibilityHint="Tap to confirm log out"
              android_ripple={{ color: C.errorContainer, borderless: false }}
            >
              <View
                style={[s.logoutIconWrap, { backgroundColor: "transparent" }]}
              >
                <Icon name="log-out" size={22} color={C.error} />
              </View>
              <Text style={[s.logoutText, { color: C.error }]} allowFontScaling>
                Log Out
              </Text>
            </Pressable>
          </SectionCard>

          {/* ── APP VERSION ── */}
          <Text
            style={s.version}
            allowFontScaling
            accessibilityLabel={`App version ${user.version}`}
          >
            Nirvaya Version {user.version}
          </Text>
        </ScrollView>
      </Animated.View>

      {/* ── BOTTOM NAV BAR ── */}
      <View style={s.bottomNav}>
        {NAV_TABS.map((tab) => (
          <BottomTab
            key={tab.route}
            tab={tab}
            isActive={activeTab === tab.route}
            onPress={() => {
              setActiveTab(tab.route);
              if (tab.route !== "ProfileScreen") navigate(tab.route);
            }}
            isDark={isDark}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

// ---------------------------------------------------------------------------
// ROOT SCREEN STYLES
// ---------------------------------------------------------------------------

const screenStyles = (C: typeof Colors.light) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: C.background,
    },

    // Header
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: C.headerBg,
      paddingHorizontal: 8,
      height: 56,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: C.border,
      // Shadow (iOS)
      shadowColor: C.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 8,
      // Elevation (Android)
      elevation: 3,
      zIndex: 10,
    },
    headerBtn: {
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 22,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: C.primary,
      letterSpacing: -0.2,
    },

    // Scroll
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 32,
      gap: 14,
    },

    // Sections
    section: {
      // gap applied via scrollContent; individual section cards add own margin if needed
    },
    dangerCard: {
      borderWidth: 1.5,
    },

    // Logout row
    logoutRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
      minHeight: 56,
      gap: 14,
    },
    logoutIconWrap: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: "center",
      justifyContent: "center",
    },
    logoutText: {
      fontSize: 16,
      fontWeight: "600",
    },

    // Version
    version: {
      textAlign: "center",
      fontSize: 12,
      fontWeight: "500",
      color: C.textSecondary,
      opacity: 0.6,
      marginTop: 8,
      paddingBottom: 4,
    },

    // Bottom nav
    bottomNav: {
      flexDirection: "row",
      backgroundColor: C.card,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: C.border,
      // Shadow
      shadowColor: C.shadow,
      shadowOffset: { width: 0, height: -6 },
      shadowOpacity: 1,
      shadowRadius: 16,
      elevation: 12,
      paddingBottom: Platform.OS === "ios" ? 0 : 4,
    },
  });

// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------

export { BottomTab, ProfileCard, SectionCard, SettingsItem };
export default ProfileScreen;
