# UPCAPITAL Phase 2 — Design System

Phase 2 establishes the reusable interface primitives used by the public website, authenticated Client Cabinet and administrative platform.

## Components added

- Button — primary, secondary, outline, ghost and danger variants; four sizes; loading state.
- Input — label, hint, error, leading/trailing content and accessible descriptions.
- Select — same field language as Input.
- Card — Card, CardHeader, CardContent and CardFooter.
- Badge — neutral, primary, accent, success, warning and danger.
- Modal — accessible dialog semantics, ESC/backdrop close and body scroll lock.
- Drawer — left/right contextual panel with dialog semantics and body scroll lock.
- Tooltip — hover/focus contextual content.
- Dropdown — reusable menu shell and menu items.
- Tabs — controlled internal tab selection and tab semantics.
- Accordion — single-open disclosure pattern for FAQ/settings content.
- Toast — global provider, success/error/warning/info messages and automatic dismissal.
- Skeleton — standard loading placeholder.
- DataTable — generic typed table shell with horizontal responsive overflow and empty state.
- PageContainer — canonical maximum-width page wrapper.
- Typography — Eyebrow, Display, SectionTitle, Heading, Text and FinancialValue.

## Development preview

Visit `/design-system` while the development server is running to review all Phase 2 primitives in one place.

The preview contains development-only illustrative financial data. It is not user or performance data and is not the production homepage.

## Theme rules preserved

- Background: #080B14
- Secondary surface: #0D1220
- Elevated surface: #131927
- Primary purple: #7456E8
- Purple highlight: #986EF5
- Electric cyan: #18D5E5
- Success: #39D98A
- Warning: #FFB547
- Danger: #FF5C68
- Primary text: #F7F8FC
- Secondary text: #9DA7BC
- Main font: Manrope
- Data font: Inter with tabular numerals

## Phase boundary

Phase 2 deliberately does not build the UPCAPITAL homepage, dashboard, authentication or backend. Those screens should consume this system rather than invent new one-off styles.
