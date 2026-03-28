import type { SidebarSubject as SidebarSubjectType } from "@/lib/types";

interface SidebarSubjectProps {
  subject: SidebarSubjectType;
}

export function SidebarSubject({ subject }: SidebarSubjectProps) {
  return (
    <div
      className={`bg-surface-container-lowest p-4 rounded-lg shadow-sm border-l-4 ${subject.colorClass} group hover:translate-x-1 transition-transform`}
    >
      <h3 className="font-body font-semibold text-sm mb-1">
        {subject.nombre}
      </h3>
      <div className="flex justify-between items-center">
        <span className="font-label text-label-sm tracking-widest text-on-surface-variant">
          NRC: {subject.nrc}
        </span>
        <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-2 py-0.5 rounded-full">
          {subject.creditos} CRÉDITOS
        </span>
      </div>
    </div>
  );
}
