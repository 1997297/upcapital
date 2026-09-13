import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { authDestination } from "@/lib/auth/destination";
import { AuthHeading } from "@/components/auth/auth-heading";
import { MfaForm } from "@/components/auth/mfa-form";
import { logout } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
export const metadata = { title: "Two-factor authentication" };
export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const destination = authDestination(next);
  const { supabase, assurance } = await requireUser(false);
  if (assurance.currentLevel === "aal2") redirect(destination);
  const { data, error } = await supabase.auth.mfa.listFactors();
  if (error) throw new Error("Could not load account protection. Please try again.");
  const factors = data.totp.map((f) => ({ id: f.id, name: f.friendly_name || "Authenticator" }));
  return (
    <>
      <AuthHeading
        title={factors.length ? "One more security check." : "Protect your account."}
        description={
          factors.length
            ? "Enter the code from your authenticator app to finish signing in."
            : "Add an authenticator app to protect your account with a second verification step."
        }
      />
      <MfaForm factors={factors} destination={destination} />
      <form action={logout} className="mt-6">
        <Button type="submit" variant="ghost">
          Sign out
        </Button>
      </form>
    </>
  );
}
