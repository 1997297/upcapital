import test from "node:test";
import assert from "node:assert/strict";
import { dashboardAccount, getDashboardOverview } from "../lib/dashboard/overview.ts";

const user = {
  email: "owner@example.com",
  created_at: "2026-09-12T00:00:00Z",
  user_metadata: { first_name: " Ada ", role: "admin", access_token: "must-not-be-forwarded" },
};
test("dashboard display data excludes arbitrary user metadata and roles", () => {
  const account = dashboardAccount(user, false);
  assert.deepEqual(
    Object.keys(account).sort(),
    ["createdAt", "email", "firstName", "twoFactorEnabled"].sort(),
  );
  assert.equal(account.firstName, "Ada");
  assert.equal(account.twoFactorEnabled, false);
});
test("invalid display names do not reach the dashboard", () => {
  for (const first_name of [null, {}, 42, "   "]) {
    assert.equal(
      dashboardAccount({ ...user, user_metadata: { first_name } }, true).firstName,
      "there",
    );
  }
});
test("missing reporting never becomes a zero balance or invented history", () => {
  const overview = getDashboardOverview(dashboardAccount(user, true));
  assert.equal(overview.reporting.status, "unavailable");
  assert.equal("balance" in overview.reporting, false);
  assert.equal("history" in overview.reporting, false);
});
