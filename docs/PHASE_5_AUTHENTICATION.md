# Phase 5 authentication

Status: implementation connected to Supabase. At the owner's direction, custom SMTP/domain configuration and full email-flow verification are deferred until production preparation. They do not block Phase 6 or subsequent development. Existing email confirmation and MFA enforcement remain in place.

## Implemented

- Three-step registration: identity/password, country/international phone number, Terms/Privacy/Risk acknowledgements. Shared Zod schemas validate the complete request again on the server.
- Sign-in with password; email verification and resend; password recovery and update; PKCE callback with fixed destinations and expired-link handling.
- Authenticator enrollment with a QR code/manual key and six-digit TOTP verification. Enrolled accounts must reach AAL2 before accessing the account page or changing passwords.
- Authenticated account page with real email/verification status, password change, MFA setup and sign-out. Phase 6 now provides the protected `/dashboard` destination after sign-in; account management remains at `/auth/account`.
- Supabase SSR cookie refresh through Next.js Proxy, server-side identity checks, no-store auth responses and noindex metadata. No service-role key is used by the application.
- The shared UI remains consistent with the homepage: dark glass surfaces, lime accents, existing fonts/brand mark, accessible labels, responsive forms and explicit error/loading states.

## Project and configuration

Created with owner authorization:

- Name: UPCAPITAL
- Organization: The Global Drey
- Project reference: `wgztsfxtbfvyrmctanpv`
- Region: `eu-west-1` (Ireland)
- Creation cost reported by Supabase: $0/month at creation.
- Dashboard: https://supabase.com/dashboard/project/wgztsfxtbfvyrmctanpv

The ignored `.env.local` contains the public project URL/key and `NEXT_PUBLIC_APP_URL=http://localhost:3000`. `.env.example` documents the required variables. The public key is intended for browsers; authorization comes from verified sessions and later database policies.

Live `/auth/v1/settings` inspection confirmed email login enabled, signup enabled and email auto-confirm disabled. A read-only query confirmed the new auth database is reachable. Supabase security advisors returned no findings. No public tables or privileged database functions were added.

## Email setup still required

Configure the following in the UPCAPITAL Supabase dashboard before opening registration to the public:

1. Resend is the recommended transactional provider. Follow `docs/AUTH_EMAIL_SETUP.md` to configure custom SMTP with a verified sender/domain and the supplied branded HTML templates. The owner confirmed no provider is configured yet. The connected MCP tools do not expose Auth SMTP or URL configuration, and SMTP credentials were not supplied.
2. Set the Site URL to the application origin. Explicitly allow `http://localhost:3000/auth/callback` and `http://localhost:3000/auth/callback?next=reset-password` for local development. For production, allow the equivalent exact HTTPS URLs and update `NEXT_PUBLIC_APP_URL` before building.
3. Keep email confirmations enabled. Ensure TOTP enrollment/verification is enabled. Align the provider's minimum password length with the application's 12-character minimum.
4. Keep the email templates' standard confirmation link behavior for PKCE. Links must be opened in the browser that initiated signup/recovery. The application handles missing or expired codes without accepting arbitrary redirect targets.
5. Complete signup with an approved test inbox, confirm email, sign in, enroll TOTP, sign out, verify the next sign-in requires TOTP, reset the password through email, and verify the old password no longer works. Email delivery and successful authenticated flows have not yet been claimed as verified.

Supabase's built-in email service restricts recipients and is not a production sender. The current free-tier changelog also requires custom SMTP for new projects to customize email templates. References: [SMTP](https://supabase.com/docs/guides/auth/auth-smtp), [redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls), [changelog](https://supabase.com/changelog).

## Data and phase boundaries

Names, country, phone and acknowledgements are sent as signup metadata. Metadata is user-editable and is never used for roles, permissions or MFA decisions. The acknowledgement metadata is not an immutable acceptance ledger; the later database phase must establish the durable profile/consent records required by the final account agreement. Passwords remain with Supabase Auth and are not stored in application data or browser persistence.

Phase 5 does not add portfolio balances, funding, KYC, admin permissions or account recovery bypasses. TOTP is optional to enroll and mandatory at login once enrolled. Lost-authenticator recovery and factor removal are not exposed as an insecure bypass; they belong with the later security/support workflows.

## Files

- `app/auth/`: layout, all six specified pages, account page, callback handler, expired-link page, error boundary, server actions.
- `app/dashboard/`: access boundary and redirect to account access.
- `components/auth/`: reusable heading, multi-mode form, authenticator form.
- `lib/auth/`: server guard and shared validation.
- `lib/supabase/`: browser/server clients and public configuration.
- `proxy.ts`: session refresh and private response caching.
- `tests/auth-validation.test.mjs`, `tests/auth-routes.test.mjs`: input/security-boundary tests.
- `package.json`, `package-lock.json`: pinned Supabase/Zod dependencies and test commands.
- `.env.example`, local ignored `.env.local`, README and master specification status update.
- `supabase/templates/confirmation.html`, `supabase/templates/recovery.html`, `docs/AUTH_EMAIL_SETUP.md`: ready-to-configure Resend/Supabase email setup.

## Verification

- Final production build and TypeScript passed. Targeted ESLint passed with no warnings after the navigation fix. All 10 automated checks passed: seven input/destination checks and three live route checks.
- Seven validation/destination tests cover missing acknowledgements, mismatched/short/oversized passwords, invalid identity/contact fields, normalization and safe recovery destinations.
- Anonymous requests to `/auth/account`, `/auth/2fa`, `/auth/reset-password` and `/dashboard` return redirects to sign-in. Auth pages return `private, no-store`; callbacks reject arbitrary external destinations.
- Chrome verified the signup steps, required-field feedback and retention of entered data after failed validation. A real invalid-credential request reached Supabase and returned the expected sign-in error without clearing the form.
- Fixed a browser-discovered Continue-to-submit transition: the final step now opens without an unintended submission. Mobile controls stack to keep the primary action legible at 320px. The authentication accent is scoped to the homepage's lime color.
- Password recovery preserves its destination through MFA. HTTPS application origins enable secure auth cookies, consistently across browser, server and proxy clients.
- Final homepage regression: 1Y gives 64.74%, 3Y gives 69.55%; $200,000/Aggressive/6 months gives $226,274.17; all four TradingView quotes loaded. Authentication changes did not interrupt these interactions.
- Confirmation-email HTML was previewed locally at 375px without horizontal overflow; this is a browser preview, not proof of rendering in every email client or of delivery.
- The last mobile check corrected flex sizing on the primary button and explicit brand-image dimensions. A fresh development reload reported no hydration or image-size warnings; the final production build and targeted lint passed again after those corrections.
- No test emails were sent and no test users were created. Successful signup, recovery, TOTP enrollment/challenge and logout remain to be verified with the configured email provider and an approved inbox.
