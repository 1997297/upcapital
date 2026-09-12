import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, id, label, hint, error, children, ...props },
  ref,
) {
  const selectId = id ?? props.name;
  const describedBy = error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined;

  return (
    <label className="block space-y-2" htmlFor={selectId}>
      {label && <span className="block text-sm font-semibold text-text-primary">{label}</span>}
      <select
        ref={ref}
        id={selectId}
        className={cn(
          "h-11 w-full rounded-[var(--radius-input)] border bg-surface-elevated px-3 text-sm text-text-primary outline-none transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/10 disabled:cursor-not-allowed disabled:opacity-60",
          error ? "border-danger/70" : "border-white/10",
          className,
        )}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
        {...props}
      >
        {children}
      </select>
      {error ? (
        <span id={`${selectId}-error`} className="block text-xs leading-5 text-danger">
          {error}
        </span>
      ) : hint ? (
        <span id={`${selectId}-hint`} className="block text-xs leading-5 text-text-muted">
          {hint}
        </span>
      ) : null}
    </label>
  );
});
