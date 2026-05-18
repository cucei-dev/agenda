/** Maps SIIAU center IDs to their human-readable display names. */
export const CENTRO_SIIAU_MAP: Record<string, string> = {
  C: "CUCEA",
  D: "CUCEI",
  Z: "CUTonalá",
};

export function getCentroDisplayName(siiau_id: string, defaultName: string): string {
  return CENTRO_SIIAU_MAP[siiau_id] ?? defaultName;
}
