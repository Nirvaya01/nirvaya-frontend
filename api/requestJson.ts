type JsonResponseOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};

export async function requestJson<T>(
  url: string,
  options: JsonResponseOptions,
): Promise<T> {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data as T;
}
