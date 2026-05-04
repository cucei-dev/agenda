"use client";

import { Manrope, Inter } from "next/font/google";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html lang="es" className={`${manrope.variable} ${inter.variable} light`}>
      <body className="bg-surface text-on-surface font-body antialiased min-h-full flex flex-col items-center justify-center p-6">
        <div className="bg-surface-container-lowest rounded-xl p-12 shadow-sm max-w-lg w-full border-l-4 border-error text-center">
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

          <button
            onClick={reset}
            className="cursor-pointer bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded-md font-medium text-sm inline-flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
