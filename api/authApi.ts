export const API_BASE_URL = "http://10.174.110.101:5000/api";

// USER TYPE

export interface User {
  _id: string;
  name: string;
  email: string;
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
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
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

  const data = await response.json();

  console.log("Signup Response:", data);

  return data;
}

// LOGIN API
// POST /auth/login

export async function loginUser(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  return data;
}

// GET CURRENT USER
// GET /auth/me
// Protected Route

export async function getMe(token: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
}

// TEST AUTH
// GET /auth/test
// Protected Route

export async function testAuth(token: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/test`, {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
}
