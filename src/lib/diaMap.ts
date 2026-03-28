/** Maps SIIAU day numbers to short display names. */
export const DIA_MAP: Record<number, string> = {
  1: "Lun",
  2: "Mar",
  3: "Mié",
  4: "Jue",
  5: "Vie",
  6: "Sáb",
};

export function getDiaDisplayName(dia: number): string {
  return DIA_MAP[dia] ?? `Día ${dia}`;
}

/** Strips seconds from "HH:MM:SS" → "HH:MM". Passthrough for other formats. */
export function formatHora(hora: string): string {
  return hora.length === 8 && hora[2] === ":" && hora[5] === ":"
    ? hora.slice(0, 5)
    : hora;
}
