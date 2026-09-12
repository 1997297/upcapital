import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const destination =
    request.nextUrl.searchParams.get("next") === "reset-password"
      ? "/auth/reset-password"
      : "/auth/account";
  const origin = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
  if (code) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) return NextResponse.redirect(new URL(destination, origin));
      }
    } catch {
      /* Show an actionable expired-link screen without exposing provider details. */
    }
  }
  return NextResponse.redirect(new URL("/auth/link-expired", origin));
}
