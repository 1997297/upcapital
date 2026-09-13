export type ClientTheme = "light" | "dark";
export const THEME_COOKIE = "upcapital-theme";
export function clientTheme(value: unknown): ClientTheme {
  return value === "light" ? "light" : "dark";
}
