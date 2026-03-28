import { MaterialIcon } from "@/components/ui/material-icon";
import type { ScheduleColorScheme } from "@/lib/types";

interface SidebarSubjectProps {
  nombre: string;
  nrc: string;
  creditos: number;
  profesor: string;
  color: ScheduleColorScheme;
  onRemove?: () => void;
}

export function SidebarSubject({
  nombre,
  nrc,
  creditos,
  profesor,
  color,
  onRemove,
}: SidebarSubjectProps) {
  return (
    <div
      className="bg-surface-container-lowest p-4 rounded-lg shadow-sm border-l-4 group hover:translate-x-1 transition-transform relative"
      style={{ borderLeftColor: color.border }}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-body font-semibold text-sm mb-1 pr-6">{nombre}</h3>
        {onRemove && (
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-error-container"
            title="Eliminar del horario"
          >
            <MaterialIcon
              name="close"
              className="text-sm text-on-surface-variant hover:text-error"
            />
          </button>
        )}
      </div>
      <p className="text-[11px] text-on-surface-variant mb-2 line-clamp-1">
        {profesor}
      </p>
      <div className="flex justify-between items-center">
        <span className="font-label text-label-sm tracking-widest text-on-surface-variant">
          NRC: {nrc}
        </span>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: color.bg, color: color.text }}
        >
          {creditos} CRÉDITOS
        </span>
      </div>
    </div>
  );
}
