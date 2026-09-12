"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/session";
import {
  emailSchema,
  registrationSchema,
  resetSchema,
  validationState,
  type AuthState,
} from "@/lib/auth/validation";

const unavailable = {
  error: "Account services are temporarily unavailable. Please try again later.",
};
function callback(recovery = false) {
  const origin = process.env.NEXT_PUBLIC_APP_URL;
  if (!origin) throw new Error("Missing application origin");
  return new URL(`/auth/callback${recovery ? "?next=reset-password" : ""}`, origin).toString();
}

export async function register(_: AuthState, form: FormData): Promise<AuthState> {
  const result = registrationSchema.safeParse(Object.fromEntries(form));
  if (!result.success) return validationState(result.error);
  try {
    const supabase = await createClient();
    if (!supabase) return unavailable;
    const v = result.data;
    const { error } = await supabase.auth.signUp({
      email: v.email,
      password: v.password,
      options: {
        emailRedirectTo: callback(),
        data: {
          first_name: v.firstName,
          last_name: v.lastName,
          country: v.country,
          phone: v.phone,
          acknowledgements: {
            terms: true,
            privacy: true,
            risk: true,
            version: "2026-09-12",
            accepted_at: new Date().toISOString(),
          },
        },
      },
    });
    if (error)
      return {
        error:
          "We could not create your account. Try again later, or sign in if you already registered.",
      };
  } catch {
    return unavailable;
  }
  redirect("/auth/verify-email");
}

export async function login(_: AuthState, form: FormData): Promise<AuthState> {
  const email = emailSchema.safeParse(form.get("email"));
  if (!email.success) return { fields: { email: "Enter a valid email address." } };
  const password = form.get("password");
  if (typeof password !== "string" || !password || password.length > 128)
    return { error: "Enter your email and password." };
  try {
    const supabase = await createClient();
    if (!supabase) return unavailable;
    const { error } = await supabase.auth.signInWithPassword({ email: email.data, password });
    if (error)
      return {
        error:
          error.code === "email_not_confirmed"
            ? "Verify your email before signing in. You can request another link below."
            : "Sign-in failed. Check your email and password and try again.",
      };
  } catch {
    return unavailable;
  }
  redirect("/auth/account");
}

export async function forgotPassword(_: AuthState, form: FormData): Promise<AuthState> {
  const email = emailSchema.safeParse(form.get("email"));
  if (!email.success) return { fields: { email: "Enter a valid email address." } };
  try {
    const supabase = await createClient();
    if (!supabase) return unavailable;
    const { error } = await supabase.auth.resetPasswordForEmail(email.data, {
      redirectTo: callback(true),
    });
    if (error)
      return { error: "We could not process the request. Please wait a minute and try again." };
    return {
      success:
        "If an account matches that address, you will receive a password reset link. Check your inbox and spam folder.",
    };
  } catch {
    return unavailable;
  }
}

export async function resendVerification(_: AuthState, form: FormData): Promise<AuthState> {
  const email = emailSchema.safeParse(form.get("email"));
  if (!email.success) return { fields: { email: "Enter a valid email address." } };
  try {
    const supabase = await createClient();
    if (!supabase) return unavailable;
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email.data,
      options: { emailRedirectTo: callback() },
    });
    if (error)
      return { error: "We could not process the request. Please wait a minute and try again." };
    return {
      success:
        "If your account needs verification, a new link will arrive in your inbox. Open it in this browser.",
    };
  } catch {
    return unavailable;
  }
}

export async function resetPassword(_: AuthState, form: FormData): Promise<AuthState> {
  const result = resetSchema.safeParse(Object.fromEntries(form));
  if (!result.success) return validationState(result.error);
  const { supabase } = await requireUser();
  try {
    const { error } = await supabase.auth.updateUser({ password: result.data.password });
    if (error)
      return {
        error:
          "Password could not be updated. Use a different password or request a new reset link.",
      };
    const { error: signOutError } = await supabase.auth.signOut({ scope: "global" });
    if (signOutError)
      return {
        success:
          "Password updated, but other sessions could not be signed out. Please contact support.",
      };
  } catch {
    return unavailable;
  }
  redirect("/auth/login?updated=1");
}

export async function logout() {
  const supabase = await createClient();
  if (supabase) {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error("Could not sign out. Please try again.");
  }
  redirect("/auth/login");
}
