"use client";

import { useEffect, useState } from "react";

const LS_KEY = "pwa-install-dismissed";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isPwa = new URLSearchParams(window.location.search).get("pwa") === "1";
    const isDismissed = localStorage.getItem(LS_KEY) === "1";

    if (isPwa || isDismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!visible) return null;

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem(LS_KEY, "1");
    }
    setVisible(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem(LS_KEY, "1");
    setVisible(false);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm">
      <div className="bg-surface-container-highest border border-outline-variant/30 rounded-2xl shadow-xl p-4 flex items-center gap-3">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <span
            className="material-symbols-outlined text-white text-xl"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
          >
            install_mobile
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-on-surface leading-tight">
            Instalar Agenda UDG
          </p>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Acceso rápido desde tu pantalla de inicio
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors"
            aria-label="Cerrar"
          >
            <span className="material-symbols-outlined text-base leading-none">close</span>
          </button>
          <button
            onClick={handleInstall}
            className="cursor-pointer bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
          >
            Instalar
          </button>
        </div>
      </div>
    </div>
  );
}
