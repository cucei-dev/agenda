"use client";

import { useSyncExternalStore, useCallback } from "react";
import type { ApiSeccion, ApiClase, ScheduleEntry } from "./types";
import { formatHora } from "./diaMap";

const STORAGE_KEY = "planea-horario";

// ── Helpers ─────────────────────────────────────────────────────────────────

function readFromStorage(): ScheduleEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ScheduleEntry[]) : [];
  } catch {
    return [];
  }
}

function writeToStorage(entries: ScheduleEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  cachedSnapshot = entries; // update cache with new reference before notifying
  listeners.forEach((fn) => fn());
}

/** Convert "HH:MM" or "HH:MM:SS" to minutes since midnight. */
function toMinutes(time: string): number {
  const clean = formatHora(time);
  const [h, m] = clean.split(":").map(Number);
  return h * 60 + m;
}

/** True if two time ranges on the same day overlap. */
function rangesOverlap(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
): boolean {
  const a0 = toMinutes(aStart);
  const a1 = toMinutes(aEnd);
  const b0 = toMinutes(bStart);
  const b1 = toMinutes(bEnd);
  return a0 < b1 && b0 < a1;
}

/** Checks if a class has valid scheduling data. */
function isScheduledClass(c: ApiClase): boolean {
  return c.dia !== null && c.hora_inicio !== null && c.hora_fin !== null;
}

// ── External store (useSyncExternalStore pattern) ───────────────────────────

type Listener = () => void;
const listeners = new Set<Listener>();

/** Cached snapshot — only replaced when writeToStorage is called. */
let cachedSnapshot: ScheduleEntry[] | null = null;

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): ScheduleEntry[] {
  if (cachedSnapshot === null) {
    cachedSnapshot = readFromStorage();
  }
  return cachedSnapshot;
}

const EMPTY_ENTRIES: ScheduleEntry[] = [];

function getServerSnapshot(): ScheduleEntry[] {
  return EMPTY_ENTRIES;
}

// ── Conflict detection ──────────────────────────────────────────────────────

export interface ConflictInfo {
  existingNrc: string;
  existingMateria: string;
  dia: number;
  horaInicio: string;
  horaFin: string;
}

function findConflicts(
  newSeccion: ApiSeccion,
  existing: ScheduleEntry[],
): ConflictInfo | null {
  const newClasses = newSeccion.clases.filter(isScheduledClass);

  for (const entry of existing) {
    const entryClasses = entry.seccion.clases.filter(isScheduledClass);

    for (const nc of newClasses) {
      for (const ec of entryClasses) {
        if (nc.dia === ec.dia) {
          if (
            rangesOverlap(
              nc.hora_inicio!,
              nc.hora_fin!,
              ec.hora_inicio!,
              ec.hora_fin!,
            )
          ) {
            return {
              existingNrc: entry.seccion.nrc,
              existingMateria: entry.seccion.materia.name,
              dia: nc.dia!,
              horaInicio: formatHora(nc.hora_inicio!),
              horaFin: formatHora(nc.hora_fin!),
            };
          }
        }
      }
    }
  }

  return null;
}

// ── Actions ─────────────────────────────────────────────────────────────────

function getNextColorIndex(entries: ScheduleEntry[]): number {
  if (entries.length === 0) return 0;
  const usedIndices = new Set(entries.map((e) => e.colorIndex));
  for (let i = 0; i < 8; i++) {
    if (!usedIndices.has(i)) return i;
  }
  return (Math.max(...entries.map((e) => e.colorIndex)) + 1) % 8;
}

function replaceSections(secciones: ApiSeccion[]) {
  const uniqueSections = Array.from(
    new Map(secciones.map((seccion) => [seccion.nrc, seccion])).values(),
  );
  const entries = uniqueSections.reduce<ScheduleEntry[]>((acc, seccion) => {
    acc.push({
      seccion,
      colorIndex: getNextColorIndex(acc),
    });
    return acc;
  }, []);
  writeToStorage(entries);
}

export type AddResult =
  | { ok: true }
  | { ok: false; conflict: ConflictInfo }
  | { ok: false; reason: "duplicate" }
  | { ok: false; reason: "no-classes" };

function addSection(seccion: ApiSeccion): AddResult {
  const entries = readFromStorage();

  if (entries.some((e) => e.seccion.nrc === seccion.nrc)) {
    return { ok: false, reason: "duplicate" };
  }

  const scheduledClasses = seccion.clases.filter(isScheduledClass);
  if (scheduledClasses.length === 0) {
    return { ok: false, reason: "no-classes" };
  }

  const conflict = findConflicts(seccion, entries);
  if (conflict) {
    return { ok: false, conflict };
  }

  const colorIndex = getNextColorIndex(entries);
  writeToStorage([...entries, { seccion, colorIndex }]);
  return { ok: true };
}

function removeSection(nrc: string) {
  const entries = readFromStorage();
  writeToStorage(entries.filter((e) => e.seccion.nrc !== nrc));
}

function clearAll() {
  writeToStorage([]);
}

function isInSchedule(nrc: string): boolean {
  return readFromStorage().some((e) => e.seccion.nrc === nrc);
}

// ── Hook ────────────────────────────────────────────────────────────────────

export function useScheduleStore() {
  const sections = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return {
    sections,
    addSection: useCallback(
      (seccion: ApiSeccion) => addSection(seccion),
      [],
    ),
    removeSection: useCallback((nrc: string) => removeSection(nrc), []),
    clearAll: useCallback(() => clearAll(), []),
    replaceSections: useCallback(
      (secciones: ApiSeccion[]) => replaceSections(secciones),
      [],
    ),
    isInSchedule: useCallback((nrc: string) => isInSchedule(nrc), []),
  };
}
