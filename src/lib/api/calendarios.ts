import type { ApiCalendario, ApiPagination } from "@/lib/types";
import { apiFetch } from "./client";

export async function listCalendarios(): Promise<ApiCalendario[]> {
  const data = await apiFetch<ApiPagination<ApiCalendario>>(
    "/api/v1/calendarios/",
    { limit: 100 },
    { next: { revalidate: 3600 } },
  );
  return data.results;
}

export function getMostRecentCalendario(
  calendarios: ApiCalendario[],
): ApiCalendario | null {
  if (calendarios.length === 0) return null;
  return calendarios.reduce((latest, c) => (c.id > latest.id ? c : latest));
}
