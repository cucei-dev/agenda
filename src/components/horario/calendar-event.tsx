import type { CalendarEventData } from "@/lib/types";
import { MaterialIcon } from "@/components/ui/material-icon";
import { colorSchemeMap } from "@/data/mock";

interface CalendarEventProps {
  event: CalendarEventData;
}

export function CalendarEvent({ event }: CalendarEventProps) {
  const colors = colorSchemeMap[event.colorScheme];

  if (event.colorScheme === "workshop") {
    return (
      <div className="absolute inset-x-2 top-2 h-[180px] bg-tertiary-container/30 border-2 border-dashed border-tertiary/20 rounded-xl p-3 flex items-center justify-center">
        <p className="text-tertiary font-bold text-[9px] uppercase tracking-tighter rotate-90 text-center">
          Taller Extra
        </p>
      </div>
    );
  }

  return (
    <div
      className={`absolute inset-x-2 top-2 h-[80px] ${colors.bg} rounded-xl p-3 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all`}
    >
      <h4
        className={`${colors.text} font-semibold text-[11px] leading-tight line-clamp-2`}
      >
        {event.materia}
      </h4>
      <div
        className={`flex items-center gap-1 ${colors.subtext} text-[10px]`}
      >
        <MaterialIcon name="location_on" className="text-[12px]" />
        <span>{event.aula}</span>
      </div>
    </div>
  );
}
