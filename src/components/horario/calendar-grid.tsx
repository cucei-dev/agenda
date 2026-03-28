import type { DayOfWeek } from "@/lib/types";
import {
  CalendarEvent,
  type ScheduleCalendarEvent,
} from "./calendar-event";

const CALENDAR_DAYS: { short: DayOfWeek }[] = [
  { short: "Lun" },
  { short: "Mar" },
  { short: "Mié" },
  { short: "Jue" },
  { short: "Vie" },
  { short: "Sáb" },
];

function generateTimeSlots(
  events: ScheduleCalendarEvent[],
): { label: string; hour: number }[] {
  if (events.length === 0) {
    return Array.from({ length: 14 }, (_, i) => ({
      label: `${String(7 + i).padStart(2, "0")}:00`,
      hour: 7 + i,
    }));
  }

  let minH = 24;
  let maxH = 0;
  for (const e of events) {
    const startH = parseInt(e.horaInicio.split(":")[0], 10);
    const endH = parseInt(e.horaFin.split(":")[0], 10);
    const endM = parseInt(e.horaFin.split(":")[1], 10);
    if (startH < minH) minH = startH;
    const endCeil = endM > 0 ? endH + 1 : endH;
    if (endCeil > maxH) maxH = endCeil;
  }

  minH = Math.max(7, minH);
  maxH = Math.max(minH + 1, Math.min(21, maxH));

  const slots: { label: string; hour: number }[] = [];
  for (let h = minH; h < maxH; h++) {
    const hour12 = h > 12 ? h - 12 : h;
    const period = h >= 12 ? "PM" : "AM";
    slots.push({
      label: `${String(hour12).padStart(2, "0")}:00 ${period}`,
      hour: h,
    });
  }
  return slots;
}

/** Maps { dia: DayOfWeek } events to the correct column, including stacking. */
function getEventsForSlot(
  events: (ScheduleCalendarEvent & { dia: DayOfWeek })[],
  day: DayOfWeek,
  slotHour: number,
): (ScheduleCalendarEvent & { dia: DayOfWeek })[] {
  return events.filter((e) => {
    if (e.dia !== day) return false;
    const startH = parseInt(e.horaInicio.split(":")[0], 10);
    return startH === slotHour;
  });
}

export interface CalendarGridProps {
  events: (ScheduleCalendarEvent & { dia: DayOfWeek })[];
}

const SLOT_MINUTES = 60;

export function CalendarGrid({ events }: CalendarGridProps) {
  const timeSlots = generateTimeSlots(events);

  return (
    <div className="min-w-[800px] bg-surface-container-lowest rounded-3xl shadow-[0_8px_24px_rgba(26,28,29,0.04)] p-4 md:p-8">
      {/* Header */}
      <div className="grid grid-cols-7 border-b border-outline-variant/10 pb-6 mb-2">
        <div className="col-span-1" />
        {CALENDAR_DAYS.map((day) => (
          <div key={day.short} className="text-center">
            <span className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant block">
              {day.short}
            </span>
          </div>
        ))}
      </div>

      {/* Time Grid */}
      <div className="relative">
        <div className="space-y-0">
          {timeSlots.map((slot) => (
            <div
              key={slot.hour}
              className="grid grid-cols-7 min-h-[70px] border-b border-outline-variant/5"
            >
              <div className="py-3 text-right pr-4 text-xs font-label text-on-surface-variant/60">
                {slot.label}
              </div>
              {CALENDAR_DAYS.map((day, dayIdx) => {
                const slotEvents = getEventsForSlot(
                  events,
                  day.short,
                  slot.hour,
                );
                const isEvenCol = dayIdx % 2 === 0;
                return (
                  <div
                    key={`${slot.hour}-${day.short}`}
                    className={`relative border-outline-variant/5 ${dayIdx < CALENDAR_DAYS.length - 1 ? "border-r" : ""} ${isEvenCol ? "bg-surface-container-low/30" : ""}`}
                  >
                    {slotEvents.map((event) => (
                      <CalendarEvent
                        key={`${event.nrc}-${event.horaInicio}`}
                        event={event}
                        slotMinutes={SLOT_MINUTES}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
