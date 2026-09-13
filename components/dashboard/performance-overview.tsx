"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardIcon } from "./dashboard-icon";

const periods = {
  "1D": "the last day",
  "7D": "the last seven days",
  "1M": "the last month",
  "3M": "the last three months",
  "1Y": "the last year",
  ALL: "all available history",
} as const;
export function PerformanceOverview() {
  const [period, setPeriod] = useState<keyof typeof periods>("1M");
  return (
    <Card>
      <CardContent className="p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h2 className="text-lg font-semibold">Portfolio performance</h2>
            <p className="mt-1 text-sm text-text-secondary">Value over time · USD</p>
          </div>
          <div
            role="group"
            aria-label="Portfolio performance period"
            className="flex flex-wrap gap-1"
          >
            {(Object.keys(periods) as (keyof typeof periods)[]).map((value) => (
              <Button
                key={value}
                size="sm"
                className="min-h-11"
                variant={value === period ? "primary" : "ghost"}
                aria-pressed={value === period}
                onClick={() => setPeriod(value)}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>
        <div className="relative mt-6 grid min-h-64 place-items-center overflow-hidden rounded-xl border border-white/5 bg-background/40 px-5 py-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 grid grid-rows-4 opacity-50"
          >
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="border-b border-white/5" />
            ))}
          </div>
          <div className="relative max-w-md text-center" role="status" aria-live="polite">
            <DashboardIcon name="chart" className="mx-auto mb-4 h-7 w-7 text-primary-highlight" />
            <p className="text-sm font-semibold">Performance information is not available</p>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Your portfolio history for {periods[period]} will appear here when reporting is
              available.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
