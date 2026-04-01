import { ExportClient } from "@/components/horario/export-client";
import type { ApiSeccion, Subject } from "@/lib/types";
import { listSecciones, seccionToSubject } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resumen de Horario",
  description: "Revisa la estructura final de tu ciclo académico antes de exportar.",
};

export default async function HorarioSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: _slug } = await params;

  const nrcs = Buffer.from(decodeURIComponent(_slug), "base64")
    .toString("utf-8")
    .split(",")
    .map((s) => Number.parseInt(s.trim(), 10));

  const secciones: ApiSeccion[] = [];
  for (const nrc of nrcs) {
    const res = await listSecciones({ calendarioId: 1, nrc: nrc.toString() });
    if (res.results.length > 0) {
      const seccion = res.results[0];
      if (!seccion) continue;
      secciones.push(seccion);
    }
  }

  const subjects: Subject[] = secciones.map((seccion) =>
    seccionToSubject(seccion),
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
      </section>

      <ExportClient
        subjects={subjects}
        secciones={secciones}
        totalCreditos={totalCreditos}
      />
    </main>
  );
}
