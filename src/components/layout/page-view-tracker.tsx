"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { rybbitPageview } from "@/lib/analytics";

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    rybbitPageview();
  }, [pathname]);

  return null;
}
