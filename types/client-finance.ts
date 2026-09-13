// Provider-neutral contracts for Phases 7–9. No ledger or payment execution here.
export type RiskAppetite = "conservative" | "moderate" | "aggressive";
export type Currency = "NGN" | "USD" | `crypto:${string}`;
// Decimal strings preserve precision; validate currency scale at the service boundary.
export type Money = { amount: string; currency: Currency };
export type InvestmentRecord = {
  id: string;
  clientId: string;
  strategyId: string;
  principal: Money;
  riskAppetite: RiskAppetite;
  startDate: string | null;
  maturityDate: string | null;
  nextPayoutAt: string | null;
  status: "pending" | "active" | "matured" | "cancelled";
  createdAt: string;
};
export type FundingInstructions =
  | {
      method: "ngn";
      bankName: string;
      accountName: string;
      accountNumber: string;
      amount: Money & { currency: "NGN" };
      reference: string;
      expiresAt: string;
    }
  | {
      method: "usd";
      currency: "USD";
      providerReference: string;
      instructions: string;
      expiresAt: string | null;
    }
  | {
      method: "crypto";
      asset: string;
      network: string;
      address: string;
      memo?: string;
      minimum?: Money;
      requiredConfirmations: number;
      expiresAt: string | null;
    };
export type TransactionRecord = {
  id: string;
  clientId: string;
  type: "deposit" | "investment" | "return" | "withdrawal" | "payout" | "refund" | "adjustment";
  value: Money;
  fundingMethod: "ngn" | "usd" | "crypto" | "internal";
  providerReference: string | null;
  status: "awaiting_payment" | "processing" | "successful" | "expired" | "failed";
  createdAt: string;
  completedAt: string | null;
};
// Never aggregate different currencies or treat these balances as interchangeable.
export type AccountBalances = {
  currency: Currency;
  available: string;
  invested: string;
  pending: string;
  withdrawable: string;
};
