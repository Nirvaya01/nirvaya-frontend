import { API_BASE_URL } from "./baseUrl";

export interface ProfileResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  dob: string | null;
  profilePicture: string;
  createdAt?: string;
  updatedAt?: string;
}

// =========================
// GET PROFILE
// =========================

export async function getProfile(token: string): Promise<ProfileResponse> {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("Profile fetch error:", data);

    throw new Error(data.message || "Failed to fetch profile");
  }

  return data.user || data;
}
// =========================
// UPDATE PROFILE
// =========================

export async function updateProfile(
  token: string,
  profile: {
    name?: string;
    phone?: string;
    gender?: string;
    dob?: string;
    profilePicture?: string;
  },
): Promise<ProfileResponse> {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(profile),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("Profile update error:", data);

    throw new Error(data.message || "Failed to update profile");
  }

  return data.user || data;
}
