import { cookies } from "next/headers";
import { ClientThemeProvider } from "@/components/dashboard/client-theme";
import { clientTheme, THEME_COOKIE } from "@/lib/client/theme";
import { InvestmentDisclosure } from "@/components/dashboard/investment-disclosure";
import { DISCLOSURE_COOKIE, shouldShowDisclosure } from "@/lib/disclosures/policy";
import { requireUser } from "@/lib/auth/session";
import { dashboardAccount } from "@/lib/dashboard/overview";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
export const metadata = { title: "Dashboard", robots: { index: false, follow: false } };
export default async function Layout({ children }: { children: React.ReactNode }) {
  const { user, assurance } = await requireUser();
  const account = dashboardAccount(user, assurance.nextLevel === "aal2");
  const cookieStore = await cookies();
  const showDisclosure = shouldShowDisclosure(
    user.user_metadata.investment_disclosure,
    cookieStore.get(DISCLOSURE_COOKIE)?.value,
    user.id,
    user.last_sign_in_at || user.created_at,
  );
  return (
    <ClientThemeProvider initialTheme={clientTheme(cookieStore.get(THEME_COOKIE)?.value)}>
      <DashboardShell firstName={account.firstName} email={account.email}>
        {children}
        {showDisclosure && <InvestmentDisclosure required />}
      </DashboardShell>
    </ClientThemeProvider>
  );
}
