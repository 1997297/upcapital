# UPCAPITAL — MASTER SPECIFICATION, CURRENT PROJECT STATE & CODEX HANDOFF

> **Client-area additions — September 13, 2026:** Phase 6 now includes client light/dark themes, a versioned login risk disclosure and settings screen, a simpler dashboard hierarchy, and provider-neutral contracts for later investment/funding phases. See `docs/CLIENT_AREA_ADDITIONS.md` for the adopted requirements and phase allocation. These additions supersede conflicting older client-area details without replacing the roadmap. Phase 7 remains next; SMTP/domain work remains deferred.

> **Implementation update — September 12, 2026:** Phase 4 public pages are now implemented. The homepage has shared glass navigation, a shared footer, cleaned public copy and interactive performance periods. Existing business details were retained at the owner's express request; public development labels were removed. Phase 5 authentication is next. See `docs/PHASE_4_PUBLIC_WEBSITE.md` for the current implementation, file inventory, verification and remaining boundaries. Phase-status statements below describe the earlier handoff snapshot; product direction remains applicable unless superseded by the owner's instructions.

> **Phase 5 update — September 12, 2026:** Authentication routes, server actions, protected account access and TOTP integration are implemented and connected to the owner's new UPCAPITAL Supabase project. Email-provider configuration and successful end-to-end signup/recovery/MFA verification remain pending. Phase 6 has not started. This update supersedes the earlier phase status above. See `docs/PHASE_5_AUTHENTICATION.md` for configuration, verification and remaining work.

> **Current owner direction / Phase 6:** Defer custom SMTP, Resend activation and domain setup until production preparation. These do not block continued development. Keep Supabase authentication and the prepared Resend architecture in place. Phase 6 dashboard foundation is now implemented; see `docs/PHASE_6_DASHBOARD_FOUNDATION.md`. The next development phase is Phase 7, Portfolio + Investments. This direction supersedes the earlier email-setup dependency and phase status above.

**Purpose:** This is the current source-of-truth document for the UPCAPITAL platform. It combines the full product blueprint, current design language, development status, placeholder rules, brand guidance, architecture, roadmap, and explicit instructions for Codex working inside the existing codebase.

---

# 1. PRODUCT

**Product name:** UPCAPITAL

**Core positioning:**

> Put your capital to work intelligently.

UPCAPITAL is being developed as a premium, technology-driven multi-asset investment platform combining:

- portfolio monitoring
- investment strategy access
- performance reporting
- deposits
- withdrawals
- account verification
- security controls
- support
- administrative operations

The final product consists of three systems:

1. Public Website
2. Authenticated Client Cabinet
3. Protected Admin Platform

---

# 2. CRITICAL CODEBASE RULE

This is no longer a greenfield project.

Before modifying anything, Codex must:

1. Inspect the current repository.
2. Identify what already exists.
3. Preserve completed phases.
4. Reuse the existing design system.
5. Avoid recreating working components.
6. Avoid overwriting functioning architecture without reason.
7. Extend the current codebase instead of starting over.
8. Verify changes locally.
9. Summarize modified files.
10. Stop after the requested phase.

The repository is the source of truth for actual implementation state.

This document is the source of truth for product direction.

---

# 3. CURRENT DEVELOPMENT STATUS

## Phase 0 — Architecture Audit

**STATUS: COMPLETE**

The original legacy single-page HTML prototype was audited.

Legacy characteristics included:

- single HTML page
- Montserrat
- Font Awesome
- GSAP
- fixed side panel
- simple marketing landing page
- fixed ROI calculator
- no authentication
- no real dashboard
- no backend
- no database

Decision:

> The legacy HTML remains reference material only. The production platform uses clean Next.js architecture rather than converting the legacy file line-by-line.

---

## Phase 1 — Project Foundation

**STATUS: COMPLETE AND VERIFIED LOCALLY**

Implemented foundation includes:

