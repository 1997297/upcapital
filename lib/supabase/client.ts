import { createBrowserClient } from "@supabase/ssr";
import { authCookieOptions, supabaseConfig } from "./config";

export function createClient() {
  const config = supabaseConfig();
  if (!config)
    throw new Error("Account services are temporarily unavailable. Please try again later.");
  return createBrowserClient(config.url, config.key, { cookieOptions: authCookieOptions });
}
