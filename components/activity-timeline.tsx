"use client";

import { useEffect, useState } from "react";
import type { TimelineEntry } from "@/lib/timeline";

export function ActivityTimeline() {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);

  async function loadTimeline() {
    const response = await fetch("/api/timeline");
    const result = await response.json();

    setEntries(result.data ?? []);
  }

 useEffect(() => {
  const timer = setTimeout(() => {
    loadTimeline();
  }, 0);

  return () => clearTimeout(timer);
}, []);
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-lg font-bold text-white">Activity Timeline</h3>
      <p className="mt-2 text-sm text-slate-400">
        Live operating history from the AI kernel.
      </p>

      {entries.length === 0 ? (
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
          No activity recorded yet. Run the activity test to generate events.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-xl border border-slate-800 bg-slate-950 p-3"
            >
              <p className="font-semibold text-white">{entry.title}</p>
              <p className="mt-1 text-sm text-slate-400">
                {entry.description}
              </p>
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