- Next.js
- React
- TypeScript
- Tailwind CSS
- strict TypeScript setup
- Manrope
- Inter
- ESLint
- Prettier
- environment template
- public/auth/dashboard/admin route architecture
- global theme variables
- documentation / legacy references

The project owner has already:

- installed dependencies
- started the development server
- confirmed the project runs successfully locally

**Do not rebuild Phase 1.**

---

## Phase 2 — Reusable Design System

**STATUS: COMPLETE**

Reusable components have already been created, including:

- Button
- Input
- Select
- Card
- Badge
- Modal
- Drawer
- Tooltip
- Dropdown
- Tabs
- Accordion
- Toast
- Skeleton
- DataTable shell
- PageContainer
- Typography primitives

A design-system review route exists:

```text
/design-system
```

This route must continue to work after future phases.

**Do not replace the design system unless there is a real defect.**

---

## Phase 3 — Homepage

**STATUS: IMPLEMENTED / CURRENTLY UNDER VISUAL REVIEW**

The homepage has been reworked into a complete development prototype.

Current homepage direction includes:

- premium dark fintech aesthetic
- restrained glassmorphism
- minimal ambient effects
- subtle grid / radial light effects
- lime brand accent
- purple secondary accents
- minimal motion
- strong typography
- responsive layouts
- supplied UPCAPITAL brand assets
- placeholder business content

Current homepage sections:

1. Navigation
2. Hero
3. Trust / Statistics
4. Platform Overview
5. How It Works
6. Core Strategy
7. Performance
8. Technology
9. Risk Management
10. Security
11. Scenario Calculator
12. Testimonials
13. About / Headquarters
14. FAQ
15. Final CTA
16. Footer

**Do not rebuild Phase 3 from scratch unless explicitly requested.**

Refinement is allowed.

---

# 4. CURRENT BRAND ASSETS

Official development assets supplied by the project owner include:

## Logo Mark

Bright lime upward / arch-shaped mark.

Use for:

- favicon
- app icon
- compact mobile header
- dashboard collapsed navigation
- compact branded surfaces
- decorative brand accents

## Full Logo Lockup

Logo mark + UPCapital wordmark.

Use for:

- primary navigation
- branded public sections
- auth screens where space permits
- footer where appropriate

## Text Wordmark

UPCapital text wordmark.

Use for:

- tighter horizontal spaces
- footer
- auth screens
- alternate logo treatments

## Color Adaptation Rule

The owner has explicitly allowed logo colors to be adapted where needed for:

- dark backgrounds
- light backgrounds
- accessibility
- contrast
- responsive contexts
- visual cohesion

Do not distort the logo geometry, proportions, or recognizable shape.

---

# 5. PLACEHOLDER CONTENT RULE

This is a standing development rule.

Unless the owner explicitly says otherwise, all current and future business facts supplied during development are treated as:

> DEVELOPMENT PLACEHOLDER CONTENT

This includes:

- ROI
- annual returns
- AUM
- client counts
- strategy allocations
- headquarters
- addresses
- emails
- phone numbers
- testimonials
- leadership names
- corporate details
- registration details
- fees
- statistics
- dates
- descriptions
- financial metrics

Use supplied values freely to complete the prototype.

Do not stop development to verify these values unless the owner asks for production verification.

Before production launch, placeholders must be replaced with approved final information.

---

# 6. CURRENT PLACEHOLDER BUSINESS DATA

## Core Strategy Assets

- Gold
- Silver
- Bitcoin
- Oil

Illustrative allocation:

- Gold — 30%
- Bitcoin — 30%
- Silver — 20%
- Oil — 20%

---

## Average Annual ROI

Current placeholder:

**67.84% average annual ROI**

Period:

**2020–2025**

Illustrative annual values:

| Year | Return |
| --- | ---: |
| 2020 | 61.20% |
| 2021 | 72.40% |
| 2022 | 64.80% |
| 2023 | 69.30% |
| 2024 | 74.60% |
| 2025 | 64.74% |

