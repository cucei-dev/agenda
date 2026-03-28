"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { ApiCentro, ApiSeccion } from "@/lib/types";
import { listSecciones, seccionToSubject, searchMateriasByClave } from "@/lib/api";
import { HeroSection } from "./hero-section";
import { SubjectCard } from "./subject-card";
import { MaterialIcon } from "@/components/ui/material-icon";

interface BuscadorClientProps {
  calendarioId: number;
  centros: ApiCentro[];
}

const PAGE_SIZE = 20;

export function BuscadorClient({ calendarioId, centros }: BuscadorClientProps) {
  const [query, setQuery] = useState("");
  const [selectedCentroId, setSelectedCentroId] = useState<number | null>(null);
  const [results, setResults] = useState<ApiSeccion[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [materiaId, setMateriaId] = useState<number | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        const data = await listSecciones({
          calendarioId,
          centroId,
          materiaId: resolvedMateriaId,
          skip: currentSkip,
          limit: PAGE_SIZE,
        });

        setTotal(data.total);
        setResults((prev) => (append ? [...prev, ...data.results] : data.results));
      } catch {
        setError("No se pudo conectar con la API. Intenta de nuevo.");
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

      if (!query.trim() || query.trim().length < 4) {
        setMateriaId(null);
        fetchResults(null, selectedCentroId, 0, false);
        return;
      }

      setIsLoading(true);
      try {
        const materia = await searchMateriasByClave(query.trim());
        if (!materia) {
          setNotFound(true);
          setMateriaId(null);
          setResults([]);
          setTotal(0);
          setIsLoading(false);
          return;
        }
        setMateriaId(materia.id);
        fetchResults(materia.id, selectedCentroId, 0, false);
      } catch {
        setError("No se pudo conectar con la API. Intenta de nuevo.");
        setIsLoading(false);
      }
    }, 1000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, selectedCentroId, fetchResults]);

  function handleLoadMore() {
    const nextSkip = skip + PAGE_SIZE;
    setSkip(nextSkip);
    fetchResults(materiaId, selectedCentroId, nextSkip, true);
  }

  const hasMore = results.length < total;

  return (
    <>
      <HeroSection
        centros={centros}
        selectedCentroId={selectedCentroId}
        onCentroChange={setSelectedCentroId}
        query={query}
        onQueryChange={setQuery}
      />

      {error && (
        <div className="mb-8 p-4 rounded-xl bg-error-container text-on-error-container font-medium flex items-center gap-3">
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
          <MaterialIcon name="search_off" className="text-5xl mb-4 opacity-40" />
          <p className="font-headline font-bold text-xl">
            Materia no encontrada
          </p>
          <p className="text-sm mt-2 opacity-60">
            No existe ninguna materia con la clave &ldquo;{query}&rdquo;. Verifica la clave e intenta de nuevo.
          </p>
        </div>
      ) : results.length === 0 ? (
        <div className="py-24 text-center text-on-surface-variant">
          <MaterialIcon name="search_off" className="text-5xl mb-4 opacity-40" />
          <p className="font-headline font-bold text-xl">
            No se encontraron secciones
          </p>
          <p className="text-sm mt-2 opacity-60">
            Intenta con otro término de búsqueda o cambia el filtro de centro.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {results.map((seccion) => (
            <SubjectCard key={seccion.id} subject={seccionToSubject(seccion)} />
          ))}

          {hasMore && (
            <div className="pt-8 flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="flex items-center gap-2 text-secondary font-headline font-bold hover:gap-4 transition-all disabled:opacity-50"
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
    </>
  );
}
