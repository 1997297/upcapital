# Phase 6 dashboard foundation

## Owner direction

Custom SMTP, domain ownership/configuration and Resend activation are production-preparation tasks. They do not block application development. The existing Supabase integration, email templates and future custom SMTP setup remain intact. This supersedes earlier handoff wording that required email setup before Phase 6.

## Implementation

`/dashboard` now renders the protected overview instead of redirecting to account management. Successful sign-in and standard email-confirmation/MFA completion now lead to the dashboard. Password recovery still returns to its password form, and an explicit account-management MFA flow returns to `/auth/account`.

The shell includes a collapsible desktop sidebar, mobile navigation drawer, glass header, profile link, skip link and sign-out. The drawer traps keyboard focus, closes on Escape, restores focus and locks background scrolling. Navigation exposes the currently functioning Overview, Account & security, Legal & disclosures and Support destinations; the rest of the master-spec navigation will be added with the corresponding feature phases, without dead links.

Overview modules:

- Portfolio value, available balance, total invested and total earnings.
- Portfolio performance with 1D, 7D, 1M, 3M, 1Y and ALL selection and accessible feedback.
- Account status using the authenticated user's verified email state, MFA enrollment and account creation date.
- Active investments, next maturity/payout and recent transactions.
- Clearly explained unavailable Deposit/Invest/Withdraw controls.
- Persistent light/dark themes across dashboard and account screens.
- Versioned login risk disclosure and a protected preference page.
- Loading and error states.

Financial reporting is explicitly unavailable until its data adapter is connected. No balance, return, allocation or transaction is invented, and unavailable data is not converted into zero. There are no funding buttons that pretend to process payments. Phase 7 will add portfolio/investment functionality, with financial/backend integration following the roadmap.

## Review without SMTP

With `npm run dev`, open:

```text
http://localhost:3000/design-system/dashboard
```

This is a development-only component review with a clearly labelled account-status fixture and no financial records. It uses the same shell and overview components as the real dashboard. It returns 404 when `NODE_ENV` is not `development`; it is not an authentication bypass for `/dashboard`.

Real `/dashboard` access continues to require a Supabase-verified user and AAL2 when MFA is enrolled. Server-side session reads are deduplicated with React's request-scoped cache, not a shared cross-user cache. Auth/dashboard responses remain private and uncached. No Supabase provider settings were weakened and no accounts or emails were created during component testing.

## September 13 additions

See [CLIENT_AREA_ADDITIONS.md](CLIENT_AREA_ADDITIONS.md) for the adopted requirements, preference storage, provider-neutral financial contracts and later-phase allocation. The disclosure is draft copy requiring legal review. Its account preference is not an immutable legal consent record.

Added `app/client-area.css`, `components/dashboard/client-theme.tsx`, `components/dashboard/investment-disclosure.tsx`, `lib/client/theme.ts`, `lib/disclosures/policy.ts`, `app/dashboard/disclosures/page.tsx`, `app/dashboard/disclosures/actions.ts`, `types/client-finance.ts`, `lib/investments/risk-appetite.ts` and `tests/client-preferences.test.mjs`. Extended the auth layout, dashboard layout/shell/overview, development review, browser verifier and route tests. No financial providers or dependencies were added.

## Files created

- `components/dashboard/dashboard-icon.tsx`: consistent SVG icon set.
- `components/dashboard/dashboard-shell.tsx`: responsive authenticated navigation shell.
- `components/dashboard/dashboard-overview.tsx`: overview and account modules.
- `components/dashboard/performance-overview.tsx`: interactive reporting periods and unavailable state.
- `lib/dashboard/overview.ts`: minimal account-display mapping and financial reporting boundary.
- `app/dashboard/loading.tsx`, `app/dashboard/error.tsx`: loading/retry views.
- `app/(marketing)/design-system/dashboard/page.tsx`: development-only component review.
- `tests/dashboard-data.test.mjs`: metadata minimization and unavailable-reporting checks.
- `scripts/verify-dashboard-browser.mjs`: isolated Chrome checks for the shell, period controls, responsive widths and drawer focus behavior; uses a temporary profile and never a personal browser session.
- `docs/PHASE_6_DASHBOARD_FOUNDATION.md`: this handoff.

## Files modified

- `app/dashboard/layout.tsx`, `app/dashboard/page.tsx`: protected shell and overview.
- `components/ui/drawer.tsx`: focus management, unique dialog title IDs and scrolling.
- `lib/auth/session.ts`: request-scoped session deduplication and MFA return destinations.
- `lib/auth/destination.ts`: allowlisted dashboard/account/recovery destinations.
- `app/auth/actions.ts`: sign-in destination.
- `app/auth/account/page.tsx`: dashboard return link and account-specific MFA enrollment destination.
- `components/auth/mfa-form.tsx`: dashboard destination support.
- `tests/auth-validation.test.mjs`, `tests/auth-routes.test.mjs`: updated redirect expectations and production preview isolation check.
- `package.json`: dashboard test command; no new dependencies.
- README, master specification, Phase 5 handoff and email setup guide: SMTP deferral and current phase status.

## Verification

Production build and TypeScript checks passed. Seven authentication unit tests, three dashboard data tests and four production route checks passed, including anonymous access protection and a 404 for the development review route in production.

The initial targeted ESLint check passed. A final rerun covering subsequent accessibility refinements and the browser script was stopped after several minutes without output; that rerun remains unverified.

Isolated Chrome verification passed at nine widths from 320px to 1920px: no horizontal overflow, working sidebar collapse/expand, all six performance period controls, and mobile drawer focus trapping, Escape dismissal and focus restoration. Desktop, mobile and drawer screenshots were visually reviewed; no browser console errors were recorded.

Full email delivery and successful account/MFA flow verification remain tracked for production preparation under the owner's direction. Financial reporting remains unavailable until the portfolio data integration is implemented.

Run `npm run test:auth` and `npm run test:dashboard` for unit checks. Run `npm run test:auth:routes` against a running app. Set `AUTH_TEST_URL` to the app origin; set `AUTH_TEST_PRODUCTION=1` when testing a production server to assert the component-review route is unavailable.

For repeatable browser verification, run `node scripts/verify-dashboard-browser.mjs` with the development server running. `CHROME_PATH` can override the local Chrome executable and `DASHBOARD_PREVIEW_URL` can override the preview origin. Screenshots are written to the isolated temporary profile; the script closes its own Chrome process on completion.

Next development phase: **Phase 7 — Portfolio + Investments**. This phase stops at the dashboard foundation.
