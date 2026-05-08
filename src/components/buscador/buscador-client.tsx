"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import type { ApiCentro, ApiSeccion } from "@/lib/types";
import {
  listSecciones,
  seccionToSubject,
  searchMateriasByClave,
} from "@/lib/api";
import { useScheduleStore, type AddResult } from "@/lib/schedule-store";
import { getDiaDisplayName } from "@/lib/diaMap";
import { HeroSection } from "./hero-section";
import { SubjectCard } from "./subject-card";
import { MaterialIcon } from "@/components/ui/material-icon";
import { StatsSidebar } from "./stats-sidebar";
import { rybbitEvent } from "@/lib/analytics";

interface BuscadorClientProps {
  calendarioId: number;
  centros: ApiCentro[];
  initialQuery?: string;
}

const PAGE_SIZE = 20;

export function BuscadorClient({ calendarioId, centros, initialQuery = "" }: BuscadorClientProps) {
  const router = useRouter();
  const { addSection, isInSchedule } = useScheduleStore();
  const [query, setQuery] = useState(initialQuery);
  const [selectedCentroId, setSelectedCentroId] = useState<number | null>(null);
  const [results, setResults] = useState<ApiSeccion[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [materiaId, setMateriaId] = useState<number | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "success";
    id: number;
  } | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queryRef = useRef(query);

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  const fetchResults = useCallback(
    async (
      resolvedMateriaId: number | null,
      centroId: number | null,
      currentSkip: number,
      append: boolean,
    ) => {
      if (append) setIsLoadingMore(true);
      else setIsLoading(true);
      setError(null);

      try {
        const data = await listSecciones(
          {
            calendarioId,
            centroId,
            materiaId: resolvedMateriaId,
            skip: currentSkip,
            limit: PAGE_SIZE,
          },
          true,
        );

        if (!append) {
          rybbitEvent("search_query", {
            query: queryRef.current.trim(),
            centroId: centroId,
            resultsCount: data.total,
          });
          if (data.results.length === 0) {
            rybbitEvent("search_no_sections", {
              query: queryRef.current.trim(),
              centroId: centroId,
            });
          }
        }
        setTotal(data.total);
        setResults((prev) =>
          append ? [...prev, ...data.results] : data.results,
        );
      } catch {
        setError("No se pudo conectar con la API. Intenta de nuevo.");
        rybbitEvent("api_error", {
          endpoint: "listSecciones",
          message: "API connection error",
        });
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [calendarioId],
  );

  // Initial load + debounced search by materia clave
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setSkip(0);
      setNotFound(false);

      if (!query.trim()) {
        setMateriaId(null);
        fetchResults(null, selectedCentroId, 0, false);
        return;
      }

      setIsLoading(true);
      try {
        if (query.trim().length < 4) {
          setIsLoading(false);
          return;
        }

        const materia = await searchMateriasByClave(query.trim(), true);
        if (!materia) {
          setNotFound(true);
          setMateriaId(null);
          setResults([]);
          setTotal(0);
          setIsLoading(false);
          rybbitEvent("search_no_results", {
            query: query.trim(),
          });
          return;
        }
        setMateriaId(materia.id);
        fetchResults(materia.id, selectedCentroId, 0, false);
      } catch {
        setError("No se pudo conectar con la API. Intenta de nuevo.");
        rybbitEvent("api_error", {
          endpoint: "searchMateriasByClave",
          message: "API connection error",
        });
        setIsLoading(false);
      }
    }, 1000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, selectedCentroId, fetchResults]);

  function handleCentroChange(id: number | null) {
    setSelectedCentroId(id);
    rybbitEvent("filter_centro", { centroId: id });
  }

  function handleLoadMore() {
    const nextSkip = skip + PAGE_SIZE;
    setSkip(nextSkip);
    fetchResults(materiaId, selectedCentroId, nextSkip, true);
    rybbitEvent("load_more_results", {
      page: "buscador",
      currentCount: results.length,
      total,
    });
  }

  function handleAddToSchedule(seccion: ApiSeccion) {
    const result: AddResult = addSection(seccion);
    if (result.ok) {
      rybbitEvent("schedule_add_section", {
        nrc: seccion.nrc,
        materia: seccion.materia.name,
        centro: seccion.centro.name,
        creditos: seccion.materia.creditos,
      });
      router.push("/horario");
      return;
    }
    if ("conflict" in result) {
      const c = result.conflict;
      rybbitEvent("schedule_add_conflict", {
        nrcTrying: seccion.nrc,
        nrcConflict: c.existingNrc,
        materiaConflict: c.existingMateria,
        dia: c.dia,
        hora: `${c.horaInicio}–${c.horaFin}`,
      });
      setToast({
        message: `Conflicto de horario: ${c.existingMateria} (NRC ${c.existingNrc}) ya ocupa ${getDiaDisplayName(c.dia)} ${c.horaInicio}–${c.horaFin}`,
        type: "error",
        id: seccion.id,
      });
    } else if (result.reason === "duplicate") {
      rybbitEvent("schedule_add_duplicate", {
        nrc: seccion.nrc,
      });
      router.push("/horario");
    } else {
      setToast({
        message: "Esta sección no tiene horario asignado.",
        type: "error",
        id: seccion.id,
      });
    }
    setTimeout(() => setToast(null), 5000);
  }

  const hasMore = results.length < total;

  return (
    <>
      <StatsSidebar results={results} />
      <div className="lg:col-span-9">
        <HeroSection
          centros={centros}
          selectedCentroId={selectedCentroId}
          onCentroChange={handleCentroChange}
          query={query}
          onQueryChange={setQuery}
          loading={isLoading}
        />

        {error && (
          <div role="alert" className="mb-8 p-4 rounded-xl bg-error-container text-on-error-container font-medium flex items-center gap-3">
            <MaterialIcon name="error" />
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-surface-container-lowest rounded-xl p-6 h-40 animate-pulse"
              />
            ))}
          </div>
        ) : notFound ? (
          <div className="py-24 text-center text-on-surface-variant">
            <MaterialIcon
              name="search_off"
              className="text-5xl mb-4 opacity-40"
            />
            <p className="font-headline font-bold text-xl">
              Materia no encontrada
            </p>
            <p className="text-sm mt-2 opacity-60">
              No existe ninguna materia con la clave &ldquo;{query}&rdquo;.
              Verifica la clave e intenta de nuevo.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="py-24 text-center text-on-surface-variant">
            <MaterialIcon
              name="search_off"
              className="text-5xl mb-4 opacity-40"
            />
            <p className="font-headline font-bold text-xl">
              No se encontraron secciones
            </p>
            <p className="text-sm mt-2 opacity-60">
              Intenta con otro término de búsqueda o cambia el filtro de centro.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {toast && (
              <div
                className={`mb-6 p-4 rounded-xl font-medium flex items-center gap-3 animate-[fadeIn_0.2s_ease-out] ${
                  toast.type === "error"
                    ? "bg-error-container text-on-error-container"
                    : "bg-tertiary-container text-on-tertiary-container"
                }`}
              >
                <MaterialIcon
                  name={toast.type === "error" ? "warning" : "check_circle"}
                />
                <span className="text-sm">{toast.message}</span>
                <button
                  onClick={() => setToast(null)}
                  className="ml-auto opacity-60 hover:opacity-100"
                >
                  <MaterialIcon name="close" className="text-base" />
                </button>
              </div>
            )}
            {results.map((seccion) => (
              <SubjectCard
                key={seccion.id}
                subject={seccionToSubject(seccion)}
                onAddToSchedule={() => handleAddToSchedule(seccion)}
                isInSchedule={isInSchedule(seccion.nrc)}
              />
            ))}

            {hasMore && (
              <div className="pt-8 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="cursor-pointer flex items-center gap-2 text-secondary font-headline font-bold hover:gap-4 transition-all disabled:opacity-50"
                >
                  {isLoadingMore ? "Cargando..." : "Cargar más materias"}
                  {!isLoadingMore && <MaterialIcon name="arrow_forward" />}
                </button>
              </div>
            )}

            <p className="text-center text-xs text-on-surface-variant/50 pt-2">
              Mostrando {results.length} de {total} secciones
            </p>
          </div>
        )}
      </div>
    </>
  );
}
