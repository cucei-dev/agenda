import type { SubjectDetail } from "@/lib/types";
import { ScheduleInfo } from "./schedule-info";
import { LocationInfo } from "./location-info";

interface SubjectDetailCardProps {
  subject: SubjectDetail;
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

      {showDetails && subject.horarios.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScheduleInfo horarios={subject.horarios} />
          <LocationInfo ubicacion={subject.ubicacion} />
        </div>
      )}
    </div>
  );
}
