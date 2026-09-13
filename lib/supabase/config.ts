export function supabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? { url, key } : null;
}

export const authCookieOptions = {
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NEXT_PUBLIC_APP_URL?.startsWith("https://") ?? false,
};
