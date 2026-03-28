"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/mock";

export function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 md:hidden bg-white/80 backdrop-blur-xl border-t border-outline-variant/15 shadow-[0_-8px_24px_rgba(26,28,29,0.04)] rounded-t-3xl">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              isActive
                ? "flex flex-col items-center justify-center bg-primary text-white rounded-2xl px-5 py-2 transition-transform duration-300 ease-out active:scale-90"
                : "flex flex-col items-center justify-center text-slate-500 px-5 py-2 hover:text-primary transition-transform duration-300 ease-out active:scale-90"
            }
          >
            <span
              className="material-symbols-outlined"
              style={
                isActive
                  ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }
                  : undefined
              }
            >
              {item.icon}
            </span>
            <span className="font-body text-[10px] uppercase tracking-widest font-semibold mt-1">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
