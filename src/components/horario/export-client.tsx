"use client";

import { useRef, useCallback, useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import type { ApiSeccion, Subject, DayOfWeek } from "@/lib/types";
import { getScheduleColor } from "@/lib/schedule-colors";
import { getDiaDisplayName, formatHora } from "@/lib/diaMap";
import { downloadICS } from "@/lib/ics";
import { useScheduleStore } from "@/lib/schedule-store";
import { MaterialIcon } from "@/components/ui/material-icon";
import { CalendarGrid } from "./calendar-grid";
import type { ScheduleCalendarEvent } from "./calendar-event";
import { Legend } from "./legend";
import { SubjectDetailCard } from "./subject-detail";
import { SummaryPanel } from "./summary-panel";

interface ExportClientProps {
  subjects: Subject[];
  secciones: ApiSeccion[];
  totalCreditos: number;
  missingSectionsCount?: number;
}

export function ExportClient({
  subjects,
  secciones,
  totalCreditos,
  missingSectionsCount = 0,
}: Readonly<ExportClientProps>) {
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);
  const { replaceSections } = useScheduleStore();
  const [isImporting, startImportTransition] = useTransition();
  const [copyLinkLabel, setCopyLinkLabel] = useState("Copiar enlace");

  // Build calendar events from raw API sections (same logic as HorarioClient)
  const calendarEvents: (ScheduleCalendarEvent & { dia: DayOfWeek })[] = [];
  secciones.forEach((seccion, idx) => {
    const color = getScheduleColor(idx);
    for (const clase of seccion.clases) {
      if (
        clase.dia === null ||
        clase.hora_inicio === null ||
        clase.hora_fin === null
      )
        continue;
      calendarEvents.push({
        materia: seccion.materia.name,
        horaInicio: formatHora(clase.hora_inicio),
        horaFin: formatHora(clase.hora_fin),
        nrc: seccion.nrc,
        color,
        dia: getDiaDisplayName(clase.dia) as DayOfWeek,
      });
    }
  });

  const legendItems = secciones.map((s, idx) => ({
    label: s.materia.name,
    color: getScheduleColor(idx),
  }));

  const handleDownloadPDF = useCallback(async () => {
    const el = gridRef.current;
    if (!el) return;

    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import("html2canvas-pro"),
      import("jspdf"),
    ]);

    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#fffbfe", // surface color
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const availW = pdfW - margin * 2;
    const availH = pdfH - margin * 2;

    const imgRatio = canvas.width / canvas.height;
    let w = availW;
    let h = w / imgRatio;
    if (h > availH) {
      h = availH;
      w = h * imgRatio;
    }

    const x = (pdfW - w) / 2;
    const y = (pdfH - h) / 2;

    pdf.addImage(imgData, "PNG", x, y, w, h);
    pdf.save("horario-udg.pdf");
  }, []);

  const handleExportCalendar = useCallback(() => {
    downloadICS(secciones);
  }, [secciones]);

  const handleImportSchedule = useCallback(() => {
    startImportTransition(() => {
      replaceSections(secciones);
      router.push("/horario");
    });
  }, [replaceSections, router, secciones]);

  const handleCopyLink = useCallback(async () => {
    try {
      await globalThis.navigator.clipboard.writeText(globalThis.location.href);
      setCopyLinkLabel("Enlace copiado");
      globalThis.setTimeout(() => setCopyLinkLabel("Copiar enlace"), 2200);
    } catch {
      setCopyLinkLabel("No se pudo copiar");
      globalThis.setTimeout(() => setCopyLinkLabel("Copiar enlace"), 2200);
    }
  }, []);

  return (
    <>
      {missingSectionsCount > 0 && (
        <div className="mb-8 rounded-2xl border border-tertiary/20 bg-tertiary-container px-5 py-4 text-sm text-on-tertiary-container">
          <div className="flex items-start gap-3">
            <MaterialIcon name="info" className="mt-0.5" />
            <p>
              {missingSectionsCount}{" "}
              {missingSectionsCount === 1 ? "materia no existe" : "materias no existen"}{" "}
              en el calendario activo y no se incluirán al cargar este horario.
            </p>
          </div>
        </div>
      )}

      {/* Calendar grid preview */}
      <section className="mb-12">
        <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-6">
          Vista Semanal
        </h2>
        <div ref={gridRef} className="overflow-x-auto pb-4">
          <CalendarGrid events={calendarEvents} />
          <Legend items={legendItems} />
          <span className="font-headline font-extrabold text-primary tracking-tight text-2xl mt-6 block text-center">
            agenda.cucei.dev
          </span>
        </div>
      </section>

      {/* Subject detail cards + summary panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          {subjects.map((subject) => (
            <SubjectDetailCard key={subject.nrc} subject={subject} />
          ))}
        </div>
        <SummaryPanel
          totalCreditos={totalCreditos}
          onImportSchedule={handleImportSchedule}
          onDownloadPDF={handleDownloadPDF}
          onExportCalendar={handleExportCalendar}
          onCopyLink={handleCopyLink}
          copyLinkLabel={copyLinkLabel}
          importDisabled={secciones.length === 0 || isImporting}
          importLabel={isImporting ? "Cargando..." : "Cargar en Mi Horario"}
        />
      </div>
    </>
  );
}
