import { ActivityTimeline } from "@/components/activity-timeline";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pb-24">
      <section className="px-4 pt-6">
        <p className="text-sm font-semibold text-sky-400">
          Owner Operator Copilot OS
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Good Morning, Kendra 👋
        </h1>

        <p className="mt-2 text-sm text-slate-300">
          Your AI office is ready to help you run today’s operation.
        </p>
      </section>

      <section className="mx-4 mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <p className="text-sm text-slate-400">Today’s AI Summary</p>

        <div className="mt-4 space-y-3 text-sm">
          <p>✅ 2 rate confirmations found</p>
          <p>✅ 2 loads waiting for approval</p>
          <p>⚠️ 1 BOL missing</p>
          <p>⚠️ DVIR due before departure</p>
          <p>✅ No HOS violations detected</p>
        </div>
      </section>

      <section className="mx-4 mt-6">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">AI Workspace</h2>
            <p className="text-sm text-slate-400">
              Copilot, activity, and approvals in one operating view.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr_1fr]">
          <CopilotPanel />
          <ActivityTimeline />
          <ApprovalQueue />
        </div>
      </section>

      <BottomNav />
    </main>
  );
}

function CopilotPanel() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-lg font-bold">AI Copilot</h3>
      <p className="mt-2 text-sm text-slate-400">
        Ask your AI office what needs attention.
      </p>

      <div className="mt-4 rounded-xl border border-sky-900 bg-sky-950/50 p-3 text-sm text-sky-100">
        I can help approve loads, upload BOLs, create invoices, check HOS, or
        start your DVIR.
      </div>

      <div className="mt-4 space-y-2">
        <button className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold">
          What needs my attention?
        </button>

        <button className="w-full rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200">
          Review today’s loads
        </button>

        <button className="w-full rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200">
          Check missing paperwork
        </button>
      </div>
    </section>
  );
}

function ApprovalQueue() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-lg font-bold">Approval Queue</h3>
      <p className="mt-2 text-sm text-slate-400">
        Human approval before important actions.
      </p>

      <div className="mt-4 space-y-3">
        <div className="rounded-xl border border-amber-700 bg-amber-950/40 p-3">
          <p className="font-semibold">Rate Confirmation Review</p>
          <p className="mt-1 text-sm text-amber-100">
            AI found a load ready for dispatch approval.
          </p>

          <div className="mt-3 flex gap-2">
            <button className="flex-1 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold">
              Approve
            </button>
            <button className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold">
              Review
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950 px-2 py-2">
      <div className="grid grid-cols-5 text-center text-xs text-slate-300">
        <button>🏠<br />Home</button>
        <button>🚚<br />Loads</button>
        <button>📥<br />Inbox</button>
        <button>💰<br />Money</button>
        <button>🤖<br />Copilot</button>
      </div>
    </nav>
  );
}