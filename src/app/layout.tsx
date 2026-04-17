import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Script from "next/script";
import { TopNavBar } from "@/components/layout/top-nav-bar";
import { BottomNavBar } from "@/components/layout/bottom-nav-bar";
import { Footer } from "@/components/layout/footer";
import { PwaInstallBanner } from "@/components/layout/pwa-install-banner";
import { getSelectedCalendarioState } from "@/lib/calendario-selection";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const BASE_URL = "https://agenda.cucei.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Agenda UDG",
    template: "%s | Agenda UDG",
  },
  description:
    "Consulta materias, claves y arma tu horario académico de la Universidad de Guadalajara (UDG) de forma fácil y visual. Basado en datos públicos de SIIAU.",
  keywords: [
    "UDG",
    "Universidad de Guadalajara",
    "CUCEI",
    "SIIAU",
    "horario académico",
    "materias UDG",
    "oferta académica",
    "agenda universitaria",
    "buscador de materias",
  ],
  authors: [{ name: "CUCEI.dev", url: "https://cucei.dev" }],
  creator: "CUCEI.dev",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: BASE_URL,
    siteName: "Agenda UDG",
    title: "Agenda UDG – Buscador de materias y horarios",
    description:
      "Consulta materias, claves y arma tu horario académico de la UDG de forma fácil y visual.",
    images: [
      {
        url: "/images/og-image.png",
        width: 402,
        height: 874,
        alt: "Agenda UDG – Buscador de materias y horarios académicos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agenda UDG – Buscador de materias y horarios",
    description:
      "Consulta materias, claves y arma tu horario académico de la UDG de forma fácil y visual.",
    images: ["/images/og-image.png"],
    creator: "@cuceidev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { calendarios, selectedCalendario } = await getSelectedCalendarioState();

  return (
    <html lang="es" className={`${manrope.variable} ${inter.variable} light`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#78161e" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#78161e" />
      </head>
      <body className="bg-surface text-on-surface font-body antialiased min-h-full flex flex-col">
        <TopNavBar
          calendarios={calendarios}
          selectedCalendarioId={selectedCalendario?.id ?? null}
        />
        <div className="flex-1">{children}</div>
        <Footer />
        <BottomNavBar />
        <PwaInstallBanner />
        <Script id="service-worker-registration" strategy="afterInteractive">
          {`
            if (typeof navigator.serviceWorker !== "undefined") {
              navigator.serviceWorker.register("/service-worker.js");
            }
          `}
        </Script>
      </body>
    </html>
  );
}
