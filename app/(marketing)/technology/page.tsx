import type { Metadata } from "next";
import Image from "next/image";
import { PublicPage, PublicCTA } from "@/components/marketing/public-page";
import { Card, CardContent } from "@/components/ui/card";
export const metadata: Metadata = {
  alternates: { canonical: "/technology" },
  title: "Technology",
  description:
    "Our technology direction puts understandable information at the centre of the investment experience.",
};
const sections = [
  [
    "Market context",
    "Bring together the market drivers that matter across precious metals, energy and digital assets.",
  ],
  [
    "Portfolio analytics",
    "Read allocation and performance together, with consistent periods and clear definitions for financial metrics.",
  ],
  [
    "Risk visibility",
    "Consider concentration, exposure and drawdown alongside returns to understand the broader portfolio picture.",
  ],
  [
    "Reporting discipline",
    "Keep account activity and strategy reporting clear, traceable and easy to review.",
  ],
];
export default function Page() {
  return (
    <PublicPage
      eyebrow="Portfolio intelligence"
      title="A clearer connection between markets and decisions."
      description="Our technology direction puts understandable information at the centre of the investment experience."
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
      <div className="mt-12 overflow-hidden rounded-3xl border border-white/10">
        <Image
          src="/placeholders/strategy-operations.svg"
          alt="Strategy operations and portfolio intelligence"
          width={1200}
          height={760}
          sizes="(max-width: 768px) 100vw, 80vw"
          className="h-auto max-h-[420px] w-full object-cover"
        />
      </div>
      <PublicCTA />
    </PublicPage>
  );
}
