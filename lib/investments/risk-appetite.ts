import type { RiskAppetite } from "@/types/client-finance";

export const riskAppetites: {
  value: RiskAppetite;
  label: string;
  objective: string;
  description: string;
}[] = [
  {
    value: "conservative",
    label: "Conservative",
    objective: "Prioritise capital preservation",
    description:
      "Seeks lower volatility, generally accepting lower potential returns. Capital remains at risk.",
  },
  {
    value: "moderate",
    label: "Moderate",
    objective: "Balance preservation and growth",
    description:
      "Accepts a moderate level of investment risk while seeking growth. Capital remains at risk.",
  },
  {
    value: "aggressive",
    label: "Aggressive",
    objective: "Seek higher growth potential",
    description:
      "Accepts greater volatility and the possibility of greater losses. Capital remains at risk.",
  },
];
