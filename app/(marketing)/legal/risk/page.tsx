import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";
const content = {
  title: "Risk Disclosure",
  description:
    "Understand the possibility of loss and the limitations of performance information before investing.",
  sections: [
    [
      "Capital at risk",
      "Investments can fall as well as rise in value. You may lose part or all of the capital you invest. Only commit capital after considering your financial position and ability to bear losses.",
    ],
    [
      "Market and concentration risk",
      "Gold, Silver, Bitcoin and Oil respond to different economic, political and market conditions. Prices can change rapidly. Diversification does not prevent losses, and correlations can increase during periods of stress.",
    ],
    [
      "Digital assets and market access",
      "Digital assets may experience substantial volatility, operational disruption and limited liquidity. Execution, custody, network and counterparty conditions can affect access to assets and the ability to transact.",
    ],
    [
      "Liquidity and withdrawals",
      "The ability to exit an investment depends on the instrument, market conditions and applicable account terms. Review withdrawal conditions, processing information and potential costs before investing.",
    ],
    [
      "Performance information",
      "Past performance does not guarantee future results. Scenario calculations depend on assumptions and are not forecasts. Fees, taxes, currency movements and the timing of cash flows may affect individual results.",
    ],
    [
      "Independent assessment",
      "Consider the full strategy and account documentation. Seek independent professional advice if you are uncertain about the suitability or implications of an investment.",
    ],
  ],
};
export const metadata: Metadata = {
  alternates: { canonical: "/legal/risk" },
  title: content.title,
  description: content.description,
};
export default function Page() {
  return <LegalPage {...content} />;
}
