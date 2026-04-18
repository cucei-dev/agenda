import { MaterialIcon } from "@/components/ui/material-icon";
import type { SubjectClase } from "@/lib/types";

interface ScheduleInfoProps {
  horarios: SubjectClase[];
}

export function ScheduleInfo({ horarios }: ScheduleInfoProps) {
  return (
    <div className="bg-surface-container-low p-5 rounded-xl space-y-3">
      <div className="flex items-center gap-2 text-primary">
        <MaterialIcon name="schedule" className="text-xl" />
        <span className="font-bold text-sm uppercase tracking-wider">
          Horarios
        </span>
      </div>
      <div className="space-y-2">
        {horarios.map((h) => (
          <div
            key={`${h.dia}-${h.horaInicio}-${h.horaFin}`}
            className="border-b border-outline-variant/15 pb-2 last:border-b-0"
          >
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-on-surface-variant">{h.dia}</span>
              <span className="font-semibold">{`${h.horaInicio} - ${h.horaFin}`}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-on-surface-variant">
              <MaterialIcon name="location_on" className="text-base text-secondary" />
              <span>
                {h.aula
                  ? h.edificio
                    ? `${h.aula} · ${h.edificio}`
                    : h.aula
                  : "Aula por confirmar"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
