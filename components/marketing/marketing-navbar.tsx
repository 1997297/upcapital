"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigation = [
  ["About", "/about"],
  ["How it works", "/how-it-works"],
  ["Performance", "/performance"],
  ["Technology", "/technology"],
  ["Security", "/security"],
] as const;

export function MarketingNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key !== "Tab") return;
      const links = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a");
      if (!links?.length) return;
      const first = toggleRef.current;
      const last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const media = window.matchMedia("(min-width: 1280px)");
    const onResize = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onResize);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", onResize);
    };
  }, [open]);
  return (
    <header className="up-header" data-scrolled={scrolled || open}>
      <a href="#main-content" className="up-skip-link">
        Skip to content
      </a>
      <div className="up-container flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="UPCapital home"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center gap-2.5"
        >
          <Image
            src="/brand/upcapital-mark.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          <span className="text-xl font-extrabold tracking-tight">UPCapital</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className="up-nav-link"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden shrink-0 items-center gap-4 xl:flex">
          <Link href="/auth/login" className="up-nav-link px-2 py-3">
            Sign In
          </Link>
          <Link href="/auth/register" className="up-link-button inline-flex">
            Create Account
          </Link>
        </div>
        <button
          ref={toggleRef}
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
          className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/5 xl:hidden"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d={open ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"} />
          </svg>
        </button>
      </div>
      {open && (
        <div ref={panelRef} id="mobile-navigation" className="up-mobile-panel xl:hidden">
          <nav aria-label="Mobile" className="up-container flex flex-col py-6">
            {[...navigation, ["FAQ", "/faq"], ["Contact", "/contact"]].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={pathname === href ? "page" : undefined}
                className="up-nav-link border-b border-white/10 py-4 text-lg"
              >
                {label}
              </Link>
            ))}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-3 py-3 text-sm font-semibold"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setOpen(false)}
                className="up-link-button inline-flex px-3"
              >
                Create Account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
