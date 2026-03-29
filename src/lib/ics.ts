import type { ApiSeccion } from "@/lib/types";
import { getDiaDisplayName } from "@/lib/diaMap";

/**
 * Maps our 1-6 day numbers (Lun–Sáb) to iCalendar BYDAY values.
 * iCal uses: SU, MO, TU, WE, TH, FR, SA
 */
const DIA_TO_ICAL: Record<number, string> = {
  1: "MO",
  2: "TU",
  3: "WE",
  4: "TH",
  5: "FR",
  6: "SA",
};

/**
 * Returns the next occurrence of a given weekday on or after `start`.
 * `isoWeekday`: 1 = Monday … 6 = Saturday
 */
function nextWeekday(start: Date, isoWeekday: number): Date {
  const jsDay = isoWeekday % 7; // convert 1-6(Mon-Sat) → JS 0=Sun convention
  const current = start.getDay();
  const diff = (jsDay - current + 7) % 7;
  const d = new Date(start);
  d.setDate(d.getDate() + diff);
  return d;
}

/** Formats a Date + "HH:MM" / "HH:MM:SS" time string into iCal DTSTART local format */
function toICalDateTime(date: Date, time: string): string {
  const [h, m] = time.split(":").map(Number);
  const y = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${mo}${d}T${String(h).padStart(2, "0")}${String(m).padStart(2, "0")}00`;
}

/** Formats a Date as iCal UNTIL value (end of day) */
function toICalUntil(date: Date): string {
  const y = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${mo}${d}T235959`;
}

function escapeICalText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}@planea.cucei.dev`;
}

/**
 * Generates an ICS (iCalendar) string from an array of ApiSeccion.
 * Each class session becomes a weekly recurring event spanning the semester period.
 */
export function generateICS(secciones: ApiSeccion[]): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Planea UDG//Horario//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Mi Horario UDG",
    "X-WR-TIMEZONE:America/Mexico_City",
  ];

  for (const seccion of secciones) {
    const periodoInicio = seccion.periodo_inicio
      ? new Date(seccion.periodo_inicio)
      : null;
    const periodoFin = seccion.periodo_fin
      ? new Date(seccion.periodo_fin)
      : null;

    // Fallback: if no period dates, use current semester-ish range
    const semesterStart = periodoInicio ?? new Date();
    const semesterEnd = periodoFin ?? (() => {
      const d = new Date();
      d.setMonth(d.getMonth() + 4);
      return d;
    })();

    for (const clase of seccion.clases) {
      if (
        clase.dia === null ||
        clase.hora_inicio === null ||
        clase.hora_fin === null
      )
        continue;

      const icalDay = DIA_TO_ICAL[clase.dia];
      if (!icalDay) continue;

      const firstOccurrence = nextWeekday(semesterStart, clase.dia);
      const dtStart = toICalDateTime(firstOccurrence, clase.hora_inicio);
      const dtEnd = toICalDateTime(firstOccurrence, clase.hora_fin);
      const until = toICalUntil(semesterEnd);

      const diaName = getDiaDisplayName(clase.dia);
      const horaInicio = clase.hora_inicio.slice(0, 5);
      const horaFin = clase.hora_fin.slice(0, 5);
      const profesor = seccion.profesor?.name ?? "Profesor no asignado";

      lines.push("BEGIN:VEVENT");
      lines.push(`UID:${uid()}`);
      lines.push(`DTSTAMP:${toICalDateTime(new Date(), "00:00")}`);
      lines.push(`DTSTART;TZID=America/Mexico_City:${dtStart}`);
      lines.push(`DTEND;TZID=America/Mexico_City:${dtEnd}`);
      lines.push(`RRULE:FREQ=WEEKLY;BYDAY=${icalDay};UNTIL=${until}`);
      lines.push(`SUMMARY:${escapeICalText(seccion.materia.name)}`);
      lines.push(
        `DESCRIPTION:${escapeICalText(`NRC: ${seccion.nrc}\\nProfesor: ${profesor}\\n${diaName} ${horaInicio}–${horaFin}`)}`,
      );
      lines.push("END:VEVENT");
    }
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

/** Triggers a browser download of the ICS file. */
export function downloadICS(secciones: ApiSeccion[]): void {
  const content = generateICS(secciones);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "horario-udg.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
