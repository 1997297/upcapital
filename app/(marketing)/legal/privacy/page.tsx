import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";
const content = {
  title: "Privacy Information",
  description:
    "How information moves through this public website and how to contact us about privacy.",
  sections: [
    [
      "Live market quotes",
      "The homepage embeds TradingView market widgets. Your browser connects directly to TradingView to retrieve quotes and display resources. TradingView receives technical information including your IP address, the embedding page URL, widget type and displayed symbols. Its privacy practices apply to those requests.",
    ],
    [
      "Browsing the website",
      "Your browser requests pages and assets from the website hosting infrastructure. Those requests include technical information such as an IP address, browser information and the requested address.",
    ],
    [
      "Contact enquiries",
      "The enquiry form prepares a message in your own email application. It does not submit the form to a website database. If you send the email, the information you include is shared with UPCAPITAL and handled through the email services involved.",
    ],
    [
      "What to share",
      "Provide only the information needed for your enquiry. Do not include passwords, verification codes, payment credentials or identity documents in a general email.",
    ],
    [
      "Responding to requests",
      "Information you choose to send can be used to understand your enquiry and respond to it. Account verification and other sensitive processes require separate instructions and applicable information about their handling.",
    ],
    [
      "Privacy questions",
      "Contact hello@upcapital.com to ask about information you have shared or to request access, correction or deletion. Describe your request without including unnecessary sensitive information.",
    ],
  ],
};
export const metadata: Metadata = {
  alternates: { canonical: "/legal/privacy" },
  title: content.title,
  description: content.description,
};
export default function Page() {
  return <LegalPage {...content} />;
}
