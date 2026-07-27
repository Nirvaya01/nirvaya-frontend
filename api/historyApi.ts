const API_BASE_URL = "http://192.168.1.68:5000/api";

export async function getHistory(token: string) {

  const response = await fetch(`${API_BASE_URL}/history`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  console.log("History API response:", data);

  if (!response.ok) {
    throw new Error(data.message || "Failed to get history");
  }

  return data;
}