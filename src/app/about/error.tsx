"use client";

import { PrimaryButton } from "@/components/ui/primary-button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AboutError({ error, reset }: ErrorProps) {
  const isProd = process.env.NODE_ENV === "production";

  return (
    <main className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
      <div className="bg-surface-container-lowest rounded-xl p-12 shadow-sm max-w-lg w-full border-l-4 border-error">
        <span className="inline-block px-3 py-1 bg-error-container text-on-error-container text-[0.6875rem] font-bold tracking-widest uppercase rounded-sm mb-6">
          Error
        </span>

        <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-4">
          Algo salió mal
        </h1>

        <p className="text-on-surface-variant font-body leading-relaxed mb-8">
          {isProd
            ? "Ocurrió un error inesperado. Por favor intenta de nuevo."
            : error.message || "Ocurrió un error inesperado."}
        </p>

        <PrimaryButton label="Reintentar" onClick={reset} />
      </div>
    </main>
  );
}
