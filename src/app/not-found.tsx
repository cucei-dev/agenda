import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
      <div className="bg-surface-container-lowest rounded-xl p-12 shadow-sm max-w-lg w-full border-l-4 border-primary">
        <span className="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant text-[0.6875rem] font-bold tracking-widest uppercase rounded-sm mb-6">
          404
        </span>

        <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-4">
          Página no encontrada
        </h1>

        <p className="text-on-surface-variant font-body leading-relaxed mb-8">
          La página que buscas no existe o ha sido movida.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded-md font-medium text-sm transition-all active:scale-95 shadow-lg shadow-primary/20"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
