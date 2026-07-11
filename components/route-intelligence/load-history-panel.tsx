"use client";

import {
  useMemo,
  useSyncExternalStore,
} from "react";

import {
  clearSavedLoadHistory,
  deleteSavedLoadAnalysis,
  type SavedLoadAnalysis,
} from "@/lib/loads";

const LOAD_HISTORY_STORAGE_KEY =
  "owner-operator-copilot-os:load-history";

const LOAD_HISTORY_UPDATED_EVENT =
  "load-history-updated";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatSavedDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getRecommendationStyles(
  recommendation: SavedLoadAnalysis["aiRecommendation"]["recommendation"],
): string {
  if (recommendation === "accept") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  if (recommendation === "decline") {
    return "border-red-400/30 bg-red-400/10 text-red-300";
  }

  return "border-amber-400/30 bg-amber-400/10 text-amber-300";
}

function subscribeToLoadHistory(
  onStoreChange: () => void,
): () => void {
  function handleStorageChange(event: StorageEvent) {
    if (
      event.key === LOAD_HISTORY_STORAGE_KEY ||
      event.key === null
    ) {
      onStoreChange();
    }
  }

  function handleHistoryUpdated() {
    onStoreChange();
  }

  window.addEventListener(
    "storage",
    handleStorageChange,
  );

  window.addEventListener(
    LOAD_HISTORY_UPDATED_EVENT,
    handleHistoryUpdated,
  );

  return () => {
    window.removeEventListener(
      "storage",
      handleStorageChange,
    );

    window.removeEventListener(
      LOAD_HISTORY_UPDATED_EVENT,
      handleHistoryUpdated,
    );
  };
}

function getLoadHistorySnapshot(): string {
  return (
    window.localStorage.getItem(
      LOAD_HISTORY_STORAGE_KEY,
    ) ?? "[]"
  );
}

function getServerLoadHistorySnapshot(): string {
  return "[]";
}

function parseSavedLoads(
  storedValue: string,
): SavedLoadAnalysis[] {
  try {
    const parsedValue: unknown =
      JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue as SavedLoadAnalysis[];
  } catch {
    return [];
  }
}

function notifyLoadHistoryUpdated(): void {
  window.dispatchEvent(
    new Event(LOAD_HISTORY_UPDATED_EVENT),
  );
}

export function LoadHistoryPanel() {
  const storedHistory = useSyncExternalStore(
    subscribeToLoadHistory,
    getLoadHistorySnapshot,
    getServerLoadHistorySnapshot,
  );

  const savedLoads = useMemo(
    () => parseSavedLoads(storedHistory),
    [storedHistory],
  );

  function handleRefresh() {
    notifyLoadHistoryUpdated();
  }

  function handleDelete(loadId: string) {
    const confirmed = window.confirm(
      "Delete this saved load analysis?",
    );

    if (!confirmed) {
      return;
    }

    deleteSavedLoadAnalysis(loadId);
    notifyLoadHistoryUpdated();
  }

  function handleClearHistory() {
    if (savedLoads.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Clear all saved load analyses? This cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    clearSavedLoadHistory();
    notifyLoadHistoryUpdated();
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Operating Activity
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Recent load analyses
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Review financial decisions saved from the Route
            Intelligence workspace.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Refresh
          </button>

          <button
            type="button"
            onClick={handleClearHistory}
            disabled={savedLoads.length === 0}
            className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear history
          </button>
        </div>
      </div>

      {savedLoads.length === 0 ? (
        <div className="mt-6 flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-950/50 p-6 text-center">
          <div>
            <p className="font-medium text-slate-300">
              No saved load analyses yet
            </p>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Analyze a load and save the completed decision.
              Saved routes, profitability results and AI CFO
              recommendations will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {savedLoads.map((savedLoad) => {
            const recommendationStyles =
              getRecommendationStyles(
                savedLoad.aiRecommendation.recommendation,
              );

            return (
              <article
                key={savedLoad.id}
                className="grid gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4 transition hover:border-white/20 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center xl:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(120px,auto))]"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">
                    {savedLoad.route.origin}
                    {" → "}
                    {savedLoad.route.destination}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Saved{" "}
                    {formatSavedDate(
                      savedLoad.createdAt,
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    Revenue
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    {formatCurrency(
                      savedLoad.financialMetrics.revenue,
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    Net profit
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    {formatCurrency(
                      savedLoad.financialMetrics.netProfit,
                    )}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 xl:justify-end">
                  <span
                    className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${recommendationStyles}`}
                  >
                    {
                      savedLoad.aiRecommendation
                        .recommendation
                    }
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(savedLoad.id)
                    }
                    className="rounded-lg border border-red-400/20 bg-red-400/5 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-400/10"
                  >
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {savedLoads.length > 0 ? (
        <p className="mt-4 text-xs leading-5 text-slate-500">
          Showing {savedLoads.length} of a maximum of 25
          locally saved analyses.
        </p>
      ) : null}
    </section>
  );
}