import type { ScheduleColorScheme } from "./types";

/**
 * 8 distinct color schemes for schedule sections.
 * Uses inline CSS values (not Tailwind classes) to avoid purge issues.
 */
export const SCHEDULE_COLORS: ScheduleColorScheme[] = [
  { bg: "#ffdad8", text: "#410007", border: "#a6383c" }, // Rosa/Primary
  { bg: "#d6e3ff", text: "#001b3d", border: "#415f8f" }, // Azul/Secondary
  { bg: "#ffe088", text: "#241a00", border: "#735c00" }, // Dorado/Tertiary
  { bg: "#c8f0d4", text: "#002110", border: "#2d7a46" }, // Verde esmeralda
  { bg: "#e8d5ff", text: "#22005d", border: "#7b4ea0" }, // Púrpura
  { bg: "#ffdcc2", text: "#311300", border: "#a15a1e" }, // Naranja
  { bg: "#b8ecf0", text: "#001f24", border: "#2a7a82" }, // Cian/Teal
  { bg: "#dde0ff", text: "#0f1161", border: "#4b4fa0" }, // Índigo
];

export function getScheduleColor(index: number): ScheduleColorScheme {
  return SCHEDULE_COLORS[index % SCHEDULE_COLORS.length];
}
