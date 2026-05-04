import { HorarioClient } from "@/components/horario/horario-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mi Horario Semanal — Organiza tu carga académica",
  description:
    "Visualiza y organiza tu carga académica semanal para el ciclo actual de la UDG. Agrega materias y exporta tu horario fácilmente.",
  alternates: {
    canonical: "https://agenda.cucei.dev/horario",
  },
  openGraph: {
    title: "Mi Horario Semanal — Organiza tu carga académica | Agenda UDG",
    description:
      "Visualiza y organiza tu carga académica semanal para el ciclo actual de la UDG. Agrega materias y exporta tu horario fácilmente.",
    url: "https://agenda.cucei.dev/horario",
  },
};

export default function HorarioPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <section className="mb-12">
        <h1 className="font-headline font-bold text-4xl md:text-5xl tracking-tight text-on-surface mb-2">
          Mi Horario Semanal
        </h1>
        <p className="font-body text-on-surface-variant max-w-2xl">
          Visualización de tu carga académica para el ciclo actual. Organiza tus
          tiempos con claridad.
        </p>
      </section>

      <HorarioClient />
    </main>
  );
}
