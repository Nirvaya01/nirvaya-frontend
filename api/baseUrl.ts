import Constants from "expo-constants";
import { Platform } from "react-native";

const API_PATH = "/api";

function normalizeUrl(value: string) {
  return value.trim().replace(/\/+$/, "");
}

function ensureApiPath(value: string) {
  const normalized = normalizeUrl(value);

  return normalized.endsWith(API_PATH)
    ? normalized
    : `${normalized}${API_PATH}`;
}

function getHostFromExpo() {
  const hostUri = Constants.expoConfig?.hostUri;

  if (!hostUri) {
    return null;
  }

  const withoutScheme = hostUri.replace(/^[a-z]+:\/\//i, "");
  const host = withoutScheme.split(":")[0]?.split("/")[0];

  if (!host) {
    return null;
  }

  return ensureApiPath(`http://${host}:5000`);
}

function getPlatformFallback() {
  const fallback = Platform.select({
    android: "http://10.0.2.2:5000/api",
    ios: "http://localhost:5000/api",
    web: "http://localhost:5000/api",
    default: "http://localhost:5000/api",
  });

  return fallback ?? "http://localhost:5000/api";
}

const envBaseUrl = process.env.EXPO_PUBLIC_API_URL;

export const API_BASE_URL = envBaseUrl
  ? ensureApiPath(envBaseUrl)
  : getHostFromExpo() ?? getPlatformFallback();
