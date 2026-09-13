export type DashboardAccount = {
  firstName: string;
  email: string;
  createdAt: string;
  twoFactorEnabled: boolean;
};
export type DashboardOverviewData = {
  account: DashboardAccount;
  reporting: { status: "unavailable" };
};

export function dashboardAccount(
  user: { email?: string; created_at: string; user_metadata: Record<string, unknown> },
  twoFactorEnabled: boolean,
): DashboardAccount {
  // User-editable names are display data, never authorization claims.
  const name = user.user_metadata.first_name;
  return {
    firstName: typeof name === "string" && name.trim() ? name.trim().slice(0, 80) : "there",
    email: user.email || "",
    createdAt: user.created_at,
    twoFactorEnabled,
  };
}

export function getDashboardOverview(account: DashboardAccount): DashboardOverviewData {
  // Financial data adapters will be connected in the portfolio/backend phases.
  // An absent data source must never be interpreted as a zero balance or return.
  return { account, reporting: { status: "unavailable" } };
}
