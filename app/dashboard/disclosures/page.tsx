import { requireUser } from "@/lib/auth/session";
import { readDisclosurePreference } from "@/lib/disclosures/policy";
import { InvestmentDisclosure } from "@/components/dashboard/investment-disclosure";

export const metadata = { title: "Legal & disclosures" };
export default async function Page() {
  const { user } = await requireUser();
  const preference = readDisclosurePreference(user.user_metadata.investment_disclosure);
  return <InvestmentDisclosure initiallyHidden={preference?.hideOnLogin} />;
}
