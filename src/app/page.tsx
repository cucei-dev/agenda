import { BuscadorClient } from "@/components/buscador/buscador-client";
import {
  listCentros,
} from "@/lib/api";
import { getSelectedCalendarioState } from "@/lib/calendario-selection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscador de Materias UDG — Claves, horarios y secciones",
  description:
    "Busca materias por clave o nombre, filtra por centro universitario y arma tu horario académico de la UDG. Basado en datos públicos de SIIAU.",
  alternates: {
    canonical: "https://agenda.cucei.dev",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Agenda UDG",
  url: "https://agenda.cucei.dev",
  description:
    "Buscador de materias y horarios académicos de la Universidad de Guadalajara. Consulta claves, profesores y horarios basados en datos públicos de SIIAU.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "All",
  inLanguage: "es-MX",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "MXN",
  },
  author: {
    "@type": "Organization",
    name: "CUCEI.dev",
    url: "https://cucei.dev",
  },
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
};

interface HomeProps {
  searchParams: Promise<{ clave?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const [{ selectedCalendario }, centros, { clave }] = await Promise.all([
    getSelectedCalendarioState(),
    listCentros(),
    searchParams,
  ]);

  const calendario = selectedCalendario;

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <BuscadorClient
            calendarioId={calendario.id}
            centros={centros}
            initialQuery={clave ?? ""}
          />
        </div>
      </main>
    </>
  );
}
