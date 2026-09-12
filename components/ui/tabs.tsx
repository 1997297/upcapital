"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ items, defaultValue, className }: { items: TabItem[]; defaultValue?: string; className?: string }) {
  const [active, setActive] = useState(defaultValue ?? items[0]?.value);
  const activeItem = items.find((item) => item.value === active);

  return (
    <div className={className}>
      <div role="tablist" className="inline-flex max-w-full gap-1 overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
        {items.map((item) => (
          <button key={item.value} role="tab" aria-selected={active === item.value} onClick={() => setActive(item.value)} className={cn("whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors", active === item.value ? "bg-white/[0.08] text-text-primary" : "text-text-muted hover:text-text-secondary")}>{item.label}</button>
        ))}
      </div>
      <div role="tabpanel" className="mt-4">{activeItem?.content}</div>
    </div>
  );
}
