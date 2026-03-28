import type { ApiSeccion, Subject, SubjectClase } from "@/lib/types";
import { getCentroDisplayName } from "@/lib/centroMap";
import { getDiaDisplayName, formatHora } from "@/lib/diaMap";

export function seccionToSubject(s: ApiSeccion): Subject {
  const disponibles = s.cupos_disponibles;
  const status = disponibles > 0 ? "disponible" : ("lleno" as const);

  const clases: SubjectClase[] = s.clases
    .filter((c) => c.dia !== null && c.hora_inicio !== null && c.hora_fin !== null)
    .map((c) => ({
      dia: getDiaDisplayName(c.dia!),
      horaInicio: formatHora(c.hora_inicio!),
      horaFin: formatHora(c.hora_fin!),
    }));

  return {
    nrc: s.nrc,
    nombre: s.materia.name,
    profesor: s.profesor?.name ?? "Profesor no asignado",
    creditos: s.materia.creditos,
    cuposTotales: s.cupos,
    disponibles,
    centro: getCentroDisplayName(s.centro.siiau_id),
    status,
    clases,
  };
}
