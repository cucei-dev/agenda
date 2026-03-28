/** Maps SIIAU center IDs to their human-readable display names. */
export const CENTRO_SIIAU_MAP: Record<string, string> = {
  D: "CUCEI",
};

export function getCentroDisplayName(siiau_id: string): string {
  return CENTRO_SIIAU_MAP[siiau_id] ?? siiau_id;
}
