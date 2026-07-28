import { useTheme } from "@/Context/ThemeContext";
import { getAppTheme } from "@/constants/appTheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: "background" | "text" | "tint" | "icon" | "tabIconDefault" | "tabIconSelected"
) {
  const { isDark } = useTheme();
  const theme = getAppTheme(isDark);
  const colorFromProps = props[isDark ? "dark" : "light"];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    switch (colorName) {
      case "background":
        return theme.background;
      case "text":
        return theme.text;
      case "tint":
      case "tabIconSelected":
        return theme.tabActive;
      case "icon":
      case "tabIconDefault":
        return theme.iconMuted;
      default:
        return theme.background;
    }
  }
}
