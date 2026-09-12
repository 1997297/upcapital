import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, id, label, hint, error, leading, trailing, ...props },
  ref,
) {
  const inputId = id ?? props.name;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <label className="block space-y-2" htmlFor={inputId}>
      {label && <span className="block text-sm font-semibold text-text-primary">{label}</span>}
      <span
        className={cn(
          "flex h-11 items-center gap-2 rounded-[var(--radius-input)] border bg-white/[0.025] px-3 transition-colors focus-within:border-accent/60 focus-within:ring-2 focus-within:ring-accent/10",
          error ? "border-danger/70" : "border-white/10",
        )}
      >
        {leading && <span className="text-text-muted">{leading}</span>}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-60",
            className,
          )}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {trailing && <span className="text-text-muted">{trailing}</span>}
      </span>
      {error ? (
        <span id={`${inputId}-error`} className="block text-xs leading-5 text-danger">
          {error}
        </span>
      ) : hint ? (
        <span id={`${inputId}-hint`} className="block text-xs leading-5 text-text-muted">
          {hint}
        </span>
      ) : null}
    </label>
  );
});
