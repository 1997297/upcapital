"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./client-theme";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/auth/actions";
import { DashboardIcon, type DashboardIconName } from "./dashboard-icon";

const navigation: { label: string; href: string; icon: DashboardIconName }[] = [
  { label: "Overview", href: "/dashboard", icon: "overview" },
  { label: "Account & security", href: "/auth/account", icon: "shield" },
  { label: "Legal & disclosures", href: "/dashboard/disclosures", icon: "account" },
  { label: "Support", href: "/contact", icon: "support" },
];

export function DashboardShell({
  children,
  firstName,
  email,
}: {
  children: ReactNode;
  firstName: string;
  email: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const resize = () => {
      if (desktop.matches) closeMobile();
    };
    desktop.addEventListener("change", resize);
    return () => desktop.removeEventListener("change", resize);
  }, [closeMobile]);
  const pathname = usePathname();
  function links(compact = false) {
    return (
      <nav aria-label="Dashboard navigation" className="space-y-2">
        {navigation.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard" || pathname.startsWith("/design-system/dashboard")
              : pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobile}
              aria-current={active ? "page" : undefined}
              title={compact ? item.label : undefined}
              className={`flex min-h-12 items-center gap-3 rounded-xl px-3.5 text-sm font-semibold transition-colors ${active ? "bg-accent/10 text-accent" : "text-text-secondary hover:bg-white/5 hover:text-text-primary"}`}
            >
              <DashboardIcon name={item.icon} className="shrink-0" />
              <span className={compact ? "sr-only" : ""}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    );
  }
  const brand = (
    <Link
      href="/dashboard"
      aria-label="UPCapital dashboard"
      className="flex items-center gap-2.5 font-bold text-xl"
    >
      <Image
        src="/brand/upcapital-mark.png"
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 shrink-0 object-contain"
      />
      <span className={collapsed ? "lg:sr-only" : ""}>UPCapital</span>
    </Link>
  );
  return (
    <div className={`min-h-screen bg-background ${collapsed ? "lg:pl-[88px]" : "lg:pl-64"}`}>
      <a
        href="#dashboard-content"
        className="sr-only fixed left-4 top-4 z-[70] rounded-lg bg-accent p-3 text-background focus:not-sr-only"
      >
        Skip to dashboard content
      </a>
      <aside
        aria-label="Sidebar"
        className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-white/10 bg-surface p-5 lg:flex ${collapsed ? "w-[88px]" : "w-64"}`}
      >
        <div className="flex h-12 items-center">{brand}</div>
        <div className="mt-10">{links(collapsed)}</div>
        <div className="mt-auto space-y-4 border-t border-white/10 pt-5">
          <Button
            variant="ghost"
            type="button"
            className="w-full justify-start px-3.5"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
          >
            <DashboardIcon name="chevron" className={collapsed ? "rotate-180" : ""} />
            {!collapsed && "Collapse sidebar"}
          </Button>
          <form action={logout}>
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start px-3.5"
              aria-label="Sign out"
            >
              <DashboardIcon name="logout" />
              {!collapsed && "Sign out"}
            </Button>
          </form>
        </div>
      </aside>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-background/80 backdrop-blur-2xl backdrop-saturate-150">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between gap-3 px-4 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label="Open dashboard navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <DashboardIcon name="menu" />
            </Button>
            <p className="hidden text-sm font-semibold sm:block">
              {pathname === "/dashboard/disclosures" ? "Disclosures" : "Overview"}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Link
              href="/auth/account"
              aria-label="Manage your account"
              className="flex min-w-0 items-center gap-3 rounded-xl p-1 focus-visible:outline-offset-4"
            >
              <div className="hidden max-w-56 text-right sm:block">
                <p className="truncate text-sm font-semibold">
                  {firstName === "there" ? "Your account" : firstName}
                </p>
                <p className="mt-1 truncate text-xs text-text-secondary">{email}</p>
              </div>
              <span
                className="grid size-10 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/15 text-sm font-bold text-primary-highlight"
                aria-hidden="true"
              >
                {(firstName === "there" ? email : firstName).slice(0, 1).toUpperCase() || "U"}
              </span>
            </Link>
          </div>
        </div>
      </header>
      <main
        id="dashboard-content"
        tabIndex={-1}
        className="mx-auto max-w-[1500px] px-4 py-8 sm:px-8 sm:py-10"
      >
        {children}
      </main>
      <Drawer open={mobileOpen} onClose={closeMobile} title="UPCapital" side="left">
        {links()}
        <form action={logout} className="mt-8 border-t border-white/10 pt-5">
          <Button type="submit" variant="ghost" leftIcon={<DashboardIcon name="logout" />}>
            Sign out
          </Button>
        </form>
      </Drawer>
    </div>
  );
}
