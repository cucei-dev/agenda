import type { ApiAula, ApiSeccion, Subject, SubjectClase } from "@/lib/types";
import { getCentroDisplayName } from "@/lib/centroMap";
import { getDiaDisplayName, formatHora } from "@/lib/diaMap";

export function seccionToSubject(
  s: ApiSeccion,
  aulasById: Readonly<Record<number, ApiAula>> = {},
): Subject {
  const disponibles = s.cupos_disponibles;
  const status = disponibles > 0 ? "disponible" : ("lleno" as const);

  const clases: SubjectClase[] = s.clases
    .filter((c) => c.dia !== null && c.hora_inicio !== null && c.hora_fin !== null)
    .map((c) => {
      const aula = c.aula_id !== null ? aulasById[c.aula_id] : undefined;
      return {
        dia: getDiaDisplayName(c.dia!),
        horaInicio: formatHora(c.hora_inicio!),
        horaFin: formatHora(c.hora_fin!),
        aula: aula?.name ?? null,
        edificio: aula?.edificio?.name ?? null,
      };
    });

  return {
    nrc: s.nrc,
    nombre: s.materia.name,
    profesor: s.profesor?.name ?? "Profesor no asignado",
    creditos: s.materia.creditos,
    cuposTotales: s.cupos,
    disponibles,
    centro: getCentroDisplayName(s.centro.siiau_id, s.centro.name),
    status,
    clases,
  };
}
