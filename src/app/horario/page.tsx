import { CalendarGrid } from "@/components/horario/calendar-grid";
import { SidebarSubject } from "@/components/horario/sidebar-subject";
import { Legend } from "@/components/horario/legend";
import { MaterialIcon } from "@/components/ui/material-icon";
import { sidebarSubjects } from "@/data/mock";

export default function HorarioPage() {
  const totalCreditos = sidebarSubjects.reduce(
    (sum, s) => sum + s.creditos,
    0
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 mb-24 md:mb-12">
      {/* Header */}
      <section className="mb-12">
        <h1 className="font-headline font-bold text-4xl md:text-5xl tracking-tight text-on-surface mb-2">
          Mi Horario Semanal
        </h1>
        <p className="font-body text-on-surface-variant max-w-2xl">
          Visualización editorial de tu carga académica para el ciclo actual.
          Organiza tus tiempos con claridad.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-surface-container-low p-6 rounded-xl">
            <h2 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
              <MaterialIcon name="book" className="text-primary" />
              Carga Académica
            </h2>
            <div className="space-y-4">
              {sidebarSubjects.map((subject) => (
                <SidebarSubject key={subject.nrc} subject={subject} />
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant/15">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-on-surface-variant font-label uppercase tracking-widest">
                    Total Créditos
                  </p>
                  <p className="text-3xl font-headline font-extrabold text-primary">
                    {totalCreditos}
                  </p>
                </div>
                <button className="bg-gradient-to-br from-primary to-primary-container text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md flex items-center gap-2">
                  <MaterialIcon name="print" className="text-sm" />
                  PDF
                </button>
              </div>
            </div>
          </div>

          {/* Status card */}
          <div className="bg-tertiary-container p-6 rounded-xl text-on-tertiary-container relative overflow-hidden">
            <div className="relative z-10">
              <p className="font-label text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
                Estatus Escolar
              </p>
              <h4 className="font-headline font-bold text-xl mb-1">
                Alumno Regular
              </h4>
              <p className="text-sm opacity-90">Ciclo 2024-B</p>
            </div>
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl opacity-10">
              school
            </span>
          </div>
        </aside>

        {/* Calendar */}
        <div className="lg:col-span-9 overflow-x-auto pb-4">
          <CalendarGrid />
          <Legend />
        </div>
      </div>

      {/* FAB */}
      <button className="fixed right-6 bottom-24 md:bottom-8 bg-gradient-to-br from-primary to-primary-container text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-40">
        <MaterialIcon name="edit" />
      </button>
    </main>
  );
}
