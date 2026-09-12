import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireUser(requireMfa = true) {
  const supabase = await createClient();
  if (!supabase) redirect("/auth/login");
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) redirect("/auth/login");
  if (!user.email_confirmed_at) redirect("/auth/verify-email");
  const { data: assurance, error: assuranceError } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (assuranceError || !assurance) redirect("/auth/login");
  if (requireMfa && assurance.nextLevel === "aal2" && assurance.currentLevel !== "aal2")
    redirect("/auth/2fa");
  return { supabase, user, assurance };
}
