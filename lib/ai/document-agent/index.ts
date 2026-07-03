import { runAgentTask } from "../agent-core";
import type { AgentTask } from "../../types/agent";

export async function runDocumentAgent(documentName: string, documentText: string) {
  const task: AgentTask = {
    id: crypto.randomUUID(),
    agent: "document",
    type: "extract",
    title: "Analyze Document",
    description: "Extract useful information from an owner-operator document.",
    input: {
      documentName,
      documentText,
    },
    requiresApproval: false,
    createdAt: new Date().toISOString(),
  };

  return runAgentTask(task);
}