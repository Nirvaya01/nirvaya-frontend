import { API_BASE_URL } from "./baseUrl";

export type CountdownOption = 3 | 5 | 10;

export interface EmergencyPreferences {
  userId?: string;
  countdown: CountdownOption;
  notificationsEnabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PreferencesResponse {
  success?: boolean;
  message?: string;
  preferences?: EmergencyPreferences;
  data?: EmergencyPreferences;
}

async function requestPreferences<T>(
  url: string,
  options: RequestInit,
): Promise<T> {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load preferences");
  }

  return data as T;
}

export async function getPreferences(
  token: string,
): Promise<EmergencyPreferences | null> {
  const data = await requestPreferences<PreferencesResponse>(
    `${API_BASE_URL}/preferences`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.preferences ?? data.data ?? null;
}

export async function savePreferences(
  token: string,
  preferences: EmergencyPreferences,
): Promise<EmergencyPreferences> {
  const data = await requestPreferences<PreferencesResponse>(
    `${API_BASE_URL}/preferences`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(preferences),
    },
  );

  const saved = data.preferences ?? data.data;

  if (!saved) {
    throw new Error("Preferences response missing data");
  }

  return saved;
}
