export type ExpenseCategory =
  | "fuel"
  | "maintenance"
  | "insurance"
  | "truckPayment"
  | "trailerPayment"
  | "def"
  | "tolls"
  | "permits"
  | "miscellaneous";

export type ExpenseClassification = "variable" | "fixed";

export interface ExpenseItem {
  category: ExpenseCategory;
  classification: ExpenseClassification;
  amount: number;
  description: string;
}

export interface ExpenseInput {
  fuel?: number;
  maintenance?: number;
  insurance?: number;
  truckPayment?: number;
  trailerPayment?: number;
  def?: number;
  tolls?: number;
  permits?: number;
  miscellaneous?: number;
}

export interface FuelExpenseInput {
  gallonsUsed: number;
  fuelPricePerGallon: number;
}

export interface ExpenseSummary {
  items: ExpenseItem[];
  variableExpenses: number;
  fixedExpenses: number;
  totalOperatingExpenses: number;
}

export interface FinancialEngineInput {
  revenue: number;
  loadedMiles: number;
  deadheadMiles: number;
  expenses: ExpenseSummary;
}

export interface FinancialMetrics {
  revenue: number;
  loadedMiles: number;
  deadheadMiles: number;
  totalMiles: number;
  operatingCosts: number;
  netProfit: number;
  costPerMile: number;
  revenuePerMile: number;
  profitPerMile: number;
  profitMargin: number;
}

export type ProfitabilityStatus =
  | "highly-profitable"
  | "profitable"
  | "marginal"
  | "unprofitable";

export interface ProfitabilityEngineInput {
  financialMetrics: FinancialMetrics;
  targetProfitMargin?: number;
}

export interface ProfitabilityMetrics {
  profitabilityScore: number;
  profitabilityStatus: ProfitabilityStatus;
  deadheadPercentage: number;
  deadheadCostImpact: number;
  breakEvenRevenue: number;
  breakEvenRatePerMile: number;
  operatingRatio: number;
  targetProfitMargin: number;
  targetRevenue: number;
  revenueGap: number;
}

export type AIRecommendation =
  | "accept"
  | "negotiate"
  | "decline";

export interface AICFOInput {
  financialMetrics: FinancialMetrics;
  profitabilityMetrics: ProfitabilityMetrics;
}

export interface AICFORecommendation {
  recommendation: AIRecommendation;
  confidence: number;
  title: string;
  explanation: string;
  actionItems: string[];
}