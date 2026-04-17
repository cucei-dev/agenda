"use server";

import { cookies } from "next/headers";
import { getMostRecentCalendario } from "@/lib/api";
import {
  getCachedCalendarios,
  SELECTED_CALENDARIO_COOKIE,
  selectedCalendarioCookieOptions,
} from "@/lib/calendario-selection";

export async function setSelectedCalendarioAction(calendarioId: number) {
  const parsedCalendarioId = Number(calendarioId);
  if (!Number.isInteger(parsedCalendarioId)) {
    return;
  }

  const calendarios = await getCachedCalendarios();
  const selectedCalendario =
    calendarios.find((calendario) => calendario.id === parsedCalendarioId) ??
    getMostRecentCalendario(calendarios);

  if (!selectedCalendario) {
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set(
    SELECTED_CALENDARIO_COOKIE,
    String(selectedCalendario.id),
    selectedCalendarioCookieOptions,
  );
}
