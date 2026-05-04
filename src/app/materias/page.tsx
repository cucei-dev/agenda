import type { Metadata } from "next";
import { MateriasClient } from "@/components/materias/materias-client";

export const metadata: Metadata = {
  title: "Catálogo de Materias UDG — Busca por nombre o clave",
  description:
    "Explora el catálogo completo de materias de la Universidad de Guadalajara. Encuentra claves, nombres y detalles de cada asignatura disponible en SIIAU.",
  alternates: {
    canonical: "https://agenda.cucei.dev/materias",
  },
  openGraph: {
    title: "Catálogo de Materias UDG — Busca por nombre o clave | Agenda UDG",
    description:
      "Explora el catálogo completo de materias de la UDG y encuentra su clave para inscribirte. Consulta nombres, créditos y detalles de cada asignatura.",
    url: "https://agenda.cucei.dev/materias",
  },
};

export default function MateriasPage() {
  return (
    <main className="min-h-screen bg-surface">
      <div className="max-w-2xl mx-auto px-4 py-10 pb-32">
        <div className="mb-8">
          <h1 className="font-headline font-bold text-3xl text-on-surface">Materias</h1>
          <p className="font-body text-on-surface-variant mt-2">
            Consulta el catálogo de materias disponibles y encuentra su clave.
          </p>
        </div>
        <MateriasClient />
      </div>
    </main>
  );
}
