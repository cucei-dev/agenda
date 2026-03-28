"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/mock";

export function TopNavBar() {
  const pathname = usePathname();

  return (
    <header className="bg-[#f9f9fb] sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/">
            <span className="font-headline font-extrabold text-primary tracking-tight text-2xl">
              Gaceta Académica
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
        <div className="flex items-center gap-4">
          {pathname === "/horario" ? (
            <>
              <div className="hidden md:flex items-center bg-surface-container-high rounded-full px-4 py-2 w-64 group focus-within:bg-surface-container-lowest focus-within:shadow-[0_8px_24px_rgba(26,28,29,0.04)] transition-all">
                <span className="material-symbols-outlined text-on-surface-variant text-lg">
                  search
                </span>
                <input
                  className="bg-transparent border-none focus:ring-0 text-sm w-full font-body"
                  placeholder="Buscar materias..."
                  type="text"
                />
              </div>
              <button className="md:hidden p-2 hover:bg-slate-100 rounded-md transition-all">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </>
          ) : (
            <button className="p-2 hover:bg-slate-100 rounded-md transition-all active:scale-95 active:duration-150">
              <span className="material-symbols-outlined text-on-surface-variant">
                search
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="bg-[#f3f3f5] h-px w-full" />
    </header>
  );
}
