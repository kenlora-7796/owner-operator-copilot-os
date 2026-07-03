import { runAgentTask } from "../agent-core";
import type { AgentTask } from "../../types/agent";

export async function runDispatchAgent(loadDetails: string) {
  const task: AgentTask = {
    id: crypto.randomUUID(),
    agent: "dispatch",
    type: "recommend",
    title: "Review Load Details",
    description: "Analyze load details and recommend next dispatch actions.",
    input: {
      loadDetails,
    },
    requiresApproval: true,
    createdAt: new Date().toISOString(),
  };

  return runAgentTask(task);
}