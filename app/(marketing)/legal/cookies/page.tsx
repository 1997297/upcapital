import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";
const content = {
  title: "Cookies & Browser Storage",
  description:
    "Information about browser storage and your choices on the UPCAPITAL public website.",
  sections: [
    [
      "Market widgets",
      "TradingView supplies the embedded market quotes. TradingView states that its widgets do not set cookies, but process technical connection information to deliver the feed. The widgets load automatically when you visit the homepage.",
    ],
    [
      "Current public-site features",
      "The public pages do not intentionally set advertising cookies or use third-party analytics scripts. The navigation menu, performance filters and calculator use temporary page state.",
    ],
    [
      "Your preferences",
      "Performance filters and calculator entries are not saved by these components to cookies or local storage. Reloading the page resets those values.",
    ],
    [
      "Hosting and external services",
      "The hosting infrastructure may process technical request information to deliver pages. Following an external link or sending an email takes you to services with their own practices.",
    ],
    [
      "Browser controls",
      "Your browser allows you to review, block and delete stored site data. These controls may affect features that depend on browser storage.",
    ],
    [
      "Questions",
      "Contact hello@upcapital.com if you have a question about cookies or browser storage on this website.",
    ],
  ],
};
export const metadata: Metadata = {
  alternates: { canonical: "/legal/cookies" },
  title: content.title,
  description: content.description,
};
export default function Page() {
  return <LegalPage {...content} />;
}
