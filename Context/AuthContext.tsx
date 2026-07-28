import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { loginUser, signupUser, User } from "../api/authApi";
import { getProfile } from "../api/profileApi";

type AuthContextType = {
  user: User | null;

  token: string | null;

  isLoggedIn: boolean;

  isLoading: boolean;

  login: (email: string, password: string) => Promise<boolean>;

  signup: (name: string, email: string, password: string) => Promise<boolean>;

  logout: () => Promise<void>;

  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const checkLoginStatus = useCallback(async () => {
    try {
      const savedToken = await AsyncStorage.getItem("accessToken");

      const savedUser = await AsyncStorage.getItem("user");

      if (savedToken && savedUser) {
        setToken(savedToken);

        setUser(JSON.parse(savedUser));

        setIsLoggedIn(true);

        // Get latest user data from backend
        const profile = await getProfile(savedToken);

        const updatedUser = {
          _id: profile.id,
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          gender: profile.gender,
          dob: profile.dob,
          profilePicture: profile.profilePicture,
        };

        setUser(updatedUser);

        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.log("Auth restore error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const login = useCallback(async (email: string, password: string) => {
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
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
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
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      if (!token) return;

      const profile = await getProfile(token);

      console.log("PROFILE FROM API:", profile);

      const updatedUser = {
        _id: profile.id,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        gender: profile.gender,
        dob: profile.dob,
        profilePicture: profile.profilePicture,
      };

      setUser(updatedUser);

      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.log("Refresh profile error:", error);
    }
  }, [token]);

  const logout = useCallback(async () => {
    await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);

    setToken(null);

    setUser(null);

    setIsLoggedIn(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoggedIn,
      isLoading,
      login,
      signup,
      logout,
      refreshProfile,
    }),
    [user, token, isLoggedIn, isLoading, login, signup, logout, refreshProfile],
  );

  return (
    <AuthContext.Provider value={value}>
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
