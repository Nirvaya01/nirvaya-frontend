
// TODO: replace with your real backend base URL
export const API_BASE_URL = 'http://localhost:5000/api';

export type SosResponse = {
  success: boolean;
  message?: string;
};

// =========================
// Emergency Contact APIs
// =========================

export async function getEmergencyContacts(token: string) {
  const response = await fetch(`${API_BASE_URL}/emergency-contacts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function createEmergencyContact(
  token: string,
  data: {
    name: string;
    phone: string;
    relationship: string;
  }
) {
  const response = await fetch(`${API_BASE_URL}/emergency-contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function updateEmergencyContact(
  token: string,
  id: string,
  data: {
    name: string;
    phone: string;
    relationship: string;
  }
) {
  const response = await fetch(
    `${API_BASE_URL}/emergency-contacts/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
}

export async function deleteEmergencyContact(
  token: string,
  id: string
) {
  const response = await fetch(
    `${API_BASE_URL}/emergency-contacts/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}