import type { Metadata } from "next";
import { PublicPage, PublicCTA } from "@/components/marketing/public-page";
import { Accordion } from "@/components/ui/accordion";
import { faq } from "@/lib/constants/marketing";
export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: "Frequently Asked Questions",
  description: "Answers about UPCAPITAL, strategy, risk, accounts and contacting our team.",
};
export default function Page() {
  return (
    <PublicPage
      eyebrow="Frequently asked questions"
      title="The essentials, clearly explained."
      description="Find answers about the platform, our strategy framework and what to consider before taking the next step."
    >
      <div className="max-w-4xl">
        <Accordion
          items={faq.map(([title, content], index) => ({ id: `faq-${index}`, title, content }))}
        />
      </div>
      <PublicCTA />
    </PublicPage>
  );
}
