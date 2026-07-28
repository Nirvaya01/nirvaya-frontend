import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { useCallback, useEffect, useState } from "react";
import { Linking, Platform } from "react-native";

export type PermissionStatusLabel =
  | "Allowed"
  | "Denied"
  | "Limited"
  | "Unavailable"
  | "Unknown";

export type PermissionItem = {
  key: string;
  title: string;
  subtitle: string;
  status: PermissionStatusLabel;
  icon: string;
  required: boolean;
  available: boolean;
};

function normalizeStatus(status?: string | null): PermissionStatusLabel {
  switch (status) {
    case "granted":
      return "Allowed";
    case "denied":
      return "Denied";
    case "limited":
    case "provisional":
    case "ephemeral":
      return "Limited";
    case "unavailable":
      return "Unavailable";
    default:
      return "Unknown";
  }
}

export function usePermissions() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<PermissionItem[]>([]);

  const loadPermissions = useCallback(async () => {
    setLoading(true);

    try {
      const [foregroundLocation, backgroundLocation, mediaLibrary, camera] =
        await Promise.all([
          Location.getForegroundPermissionsAsync(),
          Location.getBackgroundPermissionsAsync(),
          ImagePicker.getMediaLibraryPermissionsAsync(),
          ImagePicker.getCameraPermissionsAsync(),
        ]);

      const notificationPermissions =
        await Notifications.getPermissionsAsync();

      const nextItems: PermissionItem[] = [
        {
          key: "location",
          title: "Location",
          subtitle: "Used to share live location during SOS alerts.",
          status: normalizeStatus(foregroundLocation.status),
          icon: "my-location",
          required: true,
          available: true,
        },
        {
          key: "notifications",
          title: "Notifications",
          subtitle: "Used to show SOS alerts and status updates.",
          status: normalizeStatus(notificationPermissions.status),
          icon: "notifications-active",
          required: false,
          available: true,
        },
        {
          key: "background-location",
          title: "Background Location",
          subtitle: "Required if SOS should track after the app is minimized.",
          status: normalizeStatus(backgroundLocation.status),
          icon: "location-searching",
          required: false,
          available: Platform.OS !== "web",
        },
        {
          key: "phone-call",
          title: "Phone Call",
          subtitle: "Used if you launch the dialer from within the app.",
          status: "Unknown",
          icon: "call",
          required: false,
          available: true,
        },
        {
          key: "sms",
          title: "SMS",
          subtitle: "Only needed if the app sends emergency text messages.",
          status: "Unknown",
          icon: "sms",
          required: false,
          available: true,
        },
        {
          key: "camera",
          title: "Camera",
          subtitle: "Needed only if you later capture profile pictures.",
          status: normalizeStatus(camera.status),
          icon: "photo-camera",
          required: false,
          available: true,
        },
        {
          key: "media",
          title: "Storage / Media",
          subtitle: "Used for selecting and storing profile images.",
          status: normalizeStatus(mediaLibrary.status),
          icon: "perm-media",
          required: false,
          available: true,
        },
      ];

      setItems(nextItems);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPermissions();
  }, [loadPermissions]);

  const openAppSettings = async () => {
    await Linking.openSettings();
  };

  const refresh = async () => {
    await loadPermissions();
  };

  return {
    items,
    loading,
    refresh,
    openAppSettings,
  };
}
