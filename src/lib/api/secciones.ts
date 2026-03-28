import type { ApiSeccion, ApiPagination } from "@/lib/types";
import { apiFetch } from "./client";

export interface ListSeccionesParams {
  calendarioId: number;
  centroId?: number | null;
  materiaId?: number | null;
  nrc?: string;
  skip?: number;
  limit?: number;
}

export async function listSecciones(
  params: ListSeccionesParams,
): Promise<ApiPagination<ApiSeccion>> {
  return apiFetch<ApiPagination<ApiSeccion>>(
    "/api/v1/secciones/",
    {
      calendario_id: params.calendarioId,
      centro_id: params.centroId ?? null,
      materia_id: params.materiaId ?? null,
      nrc: params.nrc ?? null,
      skip: params.skip ?? 0,
      limit: params.limit ?? 20,
    },
    { next: { revalidate: 3600 } },
  );
}