Arithmetic average:

**67.84%**

---

## Illustrative Homepage Metrics

Current development examples:

- Assets monitored — `$186.4M`
- Client accounts — `3,840+`
- Portfolio monitoring — `24/7`
- Average annual ROI — `67.84%`

---

## Headquarters Placeholder

**48 Hudson Crest Parkway**  
**Tarrytown, New York 10591**  
**United States**

---

## Contact Placeholders

Email:

```text
hello@upcapital.com
```

Phone:

```text
+1 (914) 555-0186
```

---

# 7. REFERENCE SITE RULE

A reference website was provided:

```text
https://up.capital/
```

It is **not** a visual style to copy.

Do not copy:

- page layout
- navigation
- typography
- overall structure
- visual identity
- styling

It is used only as a content/presentation reference for selected ideas such as:

- ROI / performance card concepts
- Core Strategy presentation
- annual return bar-chart concepts
- cumulative performance visualization

UPCAPITAL must preserve its own established structure and identity.

---

# 8. DESIGN DIRECTION

UPCAPITAL should feel like:

> Dark Institutional Fintech  
> + Modern Investment Infrastructure  
> + Minimal SaaS  
> + Controlled Premium Crypto Aesthetic

Avoid a cheap crypto-investment aesthetic.

---

# 9. COLOR SYSTEM

Primary background:

```text
#080B14
```

Secondary surface:

```text
#0D1220
```

Elevated surface:

```text
#131927
```

Primary purple:

```text
#7456E8
```

Purple highlight:

```text
#986EF5
```

Electric cyan:

```text
#18D5E5
```

Brand lime:

```text
#B8FF00
```

Success:

```text
#39D98A
```

Warning:

```text
#FFB547
```

Danger:

```text
#FF5C68
```

Primary text:

```text
#F7F8FC
```

Secondary text:

```text
#9DA7BC
```

Borders:

```text
rgba(255,255,255,0.08)
```

Use lime deliberately, not everywhere.

Purple remains an important secondary/system accent.

---

# 10. TYPOGRAPHY

Primary UI font:

**Manrope**

Financial / data font:

**Inter**

Weights:

- 400
- 500
- 600
- 700
- 800

Financial values:

```css
font-variant-numeric: tabular-nums;
```

Hero:

```css
clamp(3rem, 6vw, 6rem)
```

Section titles:

```css
clamp(2rem, 4vw, 3.5rem)
```

Body:

```text
16–18px
```

Small UI:

```text
13–14px
```

---

# 11. GLASSMORPHISM

The owner wants restrained glassmorphism.

Recommended baseline:

```css
background: rgba(255,255,255,0.04);
border: 1px solid rgba(255,255,255,0.08);
backdrop-filter: blur(14px);
```

Good use cases:

- hero dashboard
- performance cards
- feature cards
- elevated financial widgets
- modals
- select floating panels

Do not apply glass to every surface.

---

# 12. BACKGROUND EFFECTS

Allowed:

- subtle radial glows
- low-opacity grid textures
- blurred accent orbs
- very soft gradients
- line textures
- low-intensity animated gradients

Avoid:

- loud animations
- excessive particles
- oversized neon effects
- distracting loops
- visual clutter

Keep the page simple and premium.

---

# 13. MOTION

Use Motion / Framer Motion where appropriate.

General duration:

```text
0.35–0.6s
```

Preferred easing:

```text
[0.16, 1, 0.3, 1]
```

Scroll entrance:

```text
opacity 0 → 1
y 20 → 0
```

Card hover:

```text
translateY -3px
```

Button hover:

```text
scale 1.02
```

Button press:

```text
scale 0.98
```

Respect `prefers-reduced-motion`.

---

# 14. VISUAL ANTI-PATTERNS

Avoid:

- gold coin graphics
- rockets
- Lamborghinis
- fake withdrawal notifications
- fake investor popups
- countdown timers
- flashing banners
- excessive neon
- scam-like ROI badges
- excessive gradients
- crowded UI
- cartoon crypto artwork

