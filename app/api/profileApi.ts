const BASE_URL = "http://192.168.1.4:5000";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  profilePicture?: string;
  dob?: string;
  gender?: string;
  createdAt: string;
  updatedAt: string;
}

let AUTH_TOKEN = "";

export function setAuthToken(token: string) {
  AUTH_TOKEN = token;
}

export async function loginAndGetToken(
  email: string,
  password: string
): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }

  const data = await res.json();
  AUTH_TOKEN = data.token;
  return data.token;
}

export async function getProfile(): Promise<UserProfile> {
  const res = await fetch(`${BASE_URL}/api/profile`, {
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to load profile");
  }

  return res.json();
}

export async function updateProfile(
  updates: Partial<
    Pick<UserProfile, "fullName" | "phone" | "profilePicture" | "dob" | "gender">
  >
): Promise<UserProfile> {
  const res = await fetch(`${BASE_URL}/api/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update profile");
  }

  return res.json();
}