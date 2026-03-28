import type { Subject } from "@/lib/types";
import { PrimaryButton } from "@/components/ui/primary-button";
import { MaterialIcon } from "@/components/ui/material-icon";

const statusStyles: Record<
  Subject["status"],
  { bg: string; text: string; label: string }
> = {
  disponible: {
    bg: "bg-tertiary-container",
    text: "text-on-tertiary-fixed",
    label: "Disponible",
  },
  waitlist: {
    bg: "bg-primary-fixed",
    text: "text-on-primary-fixed-variant",
    label: "Waitlist",
  },
  lleno: {
    bg: "bg-error-container",
    text: "text-on-error-container",
    label: "Lleno",
  },
};

const accentColors: Record<Subject["status"], string> = {
  disponible: "bg-primary",
  waitlist: "bg-secondary",
  lleno: "bg-error",
};

interface SubjectCardProps {
  subject: Subject;
  onAddToSchedule?: () => void;
  isInSchedule?: boolean;
}

export function SubjectCard({
  subject,
  onAddToSchedule,
  isInSchedule,
}: SubjectCardProps) {
  const status = statusStyles[subject.status];
  const accent = accentColors[subject.status];

  return (
    <article className="bg-surface-container-lowest rounded-xl p-6 relative flex flex-col md:flex-row gap-6 transition-all hover:translate-y-[-4px] hover:shadow-[0_8px_24px_rgba(26,28,29,0.06)]">
      <div className={`absolute left-0 top-6 bottom-6 w-1 ${accent} rounded-r`} />
      <div className="flex-grow">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="font-label text-[10px] uppercase tracking-widest font-bold text-secondary bg-secondary/10 px-2 py-1 rounded">
            NRC: {subject.nrc}
          </span>
          <span className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">
            {subject.centro}
          </span>
          <span
            className={`px-3 py-1 rounded-full ${status.bg} ${status.text} font-label text-[10px] uppercase font-bold tracking-widest`}
          >
            {status.label}
          </span>
        </div>
        <h2 className="font-headline font-bold text-2xl text-on-surface mb-1">
          {subject.nombre}
        </h2>
        <p className="text-on-surface-variant text-sm mb-3">
          {subject.profesor}
        </p>
        {subject.clases.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-4">
            {subject.clases.map((clase, i) => (
              <span
                key={i}
                className="font-label text-xs text-on-surface-variant bg-surface-container-high px-2 py-1 rounded"
              >
                {clase.dia} {clase.horaInicio}–{clase.horaFin}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-on-surface-variant/40 italic mb-4">
            Sin horario asignado
          </p>
        )}
        <div className="grid grid-cols-3 gap-4 border-t border-outline-variant/15 pt-4">
          <div>
            <p className="font-label text-[10px] uppercase text-on-surface-variant opacity-60">
              Créditos
            </p>
            <p className="font-bold text-on-surface">{subject.creditos}</p>
          </div>
          <div>
            <p className="font-label text-[10px] uppercase text-on-surface-variant opacity-60">
              Cupos Totales
            </p>
            <p className="font-bold text-on-surface">{subject.cuposTotales}</p>
          </div>
          <div>
            <p className="font-label text-[10px] uppercase text-on-surface-variant opacity-60">
              Disponibles
            </p>
            <p
              className={`font-bold ${subject.disponibles > 0 ? "text-tertiary" : "text-primary"}`}
            >
              {subject.disponibles}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end md:w-48">
        {isInSchedule ? (
          <span className="flex items-center gap-2 text-tertiary font-medium text-sm px-6 py-3">
            <MaterialIcon name="check_circle" filled className="text-base" />
            En horario
          </span>
        ) : (
          <PrimaryButton
            label="Agregar al horario"
            icon="add"
            onClick={onAddToSchedule}
          />
        )}
      </div>
    </article>
  );
}
