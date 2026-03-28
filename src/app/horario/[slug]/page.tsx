import { SubjectDetailCard } from "@/components/horario/subject-detail";
import { SummaryPanel } from "@/components/horario/summary-panel";
import { Footer } from "@/components/layout/footer";
import { scheduleDetailSubjects } from "@/data/mock";

export default async function HorarioSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: _slug } = await params;

  // In a real app, fetch schedule data based on _slug
  const subjects = scheduleDetailSubjects;
  const totalCreditos = 24;

  return (
    <>
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 mb-24 md:mb-12">
        {/* Header */}
        <section className="mb-12">
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface mb-4">
            Resumen de Horario
          </h1>
          <p className="text-secondary font-medium max-w-2xl text-lg">
            Revisa la estructura final de tu ciclo académico antes de exportar.
            Esta es una herramienta no oficial basada en datos públicos.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Subject list */}
          <div className="lg:col-span-8 space-y-6">
            {subjects.map((subject, index) => (
              <SubjectDetailCard
                key={subject.nrc}
                subject={subject}
                showDetails={index < subjects.length - 1}
              />
            ))}
          </div>

          {/* Summary sidebar */}
          <SummaryPanel totalCreditos={totalCreditos} />
        </div>
      </main>
      <Footer />
    </>
  );
}
