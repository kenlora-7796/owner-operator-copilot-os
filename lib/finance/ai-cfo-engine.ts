import type {
  AICFOInput,
  AICFORecommendation,
} from "./types";

function round(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function generateAICFORecommendation(
  input: AICFOInput,
): AICFORecommendation {

  const financial = input.financialMetrics;
  const profitability = input.profitabilityMetrics;

  const actions: string[] = [];

  let recommendation:
    | "accept"
    | "negotiate"
    | "decline";

  let title = "";

  let explanation = "";

  let confidence = 90;

  if (
    financial.netProfit <= 0 ||
    profitability.operatingRatio >= 100
  ) {

    recommendation = "decline";

    title = "Decline Load";

    explanation =
      "Projected operating costs exceed projected revenue.";

    actions.push(
      "Wait for a higher paying load.",
      "Reduce deadhead miles.",
      "Avoid operating below break-even."
    );

    confidence = 98;

  } else if (
    profitability.profitabilityScore >= 80 &&
    financial.profitMargin >= 20
  ) {

    recommendation = "accept";

    title = "Accept Load";

    explanation =
      "This load exceeds your target profit margin and meets financial goals.";

    actions.push(
      "Accept load.",
      "Monitor fuel costs.",
      "Track actual profit after delivery."
    );

    confidence = 96;

  } else {

    recommendation = "negotiate";

    title = "Negotiate Rate";

    explanation =
      "The load is profitable but does not meet your target profitability.";

    actions.push(
      "Request a higher rate.",
      "Reduce deadhead if possible.",
      "Evaluate alternate freight."
    );

    confidence = 88;
  }

  return {
    recommendation,
    confidence: round(confidence),
    title,
    explanation,
    actionItems: actions,
  };
}