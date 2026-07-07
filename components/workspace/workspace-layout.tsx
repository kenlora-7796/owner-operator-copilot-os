import { ActiveLoads } from "./active-loads";
import { AiCommandBar } from "./ai-command-bar";
import { AiOffice } from "./ai-office";
import { BottomNavigation } from "./bottom-navigation";
import { ComplianceStatus } from "./compliance-status";
import { FinanceOverview } from "./finance-overview";
import { GreetingPanel } from "./greeting-panel";
import { MetricsRow } from "./metrics-row";
import { OperationsTimeline } from "./operations-timeline";
import { SmartInbox } from "./smart-inbox";
import { WorkQueue } from "./work-queue";
import { WorkspaceHeader } from "./workspace-header";

export function WorkspaceLayout() {
  return (
    <main className="min-h-screen bg-slate-950 pb-56 text-white">
      <WorkspaceHeader />

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        <GreetingPanel />
        <MetricsRow />

        <section className="grid gap-4 xl:grid-cols-[0.9fr_1.5fr_1fr]">
          <AiOffice />
          <OperationsTimeline />
          <WorkQueue />
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SmartInbox />
          <ActiveLoads />
          <FinanceOverview />
          <ComplianceStatus />
        </section>


        <AiCommandBar />

      
      </div>


      <BottomNavigation />
    </main>
  );
}