import Image from "next/image";
import Link from "next/link";
import { MarketingNavbar } from "./marketing-navbar";
import { MarketingFooter } from "./marketing-footer";
import { PerformancePanel } from "./performance-panel";
import { ScenarioCalculator } from "./scenario-calculator";
import { LiveMarketPrices } from "./live-market-prices";
import { faq, strategies } from "@/lib/constants/marketing";

const testimonials = [
  {
    quote:
      "The dashboard makes the portfolio easier to understand without making the information feel watered down.",
    name: "Daniel R.",
    location: "Toronto, Canada",
  },
  {
    quote:
      "What stands out is the clarity—performance, allocation and account activity are all visible in one place.",
    name: "Melissa A.",
    location: "London, United Kingdom",
  },
  {
    quote:
      "The platform feels structured and deliberate. I can see the information I care about quickly.",
    name: "Victor N.",
    location: "Lagos, Nigeria",
  },
];

export function HomePage() {
  return (
    <div className="up-site">
      <MarketingNavbar />
      <main id="main-content" tabIndex={-1}>
        {/* HERO */}
        <section className="relative flex min-h-[820px] pb-20 items-center overflow-hidden pt-28">
          <div className="pointer-events-none absolute left-[8%] top-[18%] h-52 w-52 rounded-full bg-[#b8ff00]/8 blur-[90px]" />
          <div className="pointer-events-none absolute right-[10%] top-[18%] h-80 w-80 rounded-full bg-[#7456e8]/14 blur-[110px]" />
          <div className="up-container grid items-center gap-16 lg:grid-cols-[1.06fr_.94fr]">
            <div>
              <div className="mb-7 flex items-center gap-3">
                <span className="up-pulse-dot h-2 w-2 rounded-full bg-[#39d98a]" />
                <span className="up-kicker">Global multi-asset investment platform</span>
              </div>
              <h1 className="up-display max-w-[860px]">
                Put your capital <span className="text-[#b8ff00]">to work</span> intelligently.
              </h1>
              <p className="up-body mt-7 max-w-[670px]">
                UPCAPITAL combines diversified market strategies, portfolio intelligence and secure
                account infrastructure into one focused investment experience.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/auth/register"
                  className="rounded-xl bg-[#b8ff00] px-6 py-3.5 font-extrabold text-[#07101f] transition hover:-translate-y-0.5"
                >
                  Create Account
                </Link>
                <a
                  href="#performance"
                  className="rounded-xl border border-white/12 bg-white/[.035] px-6 py-3.5 font-semibold backdrop-blur-md transition hover:bg-white/[.07]"
                >
                  View Performance
                </a>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#8f99ad]">
                <span>Transparent reporting</span>
                <span>Multi-asset strategy</span>
                <span>Portfolio visibility</span>
              </div>
            </div>

            <div className="relative up-float">
              <div className="absolute -inset-10 -z-10 rounded-full bg-[#7456e8]/10 blur-3xl" />
              <div className="up-glass up-shimmer rounded-[28px] p-5 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-[#9da7bc]">Portfolio balance</p>
                    <p className="up-number mt-2 text-3xl font-semibold">$248,420.72</p>
                  </div>
                  <span className="rounded-full bg-[#39d98a]/10 px-3 py-1.5 text-sm font-semibold text-[#39d98a]">
                    +12.84%
                  </span>
                </div>
                <p className="mt-6 text-xs text-text-secondary">Portfolio overview</p>
                <svg
                  viewBox="0 0 640 250"
                  className="mt-5 w-full"
                  role="img"
                  aria-label="Illustrative portfolio chart"
                >
                  <defs>
                    <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#b8ff00" stopOpacity=".26" />
                      <stop offset="1" stopColor="#b8ff00" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g opacity=".12" stroke="#fff">
                    <path d="M0 55H640M0 110H640M0 165H640M0 220H640" />
                  </g>
                  <path
                    d="M0 214 C46 200,78 176,110 184 S178 135,220 147 S300 95,348 118 S418 72,455 81 S522 35,570 51 S614 30,640 24 L640 250L0 250Z"
                    fill="url(#heroFill)"
                  />
                  <path
                    d="M0 214 C46 200,78 176,110 184 S178 135,220 147 S300 95,348 118 S418 72,455 81 S522 35,570 51 S614 30,640 24"
                    fill="none"
                    stroke="#b8ff00"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {[
                    ["Gold", "30%"],
                    ["BTC", "30%"],
                    ["Silver", "20%"],
                    ["Oil", "20%"],
                  ].map(([a, b]) => (
                    <div key={a} className="rounded-xl border border-white/8 bg-black/10 p-3">
                      <p className="text-[11px] text-[#7f899d]">{a}</p>
                      <p className="up-number mt-1 text-sm font-semibold">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST / STATS */}
        <section className="border-y border-white/8 bg-white/[.016]">
          <div className="up-container grid grid-cols-2 divide-x divide-white/8 md:grid-cols-4">
            {[
              ["$186.4M", "Assets monitored"],
              ["67.84%", "Avg. annual ROI"],
              ["3,840+", "Client accounts"],
              ["24/7", "Portfolio monitoring"],
            ].map(([v, l]) => (
              <div key={l} className="px-4 py-8 text-center md:py-9">
                <p className="up-number text-2xl font-semibold md:text-3xl">{v}</p>
                <p className="mt-2 text-xs text-[#7f899d]">{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* OVERVIEW */}
        <section id="overview" className="up-section">
          <div className="up-container">
            <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
              <div>
                <p className="up-kicker">Platform overview</p>
                <h2 className="up-title mt-4">
                  Built to make complex capital easier to understand.
                </h2>
              </div>
              <p className="up-body max-w-2xl lg:pt-10">
                UPCAPITAL brings portfolio value, strategy allocation, performance, transactions,
                security and reporting into a single environment designed for clarity rather than
                noise.
              </p>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                [
                  "01",
                  "Portfolio Intelligence",
                  "Track portfolio value, allocation and change from one clean interface.",
                ],
                [
                  "02",
                  "Strategy Monitoring",
                  "Understand where capital is allocated and how each strategy contributes.",
                ],
                [
                  "03",
                  "Risk Visibility",
                  "Monitor exposure, drawdown and concentration with clear account-level context.",
                ],
                [
                  "04",
                  "Transparent Reporting",
                  "Review performance history, transactions and account activity in one place.",
                ],
              ].map(([n, t, d]) => (
                <article
                  key={n}
                  className="up-glass rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-[#b8ff00]/25"
                >
                  <span className="up-number text-xs text-[#b8ff00]">{n}</span>
                  <div className="mt-12 h-px bg-white/8" />
                  <h3 className="mt-6 text-xl font-semibold">{t}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#909aaf]">{d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="up-section border-y border-white/6 bg-[#0d1220]/46">
          <div className="up-container">
            <div className="max-w-3xl">
              <p className="up-kicker">How it works</p>
              <h2 className="up-title mt-4">From account creation to portfolio monitoring.</h2>
            </div>
            <div className="relative mt-14 grid gap-4 lg:grid-cols-4">
              <div className="absolute left-[12%] right-[12%] top-[30px] hidden h-px bg-gradient-to-r from-transparent via-[#b8ff00]/35 to-transparent lg:block" />
              {[
                [
                  "01",
                  "Create your account",
                  "Open secure access to the UPCAPITAL client environment.",
                ],
                [
                  "02",
                  "Complete verification",
                  "Submit the required account and identity information.",
                ],
                [
                  "03",
                  "Fund your portfolio",
                  "Choose an available funding method and complete the guided process.",
                ],
                [
                  "04",
                  "Track your capital",
                  "Monitor portfolio allocation, performance and account activity.",
                ],
              ].map(([n, t, d]) => (
                <div
                  key={n}
                  className="relative rounded-2xl border border-white/8 bg-[#0b101c] p-6"
                >
                  <div className="relative z-10 grid h-[60px] w-[60px] place-items-center rounded-full border border-[#b8ff00]/25 bg-[#0b101c] up-number text-sm text-[#b8ff00]">
                    {n}
                  </div>
                  <h3 className="mt-8 text-xl font-semibold">{t}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#909aaf]">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CORE STRATEGY */}
        <section id="strategy" className="up-section">
          <div className="up-container">
            <div className="grid items-end gap-8 lg:grid-cols-2">
              <div>
                <p className="up-kicker">Core strategy</p>
                <h2 className="up-title mt-4">Four markets. One diversified framework.</h2>
              </div>
              <p className="up-body max-w-xl lg:justify-self-end">
                Our strategy framework spans precious metals, digital assets and energy markets.
              </p>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {strategies.map((s) => (
                <article
                  key={s.name}
                  className="group relative overflow-hidden rounded-[24px] border border-white/8 bg-[#0d1220]/72 p-7 md:p-8"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-px opacity-70"
                    style={{
                      background: `linear-gradient(90deg,transparent,${s.accent},transparent)`,
                    }}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="grid h-12 min-w-12 place-items-center rounded-xl border border-white/8 bg-white/[.035] up-number text-sm font-semibold"
                      style={{ color: s.accent }}
                    >
                      {s.symbol}
                    </div>
                    <span className="up-number rounded-full border border-white/8 px-3 py-1.5 text-xs text-[#aeb7c9]">
                      {s.allocation} allocation
                    </span>
                  </div>
                  <h3 className="mt-14 text-2xl font-semibold">{s.name}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#909aaf]">{s.copy}</p>
                  <div className="mt-8 flex h-11 items-end gap-1 opacity-70">
                    {[35, 58, 42, 72, 55, 82, 65, 91, 76, 96, 84, 100].map((v, i) => (
                      <span
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{ height: `${v}%`, background: s.accent, opacity: 0.18 + i / 20 }}
                      />
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <LiveMarketPrices />
          </div>
        </section>

        {/* PERFORMANCE */}
        <section id="performance" className="up-section border-y border-white/10">
          <div className="up-container">
            <p className="up-kicker">Performance</p>
            <h2 className="up-title mt-4">Historical performance, presented without the noise.</h2>
            <p className="up-body mt-5">
              Explore annual returns and cumulative growth across the 2020–2025 period.
            </p>
            <PerformancePanel />
          </div>
        </section>

        {/* TECHNOLOGY */}
        <section className="up-section">
          <div className="up-container grid items-center gap-12 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-[28px] border border-white/8">
              <Image
                src="/placeholders/strategy-operations.svg"
                alt="Strategy operations"
                width={1200}
                height={760}
                className="h-auto w-full"
              />
            </div>
            <div>
              <p className="up-kicker">Technology layer</p>
              <h2 className="up-title mt-4">Infrastructure behind the investment experience.</h2>
              <p className="up-body mt-5">
                The platform architecture is designed to support market monitoring, portfolio
                analytics, risk controls, secure financial workflows and clear client reporting.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Market data processing",
                  "Portfolio analytics",
                  "Risk monitoring",
                  "Trade oversight",
                  "Performance reporting",
                  "Account activity logs",
                ].map((x) => (
                  <div
                    key={x}
                    className="rounded-xl border border-white/8 bg-white/[.025] px-4 py-4 text-sm text-[#c2c9d7]"
                  >
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RISK */}
        <section className="up-section border-y border-white/6 bg-[#0d1220]/40">
          <div className="up-container">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <p className="up-kicker">Risk management</p>
                <h2 className="up-title mt-4">Risk is managed, not ignored.</h2>
                <p className="up-body mt-5">
                  Our risk framework centres on allocation discipline, concentration limits and
                  portfolio-level visibility.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  [
                    "Capital allocation",
                    "Allocation rules help avoid uncontrolled concentration in a single market.",
                  ],
                  [
                    "Position limits",
                    "Exposure parameters define how much capital can be committed to individual positions.",
                  ],
                  [
                    "Drawdown monitoring",
                    "Portfolio decline and strategy-level risk are monitored against defined limits.",
                  ],
                  [
                    "Diversification",
                    "Gold, Silver, Bitcoin and Oil provide exposure to different market drivers.",
                  ],
                ].map(([t, d]) => (
                  <div key={t} className="rounded-2xl border border-white/8 bg-[#0a0f1a] p-6">
                    <div className="h-1 w-9 rounded-full bg-[#b8ff00]" />
                    <h3 className="mt-7 text-lg font-semibold">{t}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#909aaf]">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section id="security" className="up-section">
          <div className="up-container grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="up-kicker">Security architecture</p>
              <h2 className="up-title mt-4">Account security at every sensitive step.</h2>
              <p className="up-body mt-5">
                Our security priorities span account access, protected information, financial-action
                verification and account activity.
              </p>
              <div className="mt-9 space-y-3">
                {[
                  [
                    "Two-factor authentication",
                    "Additional verification for account access and sensitive actions.",
                  ],
                  ["Session management", "Visibility into active sessions and trusted devices."],
                  [
                    "Withdrawal verification",
                    "Protected workflow before withdrawal requests can progress.",
                  ],
                  [
                    "Activity monitoring",
                    "Security events and important account changes recorded for review.",
                  ],
                ].map(([t, d]) => (
                  <div
                    key={t}
                    className="flex gap-4 rounded-2xl border border-white/8 bg-white/[.025] p-5"
                  >
                    <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#39d98a]" />
                    <div>
                      <h3 className="font-semibold">{t}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-[#909aaf]">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-[28px] border border-white/8">
              <Image
                src="/placeholders/security-infrastructure.svg"
                alt="Security infrastructure"
                width={1200}
                height={760}
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>
        <ScenarioCalculator />

        {/* TESTIMONIALS */}
        <section className="up-section border-y border-white/6 bg-white/[.012]">
          <div className="up-container">
            <div className="max-w-3xl">
              <p className="up-kicker">Client experience</p>
              <h2 className="up-title mt-4">Designed around clarity and control.</h2>
              <p className="up-body mt-5">
                A considered experience, from understanding your portfolio to reviewing your next
                decision.
              </p>
            </div>
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {testimonials.map((t) => (
                <blockquote
                  key={t.name}
                  className="rounded-2xl border border-white/8 bg-[#0d1220]/65 p-7"
                >
                  <p className="mt-7 text-lg leading-8 text-[#e2e6ed]">“{t.quote}”</p>
                  <footer className="mt-8 border-t border-white/8 pt-5">
                    <p className="font-semibold">{t.name}</p>
                    <p className="mt-1 text-xs text-[#7f899d]">{t.location}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT/HQ */}
        <section className="up-section">
          <div className="up-container grid gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div className="overflow-hidden rounded-[28px] border border-white/8">
              <Image
                src="/placeholders/team-placeholder.svg"
                alt="UPCAPITAL investment approach"
                width={1200}
                height={760}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="up-kicker">UPCAPITAL</p>
              <h2 className="up-title mt-4">Built for a global investor experience.</h2>
              <p className="up-body mt-5">
                UPCAPITAL is a digital-first investment platform combining multi-asset strategy
                access with portfolio intelligence and secure account infrastructure.
              </p>
              <div className="mt-8 rounded-2xl border border-white/8 bg-white/[.025] p-6">
                <p className="text-xs uppercase tracking-[.14em] text-[#778196]">Headquarters</p>
                <p className="mt-4 font-semibold">48 Hudson Crest Parkway</p>
                <p className="mt-1 text-sm text-[#9da7bc]">
                  Tarrytown, New York 10591, United States
                </p>
                <div className="mt-5 grid gap-2 text-sm text-[#9da7bc] sm:grid-cols-2">
                  <p>hello@upcapital.com</p>
                  <p>+1 (914) 555-0186</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="up-section border-t border-white/6">
          <div className="up-container grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="up-kicker">Frequently asked questions</p>
              <h2 className="up-title mt-4">The essentials, clearly explained.</h2>
            </div>
            <div className="divide-y divide-white/8 border-y border-white/8">
              {faq.map(([q, a]) => (
                <details key={q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-semibold md:text-lg">
                    {q}
                    <span className="text-2xl font-light text-[#b8ff00] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pt-4 text-sm leading-7 text-[#909aaf]">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="pb-20 pt-8">
          <div className="up-container">
            <div className="relative overflow-hidden rounded-[32px] border border-[#b8ff00]/15 bg-gradient-to-br from-[#131927] to-[#090e18] p-8 md:p-14 lg:p-16">
              <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#b8ff00]/10 blur-[90px]" />
              <div className="absolute bottom-[-160px] left-[28%] h-80 w-80 rounded-full bg-[#7456e8]/15 blur-[100px]" />
              <div className="relative max-w-3xl">
                <p className="up-kicker">Start with UPCAPITAL</p>
                <h2 className="up-title mt-4">Make your capital work smarter.</h2>
                <p className="up-body mt-5">
                  Create your account for a portfolio experience built around strategy visibility
                  and transparent reporting.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/auth/register"
                    className="rounded-xl bg-[#b8ff00] px-6 py-3.5 font-extrabold text-[#07101f]"
                  >
                    Create Account
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-xl border border-white/10 px-6 py-3.5 font-semibold"
                  >
                    Speak with Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
