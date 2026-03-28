import type { CalendarEventData, DayOfWeek } from "@/lib/types";
import { CalendarEvent } from "./calendar-event";
import { calendarDays, timeSlots, calendarEvents } from "@/data/mock";

function getEventForSlot(
  events: CalendarEventData[],
  day: DayOfWeek,
  hour: string
): CalendarEventData | undefined {
  return events.find((e) => e.dia === day && e.horaInicio === hour);
}

export function CalendarGrid() {
  return (
    <div className="min-w-[800px] bg-surface-container-lowest rounded-3xl shadow-[0_8px_24px_rgba(26,28,29,0.04)] p-4 md:p-8">
      {/* Header */}
      <div className="grid grid-cols-7 border-b border-outline-variant/10 pb-6 mb-2">
        <div className="col-span-1" />
        {calendarDays.map((day) => (
          <div key={day.short} className="text-center">
            <span className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant block mb-1">
              {day.short}
            </span>
            <span className="font-headline font-bold text-lg">{day.date}</span>
          </div>
        ))}
      </div>

      {/* Time Grid */}
      <div className="relative">
        {/* Current time indicator */}
        <div className="absolute top-[320px] left-0 right-0 h-px bg-tertiary z-20 flex items-center">
          <span className="bg-tertiary text-white text-[9px] font-bold px-2 py-0.5 rounded-full ml-10">
            AHORA
          </span>
        </div>

        <div className="space-y-0">
          {timeSlots.map((slot) => (
            <div
              key={slot.hour}
              className="grid grid-cols-7 min-h-[100px] border-b border-outline-variant/5"
            >
              <div className="py-4 text-right pr-4 text-xs font-label text-on-surface-variant/60">
                {slot.label}
              </div>
              {calendarDays.map((day, dayIdx) => {
                const event = getEventForSlot(
                  calendarEvents,
                  day.short as DayOfWeek,
                  slot.hour
                );
                const isEvenCol = dayIdx % 2 === 0;
                return (
                  <div
                    key={`${slot.hour}-${day.short}`}
                    className={`relative border-r border-outline-variant/5 ${isEvenCol ? "bg-surface-container-low/30" : ""}`}
                  >
                    {event && <CalendarEvent event={event} />}
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
