import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs font-bold uppercase tracking-[0.22em] text-accent", className)} {...props} />;
}

export function Display({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn("text-[clamp(3rem,6vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-text-primary", className)} {...props} />;
}

export function SectionTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.035em] text-text-primary", className)} {...props} />;
}

export function Heading({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-xl font-bold tracking-[-0.02em] text-text-primary", className)} {...props} />;
}

export function Text({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-base leading-7 text-text-secondary", className)} {...props} />;
}

export function FinancialValue({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span data-financial-value className={cn("font-data tabular-nums", className)} {...props} />;
}
