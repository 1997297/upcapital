"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { THEME_COOKIE, type ClientTheme } from "@/lib/client/theme";

const ThemeContext = createContext<{ theme: ClientTheme; toggle: () => void } | null>(null);
export function ClientThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: ClientTheme;
  children: ReactNode;
}) {
  const [theme, setTheme] = useState(initialTheme);
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.cookie = `${THEME_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    setTheme(next);
  }
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className="client-area min-h-screen" data-client-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
export function ThemeToggle() {
  const context = useContext(ThemeContext);
  if (!context) return null;
  return (
    <button
      type="button"
      onClick={context.toggle}
      aria-label={`Switch to ${context.theme === "dark" ? "light" : "dark"} mode`}
      className="min-h-11 rounded-lg border border-[var(--border)] px-3 text-sm font-semibold hover:bg-surface-elevated"
    >
      {context.theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
