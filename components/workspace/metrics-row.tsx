import { workspaceService } from "@/lib/workspace";

export function MetricsRow() {
  const { metrics } = workspaceService.getWorkspace();

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
        >
          <p className="text-sm text-slate-400">{metric.title}</p>
          <p className="mt-2 text-2xl font-bold text-white">{metric.value}</p>
          <p className="mt-1 text-xs text-cyan-400">{metric.subtitle}</p>
        </div>
      ))}
    </section>
  );
}