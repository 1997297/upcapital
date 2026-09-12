import type { ReactNode } from "react";
import Link from "next/link";
import { MarketingNavbar } from "./marketing-navbar";
import { MarketingFooter } from "./marketing-footer";
import { PageContainer } from "@/components/ui/container";

export function PublicPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="up-site">
      <MarketingNavbar />
      <main id="main-content" tabIndex={-1} className="up-public-main">
        <PageContainer className="up-container">
          <header className="max-w-4xl">
            <p className="up-kicker">{eyebrow}</p>
            <h1 className="up-page-heading mt-5">{title}</h1>
            <p className="up-body mt-6 max-w-3xl">{description}</p>
          </header>
          <div className="mt-14">{children}</div>
        </PageContainer>
      </main>
      <MarketingFooter />
    </div>
  );
}
export function PublicCTA() {
  return (
    <section className="up-glass mt-16 rounded-3xl p-7 md:p-10">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
        Put your capital to work intelligently.
      </h2>
      <p className="mt-4 max-w-2xl leading-7 text-text-secondary">
        Create your account, complete verification and take the next step with UPCAPITAL.
      </p>
      <Link href="/auth/register" className="up-link-button mt-7 inline-flex">
        Create Account
      </Link>
    </section>
  );
}
