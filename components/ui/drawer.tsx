"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  side?: "left" | "right";
  className?: string;
}

export function Drawer({ open, onClose, title, children, side = "right", className }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-label="Close drawer" />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={cn(
          "absolute inset-y-0 w-[min(90vw,24rem)] border-white/10 bg-surface-elevated p-5 shadow-2xl md:p-6",
          side === "right" ? "right-0 border-l" : "left-0 border-r",
          className,
        )}
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 id="drawer-title" className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="grid size-9 place-items-center rounded-lg text-xl text-text-muted hover:bg-white/[0.05] hover:text-text-primary" aria-label="Close drawer">×</button>
        </div>
        {children}
      </aside>
    </div>
  );
}