---

# 15. PUBLIC ROUTES

Required:

```text
/
/about
/how-it-works
/performance
/technology
/security
/faq
/contact
```

Legal:

```text
/legal/terms
/legal/privacy
/legal/risk
/legal/aml
/legal/cookies
```

---

# 16. HOMEPAGE STRUCTURE

General sequence:

1. Navigation
2. Hero
3. Trust / Statistics
4. Platform Overview
5. How It Works
6. Core Strategy
7. Performance
8. Technology
9. Risk Management
10. Security
11. Scenario Calculator
12. Testimonials
13. About / Headquarters
14. FAQ
15. Final CTA
16. Footer

Do not reorganize the entire homepage without discussion.

---

# 17. HERO

Eyebrow concept:

```text
GLOBAL MULTI-ASSET INVESTMENT PLATFORM
```

Headline:

> Put your capital  
> to work intelligently.

Core messaging:

- multi-asset strategy
- portfolio intelligence
- secure infrastructure
- transparent reporting

Primary CTA:

```text
Open an Account
```

Secondary CTA:

```text
View Performance
```

Hero visual:

Premium dashboard preview using development data such as:

- Portfolio Balance
- Performance %
- Growth chart
- Gold allocation
- Bitcoin allocation
- Silver allocation
- Oil allocation

---

# 18. CORE STRATEGY

## Gold

Themes:

- defensive exposure
- macro hedge
- precious-metal momentum

## Silver

Themes:

- precious metal
- industrial demand
- higher volatility

## Bitcoin

Themes:

- digital-asset exposure
- liquidity
- momentum
- disciplined risk positioning

## Oil

Themes:

- energy market
- macro cycle
- supply dynamics
- directional opportunities

Core Strategy UI should feel data-oriented, not like a commodity brochure.

---

# 19. PERFORMANCE

Current placeholder headline metric:

```text
67.84%
```

Label:

```text
Average Annual ROI
```

Period:

```text
2020–2025
```

Supporting metrics may include:

- Best Year
- Positive Years
- Maximum Drawdown
- Cumulative Growth
- Annual Returns

Use:

- annual return bars
- cumulative line / area chart
- period controls

While using placeholder data, display a development disclaimer.

Production must later use approved real data.

---

# 20. RISK MANAGEMENT

Topics:

- Capital Allocation
- Position Limits
- Drawdown Monitoring
- Portfolio Diversification
- Exposure Controls

Messaging:

> Risk is managed and monitored — not eliminated.

---

# 21. SECURITY

Planned presentation and later implementation:

- Secure Authentication
- Two-Factor Authentication
- Session Management
- Withdrawal Verification
- Activity Monitoring
- Protected User Data
- Audit Events

Do not claim controls that are not eventually implemented.

---

# 22. SCENARIO CALCULATOR

Do not implement a fixed return calculator such as:

```text
Investment × 80%
```

Use:

Investment Amount

Scenario:

- Conservative
- Moderate
- Aggressive

Period:

- 3 months
- 6 months
- 12 months

Display:

```text
Illustrative projection only.
```

This is a UI scenario tool, not a return promise.

---

# 23. TESTIMONIALS

During development, placeholders are acceptable.

Structure testimonials so data can later be replaced easily.

Potential fields:

- quote
- name
- location
- role
- avatar

Do not hard-code the system around the placeholder entries.

---

# 24. AUTHENTICATION

Routes:

```text
/auth/login
/auth/register
/auth/verify-email
/auth/forgot-password
/auth/reset-password
/auth/2fa
```

Recommended platform:

**Supabase Auth**

Registration flow:

Step 1:

- First Name
- Last Name
- Email
- Password
- Confirm Password

Step 2:

- Country
- Phone

Step 3:

- Terms acknowledgement
- Privacy acknowledgement
- Risk acknowledgement

Then:

- email verification

Use Zod validation.

