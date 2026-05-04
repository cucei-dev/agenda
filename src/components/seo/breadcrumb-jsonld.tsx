"use client";

import { usePathname } from "next/navigation";

const BASE_URL = "https://agenda.cucei.dev";

const SEGMENT_NAMES: Record<string, string> = {
  horario: "Mi Horario",
  materias: "Catálogo de Materias",
  about: "Acerca de",
};

export function BreadcrumbJsonLd() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const items = [
    {
      "@type": "ListItem" as const,
      position: 1,
      name: "Inicio",
      item: BASE_URL,
    },
    ...segments.map((segment, index) => {
      const position = index + 2;
      const name = SEGMENT_NAMES[segment] ?? segment;
      const item = `${BASE_URL}/${segments.slice(0, index + 1).join("/")}`;
      return {
        "@type": "ListItem" as const,
        position,
        name,
        item,
      };
    }),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
