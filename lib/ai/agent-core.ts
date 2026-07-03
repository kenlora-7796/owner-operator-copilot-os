import type { AgentResult, AgentTask } from "../types/agent";

export async function runAgentTask(task: AgentTask): Promise<AgentResult> {
  return {
    taskId: task.id,
    agent: task.agent,
    status: task.requiresApproval ? "needs_approval" : "completed",
    summary: `AI completed task: ${task.title}`,
    reasoning: [
      "Reviewed the task input.",
      "Identified the owner-operator workflow involved.",
      "Prepared a safe recommendation that requires human approval when needed.",
    ],
    output: {
      message: "Placeholder AI output. Real model logic will connect here later.",
      input: task.input,
    },
    recommendedActions: task.requiresApproval
      ? [
          {
            id: `${task.id}-approve`,
            label: "Approve Recommendation",
            description: "Allow the system to continue with this suggested action.",
            riskLevel: "medium",
            requiresApproval: true,
          },
        ]
      : [],
  };
}