import { MaterialIcon } from "@/components/ui/material-icon";
import type { ScheduleColorScheme } from "@/lib/types";

export interface ScheduleCalendarEvent {
  materia: string;
  horaInicio: string;
  horaFin: string;
  nrc: string;
  color: ScheduleColorScheme;
}

interface CalendarEventProps {
  event: ScheduleCalendarEvent;
  slotMinutes: number;
}

export function CalendarEvent({ event, slotMinutes }: CalendarEventProps) {
  const [startH, startM] = event.horaInicio.split(":").map(Number);
  const [endH, endM] = event.horaFin.split(":").map(Number);
  const durationMin = endH * 60 + endM - (startH * 60 + startM);

  const heightPercent = (durationMin / slotMinutes) * 100;

  return (
    <div
      className="absolute inset-x-1 top-0 rounded-xl p-2 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all overflow-hidden border"
      style={{
        height: `${heightPercent}%`,
        backgroundColor: event.color.bg,
        color: event.color.text,
        borderColor: event.color.border,
      }}
    >
      <h4 className="font-semibold text-[11px] leading-tight line-clamp-2">
        {event.materia}
      </h4>
      <div className="flex items-center gap-1 text-[10px] opacity-80">
        <MaterialIcon name="schedule" className="text-[12px]" />
        <span>
          {event.horaInicio}–{event.horaFin}
        </span>
      </div>
    </div>
  );
}
