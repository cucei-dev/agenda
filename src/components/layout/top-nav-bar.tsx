"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarioSelector } from "@/components/layout/calendario-selector";
import { navItems } from "@/data/mock";
import type { ApiCalendario } from "@/lib/types";

interface TopNavBarProps {
  calendarios: ApiCalendario[];
  selectedCalendarioId: number | null;
}

export function TopNavBar({
  calendarios,
  selectedCalendarioId,
}: TopNavBarProps) {
  const pathname = usePathname();

  return (
    <header className="bg-[#f9f9fb] sticky top-0 z-50">
      <div className="w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-8">
            <Link href="/">
              <span className="font-headline font-extrabold text-primary tracking-tight text-2xl">
                Agenda UDG
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      isActive
                        ? "text-primary font-bold border-b-2 border-primary pb-1 font-body text-sm"
                        : "text-slate-600 hover:text-primary transition-colors font-body text-sm"
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <CalendarioSelector
            calendarios={calendarios}
            selectedCalendarioId={selectedCalendarioId}
          />
        </div>
      </div>
      <div className="bg-[#f3f3f5] h-px w-full" />
    </header>
  );
}
