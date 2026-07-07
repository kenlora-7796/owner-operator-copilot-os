import { workspaceService } from "@/lib/workspace";

function getPriorityColor(priority: string) {
  if (priority === "high") return "text-red-400 bg-red-500/10";
  if (priority === "medium") return "text-amber-400 bg-amber-500/10";
  return "text-emerald-400 bg-emerald-500/10";
}

export function WorkQueue() {
  const { workQueue } = workspaceService.getWorkspace();

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-lg font-bold text-white">AI Action Center</h3>
      <p className="mt-1 text-sm text-slate-400">
        Decisions that need your attention.
      </p>

      <div className="mt-4 space-y-3">
        {workQueue.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-white">{item.title}</p>
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${getPriorityColor(
                  item.priority
                )}`}
              >
                {item.priority.toUpperCase()}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-400">{item.description}</p>

            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white">
                Approve
              </button>
              <button className="flex-1 rounded-xl border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-300">
                Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}