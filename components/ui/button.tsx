import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-highlight shadow-[0_8px_30px_rgba(116,86,232,0.22)]",
  secondary: "bg-accent text-background hover:brightness-110",
  outline: "border border-white/10 bg-white/[0.025] text-text-primary hover:border-white/20 hover:bg-white/[0.05]",
  ghost: "bg-transparent text-text-secondary hover:bg-white/[0.05] hover:text-text-primary",
  danger: "bg-danger text-white hover:brightness-110",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-4.5 text-sm",
  lg: "h-12 px-5 text-[15px]",
  icon: "size-10 p-0",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-[var(--radius-control)] font-semibold transition-[transform,background-color,border-color,color,filter] duration-200 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <span className="ui-spinner" aria-hidden="true" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