---

# 25. CLIENT CABINET

Protected base route:

```text
/dashboard
```

Navigation:

- Overview
- Portfolio
- Investments
- Deposit
- Withdraw
- Transactions
- Performance
- Referrals
- Notifications
- Support
- Verification
- Profile
- Security
- Settings
- Logout

---

# 26. DASHBOARD OVERVIEW

Header:

```text
Good morning, {firstName}.
Here's an overview of your portfolio.
```

Metric cards:

- Portfolio Value
- Invested Capital
- Total Return
- Available Balance

Graph:

```text
Portfolio Performance
```

Filters:

- 1D
- 7D
- 1M
- 3M
- 1Y
- ALL

Additional modules:

- Active Investments
- Recent Transactions
- Portfolio Allocation
- Account Status

---

# 27. PORTFOLIO

Display:

- Total Portfolio Value
- Allocation
- Profit / Loss
- Asset Holdings
- Strategy Allocation

Asset fields:

- symbol
- name
- allocation
- value
- P/L
- percentage change

---

# 28. INVESTMENTS

Each strategy supports:

- Name
- Description
- Risk Level
- Minimum Capital
- Investment Horizon
- Fees
- Withdrawal Terms
- Historical Performance
- CTA

Do not hard-code guaranteed returns.

---

# 29. DEPOSIT FLOW

Wizard:

1. Method
2. Asset / Currency
3. Amount
4. Payment Details
5. Confirmation

Crypto deposits may include:

- Asset
- Network
- Wallet Address
- QR Code
- Minimum Deposit
- Network Warning
- Copy Button

Statuses:

- Awaiting Payment
- Pending Confirmation
- Completed
- Failed

Final confirmation must ultimately be backend-driven.

---

# 30. WITHDRAWAL FLOW

Fields:

- Available Balance
- Amount
- Currency / Asset
- Destination
- Fees
- Processing Information
- 2FA

Statuses:

- Pending
- Approved
- Processing
- Completed
- Rejected

Every state change must eventually be audited.

---

# 31. TRANSACTIONS

Columns:

- Date
- Type
- Amount
- Currency
- Method
- Status
- Reference

Filters:

- Deposit
- Withdrawal
- Investment
- Return
- Fee
- Status
- Date Range

Future export:

- CSV
- PDF

---

# 32. PERFORMANCE DASHBOARD

Metrics:

- Net Return
- Average Monthly Return
- Maximum Drawdown
- Current Drawdown

Charts:

- Portfolio Value
- Cumulative Return
- Monthly Return
- Drawdown

---

# 33. KYC / VERIFICATION

Statuses:

- Unverified
- Pending
- Verified
- Rejected

Steps:

1. Personal Details
2. Identity Document
3. Address Verification
4. Review

Sensitive documents must never be publicly exposed.

---

# 34. PROFILE

Fields:

- First Name
- Last Name
- Phone
- Email
- Country
- Address
- Date of Birth

Verified identity fields may later become read-only.

---

# 35. SECURITY CENTER

Features:

- Change Password
- 2FA
- Active Sessions
- Login History
- Known Devices
- Security Notifications
- Withdrawal Verification
- Sign Out All Devices

---

# 36. NOTIFICATIONS

Types:

- Deposit Received
- Withdrawal Requested
- Withdrawal Completed
- Login Detected
- Profile Updated
- Verification Result
- Investment Update
- System Announcement

Support read/unread states.

---

# 37. SUPPORT

Ticket fields:

- Category
- Subject
- Message
- Attachment

Statuses:

- Open
- Waiting
- Resolved
- Closed

Support conversation threads required.

---

# 38. REFERRALS

Optional module.

Fields:

- Referral URL
- Referral Code
- Total Referrals
- Active Referrals
- Referral Earnings
- Referral History

Avoid pyramid-style mechanics.

---

# 39. ADMIN PLATFORM

Protected base:

```text
/admin
```

Dashboard metrics:

