# UPCAPITAL

A Next.js investment-platform project with a complete public website and shared interface library.

## Current state

- Phase 1: application foundation.
- Phase 2: reusable UI components and `/design-system`.
- Phase 3: homepage, refined with shared glass navigation and footer.
- Phase 4: seven additional public pages and five legal/information pages.
- Next: Phase 5 authentication.

The public pages are implemented. Authentication, account protection, transactions, database integration and administrative operations remain separate phases. Contact enquiries open the visitor's email application; no message is submitted to a backend.

## Local commands

```text
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

PowerShell installations with script restrictions can use `npm.cmd`.

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_APP_URL` to the deployment origin. The production fallback is `https://upcapital.com`. Google Fonts must be reachable during the build.

## Architecture

- `app/`: root layout, homepage, route groups, metadata, sitemap and robots.
- `app/(marketing)/`: public pages and component showcase.
- `components/ui/`: shared controls, overlays, typography and table primitives.
- `components/marketing/`: shared navigation, footer, page layouts, performance panel and contact form.
- `lib/constants/marketing.ts`: shared annual returns, strategy allocations and FAQ content.
- `public/brand/`: supplied brand assets.
- `app/phase3-marketing.css`: public-site surfaces, responsive typography and glass-header styling.

See [Phase 4 handoff](docs/PHASE_4_PUBLIC_WEBSITE.md) for scope, changed files and verification.

