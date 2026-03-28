"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/mock";

export function TopNavBar() {
  const pathname = usePathname();

  return (
    <header className="bg-surface dark:bg-slate-950 sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/">
            <span className="font-headline font-extrabold text-primary dark:text-red-500 tracking-tight text-2xl">
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
                      ? "text-primary dark:text-red-400 font-bold border-b-2 border-primary pb-1 font-body text-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-primary transition-colors font-body text-sm"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all active:scale-95 active:duration-150">
            <span className="material-symbols-outlined text-on-surface-variant">
              search
            </span>
          </button>
        </div>
      </div>
      <div className="bg-surface-container-low dark:bg-slate-900 h-px w-full" />
    </header>
  );
}
