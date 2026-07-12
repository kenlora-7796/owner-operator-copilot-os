import type { AICFORecommendation } from "@/lib/finance";

import { AppCard } from "@/components/ui";

interface AICFOPanelProps {
  recommendation: AICFORecommendation;
}

function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

function getRecommendationStyles(
  recommendation: AICFORecommendation["recommendation"],
): string {
  switch (recommendation) {
    case "accept":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";

    case "decline":
      return "border-red-400/30 bg-red-400/10 text-red-300";

    default:
      return "border-amber-400/30 bg-amber-400/10 text-amber-300";
  }
}

export function AICFOPanel({
  recommendation,
}: AICFOPanelProps) {
  const recommendationStyles =
    getRecommendationStyles(
      recommendation.recommendation,
    );

  return (
    <AppCard tone="accent">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            AI CFO
          </p>

          <h3 className="mt-2 text-xl font-semibold">
            Load recommendation
          </h3>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${recommendationStyles}`}
        >
          {recommendation.recommendation}
        </span>
      </div>

      <AppCard
        tone="subtle"
        className="mt-6 rounded-2xl"
      >
        <p className="text-xl font-semibold text-white">
          {recommendation.title}
        </p>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          {recommendation.explanation}
        </p>

        <p className="mt-4 text-xs text-slate-500">
          Confidence{" "}
          {formatPercentage(
            recommendation.confidence,
          )}
        </p>
      </AppCard>

      <div className="mt-5 space-y-3">
        {recommendation.actionItems.map(
          (actionItem, index) => (
            <AppCard
              key={`${actionItem}-${index}`}
              tone="subtle"
              padding="sm"
              className="flex items-start gap-3 rounded-xl"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-xs font-semibold text-emerald-300">
                {index + 1}
              </span>

              <p className="pt-0.5 text-sm leading-6 text-slate-300">
                {actionItem}
              </p>
            </AppCard>
          ),
        )}
      </div>
    </AppCard>
  );
}