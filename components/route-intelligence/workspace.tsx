import type {
  ReactNode,
  RefObject,
} from "react";

import type {
  AICFORecommendation,
  FinancialMetrics,
  ProfitabilityMetrics,
} from "@/lib/finance";


import { AICFOPanel } from "./ai-cfo-panel";
import { BreakEvenCard } from "./break-even-card";
import { FinancialSummaryCard } from "./financial-summary-card";
import { LoadHistoryPanel } from "./load-history-panel";
import { RouteEconomicsCard } from "./route-economics-card";
import { RouteIntelligenceSidebar } from "./sidebar";
import { SystemContextPanel } from "./system-context-panel";

interface RouteIntelligenceWorkspaceProps {
  children: ReactNode;
  financialMetrics: FinancialMetrics;
  profitabilityMetrics: ProfitabilityMetrics;
  aiRecommendation: AICFORecommendation;
  onNewLoad: () => void;
  resultsRef: RefObject<HTMLDivElement | null>;
}


export function RouteIntelligenceWorkspace({
  children,
  financialMetrics,
  profitabilityMetrics,
  aiRecommendation,
  onNewLoad,
  resultsRef,
}: RouteIntelligenceWorkspaceProps) {
 
  

  const revenueDifference =
    financialMetrics.revenue -
    profitabilityMetrics.targetRevenue;

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
                   Closed Alpha v0.1
                </p>
              </div>

              <button
                type="button"
                onClick={onNewLoad}
                className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                New Load Analysis
              </button>
              <a
  href="https://docs.google.com/forms/d/e/1FAIpQLSf1XyBOyN-_6ncwI7L2sw-mrZ-L-E1TMcvspiU04RppfXOG8w/viewform?usp=publish-editor"
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
>
  💬 Send Feedback
</a>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1700px] p-4 sm:p-6">
          <section className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0 space-y-6">
              {children}

              <FinancialSummaryCard
                financialMetrics={financialMetrics}
                profitabilityMetrics={profitabilityMetrics}
                resultsRef={resultsRef}
              />

              <section className="grid gap-6 xl:grid-cols-2">
                <RouteEconomicsCard
                  loadedMiles={financialMetrics.loadedMiles}
                  deadheadMiles={financialMetrics.deadheadMiles}
                  totalMiles={financialMetrics.totalMiles}
                  deadheadPercentage={
                    profitabilityMetrics.deadheadPercentage
                  }
                />

                <BreakEvenCard
                  breakEvenRevenue={
                    profitabilityMetrics.breakEvenRevenue
                  }
                  breakEvenRatePerMile={
                    profitabilityMetrics.breakEvenRatePerMile
                  }
                  deadheadCostImpact={
                    profitabilityMetrics.deadheadCostImpact
                  }
                  revenueDifference={revenueDifference}
                />
              </section>

              <LoadHistoryPanel />
            </div>

            <aside className="space-y-6 2xl:sticky 2xl:top-6 2xl:self-start">
            <AICFOPanel
          recommendation={aiRecommendation}
             />
          <SystemContextPanel />
            
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}