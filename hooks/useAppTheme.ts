import { useTheme } from "@/Context/ThemeContext";
import { getAppTheme } from "@/constants/appTheme";

export function useAppTheme() {
  const { isDark } = useTheme();

  return getAppTheme(isDark);
}
