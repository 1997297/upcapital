import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";
const content = {
  title: "AML & KYC",
  description:
    "An overview of identity verification and the information that may be requested during the account process.",
  sections: [
    [
      "Identity and eligibility",
      "The account process may require confirmation of identity, residence and eligibility. Requirements depend on the account and the applicable operating arrangements.",
    ],
    [
      "Information requests",
      "You may be asked for personal details, evidence of identity, address information or information about the source of funds. Follow the specific instructions provided through the designated account channel.",
    ],
    [
      "Document handling",
      "Do not send identity documents through the public enquiry form or general email. Request instructions for the designated verification channel before sharing sensitive material.",
    ],
    [
      "Review and additional information",
      "A review may require clarification or additional information before an account or request can proceed. Providing documents does not by itself guarantee account acceptance.",
    ],
    [
      "Questions about verification",
      "Contact hello@upcapital.com for guidance about the verification process. Do not include copies of identity documents in the initial enquiry.",
    ],
  ],
};
export const metadata: Metadata = {
  alternates: { canonical: "/legal/aml" },
  title: content.title,
  description: content.description,
};
export default function Page() {
  return <LegalPage {...content} />;
}
