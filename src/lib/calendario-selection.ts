import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import type { ApiCalendario } from "@/lib/types";
import { getMostRecentCalendario, listCalendarios } from "@/lib/api";

export const SELECTED_CALENDARIO_COOKIE = "agenda-calendario";
export const SELECTED_CALENDARIO_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;
export const selectedCalendarioCookieOptions = {
  path: "/",
  sameSite: "lax" as const,
  maxAge: SELECTED_CALENDARIO_COOKIE_MAX_AGE,
  secure: process.env.NODE_ENV === "production",
};

export const getCachedCalendarios = cache(listCalendarios);

function findCalendarioById(
  calendarios: ApiCalendario[],
  calendarioId: number,
): ApiCalendario | null {
  return calendarios.find((calendario) => calendario.id === calendarioId) ?? null;
}

export const getSelectedCalendarioState = cache(async () => {
  const [cookieStore, calendarios] = await Promise.all([
    cookies(),
    getCachedCalendarios(),
  ]);
  const fallbackCalendario = getMostRecentCalendario(calendarios);

  if (!fallbackCalendario) {
    return {
      calendarios,
      selectedCalendario: null,
      fallbackCalendario: null,
    };
  }

  const rawCalendarioId = cookieStore.get(SELECTED_CALENDARIO_COOKIE)?.value;
  const parsedCalendarioId = Number.parseInt(rawCalendarioId ?? "", 10);
  const selectedCalendario = Number.isNaN(parsedCalendarioId)
    ? fallbackCalendario
    : (findCalendarioById(calendarios, parsedCalendarioId) ?? fallbackCalendario);

  return {
    calendarios,
    selectedCalendario,
    fallbackCalendario,
  };
});
