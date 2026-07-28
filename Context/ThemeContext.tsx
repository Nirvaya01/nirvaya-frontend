import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getAppTheme } from "@/constants/appTheme";

interface ThemeContextType {
  isDark: boolean;
  isReady: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => Promise<void>;
  theme: ReturnType<typeof getAppTheme>;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  isReady: false,
  toggleTheme: () => {},
  setTheme: async () => {},
  theme: getAppTheme(false),
});

export const ThemeProvider = ({ children }: any) => {
  const [isDark, setIsDark] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("themePreference");

        if (savedTheme !== null) {
          setIsDark(savedTheme === "dark");
        }
      } catch (error) {
        console.log("Theme load error:", error);
      } finally {
        setIsReady(true);
      }
    };

    loadTheme();
  }, []);

  const setTheme = useCallback(async (nextThemeDark: boolean) => {
    setIsDark(nextThemeDark);

    try {
      await AsyncStorage.setItem(
        "themePreference",
        nextThemeDark ? "dark" : "light",
      );
    } catch (error) {
      console.log("Theme save error:", error);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(!isDark);
  }, [isDark, setTheme]);

  const theme = useMemo(() => getAppTheme(isDark), [isDark]);
  const value = useMemo(
    () => ({ isDark, isReady, toggleTheme, setTheme, theme }),
    [isDark, isReady, toggleTheme, setTheme, theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
