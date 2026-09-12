import type { Metadata } from "next";

import { PublicPage, PublicCTA } from "@/components/marketing/public-page";
import { Card, CardContent } from "@/components/ui/card";
export const metadata: Metadata = {
  alternates: { canonical: "/how-it-works" },
  title: "How It Works",
  description:
    "From your first conversation to reviewing performance, a clear process helps you make informed decisions.",
};
const sections = [
  [
    "01 / Discuss your account",
    "Start with our team. Understand availability, eligibility and the information needed to decide whether UPCAPITAL fits your requirements.",
  ],
  [
    "02 / Review and verify",
    "Review the applicable account terms, risk disclosures and verification requirements before providing personal information through the designated channel.",
  ],
  [
    "03 / Consider your allocation",
    "Understand the strategy, fees, investment horizon and withdrawal conditions before committing capital. Only use funding instructions confirmed through your account process.",
  ],
  [
    "04 / Monitor and review",
    "Review portfolio allocation, performance and account activity in context. Revisit your objectives as circumstances and market conditions change.",
  ],
];
export default function Page() {
  return (
    <PublicPage
      eyebrow="Your investment journey"
      title="Understand each step before you begin."
      description="From your first conversation to reviewing performance, a clear process helps you make informed decisions."
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
      <PublicCTA />
    </PublicPage>
  );
}
