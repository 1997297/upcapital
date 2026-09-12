"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const scenarios = { Conservative: 0.1, Moderate: 0.18, Aggressive: 0.28 } as const;
type Scenario = keyof typeof scenarios;
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function ScenarioCalculator() {
  const [amount, setAmount] = useState("10000");
  const [scenario, setScenario] = useState<Scenario>("Moderate");
  const [months, setMonths] = useState(12);
  const capital = Number(amount);
  const valid =
    amount.trim() !== "" && Number.isFinite(capital) && capital >= 0 && capital <= 1000000000;
  const error =
    amount === ""
      ? "Enter an investment amount."
      : !valid
        ? "Enter an amount between $0 and $1,000,000,000."
        : undefined;
  const projected = valid ? capital * Math.pow(1 + scenarios[scenario], months / 12) : null;

  return (
    <section id="calculator" className="up-section">
      <div className="up-container">
        <div className="up-glass grid grid-cols-1 gap-12 rounded-[30px] p-7 md:p-10 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:p-12">
          <div>
            <p className="up-kicker">Scenario calculator</p>
            <h2 className="up-title mt-4">Explore an illustrative portfolio scenario.</h2>
            <p className="up-body mt-5">
              Compare capital amounts, scenario assumptions and investment periods. Your result
              updates as you change the values.
            </p>
          </div>
          <div className="min-w-0 space-y-5">
            <Input
              id="scenario-amount"
              name="amount"
              label="Investment amount (USD)"
              type="number"
              inputMode="decimal"
              min={0}
              max={1000000000}
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              error={error}
              className="up-number"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select
                id="scenario-type"
                label="Scenario"
                value={scenario}
                onChange={(event) => setScenario(event.target.value as Scenario)}
              >
                {Object.keys(scenarios).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
              <Select
                id="scenario-period"
                label="Period"
                value={months}
                onChange={(event) => setMonths(Number(event.target.value))}
              >
                {[3, 6, 12].map((value) => (
                  <option key={value} value={value}>
                    {value} months
                  </option>
                ))}
              </Select>
            </div>
            <div
              className="rounded-2xl border border-[#b8ff00]/15 bg-[#b8ff00]/[.04] p-5"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="text-xs text-text-secondary">Illustrative projected value</p>
              <output
                id="scenario-result"
                htmlFor="scenario-amount scenario-type scenario-period"
                className="up-number mt-2 block break-all text-3xl font-semibold"
              >
                {projected === null ? "Enter a valid amount" : currency.format(projected)}
              </output>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                {scenario} scenario / {months} months / {(scenarios[scenario] * 100).toFixed(0)}%
                annual assumption
              </p>
              {projected !== null && (
                <p className="mt-2 text-sm text-[#b8ff00]">
                  Illustrative gain: {currency.format(projected - capital)}
                </p>
              )}
            </div>
            <p className="text-xs leading-6 text-text-secondary">
              Illustrative calculation only, excluding fees and taxes. This is not a forecast or a
              guaranteed return. Capital is at risk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
