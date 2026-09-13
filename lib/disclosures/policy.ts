// Draft educational text. Legal/compliance review is required before production.
export const DISCLOSURE_VERSION = "investment-risk-draft-2026-09-13";
export const DISCLOSURE_COOKIE = "upcapital-disclosure";
export const disclosureParagraphs = [
  "Investing involves risk, including the possible loss of capital. Investment values and returns can rise or fall.",
  "Past performance does not guarantee future results. Projections, targets and expected returns are not guarantees.",
  "Different investments carry different levels of risk. Understand the product, its terms and the risks before committing funds.",
  "You are responsible for investment decisions made through your account. Seek independent advice if you need help understanding an investment.",
];
export type DisclosurePreference = { version: string; acceptedAt: string; hideOnLogin: boolean };
export function readDisclosurePreference(value: unknown): DisclosurePreference | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  if (
    typeof v.version !== "string" ||
    typeof v.acceptedAt !== "string" ||
    !Number.isFinite(Date.parse(v.acceptedAt)) ||
    typeof v.hideOnLogin !== "boolean"
  )
    return null;
  return { version: v.version, acceptedAt: v.acceptedAt, hideOnLogin: v.hideOnLogin };
}
export function loginAcknowledgement(userId: string, signedInAt: string) {
  return JSON.stringify([userId, signedInAt, DISCLOSURE_VERSION]);
}
export function shouldShowDisclosure(
  preference: unknown,
  acknowledgement: string | undefined,
  userId: string,
  signedInAt: string,
) {
  const saved = readDisclosurePreference(preference);
  if (saved?.version === DISCLOSURE_VERSION && saved.hideOnLogin) return false;
  return acknowledgement !== loginAcknowledgement(userId, signedInAt);
}
