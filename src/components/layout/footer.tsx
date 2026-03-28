export function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-surface-container-high mb-24 md:mb-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <span className="font-headline font-bold text-primary">
            Gaceta Académica
          </span>
          <p className="text-sm text-on-surface-variant mt-1">
            Basado en datos de SIIAU - Universidad de Guadalajara
          </p>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold max-w-xs text-center md:text-right">
          HERRAMIENTA NO OFICIAL. LOS DATOS PUEDEN VARIAR. SIEMPRE CONSULTE SU
          CUENTA SIIAU.
        </p>
      </div>
    </footer>
  );
}
