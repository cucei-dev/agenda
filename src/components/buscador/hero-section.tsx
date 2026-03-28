import { SearchInput } from "@/components/ui/search-input";
import { FilterChip } from "@/components/ui/filter-chip";
import { centroFilters } from "@/data/mock";

export function HeroSection() {
  return (
    <section className="mb-16">
      <h1 className="font-headline font-bold text-5xl md:text-6xl tracking-tight mb-8 text-on-surface">
        Encuentra tu próximo <span className="text-primary">desafío</span>.
      </h1>
      <SearchInput />
      <div className="mt-8 flex flex-wrap gap-3">
        <span className="font-label text-label-sm uppercase tracking-widest font-semibold flex items-center text-on-surface-variant mr-2">
          Centros:
        </span>
        {centroFilters.map((filter, i) => (
          <FilterChip key={filter.value} label={filter.label} active={i === 0} />
        ))}
      </div>
    </section>
  );
}
