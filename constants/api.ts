import { Coordinates } from '../hooks/useCurrentLocation';

// TODO: replace with your real backend base URL
export const API_BASE_URL = 'https://your-backend-url.com';

export type SosResponse = {
  success: boolean;
  message?: string;
};

export async function sendSosAlert(coords: Coordinates): Promise<SosResponse> {
  const response = await fetch(`${API_BASE_URL}/alerts/sos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      latitude: coords.latitude,
      longitude: coords.longitude,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || `SOS request failed with status ${response.status}`);
  }

  return response.json();
}