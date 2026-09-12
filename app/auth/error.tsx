"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div role="alert">
      <h1 className="text-2xl font-semibold">We could not complete that request.</h1>
      <p className="mt-4 text-sm leading-6 text-text-secondary">
        Please try again. If the issue continues, contact support.
      </p>
      <Button onClick={reset} className="mt-6">
        Try again
      </Button>
    </div>
  );
}
