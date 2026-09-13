import { requireUser } from "@/lib/auth/session";
import { dashboardAccount, getDashboardOverview } from "@/lib/dashboard/overview";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
export default async function Page() {
  const { user, assurance } = await requireUser();
  const account = dashboardAccount(user, assurance.nextLevel === "aal2");
  return <DashboardOverview data={getDashboardOverview(account)} />;
}
