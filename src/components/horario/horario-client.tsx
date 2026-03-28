"use client";

import { useScheduleStore } from "@/lib/schedule-store";
import { getScheduleColor } from "@/lib/schedule-colors";
import { getDiaDisplayName, formatHora } from "@/lib/diaMap";
import type { DayOfWeek } from "@/lib/types";
import { CalendarGrid } from "./calendar-grid";
import type { ScheduleCalendarEvent } from "./calendar-event";
import { SidebarSubject } from "./sidebar-subject";
import { Legend } from "./legend";
import { MaterialIcon } from "@/components/ui/material-icon";
import Link from "next/link";

export function HorarioClient() {
  const { sections, removeSection, clearAll } = useScheduleStore();

  const calendarEvents: (ScheduleCalendarEvent & { dia: DayOfWeek })[] = [];
  for (const entry of sections) {
    const color = getScheduleColor(entry.colorIndex);
    for (const clase of entry.seccion.clases) {
      if (
        clase.dia === null ||
        clase.hora_inicio === null ||
        clase.hora_fin === null
      )
        continue;
      calendarEvents.push({
        materia: entry.seccion.materia.name,
        horaInicio: formatHora(clase.hora_inicio),
        horaFin: formatHora(clase.hora_fin),
        nrc: entry.seccion.nrc,
        color,
        dia: getDiaDisplayName(clase.dia) as DayOfWeek,
      });
    }
  }

  const totalCreditos = sections.reduce(
    (sum, e) => sum + e.seccion.materia.creditos,
    0,
  );

  const legendItems = sections.map((e) => ({
    label: e.seccion.materia.name,
    color: getScheduleColor(e.colorIndex),
  }));

  if (sections.length === 0) {
    return (
      <div className="py-24 text-center">
        <MaterialIcon
          name="calendar_month"
          className="text-6xl text-on-surface-variant/30 mb-4"
        />
        <h2 className="font-headline font-bold text-2xl text-on-surface mb-2">
          Tu horario está vacío
        </h2>
        <p className="text-on-surface-variant max-w-md mx-auto mb-8">
          Busca materias en el buscador y agrégalas a tu horario para
          visualizarlas aquí.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded-md font-medium text-sm transition-all active:scale-95 shadow-lg shadow-primary/20"
        >
          <MaterialIcon name="search" className="text-sm" />
          Ir al Buscador
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Sidebar */}
      <aside className="lg:col-span-3 space-y-6">
        <div className="bg-surface-container-low p-6 rounded-xl">
          <h2 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
            <MaterialIcon name="book" className="text-primary" />
            Carga Académica
          </h2>
          <div className="space-y-4">
            {sections.map((entry) => (
              <SidebarSubject
                key={entry.seccion.nrc}
                nombre={entry.seccion.materia.name}
                nrc={entry.seccion.nrc}
                creditos={entry.seccion.materia.creditos}
                profesor={
                  entry.seccion.profesor?.name ?? "Profesor no asignado"
                }
                color={getScheduleColor(entry.colorIndex)}
                onRemove={() => removeSection(entry.seccion.nrc)}
              />
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-outline-variant/15">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-on-surface-variant font-label uppercase tracking-widest">
                  Total Créditos
                </p>
                <p className="text-3xl font-headline font-extrabold text-primary">
                  {totalCreditos}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearAll}
                  className="bg-surface-container-high text-on-surface-variant px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 hover:bg-error-container hover:text-on-error-container transition-colors"
                  title="Limpiar horario"
                >
                  <MaterialIcon name="delete" className="text-sm" />
                </button>
                <Link
                  href="/"
                  className="bg-gradient-to-br from-primary to-primary-container text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md flex items-center gap-2"
                >
                  <MaterialIcon name="add" className="text-sm" />
                  Agregar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Calendar */}
      <div className="lg:col-span-9 overflow-x-auto pb-4">
        <CalendarGrid events={calendarEvents} />
        <Legend items={legendItems} />
      </div>
    </div>
  );
}
