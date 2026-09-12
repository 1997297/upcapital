import type { Metadata } from "next";

import { PublicPage, PublicCTA } from "@/components/marketing/public-page";
import { Card, CardContent } from "@/components/ui/card";
export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About UPCAPITAL",
  description:
    "UPCAPITAL connects multi-asset strategy with portfolio intelligence, giving investors a clearer view of their capital.",
};
const sections = [
  [
    "Clarity over complexity",
    "Investment information should be understandable. Our approach brings strategy, allocation, performance and risk into a consistent view.",
  ],
  [
    "A multi-asset perspective",
    "Gold, Silver, Bitcoin and Oil connect the portfolio to different market drivers, from industrial demand to energy cycles and digital liquidity.",
  ],
  [
    "Discipline through changing markets",
    "Diversification and exposure limits are central to our approach. They help frame decisions without removing the possibility of loss.",
  ],
];
export default function Page() {
  return (
    <PublicPage
      eyebrow="Our approach"
      title="Capital deserves a considered approach."
      description="UPCAPITAL connects multi-asset strategy with portfolio intelligence, giving investors a clearer view of their capital."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {sections.map(([title, text]) => (
          <Card key={title}>
            <CardContent className="p-7 md:p-8">
              <div className="mb-8 h-1 w-8 rounded-full bg-[#b8ff00]" />
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-4 leading-7 text-text-secondary">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <section className="mt-12 border-t border-white/10 pt-10">
        <h2 className="text-2xl font-semibold">Our headquarters</h2>
        <address className="mt-5 not-italic leading-8 text-text-secondary">
          48 Hudson Crest Parkway
          <br />
          Tarrytown, New York 10591
          <br />
          United States
        </address>
        <a href="mailto:hello@upcapital.com" className="mt-5 inline-block text-[#b8ff00]">
          hello@upcapital.com
        </a>
      </section>
      <PublicCTA />
    </PublicPage>
  );
}
