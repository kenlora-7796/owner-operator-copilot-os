import { RouteIntelligenceWorkspace } from "@/components/route-intelligence/route-intelligence-workspace";

export default function RouteIntelligencePage() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Owner Operator Copilot OS
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            Route Intelligence
          </h1>

          <p className="mt-2 max-w-3xl text-slate-600">
            Turn live route data into fuel estimates and operating
            intelligence for your trucking business.
          </p>
        </header>

        <RouteIntelligenceWorkspace />
      </div>
    </main>
  );
}