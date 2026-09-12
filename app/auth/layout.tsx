import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account access",
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background [--accent:#b8ff00]">
      <noscript>
        <p className="border-b border-white/10 px-5 py-4 text-center text-sm">
          Enable JavaScript in your browser to use account registration and two-factor
          authentication.
        </p>
      </noscript>
      <header className="border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-10">
          <Link
            href="/"
            aria-label="UPCapital home"
            className="flex items-center gap-2.5 text-xl font-bold"
          >
            <Image src="/brand/upcapital-mark.png" alt="" width={32} height={32} />
            UPCapital
          </Link>
          <Link href="/" className="text-sm text-text-secondary hover:text-white">
            Back to website
          </Link>
        </div>
      </header>
      <main
        id="main-content"
        className="mx-auto grid min-h-[calc(100svh-89px)] max-w-7xl items-center gap-12 px-5 py-12 sm:px-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:py-20"
      >
        <aside className="hidden lg:block">
          <p className="up-kicker">Your UPCapital account</p>
          <h2 className="mt-6 max-w-lg text-5xl font-semibold leading-[1.15] tracking-tight">
            A clear start.
            <br />
            <span className="text-accent">A secure connection.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-text-secondary">
            Manage your access with a verified email, a strong password and an extra layer of
            account protection.
          </p>
          <div className="mt-12 space-y-5 border-t border-white/10 pt-8">
            {["Email verification", "Secure account access", "Authenticator app protection"].map(
              (label, index) => (
                <p key={label} className="flex items-center gap-4 text-sm">
                  <span className="text-accent">0{index + 1}</span>
                  {label}
                </p>
              ),
            )}
          </div>
        </aside>
        <div className="min-w-0">
          <div className="up-glass rounded-[28px] p-6 sm:p-10">{children}</div>
          <p className="mt-6 text-center text-xs leading-6 text-text-secondary">
            Need help?{" "}
            <Link href="/contact" className="text-white underline underline-offset-4">
              Contact support
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
