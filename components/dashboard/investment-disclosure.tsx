"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { saveDisclosure } from "@/app/dashboard/disclosures/actions";
import { disclosureParagraphs, DISCLOSURE_VERSION } from "@/lib/disclosures/policy";

export function InvestmentDisclosure({
  required = false,
  initiallyHidden = false,
  preview = false,
}: {
  required?: boolean;
  initiallyHidden?: boolean;
  preview?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(required);
  const [hide, setHide] = useState(initiallyHidden);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (!open) {
      if (required) document.getElementById("dashboard-content")?.focus();
      return;
    }
    const element = dialog.current;
    const previous = document.body.style.overflow;
    const preventDismissal = (event: Event) => event.preventDefault();
    element?.setAttribute("closedby", "none");
    element?.addEventListener("cancel", preventDismissal);
    element?.showModal();
    element?.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
    if (element) element.scrollTop = 0;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      element?.removeEventListener("cancel", preventDismissal);
      document.body.style.overflow = previous;
    };
  }, [open, required]);
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    setSaved(false);
    const result = preview
      ? {}
      : await saveDisclosure(hide).catch(() => ({
          error: "Your preference could not be saved. Please try again.",
        }));
    setPending(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setSaved(true);
    setOpen(false);
  }
  const content = (
    <>
      <h1 id={titleId} tabIndex={-1} className="text-2xl font-semibold">
        Investment risk disclosure
      </h1>
      <p className="mt-3 rounded-lg border border-warning/30 bg-warning/10 p-3 text-sm leading-6">
        Draft disclosure — requires legal and compliance review before production.
      </p>
      <div className="my-5 space-y-3 text-base leading-7">
        {disclosureParagraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
      <p className="text-sm text-text-secondary">
        You can read this again and change your preference under Legal & disclosures. Material
        updates will require a new acknowledgement.
      </p>
      {preview && (
        <p className="mt-3 text-sm text-text-secondary">
          Component review only. This acknowledgement is not saved to an account.
        </p>
      )}
      <form onSubmit={submit} className="mt-5 space-y-4">
        <label className="flex min-h-11 items-center gap-3 text-base">
          <input
            type="checkbox"
            checked={hide}
            onChange={(event) => setHide(event.target.checked)}
            className="size-5 accent-primary"
          />
          Do not show this again at login
        </label>
        {error && (
          <p role="alert" className="text-danger">
            {error}
          </p>
        )}
        {saved && (
          <p role="status" className="text-success">
            Disclosure preference saved.
          </p>
        )}
        <Button type="submit" loading={pending} className="min-h-12 w-full">
          {required ? "I understand — continue" : "Save disclosure preference"}
        </Button>
      </form>
      <p className="mt-4 break-words text-sm text-text-secondary">Version: {DISCLOSURE_VERSION}</p>
    </>
  );
  if (!required)
    return (
      <section className="max-w-3xl rounded-2xl border border-[var(--border)] bg-surface p-5 sm:p-8">
        {content}
      </section>
    );
  if (!open) return null;
  return (
    <dialog
      ref={dialog}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      onCancel={(event) => event.preventDefault()}
      aria-labelledby={titleId}
      className="disclosure-dialog m-auto max-h-[90svh] w-[calc(100%_-_2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-[var(--border)] bg-surface p-5 text-text-primary shadow-2xl sm:p-8"
    >
      {content}
    </dialog>
  );
}
