import { workspaceService } from "@/lib/workspace";

function getStatusColor(status: string) {
  if (status === "working") return "text-emerald-400";
  if (status === "waiting") return "text-amber-400";
  return "text-slate-500";
}

function getEmployeeIcon(id: string) {
  if (id === "dispatcher") return "🚚";
  if (id === "bookkeeper") return "💰";
  if (id === "compliance") return "🛡️";
  if (id === "documents") return "📄";
  return "🤖";
}

export function AITeam() {
  const { employees } = workspaceService.getWorkspace();

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-lg font-bold text-white">AI Office</h3>
      <p className="mt-1 text-sm text-slate-400">
        Your digital operations team.
      </p>

      <div className="mt-4 space-y-3">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-3"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-white">
                {getEmployeeIcon(employee.id)} {employee.name}
              </p>
              <p className={`text-xs font-semibold ${getStatusColor(employee.status)}`}>
                {employee.status.toUpperCase()}
              </p>
            </div>

            <p className="mt-1 text-sm text-slate-400">{employee.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}