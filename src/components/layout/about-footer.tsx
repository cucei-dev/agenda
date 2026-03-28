export function AboutFooter() {
  return (
    <footer className="w-full py-12 border-t border-slate-200/50 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-headline font-black text-slate-900 text-xl">
            The Digital Curator
          </span>
          <p className="font-body text-sm text-slate-500 text-center md:text-left max-w-md">
            © 2024 The Digital Curator. Herramienta académica no oficial
            inspirada en la herencia de la Universidad de Guadalajara.
          </p>
        </div>
        <div className="flex gap-8">
          <a
            href="#"
            className="text-slate-500 hover:text-red-700 transition-colors text-sm font-medium"
          >
            Privacidad
          </a>
          <a
            href="#"
            className="text-slate-500 hover:text-red-700 transition-colors text-sm font-medium"
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-slate-500 hover:text-red-700 transition-colors text-sm font-medium"
          >
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}
