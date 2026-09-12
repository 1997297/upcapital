import Link from "next/link";
import { requireUser } from "@/lib/auth/session";
import { logout } from "@/app/auth/actions";
import { AuthHeading } from "@/components/auth/auth-heading";
import { Button } from "@/components/ui/button";
export const metadata = { title: "Your account" };
export default async function Page() {
  const { user, assurance } = await requireUser();
  return (
    <>
      <AuthHeading
        title="Your account."
        description="Manage your verified account access and sign-in protection."
      />
      <dl className="mt-8 space-y-5 text-sm">
        <div>
          <dt className="text-text-secondary">Email address</dt>
          <dd className="mt-1 break-all">{user.email}</dd>
        </div>
        <div>
          <dt className="text-text-secondary">Email verification</dt>
          <dd className="mt-1 text-accent">Verified</dd>
        </div>
        <div>
          <dt className="text-text-secondary">Two-factor authentication</dt>
          <dd className="mt-1">
            {assurance.currentLevel === "aal2" ? "Enabled and verified" : "Not enabled"}
          </dd>
        </div>
      </dl>
      {assurance.nextLevel !== "aal2" && (
        <Link
          href="/auth/2fa"
          className="mt-7 block rounded-xl bg-accent px-5 py-3 text-center text-sm font-semibold text-background"
        >
          Set up two-factor authentication
        </Link>
      )}
      <div className="mt-6 flex flex-wrap gap-5 text-sm">
        <Link href="/auth/reset-password" className="underline">
          Change password
        </Link>
        <Link href="/" className="underline">
          Return to website
        </Link>
      </div>
      <form action={logout} className="mt-8 border-t border-white/10 pt-6">
        <Button type="submit" variant="outline">
          Sign out
        </Button>
      </form>
    </>
  );
}
