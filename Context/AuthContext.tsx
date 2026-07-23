import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

import { loginUser, signupUser, User } from "../api/authApi";

type AuthContextType = {
  user: User | null;

  token: string | null;

  isLoggedIn: boolean;

  isLoading: boolean;

  login: (email: string, password: string) => Promise<boolean>;

  signup: (name: string, email: string, password: string) => Promise<boolean>;

  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // =========================
  // CHECK STORED LOGIN
  // =========================

  const checkLoginStatus = async () => {
    try {
      const savedToken = await AsyncStorage.getItem("accessToken");

      const savedUser = await AsyncStorage.getItem("user");

      if (savedToken && savedUser) {
        setToken(savedToken);

        setUser(JSON.parse(savedUser));

        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("Auth restore error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // LOGIN
  // =========================

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);

      if (response.success) {
        await AsyncStorage.setItem("accessToken", response.accessToken!);

        await AsyncStorage.setItem("refreshToken", response.refreshToken!);

        await AsyncStorage.setItem("user", JSON.stringify(response.user));

        setToken(response.accessToken!);

        setUser(response.user!);

        setIsLoggedIn(true);

        return true;
      }

      return false;
    } catch (error) {
      console.log("Login error:", error);

      return false;
    }
  };

  // =========================
  // SIGNUP
  // =========================

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await signupUser(name, email, password);

      if (response.success) {
        return true;
      }

      return false;
    } catch (error) {
      console.log("Signup error:", error);

      return false;
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = async () => {
    await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);

    setToken(null);

    setUser(null);

    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        token,

        isLoggedIn,

        isLoading,

        login,

        signup,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
