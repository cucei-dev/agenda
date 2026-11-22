import type { ApiCentro, ApiPagination } from "@/lib/types";
import { apiFetch } from "./client";

export async function listCentros(): Promise<ApiCentro[]> {
  const data = await apiFetch<ApiPagination<ApiCentro>>(
    "/api/v1/centros/",
    { limit: 100 },
    { next: { revalidate: 3600 } },
  );
  return data.results;
}
