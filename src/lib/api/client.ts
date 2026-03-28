const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.cucei.dev";

export async function apiFetch<T>(
  path: string,
  params?: Record<string, string | number | null | undefined>,
  options?: RequestInit,
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const res = await fetch(url.toString(), {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });

  if (!res.ok) {
    throw new Error(`SIIAPI error ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
