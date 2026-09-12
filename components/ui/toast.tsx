"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type ToastTone = "success" | "error" | "warning" | "info";
interface ToastInput { title: string; description?: string; tone?: ToastTone }
interface ToastItem extends ToastInput { id: number }

const ToastContext = createContext<{ toast: (input: ToastInput) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const toast = useCallback((input: ToastInput) => {
    const id = Date.now() + Math.random();
    setItems((current) => [...current, { id, tone: "info", ...input }]);
    window.setTimeout(() => setItems((current) => current.filter((item) => item.id !== id)), 4500);
  }, []);
  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-[70] flex w-[min(calc(100%-2rem),24rem)] flex-col gap-2" aria-live="polite" aria-atomic="true">
        {items.map((item) => <ToastCard key={item.id} item={item} onClose={() => setItems((current) => current.filter((entry) => entry.id !== item.id))} />)}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({ item, onClose }: { item: ToastItem; onClose: () => void }) {
  const toneClass: Record<ToastTone, string> = {
    success: "border-success/30 before:bg-success",
    error: "border-danger/30 before:bg-danger",
    warning: "border-warning/30 before:bg-warning",
    info: "border-accent/30 before:bg-accent",
  };
  return (
    <div className={cn("relative overflow-hidden rounded-xl border bg-surface-elevated p-4 pl-5 shadow-2xl before:absolute before:inset-y-0 before:left-0 before:w-1", toneClass[item.tone ?? "info"])}>
      <div className="flex items-start justify-between gap-3">
        <div><p className="text-sm font-bold text-text-primary">{item.title}</p>{item.description && <p className="mt-1 text-xs leading-5 text-text-secondary">{item.description}</p>}</div>
        <button onClick={onClose} aria-label="Dismiss notification" className="text-lg leading-none text-text-muted hover:text-text-primary">×</button>
      </div>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
