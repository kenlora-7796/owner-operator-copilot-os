import { workspaceService } from "@/lib/workspace";

export function SmartInbox() {
  const { documents } = workspaceService.getWorkspace();

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-lg font-bold text-white">Smart Inbox</h3>
      <p className="mt-1 text-sm text-slate-400">Today’s documents.</p>

      <div className="mt-4 space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between rounded-2xl bg-slate-950 p-3"
          >
            <div>
              <p className="font-semibold text-white">
                {doc.icon} {doc.name}
              </p>
              <p className="text-sm text-slate-400">{doc.status}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}