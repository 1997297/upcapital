"use client";
import { useState } from "react";
import { annualReturns } from "@/lib/constants/marketing";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PerformancePanel() {
  const [period, setPeriod] = useState("ALL");
  const records = period === "ALL" ? annualReturns : annualReturns.slice(period === "3Y" ? -3 : -1);
  const average = records.reduce((sum, item) => sum + item.value, 0) / records.length;
  const indices = records.reduce<number[]>(
    (values, item) => [...values, values[values.length - 1] * (1 + item.value / 100)],
    [100],
  );
  const max = Math.max(...indices);
  const points = indices
    .map(
      (value, index) => `${40 + (index / (indices.length - 1)) * 920},${250 - (value / max) * 210}`,
    )
    .join(" ");
  return (
    <div className="mt-10 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-text-secondary">
          {records[0].year}
          {records.length > 1 ? `–${records[records.length - 1].year}` : ""} reporting period
        </p>
        <div className="flex gap-2" role="group" aria-label="Performance period">
          {["1Y", "3Y", "ALL"].map((value) => (
            <Button
              key={value}
              size="sm"
              variant={value === period ? "primary" : "outline"}
              aria-pressed={value === period}
              onClick={() => setPeriod(value)}
            >
              {value}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)]">
        <Card className="up-glass">
          <CardContent className="p-7 md:p-8">
            <p className="text-sm text-text-secondary">Average annual ROI</p>
            <p
              className="up-number mt-5 text-5xl font-semibold tracking-tight sm:text-6xl"
              aria-live="polite"
            >
              {average.toFixed(2)}
              <span className="text-[#b8ff00]">%</span>
            </p>
            <p className="mt-4 text-sm leading-6 text-text-secondary">
              Arithmetic mean of the annual returns in the selected period.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-5">
              <div>
                <dt className="text-xs text-text-secondary">Best year</dt>
                <dd className="up-number mt-2 text-xl">
                  {Math.max(...records.map((record) => record.value)).toFixed(2)}%
                </dd>
              </div>
              <div>
                <dt className="text-xs text-text-secondary">Positive years</dt>
                <dd className="up-number mt-2 text-xl">
                  {records.filter((record) => record.value > 0).length} / {records.length}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-7 md:p-8">
            <h2 className="text-lg font-semibold">Annual returns</h2>
            <div className="mt-8 flex h-64 items-end gap-1.5 sm:gap-3">
              {records.map((record) => (
                <div
                  key={record.year}
                  className="flex h-full min-w-0 flex-1 flex-col justify-end gap-3"
                >
                  <span className="up-number text-center text-[10px] text-text-secondary sm:text-xs">
                    {record.value.toFixed(2)}%
                  </span>
                  <div
                    className="mx-auto w-full max-w-24 rounded-t-md bg-gradient-to-t from-[#7456e8] to-[#b8ff00]"
                    style={{ height: `${record.value * 2}px` }}
                  />
                  <span className="text-center text-xs text-text-secondary">{record.year}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="p-7 md:p-8">
          <h2 className="text-lg font-semibold">Cumulative growth index</h2>
          <p className="mt-2 text-sm text-text-secondary">
            Starting at 100, with annual returns compounded. Fees, taxes and individual cash flows
            are not included.
          </p>
          <svg
            viewBox="0 0 1000 280"
            className="mt-7 w-full"
            role="img"
            aria-label={`Growth index from 100 to ${indices[indices.length - 1].toFixed(2)}`}
          >
            <path d="M40 60H960M40 130H960M40 200H960M40 250H960" stroke="white" opacity=".1" />
            <polyline
              points={points}
              fill="none"
              stroke="#986ef5"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Starting index: 100</span>
            <span>Ending index: {indices[indices.length - 1].toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
      <p className="text-xs leading-6 text-text-secondary">
        Past performance does not guarantee future results. Returns can fluctuate and capital may be
        lost. The figures shown are strategy-level figures, not an individual account statement.
      </p>
    </div>
  );
}
