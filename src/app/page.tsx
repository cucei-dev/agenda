import { BuscadorClient } from "@/components/buscador/buscador-client";
import { StatsSidebar } from "@/components/buscador/stats-sidebar";
import {
  listCalendarios,
  getMostRecentCalendario,
  listCentros,
} from "@/lib/api";

export default async function Home() {
  const [allCalendarios, centros] = await Promise.all([
    listCalendarios(),
    listCentros(),
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
        <StatsSidebar />
        <div className="lg:col-span-9">
          <BuscadorClient calendarioId={calendario.id} centros={centros} />
        </div>
      </div>
    </main>
  );
}
