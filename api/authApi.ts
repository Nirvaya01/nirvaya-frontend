import { API_BASE_URL } from "./baseUrl";
import { requestJson } from "./requestJson";

// USER TYPE
export interface User {
  _id: string;
  id?: string;
}

// AUTH RESPONSE TYPE

export interface AuthResponse {
  success: boolean;

  message?: string;

  accessToken?: string;

  refreshToken?: string;

  user?: User;
}

// SIGNUP API
// POST /auth/signup

// SIGNUP API
// POST /api/auth/register

export async function signupUser(
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> {
  return requestJson<AuthResponse>(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
}

// LOGIN API
// POST /auth/login

export async function loginUser(
  email: string,
  password: string,
): Promise<AuthResponse> {
  return requestJson<AuthResponse>(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

// GET CURRENT USER
// GET /auth/me
// Protected Route

export async function getMe(token: string): Promise<AuthResponse> {
  return requestJson<AuthResponse>(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// TEST AUTH
// GET /auth/test
// Protected Route

export async function testAuth(token: string): Promise<AuthResponse> {
  return requestJson<AuthResponse>(`${API_BASE_URL}/auth/test`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
