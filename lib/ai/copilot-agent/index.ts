import { runAgentTask } from "../agent-core";
import type { AgentTask } from "../../types/agent";

export async function runCopilotAgent(message: string) {
  const task: AgentTask = {
    id: crypto.randomUUID(),
    agent: "copilot",
    type: "recommend",
    title: "Copilot Request",
    description: "User asked the AI Copilot for help.",
    input: {
      message,
    },
    requiresApproval: false,
    createdAt: new Date().toISOString(),
  };

  return runAgentTask(task);
}