import type { ApiMateria, ApiPagination } from "@/lib/types";
import { apiFetch } from "./client";

export async function searchMateriasByClave(
  clave: string,
  isClient = false
): Promise<ApiMateria | null> {
  const data = await apiFetch<ApiPagination<ApiMateria>>("/api/v1/materias/", {
    clave,
    limit: 1,
  }, undefined, isClient);
  return data.results[0] ?? null;
}

export async function listMaterias(
  params: { search?: string; skip?: number; limit?: number },
  isClient = false
): Promise<ApiPagination<ApiMateria>> {
  return apiFetch<ApiPagination<ApiMateria>>(
    "/api/v1/materias/",
    {
      search: params.search,
      skip: params.skip ?? 0,
      limit: params.limit ?? 20,
    },
    undefined,
    isClient
  );
}
