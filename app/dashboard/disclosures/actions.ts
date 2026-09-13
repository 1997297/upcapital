"use server";

import { cookies } from "next/headers";
import { requireUser } from "@/lib/auth/session";
import {
  DISCLOSURE_COOKIE,
  DISCLOSURE_VERSION,
  loginAcknowledgement,
} from "@/lib/disclosures/policy";

export async function saveDisclosure(hideOnLogin: boolean): Promise<{ error?: string }> {
  const { user, supabase } = await requireUser();
  if (typeof hideOnLogin !== "boolean") return { error: "Choose a valid disclosure preference." };
  try {
    // A display preference only: never authorization or an immutable legal audit record.
    const { error } = await supabase.auth.updateUser({
      data: {
        investment_disclosure: {
          version: DISCLOSURE_VERSION,
          acceptedAt: new Date().toISOString(),
          hideOnLogin,
        },
      },
    });
    if (error) return { error: "Your preference could not be saved. Please try again." };
    (await cookies()).set(
      DISCLOSURE_COOKIE,
      loginAcknowledgement(user.id, user.last_sign_in_at || user.created_at),
      {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NEXT_PUBLIC_APP_URL?.startsWith("https://") ?? false,
        path: "/",
        maxAge: 31536000,
      },
    );
    return {};
  } catch {
    return { error: "Your preference could not be saved. Please try again." };
  }
}
