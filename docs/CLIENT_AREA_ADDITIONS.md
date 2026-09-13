# Client area additions — 13 September 2026

These owner-approved additions extend the master specification and roadmap. Retain the Next.js architecture, Supabase verified-user/MFA guards, shared controls and brand styling. This is a simple investment management portal, not a trading terminal.

## Phase 6 implementation

- Client-scoped light/dark tokens cover the dashboard, disclosures and authentication/account screens. A labelled header toggle persists a browser preference in a year-long SameSite cookie. Server layouts read it before rendering; marketing remains unchanged. Cross-device theme synchronisation can later use account settings.
- Overview priority: identity, portfolio value, available balance, invested capital, earnings, next actions, active investments, next maturity/payout, performance, account status and recent transactions. Missing reporting never means zero. Deposit/Invest/Withdraw are disabled with an explicit explanation until their phases ship.
- Login disclosure uses a native modal with deliberate acknowledgement. Escape cannot silently accept it. Legal & disclosures remains accessible in navigation and allows preference changes.
- `lib/disclosures/policy.ts` owns the draft content, version and preference parsing. The authenticated server action uses Supabase `auth.updateUser` to store `investment_disclosure: { version, acceptedAt, hideOnLogin }` against the caller's account. This is a user-editable display preference, never authorization, suitability approval or immutable legal consent evidence.
- An HTTP-only cookie records user ID, sign-in timestamp and version. Without suppression, a new login re-prompts; suppression persists for the current version. A material version change re-prompts. Sign-in on another device may change the account's last-sign-in timestamp and cause an additional prompt; an exact per-session identifier can replace this during later security work.
- Save failures keep the notice open with retry. The development review route accepts `?disclosure=1`; its clearly labelled fixture does not save anything to an account and is unavailable in production.

## Phase 7 — Portfolio and investments

`types/client-finance.ts` adds the shared investment contract. `lib/investments/risk-appetite.ts` provides educational copy for Conservative, Moderate and Aggressive. The new-investment flow must require an explicit choice per investment using three accessible radio-style cards. Do not impose an account-wide risk setting or imply guaranteed preservation.

Keep the flow short: choose product and amount; choose risk; review and acknowledge; deliberately confirm. Combine screens where useful. Review must show product, amount/currency, risk appetite, duration, applicable non-guaranteed target information, funding source and investment-specific acknowledgement. Login disclosure is not investment consent. Do not invent successful investments. Investment documents should join the investment detail area.

## Phase 8 — Wallet, deposits and withdrawals

Present NGN, USD and Crypto as three clear choices. `FundingInstructions` is a provider-neutral discriminated union, not a live integration.

- NGN: provider-issued bank/account details, intended amount, reference and `expiresAt`. Derive the countdown from the provider's timestamp; do not hardcode a permanent 30-minute rule. Only verified backend events may update financial status.
- USD: provider-agnostic instructions until the method is selected. Never invent bank details.
- Crypto: asset and network remain separate. Only approved provider data can supply an address, optional memo, QR, minimum and required confirmations. Never fabricate wallet addresses or confirmations.
- Withdrawals: future NGN/USD/approved crypto require server-side balance validation, account verification and security checks. Available, invested, pending and withdrawable funds remain distinct.

## Phases 9–14 — Transactions and remaining client areas

`TransactionRecord` supports deposit, investment, return, withdrawal, payout, refund and adjustment, with currency, funding method, provider reference and status. Money uses decimal strings; future services must validate positivity, precision and approved currency/asset/network combinations. TypeScript contracts are not runtime payment validation. Never aggregate currencies without explicit valuation data.

Keep navigation concise as features arrive: Overview; Investments; Portfolio/Performance; Wallet/Funding; Transactions; Documents; Notifications; Support; Account (profile, verification, security and disclosures). Related screens may share a section. KYC documents belong to Phase 10, notifications to Phase 11, support/referrals to Phase 12. Persisted financial records and narrow provider adapters follow the existing backend roadmap; avoid speculative service frameworks.

## Conflicts and production preparation

The suggestion of assured return of protected capital conflicts with the request's prohibition on guarantees and with currently unverified products. No protection or return guarantee is introduced. Draft disclosure text is explicitly marked for legal/compliance review as requested. Financial data and successful transactions are not fabricated.

Resend custom SMTP and domain configuration remain deferred. Legal review, successful email/MFA end-to-end tests, live account-preference persistence verification, approved product terms, financial providers and integration security checks remain tracked work; they do not block continued development.
