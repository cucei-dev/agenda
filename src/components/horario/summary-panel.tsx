import { MaterialIcon } from "@/components/ui/material-icon";
import Image from "next/image";

interface SummaryPanelProps {
  totalCreditos: number;
  onDownloadPDF?: () => void;
  onExportCalendar?: () => void;
}

export function SummaryPanel({
  totalCreditos,
  onDownloadPDF,
  onExportCalendar,
}: SummaryPanelProps) {
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
        </div>

        <div className="space-y-3 pt-4 border-t border-outline-variant/30">
          <button
            onClick={onDownloadPDF}
            className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg shadow-primary/10 cursor-pointer"
          >
            <MaterialIcon name="picture_as_pdf" />
            Descargar PDF
          </button>
          <button
            onClick={onExportCalendar}
            className="w-full bg-white border border-outline-variant/20 text-secondary py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-surface-container-lowest active:scale-95 shadow-sm cursor-pointer"
          >
            <MaterialIcon name="calendar_add_on" />
            Exportar Calendario
          </button>
        </div>
      </div>

      <div className="p-4">
        <Image
          alt="CUCEI"
          className="w-full h-48 object-cover rounded-2xl grayscale contrast-125 opacity-40"
          src="/images/cucei.jpg"
          width={1000}
          height={667}
        />
      </div>
    </aside>
  );
}
