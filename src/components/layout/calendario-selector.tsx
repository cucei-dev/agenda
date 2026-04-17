"use client";

import { useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setSelectedCalendarioAction } from "@/app/actions/set-selected-calendario";
import { MaterialIcon } from "@/components/ui/material-icon";
import type { ApiCalendario } from "@/lib/types";

interface CalendarioSelectorProps {
  calendarios: ApiCalendario[];
  selectedCalendarioId: number | null;
}

export function CalendarioSelector({
  calendarios,
  selectedCalendarioId,
}: CalendarioSelectorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const selectedValue =
    selectedCalendarioId === null ? "" : String(selectedCalendarioId);
  const [optimisticValue, setOptimisticValue] = useOptimistic(selectedValue);

  function handleChange(nextValue: string) {
    setOptimisticValue(nextValue);

    startTransition(async () => {
      await setSelectedCalendarioAction(Number(nextValue));
      router.refresh();
    });
  }

  return (
    <div className="w-full md:w-auto md:min-w-72">
      <label
        htmlFor="global-calendario"
        className="mb-2 block text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant"
      >
        Calendario
      </label>
      <div className="relative">
        <MaterialIcon
          name="event"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
        />
        <select
          id="global-calendario"
          value={optimisticValue}
          onChange={(event) => handleChange(event.target.value)}
          disabled={isPending || calendarios.length === 0}
          className="w-full appearance-none rounded-xl border border-outline-variant/20 bg-white py-3 pl-11 pr-11 text-sm font-semibold text-on-surface shadow-sm outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {calendarios.length === 0 ? (
            <option value="">Sin calendarios disponibles</option>
          ) : (
            calendarios.map((calendario) => (
              <option key={calendario.id} value={calendario.id}>
                {calendario.name}
              </option>
            ))
          )}
        </select>
        <MaterialIcon
          name={isPending ? "progress_activity" : "expand_more"}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
        />
      </div>
    </div>
  );
}
