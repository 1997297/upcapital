"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
}

export function Dropdown({ trigger, children, align = "left" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button type="button" aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen((value) => !value)} className="contents">
        {trigger}
      </button>
      {open && (
        <div role="menu" className={cn("absolute z-30 mt-2 min-w-48 rounded-xl border border-white/10 bg-surface-elevated p-1.5 shadow-2xl", align === "right" ? "right-0" : "left-0")}>{children}</div>
      )}
    </div>
  );
}

export function DropdownItem({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button role="menuitem" className={cn("flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-text-secondary hover:bg-white/[0.05] hover:text-text-primary", className)} {...props}>{children}</button>;
}
