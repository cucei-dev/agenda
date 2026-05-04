import { ExportClient } from "@/components/horario/export-client";
import type { ApiAula, ApiSeccion, Subject } from "@/lib/types";
import { getAulaById, listSecciones, seccionToSubject } from "@/lib/api";
import { getSelectedCalendarioState } from "@/lib/calendario-selection";
import type { Metadata } from "next";

const BASE_URL = "https://agenda.cucei.dev";

export const metadata: Metadata = {
  title: "Horario Compartido — Visualiza tu carga académica",
  description:
    "Revisa la estructura final de tu ciclo académico antes de exportar. Comparte tu horario UDG con otros estudiantes de forma rápida y sencilla.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function HorarioSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [{ selectedCalendario }, { slug: _slug }] = await Promise.all([
    getSelectedCalendarioState(),
    params,
  ]);

  if (!selectedCalendario) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <p className="text-on-surface-variant">No hay calendarios disponibles.</p>
      </main>
    );
  }

  const nrcs = Buffer.from(decodeURIComponent(_slug), "base64")
    .toString("utf-8")
    .split(",")
    .map((s) => Number.parseInt(s.trim(), 10));

  const seccionesResponses = await Promise.all(
    nrcs.map((nrc) =>
      listSecciones({
        calendarioId: selectedCalendario.id,
        nrc: nrc.toString(),
      }),
    ),
  );
  const secciones: ApiSeccion[] = seccionesResponses.flatMap((response) => {
    const seccion = response.results[0];
    return seccion ? [seccion] : [];
  });
  const missingSectionsCount = nrcs.length - secciones.length;

  const aulaIds = Array.from(
    new Set(
      secciones.flatMap((seccion) =>
        seccion.clases.flatMap((clase) =>
          clase.aula_id === null ? [] : [clase.aula_id],
        ),
      ),
    ),
  );

  const aulasById: Record<number, ApiAula> = Object.fromEntries(
    (
      await Promise.allSettled(
        aulaIds.map(async (aulaId) => [aulaId, await getAulaById(aulaId)] as const),
      )
    ).flatMap((result) =>
      result.status === "fulfilled" ? [result.value] : [],
    ),
  );

  const subjects: Subject[] = secciones.map((seccion) =>
    seccionToSubject(seccion, aulasById),
  );
  const totalCreditos = subjects.reduce((sum, subj) => sum + subj.creditos, 0);

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Horario Compartido",
    description: `Horario académico compartido con ${subjects.length} materia(s) para el ciclo ${selectedCalendario.name} de la Universidad de Guadalajara.`,
    url: `${BASE_URL}/horario/${_slug}`,
    itemListElement: subjects.map((subject, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: subject.nombre,
        courseCode: subject.nrc,
        provider: {
          "@type": "Organization",
          name: "Universidad de Guadalajara",
          url: "https://www.udg.mx",
        },
        offeredBy: {
          "@type": "Organization",
          name: subject.centro,
        },
        credits: subject.creditos,
        totalHistoricalEnrollment: subject.cuposTotales,
        url: `${BASE_URL}/horario/${_slug}`,
      },
    })),
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <section className="mb-12">
        <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface mb-4">
          Resumen de Horario
        </h1>
        <p className="text-secondary font-medium max-w-2xl text-lg">
          Revisa la estructura final de tu ciclo académico antes de exportar.
        </p>
        <p className="mt-3 text-sm font-semibold text-on-surface-variant">
          Calendario activo: {selectedCalendario.name}
        </p>
      </section>

      <ExportClient
        subjects={subjects}
        secciones={secciones}
        totalCreditos={totalCreditos}
        missingSectionsCount={missingSectionsCount}
      />
    </main>
  );
}