- Total Users
- Verified Users
- Deposits
- Withdrawals
- Assets Under Management
- Pending Withdrawals
- Pending Verification
- Open Support Tickets
- Recent Activity

---

# 40. ADMIN USER MANAGEMENT

Admin actions:

- Search Users
- Filter Users
- View User
- Review KYC
- View Transactions
- Suspend
- Restore
- Review Security Events

Sensitive actions must be audited.

---

# 41. ADMIN KYC

Admin can:

- view pending verification
- inspect documents securely
- approve
- reject
- request additional information

Track:

- reviewer
- timestamp
- decision

---

# 42. ADMIN DEPOSITS

Support:

- pending deposits
- search
- filtering
- user
- amount
- reference
- timestamp
- reconciliation
- admin action

---

# 43. ADMIN WITHDRAWALS

Support:

- review
- approve
- reject
- processing
- completion
- internal notes

Every state transition must be logged.

---

# 44. ADMIN STRATEGY MANAGEMENT

Admin can:

- Create
- Edit
- Deactivate

Fields:

- Strategy Name
- Description
- Risk Level
- Minimum Capital
- Fees
- Horizon
- Performance Data

---

# 45. PERFORMANCE MANAGEMENT

Admin should manage performance data.

Support:

- manual entry
- import
- edit
- historical periods

Frontend charts must ultimately consume this dataset.

---

# 46. CONTENT MANAGEMENT

Admin may manage:

- FAQ
- Announcements
- Homepage Metrics
- Platform Notices
- Investment Content
- Support Information
- Maintenance Notices

---

# 47. DATABASE

Recommended backend:

**Supabase + PostgreSQL**

Core tables:

```text
profiles
user_settings
kyc_verifications
accounts
portfolios
portfolio_assets
investment_strategies
user_investments
deposits
withdrawals
transactions
performance_records
notifications
support_tickets
support_messages
referrals
security_events
admin_users
audit_logs
```

Use:

- Foreign Keys
- Timestamps
- Indexes
- Constraints
- Row Level Security
- Typed Interfaces

---

# 48. AUTHORIZATION / RLS

Users must only access their own private data.

Never rely only on hidden UI for security.

Authorization must exist across:

```text
Client
↓
Server
↓
Database Policies
```

Admin access must be checked server-side.

---

# 49. SECURITY IMPLEMENTATION

Required direction:

- Supabase authentication
- secure session handling
- secure cookie practices where appropriate
- input validation
- Zod schemas
- server-side authorization
- RLS
- rate limiting
- 2FA
- session expiration
- audit logs
- login monitoring
- security headers
- CSP
- environment secrets

Never store passwords manually.

---

# 50. LOADING STATES

Use skeletons for:

- dashboard metrics
- charts
- portfolio
- transactions
- notifications
- investments

Avoid layout shift.

---

# 51. EMPTY STATES

Example:

```text
No transactions yet.

Your transactions will appear here after your first deposit.

Make Deposit
```

Every empty state should explain what happened and what the user can do next.

---

# 52. ERROR STATES

Avoid generic:

```text
Error
```

Prefer:

```text
We couldn't load your portfolio.

Your account data has not been changed.

Try Again
```

Do not expose server internals.

---

# 53. TOAST SYSTEM

Types:

- Success
- Error
- Warning
- Information

Examples:

- Deposit request created.
- Withdrawal submitted.
- Profile saved.
- Verification submitted.

---

# 54. MODALS

Use accessible confirmation dialogs for:

- Withdrawal
- Sign Out All Sessions
- Dangerous Account Actions
- Ticket Cancellation
- Attachment Removal

Support:

- focus trapping
- keyboard interaction
- ESC where appropriate

---

# 55. RESPONSIVE DESIGN

Mobile first.

Test widths:

```text
320
375
390
430
768
1024
1280
1440
1920
```

Do not simply shrink desktop layouts.

Dashboard should use:

- collapsible navigation
- adaptive tables
- mobile card transformations where appropriate

