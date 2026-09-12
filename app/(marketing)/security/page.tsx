import type { Metadata } from "next";

import { PublicPage, PublicCTA } from "@/components/marketing/public-page";
import { Card, CardContent } from "@/components/ui/card";
export const metadata: Metadata = {
  alternates: { canonical: "/security" },
  title: "Security",
  description:
    "Account access, personal information and financial instructions deserve deliberate safeguards. Here are the principles that guide our security approach.",
};
const sections = [
  [
    "Protect account access",
    "Use a unique password and enable additional verification wherever it is available. Never share sign-in details or one-time codes.",
  ],
  [
    "Check financial instructions",
    "Confirm destinations and funding details through the established account channel. Treat unexpected requests to move money with caution.",
  ],
  [
    "Keep personal information private",
    "Share identity documents only through a designated verification channel. General email enquiries should not contain sensitive documents.",
  ],
  [
    "Report concerns promptly",
    "If you receive a suspicious message or notice unexpected account activity, contact UPCAPITAL. Include useful context without sharing credentials.",
  ],
];
export default function Page() {
  return (
    <PublicPage
      eyebrow="Security principles"
      title="Care at every sensitive step."
      description="Account access, personal information and financial instructions deserve deliberate safeguards. Here are the principles that guide our security approach."
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
      <section className="up-glass mt-12 rounded-3xl p-7">
        <h2 className="text-2xl font-semibold">Report a security concern</h2>
        <p className="mt-4 leading-7 text-text-secondary">
          Email our team with the date, the communication you received and a brief description. Do
          not include passwords or authentication codes.
        </p>
        <a
          href="mailto:hello@upcapital.com?subject=Security%20concern"
          className="up-link-button mt-6 inline-flex"
        >
          Contact the team
        </a>
      </section>
      <PublicCTA />
    </PublicPage>
  );
}
