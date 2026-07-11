import type {
  ProfitabilityEngineInput,
  ProfitabilityMetrics,
  ProfitabilityStatus,
} from "./types";

const DEFAULT_TARGET_PROFIT_MARGIN = 20;

function validateFiniteNumber(
  value: number,
  fieldName: string,
): number {
  if (!Number.isFinite(value)) {
    throw new Error(`${fieldName} must be a valid number.`);
  }

  return value;
}

function validateNonNegativeNumber(
  value: number,
  fieldName: string,
): number {
  const validatedValue = validateFiniteNumber(value, fieldName);

  if (validatedValue < 0) {
    throw new Error(`${fieldName} cannot be negative.`);
  }

  return validatedValue;
}

function validateTargetProfitMargin(value: number): number {
  const validatedValue = validateFiniteNumber(
    value,
    "Target profit margin",
  );

  if (validatedValue < 0 || validatedValue >= 100) {
    throw new Error(
      "Target profit margin must be between 0 and 99.99.",
    );
  }

  return validatedValue;
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

function clampScore(score: number): number {
  return Math.min(100, Math.max(0, score));
}

function determineProfitabilityStatus(
  score: number,
  netProfit: number,
): ProfitabilityStatus {
  if (netProfit < 0 || score < 40) {
    return "unprofitable";
  }

  if (score < 60) {
    return "marginal";
  }

  if (score < 80) {
    return "profitable";
  }

  return "highly-profitable";
}

function calculateProfitabilityScore(
  profitMargin: number,
  operatingRatio: number,
  deadheadPercentage: number,
  netProfit: number,
): number {
  if (netProfit <= 0) {
    return 0;
  }

  const marginScore = clampScore(profitMargin * 3);
  const operatingRatioScore = clampScore(100 - operatingRatio);
  const deadheadScore = clampScore(100 - deadheadPercentage);

  const weightedScore =
    marginScore * 0.5 +
    operatingRatioScore * 0.3 +
    deadheadScore * 0.2;

  return roundFinancialValue(clampScore(weightedScore));
}

export function calculateProfitabilityMetrics(
  input: ProfitabilityEngineInput,
): ProfitabilityMetrics {
  const { financialMetrics } = input;

  const revenue = validateNonNegativeNumber(
    financialMetrics.revenue,
    "Revenue",
  );

  const totalMiles = validateNonNegativeNumber(
    financialMetrics.totalMiles,
    "Total miles",
  );

  const deadheadMiles = validateNonNegativeNumber(
    financialMetrics.deadheadMiles,
    "Deadhead miles",
  );

  const operatingCosts = validateNonNegativeNumber(
    financialMetrics.operatingCosts,
    "Operating costs",
  );

  const costPerMile = validateNonNegativeNumber(
    financialMetrics.costPerMile,
    "Cost per mile",
  );

  const netProfit = validateFiniteNumber(
    financialMetrics.netProfit,
    "Net profit",
  );

  const profitMargin = validateFiniteNumber(
    financialMetrics.profitMargin,
    "Profit margin",
  );

  const targetProfitMargin = validateTargetProfitMargin(
    input.targetProfitMargin ?? DEFAULT_TARGET_PROFIT_MARGIN,
  );

  const deadheadPercentage =
    safeDivide(deadheadMiles, totalMiles) * 100;

  const deadheadCostImpact = deadheadMiles * costPerMile;

  const breakEvenRevenue = operatingCosts;

  const breakEvenRatePerMile = safeDivide(
    breakEvenRevenue,
    totalMiles,
  );

  const operatingRatio =
    safeDivide(operatingCosts, revenue) * 100;

  const targetRevenue =
    targetProfitMargin === 100
      ? 0
      : operatingCosts / (1 - targetProfitMargin / 100);

  const revenueGap = targetRevenue - revenue;

  const profitabilityScore = calculateProfitabilityScore(
    profitMargin,
    operatingRatio,
    deadheadPercentage,
    netProfit,
  );

  const profitabilityStatus = determineProfitabilityStatus(
    profitabilityScore,
    netProfit,
  );

  return {
    profitabilityScore,
    profitabilityStatus,
    deadheadPercentage: roundFinancialValue(deadheadPercentage),
    deadheadCostImpact: roundFinancialValue(deadheadCostImpact),
    breakEvenRevenue: roundFinancialValue(breakEvenRevenue),
    breakEvenRatePerMile: roundFinancialValue(
      breakEvenRatePerMile,
    ),
    operatingRatio: roundFinancialValue(operatingRatio),
    targetProfitMargin: roundFinancialValue(
      targetProfitMargin,
    ),
    targetRevenue: roundFinancialValue(targetRevenue),
    revenueGap: roundFinancialValue(revenueGap),
  };
}