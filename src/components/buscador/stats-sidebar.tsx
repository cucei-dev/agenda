import type {ApiSeccion } from "@/lib/types";
import Image from "next/image";

type StatsSidebarProps = {
  results: ApiSeccion[];
};

export function StatsSidebar({ results }: StatsSidebarProps) {
  return (
    <aside className="lg:col-span-3 space-y-8 sticky top-30 self-start">
      <div className="bg-surface-container-low rounded-xl p-6">
        <h3 className="font-headline font-bold text-xl mb-4 text-on-surface">
          Estado Global
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant">
              Materias encontradas
            </span>
            <span className="font-bold text-primary">{results.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant">
              Con cupo disponible
            </span>
            <span className="font-bold text-tertiary">{results.filter(r => r.cupos_disponibles > 0).length}</span>
          </div>
        </div>
      </div>
      <div className="relative rounded-xl overflow-hidden aspect-[4/5] group">
        <Image
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          alt="Rectoría"
          src="/images/rectoria.jpg"
          width={1266}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
          <p className="text-white font-headline font-bold text-lg leading-tight">
            Optimiza tu semestre con la mejor selección docente.
          </p>
        </div>
      </div>
    </aside>
  );
}
