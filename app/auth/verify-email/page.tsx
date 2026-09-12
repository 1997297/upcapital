import { AuthForm } from "@/components/auth/auth-form";
import { AuthHeading } from "@/components/auth/auth-heading";
export const metadata = { title: "Verify your email" };
export default function Page() {
  return (
    <>
      <AuthHeading
        title="Check your inbox."
        description="Open your verification link in this browser to confirm your email. If you need another link, enter the email you registered with below."
      />
      <AuthForm mode="verify-email" />
    </>
  );
}
