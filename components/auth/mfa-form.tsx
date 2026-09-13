"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function MfaForm({
  factors,
  destination,
}: {
  factors: { id: string; name: string }[];
  destination: "/dashboard" | "/auth/account" | "/auth/reset-password";
}) {
  const router = useRouter();
  const [factorId, setFactorId] = useState(factors[0]?.id || "");
  const [setup, setSetup] = useState<{ qr: string; secret: string } | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  async function enroll() {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      const supabase = createClient();
      const existing = await supabase.auth.mfa.listFactors();
      if (existing.error) throw existing.error;
      // Remove only incomplete enrollments so a refreshed setup can start again.
      for (const factor of existing.data.all.filter(
        (f) => f.status === "unverified" && f.factor_type === "totp",
      )) {
        const removed = await supabase.auth.mfa.unenroll({ factorId: factor.id });
        if (removed.error) throw removed.error;
      }
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "UPCapital authenticator",
        issuer: "UPCapital",
      });
      if (error) throw error;
      setFactorId(data.id);
      setSetup({ qr: data.totp.qr_code, secret: data.totp.secret });
    } catch {
      setError("Authenticator setup could not be started. Please try again.");
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  async function verify(form: FormData) {
    if (lock.current) return;
    const code = String(form.get("code") || "").trim();
    if (!/^\d{6}$/.test(code)) {
      setError("Enter the six-digit code from your authenticator app.");
      return;
    }
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      const { error } = await createClient().auth.mfa.challengeAndVerify({ factorId, code });
      if (error) {
        setError("That code could not be verified. Check your app and try a fresh code.");
        return;
      }
      setSetup(null);
      router.replace(destination);
      router.refresh();
    } catch {
      setError("Verification is temporarily unavailable. Please try again.");
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return (
    <div className="mt-7 space-y-5">
      {!factorId && (
        <Button variant="secondary" loading={busy} onClick={enroll}>
          Set up authenticator
        </Button>
      )}
      {setup && (
        <div className="space-y-4">
          <p className="text-sm leading-6 text-text-secondary">
            Scan this code with your authenticator app, then enter the six-digit code it generates.
          </p>
          <div className="w-fit max-w-full rounded-xl bg-white p-3">
            {/* Supabase supplies a QR data URL; keep it out of remote image services. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={setup.qr}
              alt="Scan to add UPCapital to your authenticator app"
              width={200}
              height={200}
            />
          </div>
          <details className="text-sm">
            <summary className="cursor-pointer text-text-secondary">Cannot scan the code?</summary>
            <p className="mt-3">Enter this setup key in your authenticator. Keep it private.</p>
            <code className="mt-2 block break-all rounded-lg bg-white/5 p-3">{setup.secret}</code>
          </details>
        </div>
      )}
      {factorId && (
        <form action={verify} className="space-y-5">
          {factors.length > 1 && (
            <label className="block text-sm">
              Authenticator
              <select
                value={factorId}
                onChange={(e) => setFactorId(e.target.value)}
                className="mt-2 block w-full rounded-lg bg-surface-elevated p-3"
              >
                {factors.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </label>
          )}
          <Input
            name="code"
            label="Authenticator code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            required
          />
          <Button type="submit" variant="secondary" loading={busy} className="w-full">
            {setup ? "Enable two-factor authentication" : "Verify and continue"}
          </Button>
        </form>
      )}
      {error && (
        <p role="alert" className="rounded-xl border border-danger/30 p-4 text-sm leading-6">
          {error}
        </p>
      )}
    </div>
  );
}
