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
