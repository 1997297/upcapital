"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section role="alert" className="rounded-2xl border border-white/10 p-8">
      <h1 className="text-2xl font-semibold">Your dashboard could not be loaded.</h1>
      <p className="mt-3 text-sm text-text-secondary">
        Please try again. Your account information has not been changed.
      </p>
      <Button className="mt-6" onClick={reset}>
        Try again
      </Button>
    </section>
  );
}
