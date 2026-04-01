import { BuscadorClient } from "@/components/buscador/buscador-client";
import { StatsSidebar } from "@/components/buscador/stats-sidebar";
import {
  listCalendarios,
  getMostRecentCalendario,
  listCentros,
} from "@/lib/api";

interface HomeProps {
  searchParams: Promise<{ clave?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const [allCalendarios, centros, { clave }] = await Promise.all([
    listCalendarios(),
    listCentros(),
    searchParams,
  ]);

  const calendario = getMostRecentCalendario(allCalendarios);

  if (!calendario) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-on-surface-variant">
          No hay calendarios disponibles.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <BuscadorClient
          calendarioId={calendario.id}
          centros={centros}
          initialQuery={clave ?? ""}
        />
      </div>
    </main>
  );
}
