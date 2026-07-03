import { runAgentTask } from "../agent-core";
import type { AgentTask } from "../../types/agent";

export async function runComplianceAgent(complianceDetails: string) {
  const task: AgentTask = {
    id: crypto.randomUUID(),
    agent: "compliance",
    type: "validate",
    title: "Check Compliance Item",
    description: "Review compliance details and flag missing or risky items.",
    input: {
      complianceDetails,
    },
    requiresApproval: true,
    createdAt: new Date().toISOString(),
  };

  return runAgentTask(task);
}