import test from "node:test";
import assert from "node:assert/strict";

const base = process.env.AUTH_TEST_URL || "http://localhost:3000";

test(
  "production does not expose the development dashboard fixture",
  { skip: process.env.AUTH_TEST_PRODUCTION !== "1" },
  async () => {
    const response = await fetch(`${base}/design-system/dashboard`, { redirect: "manual" });
    assert.equal(response.status, 404);
  },
);

test("public authentication pages load without shared caching", async () => {
  for (const path of ["login", "register", "verify-email", "forgot-password", "link-expired"]) {
    const response = await fetch(`${base}/auth/${path}`, { redirect: "manual" });
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("cache-control"), /no-store/, path);
    assert.match(await response.text(), /<h1/, path);
  }
});
test("anonymous requests cannot access account, MFA, password update or dashboard", async () => {
  for (const path of ["/auth/account", "/auth/2fa", "/auth/reset-password", "/dashboard", "/dashboard/disclosures"]) {
    const response = await fetch(base + path, { redirect: "manual" });
    assert.equal(response.status, 307, path);
    assert.equal(response.headers.get("location"), "/auth/login", path);
  }
});
test("invalid callback cannot redirect to an arbitrary origin", async () => {
  const response = await fetch(`${base}/auth/callback?next=https://example.com`, {
    redirect: "manual",
  });
  assert.equal(response.status, 307);
  const location = new URL(response.headers.get("location"));
  assert.notEqual(location.hostname, "example.com");
  assert.equal(location.pathname, "/auth/link-expired");
});

test("account theme is server-rendered from a validated preference cookie", async () => {
  for (const [value, expected] of [["light", "light"], ["dark", "dark"], ["invalid", "dark"]]) {
    const response = await fetch(`${base}/auth/login`, { headers: { cookie: `upcapital-theme=${value}` } });
    assert.equal(response.status, 200);
    assert.match(await response.text(), new RegExp(`data-client-theme="${expected}"`));
    assert.match(response.headers.get("cache-control"), /no-store/);
  }
});
