import { AuthForm } from "@/components/auth/auth-form";
import { AuthHeading } from "@/components/auth/auth-heading";
import { requireUser } from "@/lib/auth/session";
export const metadata = { title: "Choose a new password" };
export default async function Page() {
  await requireUser();
  return (
    <>
      <AuthHeading
        title="A fresh start."
        description="Choose a strong, unique password for your UPCapital account."
      />
      <AuthForm mode="reset-password" />
    </>
  );
}
