import type { ApiAula } from "@/lib/types";
import { apiFetch } from "./client";

export async function getAulaById(
  aulaId: number,
  isClient = false,
): Promise<ApiAula> {
  return apiFetch<ApiAula>(
    `/api/v1/aulas/${aulaId}`,
    undefined,
    { next: { revalidate: 3600 } },
    isClient,
  );
}
