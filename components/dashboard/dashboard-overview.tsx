import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DashboardOverviewData } from "@/lib/dashboard/overview";
import { DashboardIcon, type DashboardIconName } from "./dashboard-icon";
import { PerformanceOverview } from "./performance-overview";

function ReportPanel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: DashboardIconName;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-5 sm:p-7">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="grid min-h-40 place-items-center py-6 text-center">
          <div>
            <DashboardIcon name={icon} className="mx-auto mb-4 h-6 w-6 text-text-secondary" />
            <p className="max-w-xs text-sm leading-6 text-text-secondary">{children}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export function DashboardOverview({ data }: { data: DashboardOverviewData }) {
  const { account } = data;
  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="up-kicker">Your capital, clearly</p>
          <h1 className="mt-3 break-words text-3xl font-semibold tracking-tight sm:text-4xl">
            Welcome, {account.firstName}.
          </h1>
          <p className="mt-3 text-sm leading-6 text-text-secondary">
            Here is an overview of your portfolio and account.
          </p>
        </div>
        <Link
          href="/how-it-works"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-semibold hover:bg-white/5"
        >
          Explore our approach
          <DashboardIcon name="arrow" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {["Portfolio value", "Available balance", "Total invested", "Total earnings"].map(
          (label, index) => (
            <Card key={label}>
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm text-text-secondary">{label}</h2>
                  <DashboardIcon
                    name={index === 3 ? "chart" : "wallet"}
                    className={index === 0 ? "text-accent" : "text-primary-highlight"}
                  />
                </div>
                <p className="mt-5 text-3xl font-semibold">
                  <span className="sr-only">Not available</span>
                  <span aria-hidden="true">—</span>
                </p>
                <p className="mt-2 text-sm text-text-secondary">Reporting unavailable</p>
              </CardContent>
            </Card>
          ),
        )}
      </div>
      <section
        aria-labelledby="next-actions"
        className="rounded-2xl border border-[var(--border)] bg-surface p-5 sm:p-7"
      >
        <h2 id="next-actions" className="text-lg font-semibold">
          Your next steps
        </h2>
        <p id="funding-unavailable" className="mt-2 text-base leading-7 text-text-secondary">
          Investing and transfers are not available yet. You can review your account security while
          these services are being prepared.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {["Deposit", "Invest", "Withdraw"].map((action) => (
            <button
              key={action}
              disabled
              aria-describedby="funding-unavailable"
              className="min-h-12 rounded-xl border border-[var(--border)] bg-surface-elevated px-6 text-base text-text-secondary disabled:cursor-not-allowed"
            >
              {action}
            </button>
          ))}
        </div>
      </section>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ReportPanel title="Active investments" icon="wallet">
          Your active investments will appear here when investment records are available.
        </ReportPanel>
        <ReportPanel title="Next maturity or payout" icon="wallet">
          Your next scheduled maturity or payout will appear when confirmed investment dates are
          available.
        </ReportPanel>
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
        <PerformanceOverview />
        <Card>
          <CardContent className="p-5 sm:p-7">
            <h2 className="text-lg font-semibold">Account status</h2>
            <dl className="mt-7 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <dt className="text-sm text-text-secondary">Email verification</dt>
                <dd>
                  <Badge variant="success">Verified</Badge>
                </dd>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <dt className="text-sm text-text-secondary">Two-factor authentication</dt>
                <dd>
                  <Badge variant={account.twoFactorEnabled ? "success" : "warning"}>
                    {account.twoFactorEnabled ? "Enabled" : "Not enabled"}
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-text-secondary">Account opened</dt>
                <dd className="mt-2 text-sm">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeZone: "UTC",
                  }).format(new Date(account.createdAt))}
                </dd>
              </div>
            </dl>
            <Link
              href={account.twoFactorEnabled ? "/auth/account" : "/auth/2fa?next=account"}
              className="mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 text-center text-sm font-semibold text-background"
            >
              {account.twoFactorEnabled
                ? "Manage account security"
                : "Set up two-factor authentication"}
            </Link>
          </CardContent>
        </Card>
      </div>
      <ReportPanel title="Recent transactions" icon="chart">
        Your transaction history will appear here when account reporting is available.
      </ReportPanel>
      <p className="text-sm leading-6 text-text-secondary">
        Portfolio reporting is not available for this account yet. Values are not shown until they
        can be confirmed. Investing involves risk, including loss of capital.
      </p>
    </div>
  );
}
