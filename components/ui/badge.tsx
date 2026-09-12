import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "neutral" | "primary" | "accent" | "success" | "warning" | "danger";

const variants: Record<BadgeVariant, string> = {
  neutral: "border-white/10 bg-white/[0.05] text-text-secondary",
  primary: "border-primary/20 bg-primary/10 text-primary-highlight",
  accent: "border-accent/20 bg-accent/10 text-accent",
  success: "border-success/20 bg-success/10 text-success",
  warning: "border-warning/20 bg-warning/10 text-warning",
  danger: "border-danger/20 bg-danger/10 text-danger",
};

export function Badge({ className, variant = "neutral", ...props }: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold leading-none", variants[variant], className)}
      {...props}
    />
  );
}
