import { AuthForm } from "@/components/auth/auth-form";
import { AuthHeading } from "@/components/auth/auth-heading";
export const metadata = { title: "Sign in" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ updated?: string }>;
}) {
  const { updated } = await searchParams;
  return (
    <>
      <AuthHeading title="Welcome back." description="Sign in to your UPCapital account." />
      {updated === "1" && (
        <p role="status" className="mt-4 text-sm text-accent">
          Your password has been updated. Sign in with your new password.
        </p>
      )}
      <AuthForm mode="login" />
    </>
  );
}