---

# 56. ACCESSIBILITY

Target:

**WCAG AA**

Requirements:

- semantic HTML
- keyboard navigation
- visible focus
- ARIA where needed
- sufficient contrast
- accessible forms
- clear validation
- reduced motion
- screen-reader friendly feedback

---

# 57. SEO

Public pages require:

- metadata
- OpenGraph
- social previews
- canonical URLs
- robots.txt
- sitemap.xml
- structured data where appropriate
- semantic headings

Auth/dashboard/admin pages should be `noindex`.

---

# 58. PERFORMANCE TARGETS

Lighthouse targets:

```text
Performance 90+
Accessibility 95+
Best Practices 95+
SEO 95+
```

Use:

- Next Image
- font optimization
- lazy loading
- route code splitting
- Server Components
- caching
- minimal client JavaScript

---

# 59. TARGET PROJECT ARCHITECTURE

```text
app/
├── page.tsx
├── about/
├── how-it-works/
├── performance/
├── technology/
├── security/
├── faq/
├── contact/
├── legal/
├── auth/
├── dashboard/
└── admin/

components/
├── ui/
├── marketing/
├── navigation/
├── dashboard/
├── charts/
├── forms/
└── modals/

lib/
services/
hooks/
stores/
types/
utils/
public/
styles/
docs/
```

Use route groups if useful.

Do not introduce unnecessary architectural complexity.

---

# 60. REUSABILITY RULE

Before creating a new component:

1. Search `components/ui`.
2. Search marketing components.
3. Search dashboard components.
4. Determine whether an existing component can be extended.

Do not duplicate:

- Buttons
- Cards
- Inputs
- Modals
- Dropdowns
- Tables
- Badges
- Skeletons

---

# 61. CURRENT CODEBASE EXPECTATIONS

Codex should expect to find:

- working Phase 1 Next.js project
- working TypeScript
- working Tailwind
- theme variables
- brand assets
- completed UI primitives
- `/design-system`
- Phase 3 homepage
- marketing components
- placeholder image assets

Inspect actual paths before assuming exact filenames.

If code differs slightly from this document:

- preserve working implementation
- reconcile carefully
- explain differences

---

# 62. NEXT MAJOR PHASE

The project is currently at:

> **END OF PHASE 3 / HOMEPAGE REVIEW**

The next phase is:

# PHASE 4 — REMAINING PUBLIC WEBSITE

Build:

```text
/about
/how-it-works
/performance
/technology
/security
/faq
/contact
```

Legal-page templates:

```text
/legal/terms
/legal/privacy
/legal/risk
/legal/aml
/legal/cookies
```

Phase 4 must:

- reuse Phase 2 components
- preserve Phase 3 design language
- reuse current navigation/footer where appropriate
- use current brand assets
- use placeholder content as required
- remain responsive
- remain accessible
- preserve `/`
- preserve `/design-system`
- avoid backend/auth implementation

Do not start authentication in Phase 4.

---

# 63. PHASE 4 CODEX PROMPT

Copy this exact prompt when ready:

> Begin UPCAPITAL Phase 4. First inspect the current repository and confirm the existing Phase 1 foundation, Phase 2 reusable design system, `/design-system` route and current Phase 3 homepage. Do not rebuild or replace completed work. Build the remaining public pages: About, How It Works, Performance, Technology, Security, FAQ, Contact and legal-page templates for Terms, Privacy, Risk Disclosure, AML/KYC and Cookies. Reuse the existing design system, navigation, footer, brand assets, typography, colors, glassmorphism and restrained background effects. Maintain exact visual consistency with the homepage. All business information may be treated as development placeholder content unless explicitly marked final. Do not implement authentication or backend functionality in this phase. After implementation, verify TypeScript, routes, responsiveness, accessibility, console errors and that `/` and `/design-system` still work. Summarize every file created or modified and stop before Phase 5.

---

# 64. MASTER CODEX OPERATING PROMPT

