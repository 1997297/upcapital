# UPCAPITAL

A Next.js investment-platform project with a complete public website and shared interface library.

## Current state

- Phase 1: application foundation.
- Phase 2: reusable UI components and `/design-system`.
- Phase 3: homepage, refined with shared glass navigation and footer.
- Phase 4: seven additional public pages and five legal/information pages.
- Phase 5: Supabase authentication implemented; email delivery configuration and a complete account-flow verification remain pending.
- Next after authentication verification: Phase 6 dashboard foundation.

The public pages and authentication routes are implemented. The separate UPCAPITAL Supabase project is connected locally. Transactions, portfolio data and administrative operations remain separate phases. Contact enquiries open the visitor's email application; no message is submitted to a backend.

## Local commands

```text
npm install
npm run dev
npm run lint
npm run typecheck
npm run test:auth
npm run test:auth:routes
npm run build
npm run start
```

PowerShell installations with script restrictions can use `npm.cmd`.

Use Node.js 22.18+ (Node 24 recommended). On a new checkout, copy `.env.example` to `.env.local` and set the application origin, Supabase URL and publishable key. Never put a Supabase secret or service-role key in a public variable. Google Fonts must be reachable during the build. Route tests require a running app; `AUTH_TEST_URL` defaults to `http://localhost:3000`.

## Architecture

- `app/`: root layout, homepage, route groups, metadata, sitemap and robots.
- `app/(marketing)/`: public pages and component showcase.
- `app/auth/`, `components/auth/`: authentication pages, server actions and forms.
- `lib/auth/`, `lib/supabase/`, `proxy.ts`: validation, verified access checks, cookie clients and session refresh.
- `components/ui/`: shared controls, overlays, typography and table primitives.
- `components/marketing/`: shared navigation, footer, page layouts, performance panel and contact form.
- `lib/constants/marketing.ts`: shared annual returns, strategy allocations and FAQ content.
- `public/brand/`: supplied brand assets.
- `app/phase3-marketing.css`: public-site surfaces, responsive typography and glass-header styling.

See [Phase 4 handoff](docs/PHASE_4_PUBLIC_WEBSITE.md) for scope, changed files and verification.
See [Phase 5 handoff](docs/PHASE_5_AUTHENTICATION.md) for authentication setup and remaining live verification.

