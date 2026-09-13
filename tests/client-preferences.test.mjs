import test from "node:test";
import assert from "node:assert/strict";
import { clientTheme } from "../lib/client/theme.ts";
import {
  DISCLOSURE_VERSION,
  loginAcknowledgement,
  shouldShowDisclosure,
  readDisclosurePreference,
} from "../lib/disclosures/policy.ts";

const preference = {
  version: DISCLOSURE_VERSION,
  acceptedAt: "2026-09-13T10:00:00Z",
  hideOnLogin: true,
};
test("theme accepts only supported values", () => {
  assert.equal(clientTheme("light"), "light");
  for (const value of [undefined, "dark", "invalid", {}]) assert.equal(clientTheme(value), "dark");
});
test("first login and new disclosure versions require acknowledgement", () => {
  assert.equal(shouldShowDisclosure(null, undefined, "a", "login1"), true);
  assert.equal(shouldShowDisclosure(preference, undefined, "a", "login1"), false);
  assert.equal(
    shouldShowDisclosure({ ...preference, version: "old" }, undefined, "a", "login1"),
    true,
  );
});
test("acknowledgement without suppression applies only to the current user and login", () => {
  const acknowledgement = loginAcknowledgement("a", "login1");
  const repeat = { ...preference, hideOnLogin: false };
  assert.equal(shouldShowDisclosure(repeat, acknowledgement, "a", "login1"), false);
  assert.equal(shouldShowDisclosure(repeat, acknowledgement, "a", "login2"), true);
  assert.equal(shouldShowDisclosure(repeat, acknowledgement, "b", "login1"), true);
});
test("malformed preferences never suppress the disclosure", () => {
  for (const value of [
    null,
    {},
    { ...preference, hideOnLogin: "true" },
    { ...preference, acceptedAt: "bad" },
  ]) {
    assert.equal(readDisclosurePreference(value), null);
    assert.equal(shouldShowDisclosure(value, undefined, "a", "login1"), true);
  }
});
