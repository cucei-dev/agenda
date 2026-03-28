import type { ApiSeccion, Subject } from "@/lib/types";
import { getCentroDisplayName } from "@/lib/centroMap";

export function seccionToSubject(s: ApiSeccion): Subject {
  const disponibles = s.cupos_disponibles;
  const status = disponibles > 0 ? "disponible" : ("lleno" as const);

  return {
    nrc: s.nrc,
    nombre: s.materia.name,
    profesor: s.profesor?.name ?? "Profesor no asignado",
    creditos: s.materia.creditos,
    cuposTotales: s.cupos,
    disponibles,
    centro: getCentroDisplayName(s.centro.siiau_id),
    status,
  };
}
