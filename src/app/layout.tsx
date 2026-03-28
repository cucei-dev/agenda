import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { TopNavBar } from "@/components/layout/top-nav-bar";
import { BottomNavBar } from "@/components/layout/bottom-nav-bar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Planea UDG",
  description:
    "Buscador de materias y horarios académicos - Universidad de Guadalajara",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${inter.variable} light`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface font-body antialiased min-h-full flex flex-col">
        <TopNavBar />
        <div className="flex-1">{children}</div>
        <Footer />
        <BottomNavBar />
      </body>
    </html>
  );
}
