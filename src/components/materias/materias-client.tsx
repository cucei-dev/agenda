"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { listMaterias } from "@/lib/api/materias";
import type { ApiMateria } from "@/lib/types";

const PAGE_SIZE = 20;

export function MateriasClient() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ApiMateria[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchMaterias = useCallback(
    async (search: string, currentSkip: number, append: boolean) => {
      if (append) setIsLoadingMore(true);
      else setIsLoading(true);
      setError(null);
      try {
        const data = await listMaterias(
          { search: search || undefined, skip: currentSkip, limit: PAGE_SIZE },
          true
        );
        setTotal(data.total);
        setResults((prev) => (append ? [...prev, ...data.results] : data.results));
        setHasSearched(true);
      } catch {
        setError("No se pudo conectar con la API. Intenta de nuevo.");
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    []
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSkip(0);
      fetchMaterias(query, 0, false);
    }, 1000);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchMaterias]);

  const handleLoadMore = () => {
    const nextSkip = skip + PAGE_SIZE;
    setSkip(nextSkip);
    fetchMaterias(query, nextSkip, true);
  };

  const hasMore = results.length < total;

  return (
    <div className="flex flex-col gap-6">
      {/* Warning */}
      <div className="flex items-start gap-3 bg-tertiary-container text-on-tertiary-container rounded-2xl px-5 py-4">
        <span className="material-symbols-outlined text-xl mt-0.5 shrink-0">warning</span>
        <p className="font-body text-sm leading-relaxed">
          <strong className="font-semibold">Atención:</strong> puede haber varias claves con el
          mismo nombre de materia. Asegúrate de verificar cuál pertenece a tu plan de estudios
          antes de buscarla en el buscador de secciones.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none select-none">
          search
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar materia por nombre o clave…"
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-surface-container-highest text-on-surface placeholder:text-on-surface-variant font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-[0_2px_8px_rgba(26,28,29,0.04)] transition"
        />
      </div>

      {/* Results count */}
      {hasSearched && !isLoading && (
        <p className="font-body text-xs text-on-surface-variant">
          {total === 0
            ? "Sin resultados"
            : `Mostrando ${results.length} de ${total} materia${total !== 1 ? "s" : ""}`}
        </p>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-error-container text-on-error-container rounded-2xl px-5 py-4">
          <span className="material-symbols-outlined text-xl shrink-0">error</span>
          <p className="font-body text-sm">{error}</p>
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <ul className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <li
              key={i}
              className="animate-pulse bg-surface-container rounded-2xl h-16"
            />
          ))}
        </ul>
      )}

      {/* Results list */}
      {!isLoading && results.length > 0 && (
        <ul className="flex flex-col gap-3">
          {results.map((materia) => (
            <li
              key={materia.id}
              className="flex items-center gap-4 bg-surface-container-lowest rounded-2xl px-5 py-4 shadow-[0_2px_8px_rgba(26,28,29,0.04)] hover:shadow-[0_4px_16px_rgba(26,28,29,0.08)] transition-shadow"
            >
              <span className="shrink-0 font-label text-xs font-semibold tracking-wider bg-secondary-container text-on-secondary-container rounded-lg px-3 py-1.5 min-w-[5rem] text-center">
                {materia.clave}
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-headline font-semibold text-on-surface text-sm leading-tight truncate">
                  {materia.name}
                </span>
                <span className="font-body text-xs text-on-surface-variant mt-0.5">
                  {materia.creditos} crédito{materia.creditos !== 1 ? "s" : ""}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Empty state */}
      {!isLoading && hasSearched && results.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl mb-4 opacity-40">
            search_off
          </span>
          <p className="font-headline font-bold text-xl">Sin resultados</p>
          <p className="font-body text-sm mt-1 opacity-60">
            No se encontraron materias con ese nombre o clave.
          </p>
        </div>
      )}

      {/* Load more */}
      {!isLoading && hasMore && (
        <button
          onClick={handleLoadMore}
          disabled={isLoadingMore}
          className="self-center font-body text-sm font-semibold text-primary hover:text-primary/80 disabled:opacity-50 transition flex items-center gap-2 py-2"
        >
          {isLoadingMore ? (
            <>
              <span className="material-symbols-outlined text-base animate-spin">
                progress_activity
              </span>
              Cargando…
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-base">expand_more</span>
              Cargar más
            </>
          )}
        </button>
      )}
    </div>
  );
}
