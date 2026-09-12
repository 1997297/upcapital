"use client";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [status, setStatus] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = String(data.get("subject"));
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
    window.location.href = `mailto:hello@upcapital.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(
      "Your email app has been requested. Review and send your message there. If it does not open, email hello@upcapital.com directly.",
    );
  }
  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input name="name" label="Full name" autoComplete="name" required maxLength={100} />
        <Input
          name="email"
          label="Email address"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
        />
      </div>
      <Select
        name="subject"
        label="What would you like to discuss?"
        defaultValue="Platform enquiry"
      >
        <option>Platform enquiry</option>
        <option>Account enquiry</option>
        <option>Performance and strategy</option>
        <option>Privacy and security</option>
      </Select>
      <label htmlFor="message" className="block text-sm font-semibold">
        Your message
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={2000}
          className="mt-2 block w-full rounded-xl border border-white/15 bg-white/[.025] p-4 text-sm font-normal focus:border-accent"
        />
      </label>
      <p className="text-xs leading-6 text-text-secondary">
        This opens your email app. Do not include passwords, verification codes, payment details or
        identity documents.
      </p>
      <Button type="submit" className="bg-[#b8ff00] text-background hover:bg-[#ccff4d]">
        Continue in email
      </Button>
      <p role="status" className="text-sm leading-6 text-text-secondary">
        {status}
      </p>
    </form>
  );
}
