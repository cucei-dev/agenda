import { MaterialIcon } from "@/components/ui/material-icon";
import Link from "next/link";
import { getSelectedCalendarioState } from "@/lib/calendario-selection";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca de",
  description:
    "Conoce la iniciativa independiente Agenda UDG: su misión, transparencia de datos y preguntas frecuentes. Creada por estudiantes para simplificar la consulta de la oferta académica del SIIAU.",
  alternates: {
    canonical: "https://agenda.cucei.dev/about",
  },
  openGraph: {
    title: "Acerca de Agenda UDG",
    description:
      "Conoce la misión y transparencia de Agenda UDG, la herramienta independiente para consultar la oferta académica de la UDG.",
    url: "https://agenda.cucei.dev/about",
  },
};

export default async function AboutPage() {
  const { selectedCalendario: calendario } = await getSelectedCalendarioState();

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant text-[0.6875rem] font-bold tracking-widest uppercase rounded-sm">
              Iniciativa Independiente
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
              Acerca de <span className="text-primary">Agenda UDG</span>
            </h1>
            <p className="text-xl text-on-surface-variant leading-relaxed max-w-xl font-body">
              Elegir tus materias cada semestre no debería ser un dolor de
              cabeza. Sabemos que es complicado leer la Oferta Academica en
              SIIAU, y que las herramientas oficiales no siempre son las más
              amigables.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/5 rounded-xl blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
            <Image
              alt="musa"
              className="relative rounded-xl shadow-2xl w-full h-[400px] object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              src="/images/musa.jpg"
              width={1920}
              height={1217}
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-on-surface">
                Nuestra Misión
              </h2>
              <div className="h-1 w-24 bg-primary" />
            </div>
            <p className="text-on-surface-variant max-w-md font-body italic">
              &ldquo;LEO tampoco resolvió nada, pero al menos era bonito&rdquo;
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-surface-container-lowest p-10 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <h3 className="text-2xl font-bold mb-4 text-on-surface">
                Facilitar la Organización
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-lg font-body">
                Nacimos de la necesidad de contar con una interfaz clara y
                funcional para ofrecerte una experiencia visual moderna, rápida
                y sin complicaciones, basada en los datos públicos de la
                universidad. Nuestra misión es ayudarte a planear tu semestre de
                forma fácil y eficiente, para que puedas enfocarte en lo que
                realmente importa: aprender y disfrutar tu vida universitaria.
              </p>
              <div className="mt-8 flex items-center gap-4 text-primary font-bold">
                <Link href="https://cucei.dev">Explorar Herramientas</Link>
                <MaterialIcon name="arrow_forward" />
              </div>
            </div>
            <div className="bg-primary text-white p-10 rounded-xl flex flex-col justify-between">
              <MaterialIcon name="auto_awesome" className="text-4xl" />
              <div>
                <div className="text-4xl font-black mb-2 tracking-tighter">
                  {calendario ? calendario.name : "Ciclo No Disponible"}
                </div>
                <p className="text-primary-fixed/80 font-medium">
                  Optimizado para el ciclo actual con las últimas
                  actualizaciones de oferta académica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-surface-container-high rounded-xl flex items-center justify-center">
                <MaterialIcon
                  name="database"
                  className="text-primary text-5xl"
                />
              </div>
              <div className="aspect-square bg-surface-container-high rounded-xl p-6 flex flex-col justify-end">
                <span className="text-on-surface-variant text-xs font-bold tracking-widest uppercase">
                  Fuente
                </span>
                <span className="text-on-surface font-bold text-xl">
                  SIIAU Público
                </span>
              </div>
              <div className="col-span-2 bg-tertiary-container p-8 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <MaterialIcon
                    name="warning"
                    className="text-on-tertiary-fixed"
                  />
                  <h4 className="font-bold text-on-tertiary-fixed">
                    Nota de Transparencia
                  </h4>
                </div>
                <p className="text-on-tertiary-fixed-variant font-body text-sm leading-relaxed">
                  Los datos presentados son extraídos de fuentes públicas. Al
                  ser una herramienta no oficial, recomendamos siempre verificar
                  la información final en los canales institucionales antes de
                  cualquier proceso administrativo.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface leading-tight">
              Datos Abiertos y <br />
              <span className="text-secondary">Transparencia Radical</span>
            </h2>
            <p className="text-on-surface-variant text-lg font-body leading-relaxed">
              Creemos en el poder de la información. Agenda UDG utiliza los
              datos de la oferta académica disponibles públicamente para
              construir una capa visual moderna sobre la infraestructura
              existente del SIIAU.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MaterialIcon
                  name="check_circle"
                  className="text-primary mt-1"
                />
                <span className="text-on-surface-variant font-body">
                  Actualización constante según reportes de disponibilidad.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <MaterialIcon
                  name="check_circle"
                  className="text-primary mt-1"
                />
                <span className="text-on-surface-variant font-body">
                  Sin intermediarios ni captura de credenciales oficiales.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-3xl mx-auto px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface">
              Preguntas Frecuentes
            </h2>
            <p className="text-on-surface-variant font-body">
              Resolviendo tus dudas sobre la plataforma.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border-l-4 border-primary">
              <h4 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-3">
                <MaterialIcon name="help" className="text-primary" />
                ¿Es esta una herramienta oficial?
              </h4>
              <p className="text-on-surface-variant font-body leading-relaxed">
                No. Agenda UDG es un proyecto independiente creado por
                estudiantes y para estudiantes. No tiene vinculación legal,
                laboral ni administrativa directa con la Universidad de
                Guadalajara. Es una alternativa estética para la consulta de
                información pública.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border-l-4 border-secondary">
              <h4 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-3">
                <MaterialIcon name="security" className="text-secondary" />
                ¿Cómo se guardan mis datos?
              </h4>
              <p className="text-on-surface-variant font-body leading-relaxed">
                Tu privacidad es fundamental. Agenda UDG no utiliza bases de
                datos externas para guardar tus horarios. Toda la información
                que selecciones se almacena de forma local en tu navegador
                (LocalStorage). No requerimos login ni recolectamos información
                personal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
