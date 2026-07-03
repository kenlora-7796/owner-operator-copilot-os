import { runAgentTask } from "../agent-core";
import type { AgentTask } from "../../types/agent";

export async function runBillingAgent(invoiceDetails: string) {
  const task: AgentTask = {
    id: crypto.randomUUID(),
    agent: "billing",
    type: "create_action",
    title: "Prepare Billing Action",
    description: "Review billing details and prepare invoice-related recommendations.",
    input: {
      invoiceDetails,
    },
    requiresApproval: true,
    createdAt: new Date().toISOString(),
  };

  return runAgentTask(task);
}