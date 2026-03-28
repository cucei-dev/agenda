import { MaterialIcon } from "@/components/ui/material-icon";

interface ScheduleInfoProps {
  horarios: { dias: string; hora: string }[];
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
            key={`${h.dias}-${h.hora}`}
            className="flex justify-between items-center text-sm border-b border-outline-variant/15 pb-2 last:border-b-0"
          >
            <span className="text-on-surface-variant">{h.dias}</span>
            <span className="font-semibold">{h.hora}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
