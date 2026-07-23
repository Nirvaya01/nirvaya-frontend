export const API_BASE_URL = "http://10.174.110.101:5000/api";

export interface SOSResponse {
  success: boolean;
  message: string;
  history?: any;
}

export async function triggerSOS(
  token: string,
  latitude: number,
  longitude: number,
  googleMapsUrl: string,
): Promise<SOSResponse> {
  const response = await fetch(`${API_BASE_URL}/sos`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      latitude,
      longitude,
      googleMapsUrl,
    }),
  });

  const data = await response.json();

  return data;
}
