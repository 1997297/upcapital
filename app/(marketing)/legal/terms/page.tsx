import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";
const content = {
  title: "Terms of Use",
  description: "Information about using the UPCAPITAL website and the scope of its content.",
  sections: [
    [
      "Website information",
      "This website provides information about UPCAPITAL and its investment approach. Browsing this website or sending an enquiry does not open an investment account or establish an investment agreement.",
    ],
    [
      "Investment decisions",
      "Website content is general information and does not take account of your financial circumstances, objectives or tolerance for loss. Review the applicable strategy and account documentation before making a decision.",
    ],
    [
      "Accounts and transactions",
      "Eligibility, verification, fees, funding and withdrawal conditions are governed by the terms provided during the account process. Do not send funds solely on the basis of information on this website.",
    ],
    [
      "Responsible use",
      "Do not attempt to disrupt this website, gain unauthorised access, impersonate another person or submit misleading information. Keep credentials and sensitive information out of general enquiries.",
    ],
    [
      "Content and availability",
      "Information may change as services and reporting are updated. Historical figures are not promises of future performance. Contact the team if any information is unclear or appears inconsistent.",
    ],
    [
      "Questions",
      "For questions about this website or the applicable account terms, contact hello@upcapital.com.",
    ],
  ],
};
export const metadata: Metadata = {
  alternates: { canonical: "/legal/terms" },
  title: content.title,
  description: content.description,
};
export default function Page() {
  return <LegalPage {...content} />;
}
