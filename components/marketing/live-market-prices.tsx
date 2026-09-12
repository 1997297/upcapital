"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const markets = [
  {
    name: "Gold",
    symbol: "OANDA:XAUUSD",
    label: "Gold / US dollar",
    unit: "USD per troy ounce",
    url: "https://www.tradingview.com/symbols/XAUUSD/?exchange=OANDA",
    accent: "#ffcf66",
  },
  {
    name: "Silver",
    symbol: "OANDA:XAGUSD",
    label: "Silver / US dollar",
    unit: "USD per troy ounce",
    url: "https://www.tradingview.com/symbols/XAGUSD/?exchange=OANDA",
    accent: "#d6dce8",
  },
  {
    name: "Bitcoin",
    symbol: "COINBASE:BTCUSD",
    label: "Bitcoin / US dollar",
    unit: "USD per BTC",
    url: "https://www.tradingview.com/symbols/BTCUSD/?exchange=COINBASE",
    accent: "#f7931a",
  },
  {
    name: "Oil",
    symbol: "OANDA:WTICOUSD",
    label: "WTI crude oil / US dollar",
    unit: "WTI CFD / USD per barrel",
    url: "https://www.tradingview.com/symbols/WTICOUSD/?exchange=OANDA",
    accent: "#18d5e5",
  },
] as const;

function MarketQuote({ market }: { market: (typeof markets)[number] }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let frame: HTMLIFrameElement | null = null;
    const timeout = window.setTimeout(() => {
      if (!disposed) setStatus("unavailable");
    }, 20000);
    const loaded = () => {
      if (disposed) return;
      window.clearTimeout(timeout);
      setStatus("ready");
    };
    const observer = new MutationObserver(() => {
      const nextFrame = host.querySelector("iframe");
      if (!nextFrame || nextFrame === frame) return;
      frame = nextFrame;
      frame.title = market.label + " live market quote";
      // Keep the transparent embed canvas from inheriting the page's dark color scheme.
      frame.style.colorScheme = "normal";
      frame.addEventListener("load", loaded);
    });
    observer.observe(host, { childList: true, subtree: true });
    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    script.type = "text/javascript";
    script.async = true;
    script.textContent = JSON.stringify({
      symbol: market.symbol,
      width: "100%",
      colorTheme: "dark",
      isTransparent: true,
      locale: "en",
    });
    script.onerror = () => {
      if (!disposed) {
        window.clearTimeout(timeout);
        setStatus("unavailable");
      }
    };
    host.append(widget, script);
    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      observer.disconnect();
      frame?.removeEventListener("load", loaded);
      script.onerror = null;
      host.replaceChildren();
    };
  }, [market, attempt]);

  return (
    <Card className="min-w-0 overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 pt-5">
        <h3 className="font-semibold">{market.name}</h3>
        <span
          aria-hidden="true"
          className="h-1 w-8 rounded-full"
          style={{ background: market.accent }}
        />
      </div>
      <p className="px-5 pt-1 text-xs text-text-secondary">{market.unit}</p>
      <div className="relative mt-3 min-h-[126px]" aria-busy={status === "loading"}>
        <div
          ref={hostRef}
          className="tradingview-widget-container min-h-[126px]"
          hidden={status === "unavailable"}
        />
        {status === "loading" && (
          <div className="pointer-events-none absolute inset-0 bg-[#0d1220] px-5 py-4">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="mt-3 h-4 w-24" />
            <span className="sr-only">Loading {market.name} quote</span>
          </div>
        )}
        {status === "unavailable" && (
          <div className="px-5 py-3">
            <p className="text-sm text-text-secondary" role="status">
              Quote temporarily unavailable.
            </p>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="mt-2"
              onClick={() => {
                setStatus("loading");
                setAttempt((value) => value + 1);
              }}
            >
              Retry quote
            </Button>
          </div>
        )}
      </div>
      <div className="tradingview-widget-copyright border-t border-white/10 px-5 py-3">
        <a
          href={market.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-text-secondary underline-offset-4 hover:text-white hover:underline"
        >
          {market.name} on TradingView
        </a>
      </div>
    </Card>
  );
}

export function LiveMarketPrices() {
  return (
    <section
      id="live-market-prices"
      aria-labelledby="live-market-prices-title"
      className="mt-12 border-t border-white/10 pt-10"
    >
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="up-kicker">Markets at a glance</p>
          <h2 id="live-market-prices-title" className="mt-3 text-2xl font-semibold tracking-tight">
            Live market prices
          </h2>
        </div>
        <p className="text-xs text-text-secondary">Streaming quotes / USD</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {markets.map((market) => (
          <MarketQuote key={market.symbol} market={market} />
        ))}
      </div>
      <p className="mt-4 text-xs leading-6 text-text-secondary">
        Prices update automatically as market quotes arrive. Update frequency depends on the feed
        and market hours; closed markets retain their last quote. Quotes are indicative and may
        differ from execution prices.
      </p>
    </section>
  );
}
