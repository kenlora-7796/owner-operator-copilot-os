import { workspaceService } from "@/lib/workspace";

export function ComplianceStatus() {
  const { compliance } = workspaceService.getWorkspace();

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-lg font-bold text-white">Compliance</h3>
      <p className="mt-1 text-sm text-slate-400">Safety and requirements.</p>

      <div className="mt-4 space-y-3">
        {compliance.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-2xl bg-slate-950 p-3"
          >
            <p className="font-semibold text-white">{item.label}</p>
            <p className={`text-sm font-semibold ${item.color}`}>
              {item.status}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}