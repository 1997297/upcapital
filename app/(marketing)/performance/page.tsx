import type { Metadata } from "next";
import { PublicPage, PublicCTA } from "@/components/marketing/public-page";
import { PerformancePanel } from "@/components/marketing/performance-panel";
export const metadata: Metadata = {
  alternates: { canonical: "/performance" },
  title: "Performance",
  description: "Explore annual returns, reporting periods and cumulative strategy growth.",
};
export default function Page() {
  return (
    <PublicPage
      eyebrow="Performance reporting"
      title="Results with context."
      description="Explore annual strategy returns and cumulative growth. Compare reporting periods and understand the assumptions behind the numbers."
    >
      <PerformancePanel />
      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-semibold">Reading the figures</h2>
        <p className="mt-4 leading-7 text-text-secondary">
          Average annual ROI is the arithmetic mean of the selected annual returns. The growth index
          compounds those returns from a starting value of 100. It assumes reinvestment and does not
          account for fees, taxes or individual deposits and withdrawals.
        </p>
        <p className="mt-4 leading-7 text-text-secondary">
          The most useful comparison considers return, time horizon and risk together. An individual
          account may perform differently from the strategy figures shown here.
        </p>
      </section>
      <PublicCTA />
    </PublicPage>
  );
}
