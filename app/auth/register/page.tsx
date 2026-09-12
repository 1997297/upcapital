import { AuthForm } from "@/components/auth/auth-form";
import { AuthHeading } from "@/components/auth/auth-heading";
export const metadata = { title: "Create account" };
export default function Page() {
  return (
    <>
      <AuthHeading
        title="Start with UPCapital."
        description="Create your account in three steps. Then verify your email to secure your access."
      />
      <AuthForm mode="register" />
    </>
  );
}
