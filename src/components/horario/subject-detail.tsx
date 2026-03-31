import { MaterialIcon } from "@/components/ui/material-icon";
import type { Subject } from "@/lib/types";
import { ScheduleInfo } from "./schedule-info";

interface SubjectDetailCardProps {
  subject: Subject;
  showDetails?: boolean;
}

export function SubjectDetailCard({
  subject,
  showDetails = true,
}: SubjectDetailCardProps) {
  return (
    <div className="space-y-4">
      <div className="bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between border-l-4 border-primary">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-label">
            Materia
          </span>
          <h3 className="font-headline text-xl font-bold text-on-surface">
            {subject.nombre}
          </h3>
          <p className="text-sm text-on-surface-variant">{subject.profesor}</p>
        </div>
        <div className="text-right">
          <span className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant font-label">
            NRC
          </span>
          <span className="text-lg font-mono font-bold text-secondary">
            {subject.nrc}
          </span>
        </div>
      </div>

      {showDetails && subject.clases.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-5 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <MaterialIcon name="group" className="text-xl" />
              <span className="font-bold text-sm uppercase tracking-wider">
                Cupos
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm border-b border-outline-variant/15 pb-2">
                <span className="text-on-surface-variant">Disponibles</span>
                <span className="font-semibold">{subject.disponibles}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Total</span>
                <span className="font-semibold">{subject.cuposTotales}</span>
              </div>
            </div>
          </div>
          <ScheduleInfo horarios={subject.clases} />
        </div>
      )}
    </div>
  );
}
