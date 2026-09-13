"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  login,
  register,
  forgotPassword,
  resendVerification,
  resetPassword,
} from "@/app/auth/actions";
import {
  credentialsSchema,
  contactSchema,
  validationState,
  type AuthState,
} from "@/lib/auth/validation";

type Mode = "login" | "register" | "forgot-password" | "verify-email" | "reset-password";
const actions = {
  login,
  register,
  "forgot-password": forgotPassword,
  "verify-email": resendVerification,
  "reset-password": resetPassword,
};
const labels = {
  login: "Sign in",
  register: "Create account",
  "forgot-password": "Send reset link",
  "verify-email": "Resend verification email",
  "reset-password": "Save new password",
};

export function AuthForm({ mode }: { mode: Mode }) {
  const [state, action, pending] = useActionState(actions[mode], {} as AuthState);
  const [step, setStep] = useState(0);
  const [local, setLocal] = useState<AuthState>({});
  const [visible, setVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const fields = { ...state.fields, ...local.fields };
  const message = local.error || state.error || state.success;
  useEffect(() => {
    if (state.error || state.success) feedbackRef.current?.focus();
  }, [state]);

  function nextStep() {
    if (!formRef.current) return;
    const values = Object.fromEntries(new FormData(formRef.current));
    const result = (step === 0 ? credentialsSchema : contactSchema).safeParse(values);
    if (!result.success) {
      setLocal(validationState(result.error));
      return;
    }
    setLocal({});
    setStep(step + 1);
  }
  const passwordField = (confirm = false) => (
    <Input
      name={confirm ? "confirmPassword" : "password"}
      label={confirm ? "Confirm password" : mode === "reset-password" ? "New password" : "Password"}
      type={visible ? "text" : "password"}
      autoComplete={mode === "login" ? "current-password" : "new-password"}
      required
      maxLength={128}
      error={fields[confirm ? "confirmPassword" : "password"]}
      hint={
        !confirm && mode !== "login"
          ? "Use at least 12 characters. A unique passphrase works well."
          : undefined
      }
    />
  );

  return (
    <form
      ref={formRef}
      action={action}
      noValidate
      className="mt-7 space-y-5"
      onReset={(event) => event.preventDefault()}
      onSubmit={(event) => {
        if (mode === "register" && step < 2) {
          event.preventDefault();
          nextStep();
        }
      }}
    >
      {mode === "register" && (
        <ol aria-label="Registration progress" className="mb-7 flex gap-2">
          {["Account", "Contact", "Review"].map((label, index) => (
            <li
              key={label}
              aria-current={step === index ? "step" : undefined}
              className={`flex-1 border-t-2 pt-3 text-xs ${step === index ? "border-accent text-accent" : "border-white/15 text-text-secondary"}`}
            >
              {index + 1}. {label}
            </li>
          ))}
        </ol>
      )}
      <div hidden={mode === "register" && step !== 0} className="space-y-5">
        {mode === "register" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              name="firstName"
              label="First name"
              autoComplete="given-name"
              required
              maxLength={80}
              error={fields.firstName}
            />
            <Input
              name="lastName"
              label="Last name"
              autoComplete="family-name"
              required
              maxLength={80}
              error={fields.lastName}
            />
          </div>
        )}
        {mode !== "reset-password" && (
          <Input
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            error={fields.email}
          />
        )}
        {["login", "register", "reset-password"].includes(mode) && (
          <>
            {passwordField()}
            {mode !== "login" && passwordField(true)}
            <label className="flex items-center gap-3 text-sm text-text-secondary">
              <input
                type="checkbox"
                checked={visible}
                onChange={(e) => setVisible(e.target.checked)}
                className="size-4 accent-[#b8ff00]"
              />
              Show password{mode !== "login" ? "s" : ""}
            </label>
          </>
        )}
      </div>
      {mode === "register" && (
        <>
          <div hidden={step !== 1} className="space-y-5">
            <Input
              name="country"
              label="Country of residence"
              autoComplete="country-name"
              required
              maxLength={80}
              error={fields.country}
            />
            <Input
              name="phone"
              label="Phone number"
              type="tel"
              autoComplete="tel"
              required
              hint="Include + and your country code, without spaces."
              error={fields.phone}
              maxLength={16}
            />
          </div>
          <div hidden={step !== 2} className="space-y-5">
            <p className="text-sm leading-6 text-text-secondary">
              Review these documents before opening your account.
            </p>
            {[
              ["terms", "I accept the", "Terms of Service", "/legal/terms"],
              ["privacy", "I acknowledge the", "Privacy Policy", "/legal/privacy"],
              ["risk", "I have read and understand the", "Risk Disclosure", "/legal/risk"],
            ].map(([name, prefix, label, href]) => (
              <div key={name}>
                <label className="flex items-start gap-3 text-sm leading-6">
                  <input
                    name={name}
                    type="checkbox"
                    required
                    className="mt-1 size-4 shrink-0 accent-[#b8ff00]"
                    aria-invalid={!!fields[name]}
                  />
                  <span>
                    {prefix}{" "}
                    <Link href={href} target="_blank" className="underline underline-offset-4">
                      {label}
                    </Link>
                    .
                  </span>
                </label>
                {fields[name] && <p className="mt-1 text-xs text-danger">{fields[name]}</p>}
              </div>
            ))}
            <p className="text-xs leading-6 text-text-secondary">
              Investing involves risk, including loss of capital. Creating an account does not make
              an investment.
            </p>
          </div>
        </>
      )}
      {message && (
        <div
          ref={feedbackRef}
          tabIndex={-1}
          role={state.success ? "status" : "alert"}
          className={`rounded-xl border p-4 text-sm leading-6 ${state.success ? "border-accent/25 bg-accent/5" : "border-danger/30 bg-danger/5"}`}
        >
          {message}
          {mode === "register" && state.fields && (
            <button
              type="button"
              className="ml-2 underline"
              onClick={() => {
                setStep(0);
                setLocal({});
              }}
            >
              Review details
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        {mode === "register" && step > 0 && (
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={() => {
              setStep(step - 1);
              setLocal({});
            }}
          >
            Back
          </Button>
        )}
        {mode === "register" && step < 2 ? (
          <Button
            key="continue"
            type="button"
            variant="secondary"
            className="w-full sm:flex-1"
            onClick={(event) => {
              event.preventDefault();
              nextStep();
            }}
          >
            Continue
          </Button>
        ) : (
          <Button
            key="submit"
            type="submit"
            loading={pending}
            variant="secondary"
            className="w-full sm:flex-1"
          >
            {labels[mode]}
          </Button>
        )}
      </div>
      {mode === "login" && (
        <div className="flex flex-wrap justify-between gap-3 text-sm">
          <Link href="/auth/forgot-password" className="text-text-secondary hover:text-white">
            Forgot password?
          </Link>
          <Link href="/auth/verify-email" className="text-text-secondary hover:text-white">
            Verify email
          </Link>
        </div>
      )}
      <p className="border-t border-white/10 pt-5 text-center text-sm text-text-secondary">
        {mode === "login" ? (
          <>
            New to UPCapital?{" "}
            <Link href="/auth/register" className="font-semibold text-accent">
              Create account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-accent">
              Sign in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
