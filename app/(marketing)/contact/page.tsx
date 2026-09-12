import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "@/components/marketing/public-page";
import { ContactForm } from "@/components/marketing/contact-form";
import { Card, CardContent } from "@/components/ui/card";
export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: "Contact UPCAPITAL about accounts, strategy, reporting and general enquiries.",
};
export default function Page() {
  return (
    <PublicPage
      eyebrow="Contact UPCAPITAL"
      title="Let’s start a conversation."
      description="Questions about the platform or your next step? Tell us what you would like to discuss."
    >
      <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
        <div>
          <dl className="space-y-8">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                Email
              </dt>
              <dd className="mt-3">
                <a href="mailto:hello@upcapital.com" className="text-lg hover:text-[#b8ff00]">
                  hello@upcapital.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                Telephone
              </dt>
              <dd className="mt-3">
                <a href="tel:+19145550186" className="text-lg hover:text-[#b8ff00]">
                  +1 (914) 555-0186
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                Headquarters
              </dt>
              <dd className="mt-3 leading-8 text-text-secondary">
                48 Hudson Crest Parkway
                <br />
                Tarrytown, New York 10591
                <br />
                United States
              </dd>
            </div>
          </dl>
          <Link href="/faq" className="mt-9 inline-block text-sm font-semibold text-[#b8ff00]">
            Browse frequently asked questions
          </Link>
        </div>
        <Card>
          <CardContent className="p-7 md:p-8">
            <h2 className="mb-7 text-2xl font-semibold">Send an enquiry</h2>
            <ContactForm />
            <p className="mt-5 text-xs leading-6 text-text-secondary">
              Read our{" "}
              <Link href="/legal/privacy" className="underline underline-offset-4">
                privacy information
              </Link>{" "}
              before sharing personal details.
            </p>
          </CardContent>
        </Card>
      </div>
    </PublicPage>
  );
}
