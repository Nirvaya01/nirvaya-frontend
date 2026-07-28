import { ImageSourcePropType } from "react-native";

const DEFAULT_AVATAR = require("../assets/images/icon.png");

export function getSafeImageSource(
  uri?: string | null,
): ImageSourcePropType {
  const safeUri = typeof uri === "string" ? uri.trim() : "";

  if (!safeUri) {
    return DEFAULT_AVATAR;
  }

  return { uri: safeUri };
}
