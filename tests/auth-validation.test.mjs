import test from "node:test";
import assert from "node:assert/strict";
import { registrationSchema, resetSchema, emailSchema } from "../lib/auth/validation.ts";

const registration = {
  firstName: "Ada",
  lastName: "Okafor",
  email: "ada@example.com",
  password: "A unique account passphrase",
  confirmPassword: "A unique account passphrase",
  country: "Nigeria",
  phone: "+2348012345678",
  terms: "on",
  privacy: "on",
  risk: "on",
};

test("registration requires each acknowledgement independently", () => {
  for (const field of ["terms", "privacy", "risk"]) {
    const data = { ...registration };
    delete data[field];
    assert.equal(registrationSchema.safeParse(data).success, false);
    assert.equal(
      registrationSchema.safeParse({ ...registration, [field]: "false" }).success,
      false,
    );
  }
});
test("registration rejects short and mismatched passwords", () => {
  assert.equal(
    registrationSchema.safeParse({ ...registration, password: "short", confirmPassword: "short" })
      .success,
    false,
  );
  assert.equal(
    registrationSchema.safeParse({ ...registration, confirmPassword: "different passphrase" })
      .success,
    false,
  );
});
test("registration validates phone, identity and email on the server", () => {
  for (const invalid of [
    { phone: "08012345678" },
    { phone: "+0001234567" },
    { firstName: " " },
    { email: "not-an-email" },
    { country: "" },
  ]) {
    assert.equal(registrationSchema.safeParse({ ...registration, ...invalid }).success, false);
  }
});
test("valid registration trims names and email but preserves passwords", () => {
  const parsed = registrationSchema.parse({
    ...registration,
    firstName: " Ada ",
    email: " ada@example.com ",
  });
  assert.equal(parsed.firstName, "Ada");
  assert.equal(parsed.email, "ada@example.com");
  assert.equal(parsed.password, registration.password);
});
test("password reset enforces confirmation and length limits", () => {
  assert.equal(
    resetSchema.safeParse({
      password: "A unique passphrase",
      confirmPassword: "A unique passphrase",
    }).success,
    true,
  );
  assert.equal(
    resetSchema.safeParse({ password: "A unique passphrase", confirmPassword: "incorrect" })
      .success,
    false,
  );
  assert.equal(
    resetSchema.safeParse({ password: "a".repeat(129), confirmPassword: "a".repeat(129) }).success,
    false,
  );
});
test("email parsing rejects non-string and oversized inputs", () => {
  assert.equal(emailSchema.safeParse(null).success, false);
  assert.equal(emailSchema.safeParse("a".repeat(255) + "@example.com").success, false);
});
