import type {
  FinancialEngineInput,
  FinancialMetrics,
} from "./types";

function validateNonNegativeNumber(
  value: number,
  fieldName: string,
): number {
  if (!Number.isFinite(value)) {
    throw new Error(`${fieldName} must be a valid number.`);
  }

  if (value < 0) {
    throw new Error(`${fieldName} cannot be negative.`);
  }

  return value;
}

function safeDivide(numerator: number, denominator: number): number {
  if (denominator === 0) {
    return 0;
  }

  return numerator / denominator;
}

function roundFinancialValue(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateFinancialMetrics(
  input: FinancialEngineInput,
): FinancialMetrics {
  const revenue = validateNonNegativeNumber(
    input.revenue,
    "Revenue",
  );

  const loadedMiles = validateNonNegativeNumber(
    input.loadedMiles,
    "Loaded miles",
  );

  const deadheadMiles = validateNonNegativeNumber(
    input.deadheadMiles,
    "Deadhead miles",
  );

  const operatingCosts = validateNonNegativeNumber(
    input.expenses.totalOperatingExpenses,
    "Operating costs",
  );

  const totalMiles = loadedMiles + deadheadMiles;
  const netProfit = revenue - operatingCosts;

  const costPerMile = safeDivide(operatingCosts, totalMiles);
  const revenuePerMile = safeDivide(revenue, totalMiles);
  const profitPerMile = safeDivide(netProfit, totalMiles);
  const profitMargin = safeDivide(netProfit, revenue) * 100;

  return {
    revenue: roundFinancialValue(revenue),
    loadedMiles: roundFinancialValue(loadedMiles),
    deadheadMiles: roundFinancialValue(deadheadMiles),
    totalMiles: roundFinancialValue(totalMiles),
    operatingCosts: roundFinancialValue(operatingCosts),
    netProfit: roundFinancialValue(netProfit),
    costPerMile: roundFinancialValue(costPerMile),
    revenuePerMile: roundFinancialValue(revenuePerMile),
    profitPerMile: roundFinancialValue(profitPerMile),
    profitMargin: roundFinancialValue(profitMargin),
  };
}