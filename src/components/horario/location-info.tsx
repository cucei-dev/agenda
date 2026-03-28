import { MaterialIcon } from "@/components/ui/material-icon";

interface LocationInfoProps {
  ubicacion: {
    aula: string;
    centro: string;
    status: string;
    statusVariant: "disponible" | "lleno";
  };
}

const statusStyles = {
  disponible: "bg-tertiary-container text-on-tertiary-fixed",
  lleno: "bg-primary-fixed text-on-primary-fixed-variant",
};

export function LocationInfo({ ubicacion }: LocationInfoProps) {
  return (
    <div className="bg-surface-container-low p-5 rounded-xl space-y-3">
      <div className="flex items-center gap-2 text-secondary">
        <MaterialIcon name="location_on" className="text-xl" />
        <span className="font-bold text-sm uppercase tracking-wider">
          Ubicación
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-on-surface-variant">{ubicacion.aula}</span>
          {ubicacion.status && (
            <span
              className={`${statusStyles[ubicacion.statusVariant]} px-2 py-0.5 rounded text-[10px] font-bold`}
            >
              {ubicacion.status}
            </span>
          )}
        </div>
        {ubicacion.centro && (
          <div className="text-[10px] text-on-surface-variant uppercase tracking-tighter">
            {ubicacion.centro}
          </div>
        )}
      </div>
    </div>
  );
}
