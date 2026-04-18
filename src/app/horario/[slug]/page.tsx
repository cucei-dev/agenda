import { ExportClient } from "@/components/horario/export-client";
import type { ApiAula, ApiSeccion, Subject } from "@/lib/types";
import { getAulaById, listSecciones, seccionToSubject } from "@/lib/api";
import { getSelectedCalendarioState } from "@/lib/calendario-selection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resumen de Horario",
  description: "Revisa la estructura final de tu ciclo académico antes de exportar.",
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

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
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
