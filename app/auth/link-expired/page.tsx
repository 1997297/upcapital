import Link from "next/link";
import { AuthHeading } from "@/components/auth/auth-heading";
export const metadata = { title: "Request a new link" };
export default function Page() {
  return (
    <>
      <AuthHeading
        title="This link cannot be used."
        description="It may have expired, already been used, or been opened in a different browser. Request a new link and open it in the browser where you made the request."
      />
      <div className="mt-8 grid gap-4 text-sm">
        <Link className="text-accent underline" href="/auth/verify-email">
          Request an email verification link
        </Link>
        <Link className="text-accent underline" href="/auth/forgot-password">
          Request a password reset link
        </Link>
        <Link className="text-text-secondary underline" href="/auth/login">
          Return to sign in
        </Link>
      </div>
    </>
  );
}
