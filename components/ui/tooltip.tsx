import type { ReactNode } from "react";

export function Tooltip({ content, children }: { content: ReactNode; children: ReactNode }) {
  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span role="tooltip" className="pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-30 w-max max-w-64 -translate-x-1/2 rounded-lg border border-white/10 bg-surface-elevated px-2.5 py-1.5 text-xs leading-5 text-text-primary opacity-0 shadow-xl transition-opacity group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100">
        {content}
      </span>
    </span>
  );
}