> You are working inside the existing UPCAPITAL codebase. This is an active phased project, not a greenfield repository. Before editing files, inspect the current repository structure and identify what has already been implemented. Preserve completed phases and reuse the existing design system. Do not rebuild working components, routes or styling simply because you prefer another implementation. Follow the UPCAPITAL master specification and current project-state document as the product source of truth. Treat current business facts as development placeholders unless explicitly marked final. Maintain the established premium dark-fintech visual language with restrained glassmorphism, subtle ambient backgrounds, Manrope, Inter for financial data, controlled lime accent, purple secondary accents and accessible responsive behavior. Work only on the requested phase. After implementation, run or recommend appropriate checks for TypeScript, linting, build integrity, responsiveness, accessibility, routing and regressions. Clearly summarize modified files and stop before starting another major phase.

---

# 65. PHASE ROADMAP

## Phase 0
Architecture Audit  
**COMPLETE**

## Phase 1
Next.js Foundation  
**COMPLETE**

## Phase 2
Reusable Design System  
**COMPLETE**

## Phase 3
Homepage  
**IMPLEMENTED / REVIEW**

## Phase 4
Remaining Public Pages  
**IMPLEMENTED**

## Phase 5
Authentication
**IMPLEMENTED / CUSTOM SMTP AND EMAIL VERIFICATION TESTING DEFERRED TO PRODUCTION PREPARATION**

## Phase 6
Dashboard Foundation
**IMPLEMENTED / REVIEW**

## Phase 7
Portfolio + Investments
**NEXT**

## Phase 8
Deposits + Withdrawals

## Phase 9
Transactions + Performance

## Phase 10
Profile + KYC

## Phase 11
Security + Notifications

## Phase 12
Support + Referrals

## Phase 13
Admin Platform

## Phase 14
Database + Backend Integration

## Phase 15
Security Hardening

## Phase 16
QA + Accessibility + Responsive Testing

## Phase 17
Production Deployment

---

# 66. PHASE EXECUTION RULE

Never ask Codex to build the entire application in one task.

For each phase:

1. Inspect current project.
2. Confirm what already exists.
3. Explain intended changes.
4. Identify dependencies.
5. Implement.
6. Verify TypeScript.
7. Verify responsiveness.
8. Verify accessibility.
9. Verify routes.
10. Check console errors.
11. Check regressions.
12. Summarize modified files.
13. Stop.

---

# 67. OWNER / AI WORKFLOW

```text
Project Owner
↓
Product decisions + visual feedback

ChatGPT
↓
Architecture + planning + UX + review

Codex
↓
Repository implementation

VS Code
↓
Local development

Browser + Phone
↓
Responsive testing

GitHub
↓
Version control

Next Phase
```

---

# 68. CURRENT PROJECT MEMORY SNAPSHOT

UPCAPITAL currently has:

- working Next.js foundation
- TypeScript
- Tailwind
- Manrope + Inter
- established theme tokens
- completed reusable UI design system
- `/design-system`
- supplied brand logo assets
- dark premium fintech direction
- restrained glassmorphism
- subtle background effects
- lime + purple accent system
- full Phase 3 homepage prototype
- Gold / Silver / Bitcoin / Oil strategy content
- 67.84% placeholder average annual ROI
- 2020–2025 placeholder performance bars
- placeholder testimonials
- placeholder Tarrytown, New York headquarters
- placeholder contact details
- explicit placeholder-business-data rule
- Phase 4 as the next major task

This snapshot must be respected when continuing development.

---

# 69. FINAL CODEX REMINDER

Correct behavior:

```text
READ
↓
INSPECT REPOSITORY
↓
UNDERSTAND CURRENT STATE
↓
EXTEND EXISTING WORK
↓
VERIFY
↓
REPORT
```

Incorrect behavior:

```text
READ
↓
START OVER
```

---

**END OF CURRENT UPCAPITAL MASTER SPECIFICATION**
