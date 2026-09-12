"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface AccordionItemData {
  id: string;
  title: string;
  content: string;
}

export function Accordion({ items, defaultOpen }: { items: AccordionItemData[]; defaultOpen?: string }) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-white/[0.08]">
      {items.map((item, index) => {
        const expanded = open === item.id;
        return (
          <div key={item.id} className={cn(index > 0 && "border-t border-white/[0.07]")}>
            <h3>
              <button className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-text-primary hover:bg-white/[0.025]" aria-expanded={expanded} aria-controls={`${item.id}-panel`} onClick={() => setOpen(expanded ? null : item.id)}>
                {item.title}
                <span className={cn("text-xl text-text-muted transition-transform", expanded && "rotate-45")} aria-hidden="true">+</span>
              </button>
            </h3>
            {expanded && <div id={`${item.id}-panel`} className="px-5 pb-5 text-sm leading-6 text-text-secondary">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
