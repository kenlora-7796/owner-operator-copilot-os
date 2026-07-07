"use client";

import { useEffect, useState } from "react";
import type { TimelineEntry } from "@/lib/timeline";

export function OperationsTimeline() {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);

  async function loadTimeline() {
    const response = await fetch("/api/timeline");
    const result = await response.json();

    setEntries(result.data ?? []);
  }

  useEffect(() => {
    loadTimeline();
  }, []);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white">AI Activity Feed</h3>
          <p className="mt-1 text-sm text-slate-400">
            Live operating history from the AI kernel.
          </p>
        </div>

        <button
          onClick={loadTimeline}
          className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
        >
          Refresh
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
          No activity recorded yet. Run the activity test to generate events.
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="relative border-l border-cyan-900 pl-4">
              <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-cyan-400" />
              <p className="text-sm font-semibold text-white">{entry.title}</p>
              <p className="mt-1 text-sm text-slate-400">{entry.description}</p>
              <p className="mt-2 text-xs text-slate-500">
                {new Date(entry.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}