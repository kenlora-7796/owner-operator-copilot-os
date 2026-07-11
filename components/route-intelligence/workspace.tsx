import type {
  ReactNode,
  RefObject,
} from "react";

import type {
  AICFORecommendation,
  FinancialMetrics,
  ProfitabilityMetrics,
} from "@/lib/finance";

import { LoadHistoryPanel } from "./load-history-panel";
import { RouteIntelligenceSidebar } from "./sidebar";

interface RouteIntelligenceWorkspaceProps {
  children: ReactNode;
  financialMetrics: FinancialMetrics;
  profitabilityMetrics: ProfitabilityMetrics;
  aiRecommendation: AICFORecommendation;
  onNewLoad: () => void;
  resultsRef: RefObject<HTMLDivElement | null>;
}

interface WorkspaceMetricProps {
  label: string;
  value: string;
  supportingText: string;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

function getStatusLabel(
  status: ProfitabilityMetrics["profitabilityStatus"],
): string {
  switch (status) {
    case "highly-profitable":
      return "Highly Profitable";
    case "profitable":
      return "Profitable";
    case "marginal":
      return "Marginal";
    case "unprofitable":
      return "Unprofitable";
  }
}

function getRecommendationStyles(
  recommendation: AICFORecommendation["recommendation"],
): string {
  if (recommendation === "accept") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  if (recommendation === "decline") {
    return "border-red-400/30 bg-red-400/10 text-red-300";
  }

  return "border-amber-400/30 bg-amber-400/10 text-amber-300";
}

function WorkspaceMetric({
  label,
  value,
  supportingText,
}: WorkspaceMetricProps) {
  return (
    <article className="flex min-h-40 flex-col justify-between rounded-2xl border border-white/10 bg-slate-950/50 p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          {label}
        </p>

        <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
          {value}
        </p>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        {supportingText}
      </p>
    </article>
  );
}

export function RouteIntelligenceWorkspace({
  children,
  financialMetrics,
  profitabilityMetrics,
  aiRecommendation,
  onNewLoad,
  resultsRef,
}: RouteIntelligenceWorkspaceProps) {
  const recommendationStyles =
    getRecommendationStyles(
      aiRecommendation.recommendation,
    );

  const revenueDifference =
    financialMetrics.revenue -
    profitabilityMetrics.targetRevenue;

  const revenueDifferenceLabel =
    revenueDifference >= 0
      ? "Revenue above target"
      : "Revenue needed for target";

  return (
    <div className="min-h-screen bg-slate-950 text-white lg:flex">
      <RouteIntelligenceSidebar />

      <div className="min-w-0 flex-1">
        <header className="border-b border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur sm:px-6">
          <div className="mx-auto flex max-w-[1700px] flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>Command Center</span>
                <span>/</span>
                <span className="text-emerald-300">
                  Route Intelligence
                </span>
              </div>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Active Load Workspace
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                  Workspace mode
                </p>

                <p className="mt-0.5 text-sm font-medium text-slate-200">
                  Closed Alpha Preview
                </p>
              </div>

              <button
                type="button"
                onClick={onNewLoad}
                className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                New Load Analysis
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1700px] p-4 sm:p-6">
          <section className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0 space-y-6">
              {children}

              <section
                ref={resultsRef}
                className="scroll-mt-6 rounded-3xl border border-white/10 bg-slate-900/60 p-5 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                      Financial Intelligence
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      Active load economics
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Current financial results generated by the
                      expense, financial and profitability engines.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                      Profitability status
                    </p>

                    <p className="mt-1 font-semibold text-white">
                      {getStatusLabel(
                        profitabilityMetrics.profitabilityStatus,
                      )}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Score{" "}
                      {formatNumber(
                        profitabilityMetrics.profitabilityScore,
                      )}{" "}
                      / 100
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <WorkspaceMetric
                    label="Revenue"
                    value={formatCurrency(
                      financialMetrics.revenue,
                    )}
                    supportingText="Gross revenue offered for the active load."
                  />

                  <WorkspaceMetric
                    label="Operating Costs"
                    value={formatCurrency(
                      financialMetrics.operatingCosts,
                    )}
                    supportingText="Projected fixed and variable load expenses."
                  />

                  <WorkspaceMetric
                    label="Net Profit"
                    value={formatCurrency(
                      financialMetrics.netProfit,
                    )}
                    supportingText="Revenue remaining after operating expenses."
                  />

                  <WorkspaceMetric
                    label="Profit Margin"
                    value={formatPercentage(
                      financialMetrics.profitMargin,
                    )}
                    supportingText="Percentage of revenue retained as profit."
                  />

                  <WorkspaceMetric
                    label="Revenue Per Mile"
                    value={formatCurrency(
                      financialMetrics.revenuePerMile,
                    )}
                    supportingText="Revenue across loaded and deadhead miles."
                  />

                  <WorkspaceMetric
                    label="Cost Per Mile"
                    value={formatCurrency(
                      financialMetrics.costPerMile,
                    )}
                    supportingText="Average operating cost across all miles."
                  />

                  <WorkspaceMetric
                    label="Profit Per Mile"
                    value={formatCurrency(
                      financialMetrics.profitPerMile,
                    )}
                    supportingText="Projected profit generated per total mile."
                  />

                  <WorkspaceMetric
                    label="Operating Ratio"
                    value={formatPercentage(
                      profitabilityMetrics.operatingRatio,
                    )}
                    supportingText="Percentage of revenue consumed by expenses."
                  />
                </div>
              </section>

              <section className="grid gap-6 xl:grid-cols-2">
                <article className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Route Economics
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    Mileage intelligence
                  </h3>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <WorkspaceMetric
                      label="Loaded Miles"
                      value={`${formatNumber(
                        financialMetrics.loadedMiles,
                      )} mi`}
                      supportingText="Miles traveled with paid freight."
                    />

                    <WorkspaceMetric
                      label="Deadhead Miles"
                      value={`${formatNumber(
                        financialMetrics.deadheadMiles,
                      )} mi`}
                      supportingText="Unpaid miles connected to the load."
                    />

                    <WorkspaceMetric
                      label="Total Miles"
                      value={`${formatNumber(
                        financialMetrics.totalMiles,
                      )} mi`}
                      supportingText="Combined paid and unpaid mileage."
                    />

                    <WorkspaceMetric
                      label="Deadhead"
                      value={formatPercentage(
                        profitabilityMetrics.deadheadPercentage,
                      )}
                      supportingText="Percentage of total miles driven empty."
                    />
                  </div>
                </article>

                <article className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Break-Even Intelligence
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    Target analysis
                  </h3>

                  <div className="mt-6 space-y-4">
                    <div className="flex min-h-20 items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-4">
                      <span className="text-sm text-slate-400">
                        Break-even revenue
                      </span>

                      <span className="font-semibold text-white">
                        {formatCurrency(
                          profitabilityMetrics.breakEvenRevenue,
                        )}
                      </span>
                    </div>

                    <div className="flex min-h-20 items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-4">
                      <span className="text-sm text-slate-400">
                        Break-even rate per mile
                      </span>

                      <span className="font-semibold text-white">
                        {formatCurrency(
                          profitabilityMetrics.breakEvenRatePerMile,
                        )}
                      </span>
                    </div>

                    <div className="flex min-h-20 items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-4">
                      <span className="text-sm text-slate-400">
                        Deadhead cost impact
                      </span>

                      <span className="font-semibold text-white">
                        {formatCurrency(
                          profitabilityMetrics.deadheadCostImpact,
                        )}
                      </span>
                    </div>

                    <div className="flex min-h-20 items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-4">
                      <span className="text-sm text-slate-400">
                        {revenueDifferenceLabel}
                      </span>

                      <span className="font-semibold text-white">
                        {formatCurrency(
                          Math.abs(revenueDifference),
                        )}
                      </span>
                    </div>
                  </div>
                </article>
              </section>

              <LoadHistoryPanel />
            </div>

            <aside className="space-y-6 2xl:sticky 2xl:top-6 2xl:self-start">
              <article className="rounded-3xl border border-emerald-400/20 bg-gradient-to-b from-emerald-400/10 to-slate-900/60 p-5 sm:p-6">
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
                    {aiRecommendation.recommendation}
                  </span>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                  <p className="text-xl font-semibold text-white">
                    {aiRecommendation.title}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {aiRecommendation.explanation}
                  </p>

                  <p className="mt-4 text-xs text-slate-500">
                    Confidence:{" "}
                    {formatPercentage(
                      aiRecommendation.confidence,
                    )}
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  {aiRecommendation.actionItems.map(
                    (actionItem, index) => (
                      <div
                        key={`${actionItem}-${index}`}
                        className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-xs font-semibold text-emerald-300">
                          {index + 1}
                        </span>

                        <p className="pt-0.5 text-sm leading-6 text-slate-300">
                          {actionItem}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </article>

              <article className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  System Context
                </p>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <span className="text-sm text-slate-400">
                      Routes service
                    </span>

                    <span className="text-sm font-semibold text-emerald-300">
                      Ready
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <span className="text-sm text-slate-400">
                      Finance engines
                    </span>

                    <span className="text-sm font-semibold text-emerald-300">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-slate-400">
                      Owner preferences
                    </span>

                    <span className="text-sm font-semibold text-amber-300">
                      Default
                    </span>
                  </div>
                </div>
              </article>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}