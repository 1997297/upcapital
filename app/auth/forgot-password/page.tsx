import { AuthForm } from "@/components/auth/auth-form";
import { AuthHeading } from "@/components/auth/auth-heading";
export const metadata = { title: "Reset your password" };
export default function Page() {
  return (
    <>
      <AuthHeading
        title="Forgot your password?"
        description="Enter your account email and we will send instructions to reset your password. Open the link in this browser."
      />
      <AuthForm mode="forgot-password" />
    </>
  );
}
