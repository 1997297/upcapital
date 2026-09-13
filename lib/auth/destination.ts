export function authDestination(
  next: unknown,
): "/dashboard" | "/auth/account" | "/auth/reset-password" {
  if (next === "reset-password") return "/auth/reset-password";
  if (next === "account") return "/auth/account";
  return "/dashboard";
}
