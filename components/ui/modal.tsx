"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, description, children, footer, className }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const handleEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" role="presentation">
      <button className="absolute inset-0 bg-black/65 backdrop-blur-sm" aria-label="Close modal" onClick={onClose} />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn("relative z-10 w-full max-w-lg rounded-[var(--radius-section)] border border-white/10 bg-surface-elevated shadow-2xl", className)}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.07] p-5 md:p-6">
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-text-primary">{title}</h2>
            {description && <p className="mt-1 text-sm leading-6 text-text-secondary">{description}</p>}
          </div>
          <button ref={closeRef} onClick={onClose} className="grid size-9 shrink-0 place-items-center rounded-lg text-xl text-text-muted hover:bg-white/[0.05] hover:text-text-primary" aria-label="Close modal">×</button>
        </div>
        {children && <div className="p-5 md:p-6">{children}</div>}
        {footer && <div className="flex flex-wrap justify-end gap-3 border-t border-white/[0.07] p-5 md:p-6">{footer}</div>}
      </section>
    </div>
  );
}
