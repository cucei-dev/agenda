import { SubjectDetailCard } from "@/components/horario/subject-detail";
import { SummaryPanel } from "@/components/horario/summary-panel";
import type { ApiSeccion, Subject } from "@/lib/types";
import { listSecciones, seccionToSubject } from "@/lib/api";

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
  
  for (const nrc of nrcs) {
    console.log("NRC:", nrc);
  }

  const secciones: ApiSeccion[] = [];
  for (const nrc of nrcs) {
    const res = await listSecciones({ calendarioId: 1, nrc: nrc.toString() });
    if (res.results.length > 0) {
      const seccion = res.results[0];
      console.log("Sección encontrada:", seccion.nrc, seccion.materia.name);
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          {subjects.map((subject) => (
            <SubjectDetailCard
              key={subject.nrc}
              subject={subject}
            />
          ))}
        </div>
        <SummaryPanel totalCreditos={totalCreditos} />
      </div>
    </main>
  );
}
