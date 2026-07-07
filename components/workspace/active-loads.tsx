import { workspaceService } from "@/lib/workspace";

export function ActiveLoads() {
  const { loads } = workspaceService.getWorkspace();

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-lg font-bold text-white">Active Loads</h3>
      <p className="mt-1 text-sm text-slate-400">Current dispatch work.</p>

      <div className="mt-4 space-y-3">
        {loads.map((load) => (
          <div key={load.id} className="rounded-2xl bg-slate-950 p-3">
            <p className="font-semibold text-white">{load.lane}</p>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-emerald-400">{load.rate}</span>
              <span className="text-slate-400">{load.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}