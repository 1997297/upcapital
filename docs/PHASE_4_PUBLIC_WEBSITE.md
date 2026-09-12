# Phase 4 public website handoff

## Delivered

- Refined the existing homepage without replacing its section structure.
- Removed visible placeholder/development/prototype labels from the homepage, component showcase copy and SVG illustrations.
- Retained the existing business details at the owner's express request. These details were not independently verified.
- Replaced decorative checkmarks/star strings and the text-based menu icon with restrained typography and SVG navigation controls.
- Added a fixed glass header: 24px backdrop blur, 150% saturation, translucent dark tint, subtle border and shadow, stronger scroll tint, and an opaque fallback.
- Aligned desktop/mobile navigation at 1280px; added Escape handling, menu focus cycling, focus restoration, scroll locking and anchor offsets.
- Extracted shared public footer/page/legal components and shared strategy, FAQ and performance data.
- Added interactive 1Y/3Y/ALL performance controls and a cumulative index calculated from annual returns.
- Added the seven remaining public pages and five legal/information pages.
- Removed the duplicate root route left from Phase 1.
- Added canonical URLs, root social metadata, favicon, sitemap and robots rules.
- Fixed performance-card overflow at 320px.

## Created files

- app/(marketing)/about/page.tsx
- app/(marketing)/how-it-works/page.tsx
- app/(marketing)/performance/page.tsx
- app/(marketing)/technology/page.tsx
- app/(marketing)/security/page.tsx
- app/(marketing)/faq/page.tsx
- app/(marketing)/contact/page.tsx
- app/(marketing)/legal/terms/page.tsx
- app/(marketing)/legal/privacy/page.tsx
- app/(marketing)/legal/risk/page.tsx
- app/(marketing)/legal/aml/page.tsx
- app/(marketing)/legal/cookies/page.tsx
- app/robots.ts
- app/sitemap.ts
- components/marketing/marketing-footer.tsx
- components/marketing/public-page.tsx
- components/marketing/legal-page.tsx
- components/marketing/performance-panel.tsx
- components/marketing/contact-form.tsx
- lib/constants/marketing.ts
- docs/PHASE_4_PUBLIC_WEBSITE.md

## Modified files

- app/page.tsx: homepage metadata.
- app/layout.tsx: metadata base, brand icons, formatting.
- app/phase3-marketing.css: glass navigation, responsive styling, anchor offsets and contrast refinements.
- app/(marketing)/design-system/design-system-showcase.tsx: copy and formatting.
- components/marketing/home-page.tsx: cleaned copy, shared footer/data/performance panel, signup CTAs and formatting. Static content is a Server Component; interactive widgets have their own client boundaries.
- components/marketing/scenario-calculator.tsx: extracted calculator with shared form controls, live currency output, visible assumptions and invalid-input handling.
- app/globals.css: disabled page-wide smooth scrolling so focus and click targets settle immediately.
- components/marketing/marketing-navbar.tsx: shared responsive glass navigation.
- public/placeholders/strategy-operations.svg: removed visible development label.
- public/placeholders/security-infrastructure.svg: removed visible development label.
- public/placeholders/team-placeholder.svg: replaced visible temporary labels with branded text.
- README.md: current state, commands and next phase.
- docs/UPCAPITAL_Master_Specification_Current_State.md: current implementation update.

Deleted: app/(marketing)/page.tsx (duplicate route for /).

The legacy asset directory names are retained for compatibility; they are not visible labels. No packages or backend services were added.

## Verification

- TypeScript passed, including the final production build's type check.
- ESLint passed on app, marketing components and shared library files; the earlier broader components check also passed.
- Production build passed, generating all public routes, /design-system, /robots.txt and /sitemap.xml.
- HTTP checks: 200 for all 13 public pages, the component showcase, sitemap and robots file.
- Chrome: homepage widths 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 checked. The 320px overflow found in the performance grid was corrected and rechecked on both home and performance pages.
- All other public/legal page layouts checked at 320px without horizontal overflow.
- Header computed blur confirmed as blur(24px) saturate(1.5).
- Mobile menu opens and Escape closes it with focus returned to the toggle.
- Performance controls: 1Y 64.74%, 3Y 69.55%, ALL 67.84%.
- Follow-up homepage regression: real pointer clicks on 1Y, 3Y and ALL pass after disabling global smooth scrolling; the prior click test was intercepted during scrolling.
- Calculator interactions: $20,000 / Aggressive / 6 months gives $22,627.42; $10,000 / Conservative / 12 months gives $11,000.00; zero gives $0.00; negative input shows validation. Default Moderate / 12 months gives $11,800.00.
- Restored desktop/mobile Sign In and Create Account links verified; final homepage still fits at 320px with no browser errors. Follow-up production build, TypeScript and ESLint passed.
- No page errors reported by the browser in the checked routes.
- Axe homepage/contact checks: zero detected violations; background-dependent contrast entries require manual review. Screenshots reviewed at desktop/mobile sizes. This is not a full WCAG certification or Lighthouse audit.

The first restricted build could not reach Google Fonts. A network-authorized build passed with the existing fonts unchanged.

## Phase boundary

### Homepage live market quotes

Added `components/marketing/live-market-prices.tsx` below the four strategy market cards. TradingView embeds stream OANDA Gold (XAUUSD), Silver (XAGUSD), WTI crude oil CFD (WTICOUSD), and Coinbase Bitcoin (BTCUSD), all quoted in USD. Updates follow the provider's feed and market hours; a fresh price every second is not guaranteed. No API keys, additional packages, or application backend are required. Provider attribution remains visible.

The responsive dark panel includes loading states, connection failure messages, and per-market retry. Privacy and cookies pages describe the third-party embeds. Production build, TypeScript, and targeted ESLint passed. Chrome received all four quotes, observed Bitcoin changing without a reload, and confirmed a blocked script shows a retry action that successfully restores a quote. Desktop styling and 320px mobile width were checked.

Phase 5 authentication is next. Authentication, financial workflows, account authorization, database integration and admin operations are not implemented by this phase. At the owner's explicit direction, Sign In and Create Account are restored in desktop/mobile navigation; signup CTAs point to /auth/register and sign-in links point to /auth/login. The journey starts with signup, not a call to the team. Those authentication routes will be implemented in Phase 5.

The contact form opens a prefilled email in the visitor's email application; it does not submit to a backend or claim successful delivery. Legal pages are website information/templates, not a complete investment account agreement. Production legal and operating details remain an owner review responsibility.

Set NEXT_PUBLIC_APP_URL to the actual deployment origin before deployment.

