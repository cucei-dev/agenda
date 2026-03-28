import { MaterialIcon } from "@/components/ui/material-icon";

interface SummaryPanelProps {
  totalCreditos: number;
}

export function SummaryPanel({ totalCreditos }: SummaryPanelProps) {
  return (
    <aside className="lg:col-span-4 sticky top-28 space-y-6">
      <div className="bg-surface-container-high rounded-2xl p-8 space-y-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />

        <div>
          <span className="font-label text-xs font-bold text-secondary tracking-widest uppercase">
            Resumen de Carga
          </span>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-6xl font-headline font-extrabold text-on-surface tracking-tighter">
              {totalCreditos}
            </span>
            <span className="text-xl font-body font-medium text-on-surface-variant">
              Créditos
            </span>
          </div>
          <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
            Carga académica recomendada para este ciclo escolar.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-outline-variant/30">
          <button className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg shadow-primary/10">
            <MaterialIcon name="picture_as_pdf" />
            Descargar PDF
          </button>
          <button className="w-full bg-white border border-outline-variant/20 text-secondary py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-surface-container-lowest active:scale-95 shadow-sm">
            <MaterialIcon name="calendar_add_on" />
            Exportar Calendario
          </button>
        </div>

        <div className="bg-tertiary/10 p-4 rounded-xl flex gap-3">
          <MaterialIcon name="info" className="text-tertiary" />
          <p className="text-[11px] leading-snug text-on-tertiary-fixed-variant">
            Al exportar al calendario, se crearán eventos recurrentes para todo
            el semestre 2024-B. Verifique las fechas oficiales en su centro
            universitario.
          </p>
        </div>
      </div>

      <div className="p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Estudiantes en biblioteca moderna"
          className="w-full h-48 object-cover rounded-2xl grayscale contrast-125 opacity-40"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtZRjhKSvMf3_ZxBnMXl6kTiBF2mBsiyY_cqUhBeM2thQmvDYMPt62F7Er5O-pooeXChAgFBTfhqTkMS0lH4T2D10qiv74M6yUiWof8w1LURup8eMrqS_5va1VU5Ks7LmM9prnjUd7drlIvbid-29WGysiRKHQyb2nNTGa0fVkqRRuAO6ezIxjNykXVqfPuX9CXo8IBlT7Z0R_ceu-U10LQ4Utpnb3zgEOGR6TBi_1iGOfmhwPOP7eehL1H3wQnWtm1uao9fwO1-k"
        />
      </div>
    </aside>
  );
}
