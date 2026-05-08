"use client";

declare global {
  interface Window {
    rybbit?: {
      event: (eventName: string, eventData?: Record<string, unknown>) => void;
      pageview: () => void;
    };
  }
}

function getRybbit() {
  if (typeof window === "undefined") return null;
  return window.rybbit ?? null;
}

export function rybbitEvent(eventName: string, eventData?: Record<string, unknown>) {
  try {
    const rybbit = getRybbit();
    if (rybbit && typeof rybbit.event === "function") {
      rybbit.event(eventName, eventData);
    }
  } catch {
    // Analytics should never break the app
  }
}

export function rybbitPageview() {
  try {
    const rybbit = getRybbit();
    if (rybbit && typeof rybbit.pageview === "function") {
      rybbit.pageview();
    }
  } catch {
    // Analytics should never break the app
  }
}
