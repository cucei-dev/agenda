export function StatsSidebar() {
  return (
    <aside className="lg:col-span-3 space-y-8">
      <div className="bg-surface-container-low rounded-xl p-6">
        <h3 className="font-headline font-bold text-xl mb-4 text-on-surface">
          Estado Global
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant">
              Materias encontradas
            </span>
            <span className="font-bold text-primary">124</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant">
              Con cupo disponible
            </span>
            <span className="font-bold text-tertiary">86</span>
          </div>
        </div>
      </div>
      <div className="relative rounded-xl overflow-hidden aspect-[4/5] group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          alt="Interior de una biblioteca universitaria moderna"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMoeZ6vz1SdA7MNSDJ3NERkE-c1JPIDOFzSUYPkVCHzZjtAjqcLmLVDb_fxGzQCW2MIQ_enLPyIc9n6sQqE7rgADHodeq09wS67J8JZSn0KFEaj5BdU9OqCQ9HSDLMTaL8Ehr6DIaCbh0p-kN1KfPM4MLfK1vXLCcbTJVGQqjyd0tPHEZQYPq6V94tyTaJF00yIzYoPsPJvjZxfqwtlUHXpW3rb-Jyx9eZjBDsEjZm2gmik4VWDtgkRsreceyXPNyh8S7Sq_GhmDA"
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
