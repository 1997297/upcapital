import { cookies } from "next/headers";
import { ClientThemeProvider } from "@/components/dashboard/client-theme";
import { clientTheme, THEME_COOKIE } from "@/lib/client/theme";
import { InvestmentDisclosure } from "@/components/dashboard/investment-disclosure";
import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { getDashboardOverview } from "@/lib/dashboard/overview";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Dashboard component review",
  robots: { index: false, follow: false },
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ disclosure?: string }>;
}) {
  if (process.env.NODE_ENV !== "development") notFound();
  const cookieStore = await cookies();
  const showDisclosure = (await searchParams).disclosure === "1";
  const account = {
    firstName: "Design review",
    email: "",
    createdAt: "2026-09-12T00:00:00Z",
    twoFactorEnabled: false,
  };
  return (
    <ClientThemeProvider initialTheme={clientTheme(cookieStore.get(THEME_COOKIE)?.value)}>
      <DashboardShell firstName={account.firstName} email={account.email}>
        <div className="mb-6 rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm">
          Development component review. Account status is a visual fixture; financial reporting is
          unavailable.
        </div>
        {showDisclosure && <InvestmentDisclosure required preview />}
        <DashboardOverview data={getDashboardOverview(account)} />
      </DashboardShell>
    </ClientThemeProvider>
  );
}
