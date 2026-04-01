import Link from "next/link";
import { SearchInput } from "@/components/ui/search-input";
import { FilterChip } from "@/components/ui/filter-chip";
import type { ApiCentro } from "@/lib/types";
import { getCentroDisplayName } from "@/lib/centroMap";

interface HeroSectionProps {
  centros: ApiCentro[];
  selectedCentroId: number | null;
  onCentroChange: (id: number | null) => void;
  query: string;
  onQueryChange: (q: string) => void;
  loading: boolean;
}

export function HeroSection({
  centros,
  selectedCentroId,
  onCentroChange,
  query,
  onQueryChange,
  loading,
}: HeroSectionProps) {
  return (
    <section className="mb-16">
      <h1 className="font-headline font-bold text-5xl md:text-6xl tracking-tight mb-8 text-on-surface">
        Encuentra tu próximo <span className="text-primary">desafío</span>.
      </h1>
      <SearchInput value={query} onChange={onQueryChange} disabled={loading} />
      <p className="mt-3 font-body text-sm text-on-surface-variant">
        ¿No sabes la clave de tu materia?{" "}
        <Link href="/materias" className="text-primary font-semibold hover:underline">
          Búscala aquí
        </Link>
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <span className="font-label text-label-sm uppercase tracking-widest font-semibold flex items-center text-on-surface-variant mr-2">
          Centros:
        </span>
        <FilterChip
          label="Todos"
          active={selectedCentroId === null}
          onClick={() => onCentroChange(null)}
        />
        {centros.map((centro) => (
          <FilterChip
            key={centro.id}
            label={getCentroDisplayName(centro.siiau_id, centro.name)}
            active={selectedCentroId === centro.id}
            onClick={() => onCentroChange(centro.id)}
          />
        ))}
      </div>
    </section>
  );
}
